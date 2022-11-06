import { AnyBulkWriteOperation, BulkResult, BulkWriteResult, Collection, Db, Document, MongoClient, ObjectId, WriteError } from 'mongodb';

type DBSchema = { [key: string]: any };
type key<T> = keyof T & string;
type Doc<T extends DBSchema> = AnyBulkWriteOperation<T[key<T>]>
type callback = (inserted: inserted, err?: WriteError) => void
type inserted = Document & { index: number, _id: ObjectId }

export class MongoDB<T extends DBSchema> {
  private client!: MongoClient;
  readonly db = {} as Record<key<T>, Db>;
  readonly BulkWrite = new Map<string, Doc<T>[]>();
  private CBs = new WeakMap<object, callback>();

  constructor(uri: string) {
    this.InitDB(uri);
    this.ExecutionQueue = this.ExecutionQueue.bind(this);
  }
  async InitDB(uri: string) {
    this.client = new MongoClient(uri);
    console.log('MongoDB 连接中...');
    await this.client.connect()
      .then(() => { console.log('MongoDB 已连接'); })
      .catch(() => { console.log('MongoDB 连接失败'); })

  }
  Db(db: key<T>) {
    return this.db[db] || (this.db[db] = this.client.db(db));
  }
  Coll<K extends key<T>, P extends T[K], C extends key<P>>(db: K, col: C): Collection<T[K][C]> {
    return this.Db(db).collection(col);
  }
  /** 绑定回调 
   * @K 数据库名称
   * @C 集合名称
  */
  bindCB = (doc: object, callback: callback) => {
    this.CBs.set(doc, callback)
    return doc;
  }
  /** 处理回调 */
  handleCB(doc: Doc<T>, inserted: inserted, err?: WriteError) {
    this.CBs.get(doc)?.(inserted, err)
    this.CBs.delete(doc)
  }
  /** 添加bulkWrite队列任务
   * @param db 数据库名称
   * @param col 集合名称
   * @param data 集合数据
  */
  PushTaskFlow<K extends key<T>, C extends key<T[K]>>(
    db: K,
    col: C,
    data: AnyBulkWriteOperation<T[K][C]>[],
  ) {
    const b = this.BulkWrite;
    const c = JSON.stringify([db, col]);
    if (!b.has(c)) {
      b.set(c, data);
    } else {
      //防止超过入参长度
      while (data.length > 0) b.get(c)?.push(...data.splice(0, 100000));
    }
  }
  /** 提交bulkWrite队列 */
  async ExecutionQueue(ordered = false) {
    //循环是针对不同数据库和不同集合执行批量
    for (const [key, value] of this.BulkWrite) {
      if (value.length > 0) {
        const data = value.splice(0, value.length);
        const k = JSON.parse(key);
        /** 处理回调数据 */
        const res = (result: BulkResult) => {
          const { writeErrors, insertedIds } = result;
          insertedIds.forEach((e) => {
            const { index } = e;
            const err = writeErrors.find((err) => err.index == index);
            this.handleCB(data[index], e as inserted, err)
          })
        }

        this.Coll(k[0], k[1]).bulkWrite(data, { ordered })
          .then((e) => {
            const result = e.result
            res(result)
          })
          .catch((e: { result: BulkWriteResult }) => {
            const result = e.result.result
            res(result)
          });

      }
    }
  }
}
