<script setup lang="ts">
const { breadcrumbs } = defineProps<{ breadcrumbs: string[] }>()
</script>

<template>
  <div class="row breadcrumbs">
    <span v-for="breadcrumb in breadcrumbs" :key="breadcrumb">
      {{ breadcrumb }}
    </span>
  </div>
</template>

<style lang="css" scoped>
.breadcrumbs {
  overflow: auto;
}
</style>
