import type { InjectionKey, Ref } from 'vue'

export const formSubmitted = Symbol() as InjectionKey<Ref<boolean>>
