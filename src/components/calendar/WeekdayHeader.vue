<script setup lang="ts">
import Flex from '../Flex.vue'
import Text from '../Text.vue'

const { weekday } = defineProps<{ weekday: number }>()
const WEEKDAY_NAMES = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
</script>
<template>
  <Flex padding="2" center>
    <Text weight="bold">{{ WEEKDAY_NAMES[weekday] }}</Text>
  </Flex>
</template>
