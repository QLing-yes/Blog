import { AnyBulkWriteOperation, Collection, Db, MongoClient } from 'mongodb';

type DBSchema = { [key: string]: any };
type key<T> = keyof T & string;

export class MongoDB<T extends DBSchema> {
  private client!: MongoClient;
  readonly db = {} as Record<key<T>, Db>;
  readonly BulkWrite = new Map<string, AnyBulkWriteOperation<T[key<T>]>[]>();

  constructor(uri?: string) {
    if (uri) this.InitDB(uri);
    this.ExecutionQueue = this.ExecutionQueue.bind(this);
  }
  async InitDB(uri: string) {
    this.client = new MongoClient(uri);
    console.log('MongoDB 连接中...');
    await this.client.connect();
    console.log('MongoDB 已连接');
  }
  Db(db: key<T>) {
    return this.db[db] || (this.db[db] = this.client.db(db));
  }
  Coll<K extends key<T>, P extends T[K]>(db: K, col: key<P>): Collection<P> {
    return this.Db(db).collection(col);
  }
  /**添加bulkWrite队列任务*/
  PushTaskFlow<K extends key<T>, P extends T[K]>(
    db: K,
    col: key<P>,
    data: AnyBulkWriteOperation<P>[],
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
  /**提交bulkWrite队列*/
  async ExecutionQueue(ordered = false, callback?: (result?: any) => void) {
    //循环是针对不同数据库和不同集合执行批量
    for (const [key, value] of this.BulkWrite) {
      if (value.length > 0) {
        const d = value.splice(0, value.length);
        const k = JSON.parse(key);
        console.time('耗时');
        await this.Coll(k[0], k[1])
          .bulkWrite(d, { ordered })
          .then(callback)
          .catch(callback);
        console.timeEnd('耗时');
      }
    }
  }
}
