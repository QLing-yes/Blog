<script lang="ts" setup>
import { Router, FindRoute } from '@/models/router/vueRouter'
import { $scrollTo } from '@/Q-UI/tools/anima';
import { inject, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArticleList, unfold } from '@/models/State/State';
import { throttle } from '@/Q-UI/tools/tools';
import { getArticle } from '@/shared/api/api';
import card from "@/components/card/card.vue";
import Load from "@/components/autoLoad.vue";
import type { ResgetArticle } from '@/shared/protocols/PtlgetArticle';
import { getDate } from '@/Q-UI/tools/date';
type query = { query: string, field: string }

// const router = useRouter()
const route = useRoute();
const winEl = inject('isPC') ? document.documentElement : document.body;
const ElSearch = ref<HTMLElement>()
const Elinput = ref<HTMLElement>()
const search = ref<string>('')
const List = ref<ResgetArticle['Article']>([])
const _field = ref('')
const pageNum = ref(0);

nextTick(() => {
    unfold.value = false;
})
onMounted(() => {
    nextTick(() => {
        Elinput.value?.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                e.preventDefault();
                submit(true);
            }
        })
        document.addEventListener("keydown", Press)
    })

    winEl.scrollTo({ left: 0, top: window.screen.availHeight - 100 });
    //query:查询内容, field:指定字段
    const { query, field } = route.query as query;
    search.value = query;
    _field.value = field;
    submit();
})
onBeforeUnmount(() => {
    document.removeEventListener("keydown", Press)
})
function Press(e: KeyboardEvent) {
    const { ctrlKey, key } = e;
    if (ctrlKey && key == 'k') {
        e.preventDefault();
        Elinput.value?.focus();
    }
}
//提交
let cancel: ReturnType<typeof throttle>;
function submit(again?: boolean) {
    if (again) {
        pageNum.value = 0;
        List.value = [];
    }
    queueMicrotask(() => {
        const str = correct(search.value);
        let field = correct(_field.value);
        if (!str) return;
        search.value = str;
        //节流并查询
        cancel = throttle(() => {
            getArticle({
                brief: true,
                search: search.value,
                field,
                start: pageNum.value
            }).then((v) => {
                const { err, res } = v;
                for (let item of res!.Article) {
                    List.value.push(item);
                }
                if (res?.Article.length) {
                    pageNum.value = res.Article[res.Article.length - 1].ID;
                } else pageNum.value = 0;
            })
        }, cancel, 800)
    })
}
//字符串矫正
function correct(str?: string) {
    if (!str) return '';
    return str.substring(0, 30).match(/[a-zA-Z]|[0-9]|[\u4e00-\u9fa5]|[.]/g)?.toString().replace(/,/g, '').trim();
}
function date(time?: number) {
    if (!time) return '';
    const { Y, M, D } = getDate(new Date(time));
    return `${Y}-${M}-${D}`;
}
function read(item: typeof ArticleList.value[0]) {
    Router.push({ path: '/Article', query: { ID: item.ID } });
}
</script>
<template>
    <div class="Search" ref="ElSearch">
        <div class="SearchBox">
            <div class="query">
                <input type="text" ref="Elinput" maxlength="30" size="30" v-model="search" placeholder="搜索: 关键词, 标签">
                <span class="submit" @click="submit(true)">&#xe8b9;</span>
            </div>
            <div class="bar">
                <span>ctrl+k</span>
                <span>enter</span>
                <span>关键词</span>
                <span>标签</span>
            </div>
        </div>
        <TransitionGroup class="list" name="list" tag="ul">
            <card class="card" @click="read(item)" :img="item.coverImg" :head="item.title" :date="date(item.time)"
                v-for="(item, i) in List" :key="item.ID">
                <span class="line brief">{{ item.brief }}</span>
                <span class="line tag">
                    <span class="icon">&#xe652;</span>
                    {{ item.tag }}
                </span>
            </card>
        </TransitionGroup>
        <Load v-if="List && pageNum" @load="submit()"></Load>
    </div>
</template>
<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    // transform: translateX(30px);
}

.icon {
    font-family: ttf_icon !important;
}

.list {
    margin: 30px !important;
    padding: 0px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media (max-width: 768px) {
    .list {
        margin: 8px;
        margin-top: 30px;
    }

    .card {
        width: 100% !important;
    }
}

.card {
    cursor: pointer;
    height: 100px;
    width: 80%;
    margin-bottom: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid;
    border-image: linear-gradient(to right, #ffffff00, #efefef, #ffffff00) 1;
}

.tag {
    font-size: 0.8em;
}

.brief {
    -webkit-line-clamp: 2 !important;
    font-size: 0.9em;
}

.line {
    contain: content;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.Search {
    max-width: 90vw;
    width: 100%;
    align-self: center;
    flex-direction: column;
    background-color: #fff;
    flex: 1;
    border-radius: 10px;
    margin-bottom: 12px;
}

@media (max-width: 768px) {
    .SearchBox {
        height: 60px !important;
        max-width: 80% !important;
        min-width: 80% !important;

        &>.bar {
            display: none;
        }
    }
}

.SearchBox {
    contain: paint size;
    background-color: #f9f9f9;
    height: 90px;
    max-width: 700px;
    min-width: 550px;
    border-radius: 15px;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, .07);
    border-radius: 10px;
    margin: 0px auto;
    margin-top: 50px;
    box-shadow: 0 2px 6px rgb(0 0 0 / 5%);

    &>div {
        width: 100%;
        align-items: center;
    }

    &>.query {
        flex: 1;
        background-color: #fff;
    }

    &>.bar {
        margin: 0px 10px;
        height: 30px;
        contain: paint;

        &>span {
            color: #6b6b6b;
            font-size: 0.85em;
            margin-right: 5px;
            padding: 0px 3px;
            border-radius: 4px;
            user-select: none;
            // border: 1.5px solid #ececec;
            background-color: #ecececee;
        }
    }

    &>div>input {
        width: 100%;
        height: 100%;
        margin: 0px 10px;
        border: unset;
        outline: none;
        caret-color: red;
        font-size: 1.2em;
        font-family: sans-serif;
        background: transparent;
    }

    .submit:hover {
        color: #7cd690;
    }

    .submit {
        color: #666666;
        margin: 0px 10px;
        cursor: pointer;
        user-select: none;
        font-size: 1.7em;
        height: 100%;
        display: flex;
        align-items: center;
    }
}
</style>
