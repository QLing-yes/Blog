import { ref, shallowReactive } from "vue";
import { apiBasic, getArticle } from "@/shared/api/api";
import type { Article } from "@/shared/api/api";
import type { ResBasic } from "@/shared/protocols/basic/PtlBasic";

/** 侧边栏展开(折叠) */
export const unfold = ref(matchMedia('(min-width: 768px)').matches)
/** 基本文章信息列表 */
export const ArticleList = ref<Article>([])
/** 基本信息 */
export const Basic = {
    isSucc: ref(false),
    value: {} as Partial<ResBasic>
}

apiBasic().then((e) => {
    if (e.err) { return; }
    Basic.value = e.res
    Basic.isSucc.value = e.isSucc;
})
nextPage()
/** 更新ArticleList的下一页 */
export function nextPage() {
    const start = ArticleList.value.at(-1)?.ID || 0;
    getArticle({ start, brief: true }).then((e) => {
        const { err, res } = e;
        if (err) {
            console.error(err);
            return
        }
        const { Article } = res!

        if (start) while (Article.length > 0) ArticleList.value.push(...Article.splice(0, 9000));
        else ArticleList.value = Article;
    })
}
//设置本地存储
function setItem(name: string, value: object | string) {
    queueMicrotask(() => {
        localStorage.setItem(name, value instanceof Object ? JSON.stringify(value) : value);
    })
}
//不报错的json转对象
function parse(v?: string | null) {
    if (!v) return null;
    let l = null;
    try {
        l = JSON.parse(v as string)._value;
    } catch (error) { }
    return l;
}