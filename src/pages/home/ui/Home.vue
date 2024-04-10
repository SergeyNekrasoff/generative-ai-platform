<template>
  <div class="mx-auto w-[90%] flex flex-col justify-center px-6 py-8 duration-500">
    <div class="flex w-full flex-1 flex-col max-w-screen-xl mx-auto">
      <!-- Carousel -->
      <div class="mt-8 mb-16">
        <BaseCarousel :items="items" class="bg-black_mute rounded-md h-48" />
      </div>

      <!-- General -->
      <div class="mt-8 mb-16">
        <div class="text-2xl mb-4">Get started with general features</div>
        <div class="flex items-start justify-start w-full gap-4">
          <div v-for="feature in features" :key="feature.id" class="w-[33%] h-64">
            <router-link
              to="/"
              class="flex flex-col items-start justify-end border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4 hover:bg-gray_dark_4 hover:shadow-md hover:shadow-gray_dark_1 transition ease-in-out delay-20"
            >
              <div class="h-[40%] mb-2">
                <div class="text-xl pb-1">{{ feature.title }}</div>
                <div class="text-sm text-gray_light_1">{{ feature.description }}</div>
              </div>
              <button type="button">{{ feature.ctaText }}</button>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Popular Templates -->
      <div class="mt-8 mb-16">
        <div class="flex items-center justify-between">
          <div class="text-2xl mb-4">Get started with Templates</div>
          <button
            type="button"
            class="text-sm flex items-center justify-between border-2 border-rose-500 rounded-md p-2"
          >
            <RectangleStackIcon class="h-4 w-4 mr-2 text-text_dark_2" />
            Browse Template Library
          </button>
        </div>
        <div class="flex items-start justify-start w-full gap-4">
          <div v-for="template in templates" :key="template.id" class="w-[20%] h-48">
            <router-link
              to="/"
              class="flex flex-col items-start justify-end border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4 hover:bg-gray_dark_4 hover:shadow-md hover:shadow-gray_dark_1 transition ease-in-out delay-20"
            >
              <div class="h-[70%] mb-2">
                <div class="text-xl pb-3">{{ template.category }}</div>
                <div class="text-sm pb-0.5">{{ template.name }}</div>
                <div class="text-gray_light_1 text-sm">{{ template.description }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Projects -->
      <div class="mt-8 mb-16">
        <div class="flex items-center justify-between">
          <div class="text-2xl mb-4">Projects</div>
        </div>
        <div class="grid grid-cols-4 gap-4 w-full">
          <div v-for="project in projects" :key="project.id" class="h-36">
            <router-link
              to="/"
              class="flex flex-col items-start justify-between border bg-divider_light_2 border-black_mute rounded-lg h-full w-full p-4 hover:bg-gray_dark_4 transition ease-in-out delay-20"
            >
              <div class="flex flex-col items-start justify-between h-full">
                <div class="text-lg">{{ project.name }}</div>
                <div class="text-sm text-gray_light_1">{{ project.content }}</div>
                <div class="text-gray_light_1 text-xs">{{ project.date }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { BaseCarousel } from '@/shared/ui/carousel'
import { RectangleStackIcon } from '@heroicons/vue/24/solid'

const items = [
  {
    id: 1,
    title: 'Something Title',
    description: 'Something Description',
    path: '/'
  },
  {
    id: 2,
    title: 'Something Title 2',
    description: 'Something Description 2',
    path: '/'
  },
  {
    id: 3,
    title: 'Something Title 3',
    description: 'Something Description 3',
    path: '/'
  }
]

const features = [
  {
    id: 1,
    title: 'Explore Templates',
    description: 'Explore our most popular and highly-rated templates.',
    ctaText: 'Try this'
  },
  {
    id: 2,
    title: 'Discover Chat',
    description:
      'Chat serves as an AI assistant helping with everyday tasks like writing, brainstorming, researching, and more.',
    ctaText: 'New chat'
  },
  {
    id: 3,
    title: 'Use Editor',
    description: 'Create benefit-focused texts for your purposes.',
    ctaText: 'Let`s type'
  }
]

const templates = [
  {
    id: 1,
    img: '/',
    category: 'Email',
    name: 'Newsletter',
    description:
      'Engage readers with a newsletter featuring curated content, highlights, and updates.'
  },
  {
    id: 2,
    img: '/',
    category: 'Social',
    name: 'Instagram Caption',
    description: 'Generate catchy captions for your Instagram posts.'
  },
  {
    id: 3,
    img: '/',
    category: 'Ads',
    name: 'Google Search Ad',
    description: 'Make your Google Ads stand out with engaging headlines.'
  },
  {
    id: 4,
    img: '/',
    category: 'Website',
    name: 'Landing Page Headline',
    description: 'Generate the perfect headline for your landing page.'
  },
  {
    id: 5,
    img: '/',
    category: 'Blog',
    name: 'Blog Ideas',
    description: 'Keep your blogs posts fresh and different every time.'
  }
]

const projects = [
  {
    id: 1,
    name: '2024-04-10 Untitled (2)',
    content: 'Charge Any Device Fast ​ Description:AnchorCable ...',
    date: 'Created 2 days ago'
  },
  {
    id: 2,
    name: '2024-04-10 Untitled',
    content: 'Create benefit-focused texts for your purposes. ...',
    date: 'Created 13 hours ago'
  },
  {
    id: 3,
    name: '2024-03-18 Untitled',
    content: 'As an informed consumer, you are looking for a lu...',
    date: 'Created 3 weeks ago'
  },
  {
    id: 4,
    name: 'Journey to Dubai',
    content: '',
    date: 'Created 2 days ago'
  }
]

useHead({
  title: 'Home | Welcome!'
})
</script>
