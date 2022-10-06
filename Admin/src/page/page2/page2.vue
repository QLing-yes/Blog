<script setup lang="ts">
import tiptap from '@/components/tiptap/tiptap.vue'
import newTag from '@/components/newTag.vue'
import ChooseFile from '@/Q-UI/ChooseFile/ChooseFile.vue'
import { isType } from '@/Q-UI/tools/tools'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'

const cover = {
  w: ref(300),
  h: ref(150),
}
const _tiptap = ref<InstanceType<typeof tiptap>>()
const E = ref({
  title: '',
  content: '',
  tag: [] as string[],
  coverImg: '',
})
const col = [
  { value: 'vue' },
  { value: 'element' },
  { value: 'cooking' },
  { value: 'mint-ui' },
  { value: 'vuex' },
  { value: 'vue-router' },
  { value: 'babel' },
]
function getArticle() {
  E.value.content = _tiptap.value?.editor.getHTML() || ''
  return JSON.stringify(E.value)
}
function coverFile(e: { result: res[]; noSucc: res[] }) {
  if (!(isType(e.result[0]?.read) == 'string')) return
  const read = e.result[0].read as string
  if (read.startsWith('data:')) {
    E.value.coverImg = read
  }
}
</script>

<template>
  <div class="box">
    <div>
      <!-- 文章标题 -->
      <input
        v-model="E.title"
        class="title"
        placeholder="标题(30字以内)"
        maxlength="30"
        type="text"
      />
      <!-- 编辑区 -->
      <tiptap ref="_tiptap"></tiptap>
    </div>
    <!-- 添加文章标签 -->
    <newTag :suggestion="col" @tags="E.tag = $event"></newTag>
    <!-- 封面预览 -->
    <div class="cover">
      <span id="title">封面预览</span>
      <div class="WH">
        <input type="number" placeholder="宽" v-model="cover.w.value" />
        <input type="number" placeholder="高" v-model="cover.h.value" />
      </div>
      <div class="imgUpload">
        <img v-if="E.coverImg" :src="E.coverImg" />
        <template v-else>
          <el-icon class="Plus"><Plus /></el-icon>
          <ChooseFile
            @result="coverFile"
            fileType="image/"
            accept="image/*"
            class="ChooseFile"
          ></ChooseFile>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#title {
  color: #606266;
  font-size: 1.3rem;
}
.WH {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 150px;
  display: flex;
  flex-direction: row;
  & > input {
    margin-right: 5px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 0.5px solid rgb(179, 179, 179);
    color: rgb(77, 77, 77);
  }
}
.imgUpload {
  width: v-bind('cover.w.value+"px"');
  height: v-bind('cover.h.value+"px"');
  background-color: #fafafa;
  border: 0.5px dashed #cdd0d6;
  border-radius: 2px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  contain: strict;
  & > img {
    width: 100%;
    // height: 100%;
    object-fit: cover;
  }
  & > .Plus {
    color: #8c939d8a;
    font-size: 1.5em;
  }
  & > .ChooseFile {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
.collapseItem {
  padding-left: 10px;
  &:deep(.el-collapse-item__arrow) {
    margin: 0 8px 0 0;
  }
}
.title {
  height: 40px;
  border: 0px;
  outline: none;
  font-size: 1.5em;
  background-color: #ffffff00;
  &::placeholder {
    color: #ccd0d4;
  }
}
.box {
  background-color: #fff;
  padding: 10px;
}
</style>
