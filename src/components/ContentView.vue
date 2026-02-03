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
  
  // Apply syntax highlighting BEFORE escaping
  // Strings (must come before keywords to avoid conflicts)
  html = html.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '___STRING_START___$1___STRING_END___')
  
  // Comments
  html = html.replace(/(\/\/.*$)/gm, '___COMMENT_START___$1___COMMENT_END___')
  
  // Keywords
  const keywords = /\b(const|let|var|if|else|for|while|do|switch|case|break|continue|function|return|class|extends|new|this|super|import|export|default|true|false|null|undefined|try|catch|finally|throw|async|await|static|typeof|instanceof|void|delete)\b/g
  html = html.replace(keywords, '___KEYWORD_START___$1___KEYWORD_END___')

  // APIs / Objects
  html = html.replace(/\b(console|window|document|fetch|localStorage|JSON|Math|Array|Object|String|Number|Boolean|Date)\b/g, '___BUILTIN_START___$1___BUILTIN_END___')

  // Numbers
  html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, '___NUMBER_START___$1___NUMBER_END___')
  
  // NOW escape HTML entities
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  
  // Replace placeholders with actual HTML tags
  html = html
    .replace(/___STRING_START___/g, '<span class="syntax-string">')
    .replace(/___STRING_END___/g, '</span>')
    .replace(/___COMMENT_START___/g, '<span class="syntax-comment">')
    .replace(/___COMMENT_END___/g, '</span>')
    .replace(/___KEYWORD_START___/g, '<span class="syntax-keyword">')
    .replace(/___KEYWORD_END___/g, '</span>')
    .replace(/___BUILTIN_START___/g, '<span class="syntax-built-in">')
    .replace(/___BUILTIN_END___/g, '</span>')
    .replace(/___NUMBER_START___/g, '<span class="syntax-number">')
    .replace(/___NUMBER_END___/g, '</span>')

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
            <pre class="code-snippet" v-html="highlight(block.body)"></pre>
          </div>
        </section>
      </article>
    </template>
    <template v-else>
      <div class="empty-state" role="status">Select a topic.</div>
    </template>
  </main>
</template>
