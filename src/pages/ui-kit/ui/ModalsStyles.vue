<template>
  <section class="pr-6">
    <h2 class="mb-8">Modals</h2>

    <BaseButton class="mb-4" @click="showModal"> Open Modal </BaseButton>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { BaseButton } from '@/shared/ui/buttons'
import { useModal } from '@/shared/ui/modal/model/useModal'

const DefaultModal = defineAsyncComponent(
  () => import('@/shared/ui/modal/default/DefaultModal.vue')
)

const modal = useModal()

const showModal = async () => {
  modal.show({ component: DefaultModal })
}

const openToastSuccess = () => {}
</script>
