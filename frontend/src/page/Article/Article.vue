<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { FindRoute } from '@/models/router/vueRouter';
import { useRouter, useRoute } from 'vue-router'
import { getArticle } from '@/shared/api/api';
import { options } from '@/Q-UI/tiptap/Editor'
import { Editor, EditorContent } from '@tiptap/vue-3';
import { getDate } from '@/Q-UI/tools/date';
import { unfold } from '@/models/State/State';

import type { res } from "@/shared/typeTools/tsrpc";
type query = { ID?: string };

// const router = useRouter();
const route = useRoute();
const editor: Editor = new Editor({
    ...options,
    editable: false
})
const Article = ref<res<'getArticle'>['Article'][0]>();

onMounted(() => {
    unfold.value = false;
    const { ID } = route.query as query;
    getArticle({ ID: Number(ID) }).then((e) => {
        const { err, res } = e;
        if (err) {
            console.error(err);
            return
        }
        Article.value = res.Article[0];
        //主体内容
        editor.commands.setContent(Article.value.content?.value || '');
    })
})
onBeforeUnmount(() => {
    editor.destroy()
})

function date(time?: number) {
    if (!time) return '';
    const { Y, M, D, h, m } = getDate(new Date(time));
    return `${Y}-${M}-${D} ${h}:${m}`;
}
</script>

<template>
    <div class="Content">
        <div class="m head">
            <span class="title">{{ Article?.title }}</span>
            <span class="info">
                <span>{{ date(Article?.time) }}</span>
            </span>
        </div>
        <EditorContent :editor="editor" class="m Editor" />
        <div class="m footer">
            <span class="info">
                <span class="icon">&#xe652;</span>
                <span>{{ Article?.tag.replace(/,/g, '&nbsp;&nbsp;') }}</span>
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Content {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: auto;
    background-color: #fff;
    border-radius: 10px;
    margin: 10px;
}

.m {
    padding: 10px;
}

.head {
    flex-direction: column;
}

.footer {
    flex-direction: column;
}

.title {
    font-family: sans-serif;
    min-height: 39px;
    font-size: 28px;
    color: #222;
    margin-bottom: 10px;
    font-weight: 600;
    line-height: 1.4;
}

.info {
    color: #999;
    font-size: 13px;

    &>span:not(.icon) {
        margin-right: 8px;
        font-size: 1.1em;
    }
}

.icon {
    font-size: 1.1em;
    margin-right: 8px;
}

.Editor {
    flex: 1;
    margin-top: 0px !important;

    &:deep(div) {
        display: unset;
    }

    &:deep(.ProseMirror) {
        width: 100%;
        margin-top: -20px !important;
        outline: none;
        font-family: sans-serif;
    }
}
</style>
