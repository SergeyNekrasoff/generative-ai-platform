import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import PrimeVue from 'primevue/config'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import App from './App.vue'
// import { THEME } from '@/shared/config'

import { router } from './providers'

export const app = createApp(App).use(createPinia()).use(createHead()).use(PrimeVue).use(router)
