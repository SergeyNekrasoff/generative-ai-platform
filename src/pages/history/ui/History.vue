<template>
  <div>History</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useToast } from '@/shared/ui/toast/model/useToast'

useHead({
  title: 'textailor.io | history'
})

const { toast } = useToast()

onMounted(() => {
  toast({ message: 'Unfortunately something went wrong', type: 'info' })
})
</script>
