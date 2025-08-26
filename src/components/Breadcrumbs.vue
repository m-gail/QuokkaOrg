<script setup lang="ts">
const { breadcrumbs } = defineProps<{ breadcrumbs: string[] }>()
</script>

<template>
  <div class="breadcrumbs text-xs">
    <ul>
      <li v-for="breadcrumb in breadcrumbs" :key="breadcrumb">
        {{ breadcrumb }}
      </li>
    </ul>
  </div>
</template>
