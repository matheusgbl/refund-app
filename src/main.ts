import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { createI18n } from 'vue-i18n'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

// Import translations
import ptBR from './locales/pt-br.json'
import enUS from './locales/en-us.json'
import de from './locales/de.json'

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'pt-br',
  fallbackLocale: 'en-us',
  messages: {
    'pt-br': ptBR,
    'en-us': enUS,
    de: de,
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
})
app.use(i18n)

app.mount('#app')
