import type { Blog } from "../db/Schema"
type Article = Blog['Article']
export interface ReqgetArticle {
    //最新文章
    start?: number
    brief?: boolean
    //文章匹配
    search?: string
    field?: string
}

export interface ResgetArticle {
    Article: (Omit<Article, 'content'> & { content?: Article['content'] })[]
}
