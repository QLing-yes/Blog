import type { Blog } from "../db/Schema"

export interface ReqAddArticle extends Omit<Blog['Article'], 'ID'> { }

export interface ResAddArticle {
    _id: string
}