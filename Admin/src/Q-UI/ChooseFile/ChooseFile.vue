<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue'
import type { InputHTMLAttributes } from 'vue'
import { nextTick } from 'vue'
import { getFile } from '@/Q-UI/tools/browser'
import type { ev } from '@/Q-UI/tools/browser'
type prop = {
  /** 同input的accept属性 */
  accept?: string
  /** 筛选文件后缀(示例: .png,.jpg) */
  ext?: string
  /** 筛选文件类型(值为input的accept部分属性值)(示例: image/) */
  fileType?: string
  /** 原input标签属性(应用优先级高) */
  attrs?: InputHTMLAttributes
}
type emit = {
  (e: 'result', result: typeof _files): void
}

const _files = {
  /** 符合条件的 */
  result: [] as res[],
  /** 不符合条件的 */
  noSucc: [] as res[],
}
const emit = defineEmits<emit>()
const props = defineProps<prop>()
const input = ref<HTMLInputElement>()

nextTick(() => {
  getFile(input.value!, 'Base64', cb)
  function cb(e: ev) {
    const { files, result } = e
    if (files) {
      for (let i in files) {
        _files.result.push({ file: files[i], read: result![i] })
      }
      filterExts()
      filterType()
      emit('result', _files)
    }
  }
})
onBeforeUnmount(() => {
  _files.result = []
  _files.noSucc = []
})
/** 筛选符合分类对象*/
function filterType() {
  const { fileType } = props
  if (!fileType) return
  _files.result = _files.result.filter((v) => v.file.type.startsWith(fileType))
  _files.noSucc = _files.noSucc.filter((v) => !_files.result.includes(v))
}
/** 筛选符合后缀(多种)的对象 */
function filterExts() {
  const { ext } = props
  if (!ext) return

  const _ext = ext.split(',')
  const { result } = _files
  _files.result = result.filter((v) => {
    const { name } = v.file
    const isSub = endsWiths(name, _ext)
    if (!isSub) _files.noSucc.push(v)
    return isSub
  })
}
/** 验证字符串是否包含其一子串 */
function endsWiths(str: string, sub: string[]) {
  let isExt = false
  for (let v of sub) {
    if (!str.endsWith(v)) continue
    isExt = true
    break
  }
  return isExt
}
</script>

<template>
  <!-- 增强型选择文件(拖拽上传,文件对象编码) -->
  <input
    ref="input"
    multiple
    type="file"
    :accept="accept"
    v-bind="attrs || {}"
  />
</template>

<style scoped lang="scss">
input[type='file'] {
  color: rgba(255, 255, 255, 0);
  user-select: none;
  contain: strict;
  &::file-selector-button {
    display: none;
  }
}
</style>
