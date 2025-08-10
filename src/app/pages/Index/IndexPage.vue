<script setup lang="ts">
import { useSettingsStore } from '@/app/store/settings'
import { useRouter } from 'vue-router'

const router = useRouter()
const settings = useSettingsStore()

if (settings.directoryPath === '') {
  router.push('/settings')
} else {
  router.push('/upcoming')
}
</script>
