<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed } from 'vue'

const { title, badge, badgeColor } = defineProps<{
  title: string
  badge?: string
  badgeColor: 'primary' | 'secondary' | 'tertiary'
}>()

const classes = computed(() =>
  cls([badgeColor, 'chip']),
)
</script>

<template>
  <article>
    <div class="row">
      <h5 class="small max">{{ title }}</h5>
      <button v-if="badge != null" :class="classes">{{ badge }}</button>
    </div>
    <p><slot /></p>
  </article>
</template>
