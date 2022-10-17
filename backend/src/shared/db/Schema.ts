
export interface Blog {
  Article: {
    ID: number,//唯一
    title: string
    content: {
      value: string
      type: string
    }
    tag: string[]
    coverImg: string
  }
}

export interface Schema {
  Blog: Blog
}
// //数据库模型
// {
//   //数据库名称
//   [key: string]: {
//     //集合名称
//     [key: string]: {
//       //字段
//       [key: string]: any
//     }
//   }
// }