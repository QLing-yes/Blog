<script lang="ts" setup>
type prop = {
    img?: string
    head?: string
    date?: string
}
const props = defineProps<prop>()
</script>

<template>
    <div class="card">
        <div class="imgBox" v-if="img">
            <img :src="img" loading="lazy" decoding="async">
        </div>
        <div class="Box">
            <span class="title serif">
                <span>{{ head }}</span>
                <span v-if="date" class="date">
                    <span class="icon">&#xe638;</span>
                    <span>{{ date }}</span>
                </span>
            </span>
            <div class="content serif">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
img {
    content-visibility: auto;
}
.imgBox {
    height: 100%;
    aspect-ratio: 1.5 / 1;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    contain: strict;
    margin-right: 10px;
}

@media (max-width: 768px) {
    .imgBox {
        min-width: 35%;
        max-width: 35%;
    }
}

.icon {
    font-size: 1.25em !important;
    font-family: ttf_icon !important;
}

.title {
    font-size: 1.15em;
    color: #504e4e;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &>span:nth-of-type(1) {
        contain: content;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    &>span:nth-of-type(2) {
        font-size: 0.6em;
    }
}

.content {
    height: 100%;
    color: rgba(0, 0, 0, .66);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card {
    content-visibility: auto;
    display: flex;
    contain: paint;
}

.Box {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.serif {
    font-family: 'Noto Serif SC',
        'Source Han Serif SC',
        'Source Han Serif',
        source-han-serif-sc,
        'PT Serif',
        'SongTi SC',
        'MicroSoft Yahei',
        Georgia, serif;
}
</style>