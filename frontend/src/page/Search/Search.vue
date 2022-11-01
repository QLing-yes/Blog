<script lang="ts" setup>
import { Router, FindRoute } from '@/models/router/vueRouter'
import { $scrollTo } from '@/Q-UI/tools/anima';
import { inject, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { unfold } from '@/models/State/State';
import { throttle } from '@/Q-UI/tools/tools';
import { getArticle } from '@/shared/api/api';
type query = { query: string, field: string }

// const router = useRouter()
const route = useRoute();
const winEl = inject('isPC') ? document.documentElement : document.body;
const ElSearch = ref<HTMLElement>()
const Elinput = ref<HTMLElement>()
const search = ref<string>('')

nextTick(() => {
    unfold.value = false;
    Elinput.value?.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            e.preventDefault();
            submit();
        }
    })
    document.addEventListener("keydown", Press)
})
onMounted(() => {
    winEl.scrollTo({ left: 0, top: window.screen.availHeight - 100 });
    //query:查询内容, field:指定字段
    const { query, field } = route.query as query;
    search.value = query;
    submit(field);
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
let cancel: number;
function submit(field?: string) {
    const str = correct(search.value);
    field = correct(field);
    if (!str) return;
    search.value = str;
    //节流并查询
    cancel = throttle(() => {
        getArticle({
            brief: true,
            search: str,
            field
        }).then((v) => {
            console.log(v);

        })
    }, cancel, 800)
}
//字符串矫正
function correct(str?: string) {
    if (!str) return '';
    return str.substring(0, 30).match(/[a-zA-Z]|[0-9]|[\u4e00-\u9fa5]|./g)?.toString().replace(/,/g, '').trim();
}
</script>
<template>
    <div class="Search" ref="ElSearch">
        <div class="SearchBox">
            <div class="query">
                <input type="text" ref="Elinput" maxlength="30" size="30" v-model="search" placeholder="搜索: 关键词, 标签">
                <span class="submit" @click="submit()">&#xe8b9;</span>
            </div>
            <div class="bar">
                <span>ctrl+k</span>
                <span>enter</span>
                <span>中</span>
                <span>英</span>
                <span>数字</span>
            </div>
        </div>
        <div class="list">
            2333
        </div>
    </div>
</template>
<style lang="scss" scoped>
.list {
    margin: 30px;
}

.Search {
    flex-direction: column;
    background-color: #fff;
    flex: 1;
    border-radius: 10px;
    margin-bottom: 12px;
}

@media (max-width: 768px) {
    .SearchBox {
        height: 60px !important;
        max-width: 70% !important;
        min-width: 70% !important;

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
