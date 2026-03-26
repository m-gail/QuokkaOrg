<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const { title, badge, badgeColor } = defineProps<{
  title: string
  badge?: string
  badgeColor: 'primary' | 'secondary' | 'tertiary'
}>()

const classes = computed(() =>
  cls(['medium-text bold', `${badgeColor}-text`]),
)
</script>

<template>
  <article class="border">
    <div class="row">
      <h5 class="small max bold">{{ title }}</h5>
      <p v-if="badge != null" :class="classes">{{ badge }}</p>
    </div>
    <p><slot /></p>
  </article>
</template>
