<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed, type Component } from 'vue'

const { type = 'normal', icon } = defineProps<{ type?: 'normal' | 'clear'; icon?: Component }>()
const emit = defineEmits<{ click: [] }>()

const classes = computed(() => cls(['btn', { normal: undefined, clear: 'btn-ghost' }[type]]))
</script>

<template>
  <button :class="classes" @click="() => emit('click')">
    <component v-if="icon != null" :is="icon" class="size-[1.2em]"></component>
    <slot />
  </button>
</template>
