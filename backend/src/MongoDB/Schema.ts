import { type } from "os";

export interface DB_A {
  CollA: {
    name: string;
    age: string;
  };
  CollB: {
    BB: number;
    CC: string;
  };
}
export interface DB_B {
  CollC: {
    name: string;
  };
  CollD: {
    age: number;
  };
}

export interface Schema {
  DB_A: DB_A;
  DB_B: DB_B;
}

// //数据库模型
// type db = {
//   //数据库名称
//   [key: string]: {
//     //集合名称
//     [key: string]: {
//       //字段
//       [key: string]: any
//     }
//   }
// }