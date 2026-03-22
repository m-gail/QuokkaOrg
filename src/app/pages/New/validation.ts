import { computed, type Ref } from 'vue'

export function notEmpty(ref: Ref<string>): Ref<string | undefined> {
  return computed(() => notEmptyValidator(ref.value))
}

function notEmptyValidator(value: string): string | undefined {
  if (value === '') {
    return 'Required'
  }
  return undefined
}
