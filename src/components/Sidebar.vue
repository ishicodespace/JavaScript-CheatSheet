<script setup lang="ts">
import type { Page } from '../types'

interface Category {
  id: string
  title: string
  pages: Page[]
}

defineProps<{
  search: string
  filteredStructure: Category[]
  activePage: Page | null
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  'selectPage': [page: Page]
}>()
</script>

<template>
  <!-- Semantic navigation element for SEO -->
  <aside class="sidebar" role="navigation" aria-label="Main navigation">
    <div class="logo-area">
      <div class="logo-icon" aria-hidden="true">JS</div>
      <h1>Cheatsheet</h1>
    </div>
    
    <div class="search-container">
      <label for="search-input" class="sr-only">Search JavaScript topics</label>
      <input 
        id="search-input"
        type="search"
        :value="search"
        @input="emit('update:search', ($event.target as HTMLInputElement).value)"
        placeholder="Search..."
        autocomplete="off"
        aria-label="Search JavaScript topics"
      />
    </div>
    
    <nav id="sidebar-nav" aria-label="JavaScript topics">
      <div v-if="filteredStructure.length === 0" class="no-results" role="status">
        No results.
      </div>
      
      <section v-for="cat in filteredStructure" :key="cat.id" class="cat-group">
        <h2 class="cat-title">{{ cat.title }}</h2>
        
        <a 
          v-for="page in cat.pages" 
          :key="page.slug" 
          class="nav-item"
          :class="{ active: activePage && activePage.slug === page.slug }"
          :aria-current="activePage && activePage.slug === page.slug ? 'page' : undefined"
          @click="emit('selectPage', page)"
          role="button"
          tabindex="0"
          @keydown.enter="emit('selectPage', page)"
          @keydown.space.prevent="emit('selectPage', page)"
        >
          {{ page.title }}
        </a>
      </section>
    </nav>
  </aside>
</template>

<style scoped>
/* Screen reader only class for accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
