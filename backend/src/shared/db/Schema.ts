
export interface Blog {
  //文章集合
  Article: {
    ID: number //唯一
    time: number
    title: string
    content: {
      value: string
      type: string
    }
    /** 文章摘要 */
    brief: string
    tag: string
    coverImg: string
  }
  State: {
    // 文章标签
    tagSize: { [key: string]: number }
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