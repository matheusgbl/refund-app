<template>
  <div id="app">
    <header class="app-header">
      <div class="header-content">
        <div class="language-selector">
          <Dropdown
            v-model="selectedLanguage"
            :options="languages"
            :optionLabel="optionLabel"
            optionValue="code"
            @change="changeLanguage"
            class="language-dropdown"
            dropdownIcon="pi pi-globe"
          />
        </div>

        <div class="logo-container">
          <a href="/" class="logo-link">
            <img src="/logo.webp" alt="Logo" class="logo-image" />
          </a>
        </div>
      </div>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import Dropdown from 'primevue/dropdown'

const { locale } = useI18n()

const selectedLanguage = ref('pt-br')
const isMobile = ref(false)
const languages = ref([
  { name: 'Português (BR)', code: 'pt-br' },
  { name: 'English (US)', code: 'en-us' },
  { name: 'Deutsch', code: 'de' },
])

const optionLabel = computed(() => (isMobile.value ? 'code' : 'name'))

const changeLanguage = () => {
  locale.value = selectedLanguage.value
  localStorage.setItem('language', selectedLanguage.value)
}

function handleResize() {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)

  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage) {
    selectedLanguage.value = savedLanguage
    locale.value = savedLanguage
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.app-header {
  background-color: white;
  border-bottom: 1px solid #e9ecef;
  max-height: 84px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 16px;
}

.language-selector {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.logo-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logo-image {
  width: 100px;
  height: auto;
}

.right-placeholder {
  flex: 1;
}

.language-dropdown {
  width: 150px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .header-content {
    padding: 8px;
  }

  .language-dropdown {
    width: 100px;
    font-size: 11px;
  }

  .logo-image {
    width: 80px;
  }
}

@media (max-width: 360px) {
  .language-dropdown {
    width: 90px;
    font-size: 11px;
  }
}
</style>
