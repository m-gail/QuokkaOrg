<script setup lang="ts">
import { ref, watch } from 'vue'
import FileOpenIcon from '../icons/FileOpenIcon.vue'
import FolderOpenIcon from '../icons/FolderOpenIcon.vue'
import ChevronLeftIcon from '../icons/ChevronLeftIcon.vue'
import { DirectoryPicker, type File } from '../directoryPicker'
import LoadingSpinner from '../LoadingSpinner.vue'
import Flex from '../Flex.vue'

const { label, value, rootDirectory } = defineProps<{
  label: string
  value: string
  rootDirectory: string
}>()
const showDialog = ref(false)
const loading = ref(false)
const currentDirectoryContents = ref([] as File[])
const emit = defineEmits<{ change: [value: string] }>()

async function openDialog() {
  showDialog.value = true
  await loadDirectory('')
}

async function handleClick(item: File) {
  if (item.type === 'FOLDER') {
    await loadDirectory(item.relativePath)
  } else {
    emit('change', item.relativePath)
    showDialog.value = false
  }
}

async function loadDirectory(directory: string) {
  if (rootDirectory === '') {
    return
  }
  loading.value = true
  const files = await DirectoryPicker.listDirectory({
    root: rootDirectory,
    directory: directory,
  })
  currentDirectoryContents.value = files.files
  loading.value = false
}
</script>
<template>
  <dialog class="max" :class="{ active: showDialog }">
    <header>
      <nav>
        <button class="transparent circle large" @click="showDialog = false">
          <i><ChevronLeftIcon /></i>
        </button>
        <h5>{{ label }}</h5>
      </nav>
    </header>
    <div class="space"></div>
    <Flex center v-if="loading"><LoadingSpinner /></Flex>
    <ul class="list border" v-else>
      <li
        v-for="item of currentDirectoryContents"
        :key="item.relativePath"
        class="wave"
        @click="handleClick(item)">
        <i v-if="item.type === 'FOLDER'" class="primary-text"><FolderOpenIcon /></i>
        {{ item.name }}
      </li>
    </ul>
  </dialog>
  <div class="row no-space">
    <button class="left-round large fill" @click="openDialog">
      <i><FileOpenIcon /></i>
      <span>Browse</span>
    </button>
    <div class="max field border label right-round">
      <input class="full-width" type="text" readonly :value="value" placeholder=" " />
      <label>{{ label }}</label>
    </div>
  </div>
</template>

<style lang="css" scoped>
/* usage with button breaks minimal width in fieldset */
.full-width {
  width: 100%;
}
</style>
