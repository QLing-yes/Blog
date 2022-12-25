import { Schema } from '../shared/db/Schema';
import { MongoDB } from '@MongoDB/db';
const dbConfig = require("../../assets/db.config.json");

if (!dbConfig) { console.error("数据库配置文件导入错误") }
export const MDB = new MongoDB<Schema>(
    // 'mongodb://localhost:27017'
    dbConfig.key
);

setInterval(() => {
    MDB.ExecutionQueue()
}, 800)