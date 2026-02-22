<script setup lang="ts">
import AgendaView from '@/app/common/components/AgendaView.vue'
import { formatDate, getDateRange, now } from '@/app/common/date'
import { useAgendaStore } from '@/app/store/agenda'
import { useSettingsStore } from '@/app/store/settings'
import CenterStack from '@/components/CenterStack.vue'
import Flex from '@/components/Flex.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import PageContent from '@/components/PageContent.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import Text from '@/components/Text.vue'
import { rangeFilter } from '@/org/filter/generic'
import { computed, onMounted, ref } from 'vue'

const settings = useSettingsStore()
const agendaStore = useAgendaStore()

const startDate = ref<Date>(now())
const endDate = ref<Date>(now())
const agenda = computed(() => agendaStore.getAgenda(rangeFilter(startDate.value, endDate.value)))
const hasEntries = computed(() => agenda.value.days.length > 0)

onMounted(async () => {
  ;[startDate.value, endDate.value] = getDateRange(now(), 21)
  agendaStore.tryTriggerUpdate(settings.directoryPath, settings.ignoredFolders)
})
</script>

<template>
  <PageHeader>
    <PageTitle>{{ formatDate(startDate) }} - {{ formatDate(endDate) }}</PageTitle>
    <LoadingSpinner v-if="agendaStore.updating" />
  </PageHeader>
  <PageContent>
    <CenterStack v-if="settings.directoryPath === ''">You need to choose a directory</CenterStack>
    <CenterStack v-else-if="agenda === undefined">
      <LoadingSpinner />
    </CenterStack>
    <Flex v-else col gap="4" padding="4" :center="!hasEntries" :fill-parent="!hasEntries">
      <AgendaView :agenda="agenda" v-if="hasEntries" :today="startDate" />
      <Text v-else>No upcoming events</Text>
    </Flex>
  </PageContent>
</template>
