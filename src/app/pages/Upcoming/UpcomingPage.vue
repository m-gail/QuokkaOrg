<script setup lang="ts">
import AgendaView from '@/app/common/components/AgendaView.vue'
import { formatDate, getDateRange, now } from '@/app/common/date'
import { useAgendaStore } from '@/app/store/agenda'
import { useSettingsStore } from '@/app/store/settings'
import Button from '@/components/Button.vue'
import CenterStack from '@/components/CenterStack.vue'
import Flex from '@/components/Flex.vue'
import FloatingActionButton from '@/components/FloatingActionButton.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import AlarmOnIcon from '@/components/icons/AlarmOnIcon.vue'
import AllInboxIcon from '@/components/icons/AllInboxIcon.vue'
import AssignmentLateIcon from '@/components/icons/AssignmentLateIcon.vue'
import FilterIcon from '@/components/icons/FilterIcon.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import MenuButton from '@/components/MenuButton.vue'
import MenuItem from '@/components/MenuItem.vue'
import PageContent from '@/components/PageContent.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageTitle from '@/components/PageTitle.vue'
import Text from '@/components/Text.vue'
import { rangeFilter } from '@/org/filter/generic'
import type { Urgency } from '@/org/types'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const settings = useSettingsStore()
const agendaStore = useAgendaStore()

const startDate = ref<Date>(now())
const endDate = ref<Date>(now())
const filter = ref<Urgency | undefined>(undefined)
const agenda = computed(() =>
  agendaStore.getAgenda({
    dayFilter: rangeFilter(startDate.value, endDate.value),
    eventFilter: filter.value === undefined ? undefined : (event) => event.urgency === filter.value,
  }),
)
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
    <MenuButton>
      <template #button>
        <Button type="clear" :icon="FilterIcon" />
      </template>
      <template #menu>
        <MenuItem :active="filter === undefined" :icon="AllInboxIcon" @click="filter = undefined">
          All
        </MenuItem>
        <MenuItem
          :active="filter === 'DEADLINE'"
          :icon="AssignmentLateIcon"
          @click="filter = 'DEADLINE'">
          Deadline
        </MenuItem>
        <MenuItem
          :active="filter === 'SCHEDULED'"
          :icon="AlarmOnIcon"
          @click="filter = 'SCHEDULED'">
          Scheduled
        </MenuItem>
      </template>
    </MenuButton>
  </PageHeader>
  <PageContent>
    <FloatingActionButton :icon="AddIcon" @click="router.push('/new')" />
    <CenterStack v-if="settings.directoryPath === ''">You need to choose a directory</CenterStack>
    <CenterStack v-else-if="agenda === undefined">
      <LoadingSpinner />
    </CenterStack>
    <Flex v-else col padding="4" :center="!hasEntries" :fill-parent="!hasEntries">
      <AgendaView :agenda="agenda" v-if="hasEntries" :today="startDate" />
      <Text v-else>No upcoming events</Text>
    </Flex>
  </PageContent>
</template>
