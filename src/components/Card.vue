<script setup lang="ts">
import Flex from './Flex.vue';

const { title, badge } = defineProps<{ title: string, badge?: string }>()
</script>

<template>
  <div class="card card-border card-sm bg-base-200 border-base-300 rounded-box w-full border">
    <div class="card-body">
      <Flex>
        <div class="card-title font-bold text-accent grow">{{ title }}</div>
        <div v-if="badge != null" class="badge badge-soft badge-info">{{ badge }}</div>
      </Flex>
      <slot />
    </div>
  </div>
</template>
