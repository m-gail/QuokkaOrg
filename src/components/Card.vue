<script setup lang="ts">
const { title, badge } = defineProps<{ title: string; badge?: string }>()
</script>

<template>
  <article>
    <div class="row">
      <h5 class="small">{{ title }}</h5>
      <button v-if="badge != null" class="chip primary">{{ badge }}</button>
    </div>
    <p><slot /></p>
  </article>
</template>
