import type { Blog } from "../db/Schema";

export interface ReqgetTagCount { }

export interface ResgetTagCount extends Pick<Blog['State'], 'tagSize'> {}