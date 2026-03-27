<script setup lang="ts">
import MoreHorizIcon from './icons/MoreHorizIcon.vue'

const { breadcrumbs, showIntermediate = true } = defineProps<{
  breadcrumbs: string[]
  showIntermediate?: boolean
}>()
</script>

<template>
  <div class="breadcrumbs">
    <div
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="breadcrumb"
      :class="[
        'breadcrumb',
        index != 0 && index != breadcrumbs.length - 1 && !showIntermediate && 'hidden',
      ]">
      <span>{{ breadcrumb }}</span>
      <i v-if="index != breadcrumbs.length - 1" class="separator tiny"><MoreHorizIcon /></i>
    </div>
  </div>
</template>

<style lang="css" scoped>
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  align-items: center;
  opacity: 0.8;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.separator {
  margin: 0 0.25rem;
  opacity: 0.5;
}

.hidden {
  display: none;
}
</style>
