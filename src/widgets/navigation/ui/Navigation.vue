<template>
  <section class="navigation light:bg-gray_dark_1">
    <div class="flex items-start justify-between w-full">
      <ul class="navigation__list">
        <li
          class="flex items-center justify-start mt-8 w-full hover:bg-divider_dark_2 py-2 px-4 rounded-md"
        >
          <HomeIcon class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/" class="text-lg font-bold pt-1 w-full">Home</router-link>
        </li>
        <li class="mb-16">
          <hr class="text-divider_dark_2" />
        </li>
        <li class="text-xs py-2 text-text_light_4">Workspace</li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <DocumentTextIcon class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/projects" class="text-lg font-bold pt-1 w-full">Projects</router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <RectangleStackIcon class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/templates" class="text-lg font-bold pt-1 w-full">Templates</router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <DocumentMagnifyingGlassIcon class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/history" class="text-lg font-bold pt-1 w-full">History</router-link>
        </li>
      </ul>
    </div>
    <div class="flex items-start justify-between w-full">
      <ul class="navigation__list">
        <li class="text-xs py-2 text-text_light_4">Settings</li>
        <li class="flex items-center justify-start w-full py-2 px-2 rounded-md">
          <BookOpenIcon class="h-5 w-5 mr-2 text-text_dark_2" />
          242 words used
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <Cog8ToothIcon class="h-5 w-5 mr-2 text-text_dark_2" />
          <router-link to="/settings" class="pt-1 w-full">Settings</router-link>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md mb-10"
        >
          <PlusIcon class="h-5 w-5 mr-2 text-text_dark_2" />
          <button type="button" class="pt-1" @click="openModal">Invite members</button>
        </li>
        <li
          class="flex items-center justify-start w-full hover:bg-divider_dark_2 py-2 px-2 rounded-md"
        >
          <span class="flex items-center justify-center h-8 w-10 rounded-full bg-purple mr-3">
            J
          </span>
          <router-link to="/account" class="pt-1 w-full">Judixel89</router-link>
          <ChevronRightIcon class="h-5 w-5" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { HomeIcon } from '@heroicons/vue/24/solid'
import { DocumentTextIcon } from '@heroicons/vue/24/solid'
import { RectangleStackIcon } from '@heroicons/vue/24/solid'
import { BookOpenIcon } from '@heroicons/vue/24/solid'
import { Cog8ToothIcon } from '@heroicons/vue/24/solid'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { DocumentMagnifyingGlassIcon } from '@heroicons/vue/24/solid'

import { useModal } from '@/shared/lib/use/modal/useModal'

const InviteModal = defineAsyncComponent(() => import('@/shared/ui/modal/invite/InviteModal.vue'))

const modal = useModal()

const openModal = async () => {
  modal.show({ component: InviteModal })
}
</script>

<style lang="scss">
@import 'styles';
</style>
