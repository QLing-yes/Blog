// import { AnyBulkWriteOperation } from 'mongodb';
import { Schema } from './Schema';
import { MongoDB } from './db';

const MDB = new MongoDB<Schema>(
  'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
);

MDB.PushTaskFlow('DB_A', 'CollA', [
  {
    'insertOne': {
      'document': {
        'CollA': { 'age': '18', 'name': 'A' },
        'CollB': { 'BB': 11, 'CC': '33' }
      }
    }
  }
])

setInterval(() => {
  MDB.ExecutionQueue(false, (v) => {
    console.log(v);

  })
}, 800)
// const coll = MDB.Coll('DB_B', 'CollC');

// coll.createIndex({ name: 1 }, { unique: false, background: true, name: 'xx' });
// const z = coll.find({ name: 'z' });
// z.toArray((err, doc) => {
//   console.log(doc);
// });
// z.explain().then((e) => {
//   console.log(e);
// });
