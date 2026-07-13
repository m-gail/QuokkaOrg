import { computed, type Ref } from 'vue'

export function notEmpty(ref: Ref<string>): Ref<string | undefined> {
  return computed(() => notEmptyValidator(ref.value))
}

export function notEmptyIfEndTimePresent(startTime: Ref<string>, endTime: Ref<string>): Ref<string | undefined> {
  return computed(() => endTime.value !== '' ? notEmptyValidator(startTime.value) : undefined)
}

function notEmptyValidator(value: string): string | undefined {
  if (value === '') {
    return 'Required'
  }
  return undefined
}
