import { createApp } from 'vue'
import { router, store } from './providers'
import App from './App.vue'

export const app = createApp(App).use(router).use(store)
