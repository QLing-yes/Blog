import type { Blog } from "../db/Schema"

export interface ReqgetArticle {
    start?: number
}

export interface ResgetArticle {
    Article: Blog['Article'][]
}
