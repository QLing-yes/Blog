import { Schema } from '../shared/db/Schema';
import { MongoDB } from '@MongoDB/db';

export const MDB = new MongoDB<Schema>(
    'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
);

setInterval(() => {
    MDB.ExecutionQueue()
}, 800)