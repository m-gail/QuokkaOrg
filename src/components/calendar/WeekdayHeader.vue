<script setup lang="ts">
import Flex from '../Flex.vue'

const { weekday } = defineProps<{ weekday: number }>()
const WEEKDAY_NAMES = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
</script>
<template>
  <Flex class="my-2 text-base-content/85">{{ WEEKDAY_NAMES[weekday] }}</Flex>
</template>
