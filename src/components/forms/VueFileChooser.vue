<script setup lang="ts">
import { ref } from 'vue'
import FileOpenIcon from '../icons/FileOpenIcon.vue'
import FolderOpenIcon from '../icons/FolderOpenIcon.vue'
import ChevronLeftIcon from '../icons/ChevronLeftIcon.vue'
import { DirectoryPicker, type File } from '../directoryPicker'
import LoadingSpinner from '../LoadingSpinner.vue'
import Flex from '../Flex.vue'
import Input from './Input.vue'
import Button from '../Button.vue'
import Text from '../Text.vue'
import CreateFolderIcon from '../icons/CreateFolderIcon.vue'
import CreateFileIcon from '../icons/CreateFileIcon.vue'

const { label, value, rootDirectory } = defineProps<{
  label: string
  value: string
  rootDirectory: string
}>()
const showDialog = ref(false)
const loading = ref(false)
const currentDirectory = ref('')
const currentDirectoryContents = ref([] as File[])
const newValue = ref('')
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
  currentDirectory.value = directory
  const files = await DirectoryPicker.listDirectory({
    root: rootDirectory,
    directory: directory,
  })
  newValue.value = ''
  currentDirectoryContents.value = files.files
  loading.value = false
}
function combinePaths(directory: string, file: string) {
  if (directory === '') {
    return file
  }
  if (!directory.endsWith('/')) {
    return directory + '/' + file
  }
  return directory + file
}
function makeOrgFile(path: string) {
  if (path.endsWith('.org')) {
    return path
  }
  return path + '.org'
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
    <Flex col v-else>
      <Text weight="bold" size="lg">{{ currentDirectory }}</Text>
      <ul class="list border" style="margin-bottom: 64px">
        <li
          v-for="item of currentDirectoryContents"
          :key="item.relativePath"
          class="wave"
          @click="handleClick(item)">
          <i v-if="item.type === 'FOLDER'" class="primary-text"><FolderOpenIcon /></i>
          {{ item.name }}
        </li>
        <li class="no-padding">
          <Input v-model="newValue" label="New" variant="clear" :round="false" grow />
          <Button
            type="clear"
            :icon="CreateFolderIcon"
            @click="
              handleClick({
                type: 'FOLDER',
                absolutePath: '',
                relativePath: combinePaths(currentDirectory, newValue),
                lastModified: -1,
                name: newValue,
              })
            " />
          <Button
            type="clear"
            :icon="CreateFileIcon"
            @click="
              handleClick({
                type: 'FILE',
                absolutePath: '',
                relativePath: combinePaths(currentDirectory, makeOrgFile(newValue)),
                lastModified: -1,
                name: makeOrgFile(newValue),
              })
            " />
        </li>
      </ul>
    </Flex>
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
