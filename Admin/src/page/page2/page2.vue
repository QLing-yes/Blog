<script setup lang="ts">
import tiptap from '@/components/tiptap/tiptap.vue'
import newTag from '@/components/newTag.vue'
import ChooseFile from '@/Q-UI/ChooseFile/ChooseFile.vue'
import { isType } from '@/Q-UI/tools/tools'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { client } from '@/shared/api/client'
import { State } from '@/models/State/State'

const cover = {
  w: ref(300),
  h: ref(150),
}
const _tiptap = ref<InstanceType<typeof tiptap>>()
const E = ref({
  title: '',
  content: {
    value: '',
    type: '',
  },
  tag: [] as string[],
  coverImg: '',
})

let Tags = ref<{ value: string; link?: string }[]>([])
for (let key in State.Tags) {
  Tags.value.push({ value: key })
}

/** 提交文章 */
async function submit() {
  const article = getArticle()
  let ret = await client.callApi('AddArticle', article)
  console.log('响应', ret)
}
//获取文章信息
function getArticle() {
  const { content } = E.value
  content.value = _tiptap.value?.editor.getHTML() || ''
  content.type = 'html'
  return E.value
}
// 设置文章封面
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
      <div class="title">
        <input
          v-model="E.title"
          placeholder="标题(30字以内)"
          maxlength="30"
          type="text"
        />
        <div>
          <div class="submit noSelect" @click="submit">提交</div>
        </div>
      </div>

      <!-- 编辑区 -->
      <tiptap ref="_tiptap"></tiptap>
    </div>
    <span id="title">文章标签</span>
    <!-- 添加文章标签 -->
    <newTag :suggestion="Tags" @tags="E.tag = $event"></newTag>
    <!-- 封面预览 -->
    <div class="cover">
      <span id="title">封面预览</span>
      <div class="WH">
        <input type="number" placeholder="宽" v-model="cover.w.value" />
        <input type="number" placeholder="高" v-model="cover.h.value" />
      </div>
      <div class="imgUpload">
        <img @click="E.coverImg = ''" v-if="E.coverImg" :src="E.coverImg" />
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
      <textarea
        class="imgUrl"
        v-model="E.coverImg"
        type="text"
        placeholder="https://example.com/a.png"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.submit:hover {
  background-color: #379bff;
}
.submit {
  cursor: pointer;
  color: #fff;
  display: flex;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: #379bffcc;
}
#title {
  display: block;
  margin: 10px 0px 10px 0px;
  color: #606266;
  font-size: 1.3rem;
}
.imgUrl {
  margin-top: 10px;
  margin-right: 5px;
  width: v-bind('cover.w.value+"px"');
  height: 20px;
  border-radius: 5px;
  border: 0.5px solid rgb(179, 179, 179);
  color: rgb(77, 77, 77);
}
.WH {
  // margin-top: 10px;
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
.title > input {
  height: 40px;
  border: 0px;
  outline: none;
  font-size: 1.5em;
  background-color: #ffffff00;
  &::placeholder {
    color: #ccd0d4;
  }
}
.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.box {
  background-color: #fff;
  padding: 10px;
}
</style>
