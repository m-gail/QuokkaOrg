<script setup lang="ts">
import { cls } from '@/app/common/classes'
import { computed, inject, ref, watch } from 'vue'
import { formSubmitted } from './inject'

const {
  label,
  type = 'text',
  variant = 'border',
  round = true,
  grow = false,
  errorText,
} = defineProps<{
  label: string
  type?: 'text' | 'time' | 'date'
  variant?: 'border' | 'clear'
  round?: boolean
  grow?: boolean
  errorText?: string
}>()
const model = defineModel<string>()
const dirty = ref(false)
const submitted = inject(formSubmitted)

const showError = computed(() => errorText !== undefined && (dirty.value || submitted?.value))

const classes = computed(() =>
  cls([
    'field label',
    showError.value && 'invalid',
    variant === 'border' && 'border',
    round && 'round',
    grow && 'grow',
  ]),
)

watch(model, (newValue) => {
  if ((newValue?.length ?? 0) > 0) {
    dirty.value = true
  }
})
</script>
<template>
  <div :class="classes">
    <input ref="input" :type="type" v-model="model" placeholder=" " />
    <label>{{ label }}</label>
    <output v-if="showError" class="invalid">{{ errorText }}</output>
  </div>
</template>
