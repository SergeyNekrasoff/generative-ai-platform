<template>
  <section class="pr-6">
    <h2 class="mb-8">Toasts</h2>

    <BaseButton class="mb-4" @click="openToastInfo"> Open Toast Info </BaseButton>

    <BaseButton class="mb-4" @click="openToastSuccess"> Open Toast Success </BaseButton>

    <BaseButton class="mb-4" @click="openToastError"> Open Toast Error </BaseButton>
  </section>
</template>

<script setup lang="ts">
import { BaseButton } from '@/shared/ui/buttons'
import { useToast } from '@/shared/ui/toast/model/useToast'

const { toast } = useToast()

const openToastInfo = () => {
  toast({ message: 'Unfortunately something went wrong', type: 'info' })
}

const openToastSuccess = () => {
  toast({ message: 'Unfortunately something went wrong', type: 'success' })
}

const openToastError = () => {
  toast({ message: 'Unfortunately something went wrong', type: 'error' })
}
</script>
