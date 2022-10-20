import type { Blog } from "../db/Schema"

export interface ReqAddArticle extends Omit<Blog['Article'], 'ID' | 'time'> { }

export interface ResAddArticle {
    _id: string
}