import type { Blog } from "../db/Schema"
type Article = Blog['Article']
export interface ReqAddArticle extends Omit<Blog['Article'], 'ID' | 'time' | 'tag' | 'brief'> {
    tag: Article['tag'][]
    brief?: Article['brief']
}

export interface ResAddArticle {
    _id: string
}