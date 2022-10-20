import { ref } from "vue";
import { getArticle } from "@/shared/api/api";
import type { Article } from "@/shared/api/api";

export const ArticleList = ref<Article>([])

nextPage()
/** 更新ArticleList的下一页 */
export function nextPage() {
    const start = ArticleList.value.at(-1)?.ID || 0
    console.log(start, ArticleList.value);
    getArticle(start, (err, res) => {
        if (err) {
            console.error(err)
            return
        };
        const { Article } = res!
        if (start) while (Article.length > 0) ArticleList.value.push(...Article.splice(0, 9000));
        else ArticleList.value = Article;
        console.log(Article);
    })
}
