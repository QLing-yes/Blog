import type { Blog } from "../db/Schema"
type Article = Blog['Article']
export interface ReqgetArticle {
    start?: number
    brief?: boolean
}

export interface ResgetArticle {
    Article: (Omit<Article, 'content'> & { content?: Article['content'] })[]
}
