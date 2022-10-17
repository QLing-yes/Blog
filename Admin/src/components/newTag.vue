<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import type { ElInput } from 'element-plus'
type col = { value: string; link?: string }[]
type props = {
  /** 搜索建议 */
  suggestion: col
}
type emit = {
  /** 标签列表 */
  (e: 'tags', Tags: string[]): void
}

const emit = defineEmits<emit>()
const props = defineProps<props>()
const inputValue = ref('')
const Tags = ref<string[]>([])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

function Close(tag: string) {
  const tags = Tags.value
  tags.splice(tags.indexOf(tag), 1)
  emit('tags', tags)
}
function handleInputConfirm() {
  const tag = Lower(inputValue.value)
  if (tag && !Tags.value.includes(tag)) {
    Tags.value.push(tag)
    emit('tags', Tags.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
function showInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value?.focus()
  })
}
//输入筛选
function querySearch(queryString: string, cb: (a: col) => void) {
  const col = props.suggestion.filter(({ value }) => !Tags.value.includes(value))
  cb(subFilter(queryString, col))
}
function subFilter(query: string, col: col) {
  if (!query) return col
  query = Lower(query)
  return col.filter(({ value }) => Lower(value).includes(query))
}
function Lower(v: string) {
  return v.toLowerCase()
}
</script>

<template>
  <div class="tagView">
    <el-tag
      v-for="tag in Tags"
      :key="tag"
      class="tag gap"
      closable
      :disable-transitions="false"
      @close="Close(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-autocomplete
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      :fetch-suggestions="querySearch"
      class="input gap"
      size="small"
      maxlength="15"
      clearable
      @keyup.enter="handleInputConfirm"
      @select="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button gap" size="small" @click="showInput">
      + New Tag
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.gap {
  margin-top: 2px;
  margin-left: 8px;
}
</style>
