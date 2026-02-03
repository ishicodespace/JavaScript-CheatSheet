<script setup lang="ts">
import type { Page, ParsedBlock } from '../types'

defineProps<{
  activePage: Page | null
  currentBlocks: ParsedBlock[]
}>()

// Syntax highlighter
const highlight = (code: string): string => {
  if (!code) return ''
  
  let html = code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
      
  // Strings
  html = html.replace(/(".*?"|'.*?'|`[\s\S]*?`)/g, '<span class="syntax-string">$1</span>')
  
  // Comments
  html = html.replace(/(\/\/.*)/g, '<span class="syntax-comment">$1</span>')
  
  // Keywords
  const keywords = /\b(const|let|var|if|else|for|while|do|switch|case|break|continue|function|return|class|extends|new|this|super|import|export|default|true|false|null|undefined|try|catch|finally|throw|async|await|static|typeof|instanceof|void|delete)\b/g
  html = html.replace(keywords, '<span class="syntax-keyword">$1</span>')

  // APIs / Objects
  html = html.replace(/\b(console|window|document|fetch|localStorage|JSON|Math|Array|Object|String|Number|Boolean|Date)\b/g, '<span class="syntax-built-in">$1</span>')

  // Numbers
  html = html.replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>')

  return html
}
</script>

<template>
  <!-- Semantic main content area -->
  <main class="main-content" role="main" aria-label="JavaScript reference content">
    <template v-if="activePage">
      <header class="content-header">
        <h1>{{ activePage.title }}</h1>
        <div v-if="activePage.reference" class="concept-ref">
          <a 
            :href="activePage.reference" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View MDN documentation for this topic"
          >
            MDN Reference &rarr;
          </a>
        </div>
      </header>
      
      <article class="content-body">
        <section 
          v-for="(block, idx) in currentBlocks" 
          :key="idx" 
          class="concept-block"
          :aria-labelledby="block.title ? `heading-${idx}` : undefined"
        >
          <div v-if="block.title" class="concept-header">
            <h2 :id="`heading-${idx}`" class="concept-title">{{ block.title }}</h2>
          </div>
          <div class="concept-content">
            <pre 
              class="code-snippet" 
              v-html="highlight(block.body)"
              role="region"
              aria-label="Code example"
            ></pre>
          </div>
        </section>
      </article>
    </template>
    <template v-else>
      <div class="empty-state" role="status">Select a topic.</div>
    </template>
  </main>
</template>
