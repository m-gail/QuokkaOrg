<script setup lang="ts">
import ChevronRightIcon from './icons/ChevronRightIcon.vue';

const { breadcrumbs } = defineProps<{ breadcrumbs: string[] }>()
</script>

<template>
  <div class="breadcrumbs">
    <div v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb" class="breadcrumb">
      <span>{{ breadcrumb }}</span>
      <i v-if="index != breadcrumbs.length - 1" class="separator"><ChevronRightIcon /></i>
    </div>
  </div>
</template>

<style lang="css" scoped>
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}
</style>
