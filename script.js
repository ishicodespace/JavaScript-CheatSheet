if (typeof Vue === 'undefined') {
    document.body.innerHTML = '<div style="color:white; padding:20px;">Error: Vue.js failed to load. Please check your internet connection.</div>';
    throw new Error('Vue is undefined');
}

const { createApp, ref, computed, onMounted } = Vue;

const app = createApp({
    setup() {
        const searchQuery = ref('');
        const activePage = ref(null);
        
        // Data from window
        const rawData = window.cheatsheetData || {};
        
        // Convert Object structure to Array for easier filtering
        // [{ id: 'basic', title: 'Basic JS', pages: [...] }, ...]
        const categories = computed(() => {
            return Object.keys(rawData).map(key => ({
                id: key,
                ...rawData[key]
            }));
        });

        // Filter Categories & Pages based on search
        const filteredStructure = computed(() => {
            const query = searchQuery.value.toLowerCase().trim();
            if (!query) return categories.value;

            // Deep filter
            return categories.value.map(cat => {
                const matchingPages = cat.pages.filter(page => {
                    const inTitle = page.title.toLowerCase().includes(query);
                    const inContent = page.content.toLowerCase().includes(query);
                    return inTitle || inContent;
                });

                if (matchingPages.length > 0) {
                    return { ...cat, pages: matchingPages };
                }
                return null;
            }).filter(cat => cat !== null);
        });

        // Select a Page
        const selectPage = (page) => {
            activePage.value = page;
            setTimeout(() => {
                const main = document.querySelector('.main-content');
                if(main) main.scrollTop = 0;
            }, 0);
        };

        // Parse content string into blocks
        // Format: "Title\n---------\nContent"
        const parseContent = (contentString) => {
            if (!contentString) return [];
            
            const lines = contentString.split('\n');
            const blocks = [];
            let currentBlock = { title: '', content: [] };
            let isFirstBlock = true;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const nextLine = lines[i + 1];

                // Detect Header (Current line followed by dashes)
                if (nextLine && nextLine.trim().startsWith('---')) {
                    // Save previous block if it has content
                    if (currentBlock.content.length > 0 || currentBlock.title) {
                        currentBlock.body = currentBlock.content.join('\n').trim();
                        blocks.push({ ...currentBlock });
                    }
                    
                    // Start new block
                    currentBlock = { title: line.trim(), content: [] };
                    isFirstBlock = false;
                    i++; // Skip the dashes line
                } else {
                    // Check if it's strictly content
                    // If we haven't hit a header yet and it's not empty, it's intro text
                    if (isFirstBlock && currentBlock.title === '' && !line.trim().startsWith('---')) {
                         currentBlock.content.push(line);
                    } else {
                         currentBlock.content.push(line);
                    }
                }
            }

            // Push final block
            if (currentBlock.content.length > 0 || currentBlock.title) {
                currentBlock.body = currentBlock.content.join('\n').trim();
                blocks.push({ ...currentBlock });
            }

            return blocks;
        };

        const currentBlocks = computed(() => {
            if (!activePage.value) return [];
            return parseContent(activePage.value.content);
        });

        // Initialize
        onMounted(() => {
            const cats = categories.value;
            if (cats.length > 0 && cats[0].pages.length > 0) {
                selectPage(cats[0].pages[0]);
            }
        });

        // Syntax Highlighter
        const highlight = (code) => {
            if (!code) return '';
            
            let html = code
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
                
            // Strings
            html = html.replace(/(".*?"|'.*?'|`[\s\S]*?`)/g, '<span class="syntax-string">$1</span>');
            
            // Comments
            html = html.replace(/(\/\/.*)/g, '<span class="syntax-comment">$1</span>');
            
            // Keywords
            const keywords = /\b(const|let|var|if|else|for|while|do|switch|case|break|continue|function|return|classes|extends|new|this|super|import|export|default|true|false|null|undefined|try|catch|finally|throw|async|await|static|typeof|instanceof|void|delete|typeof)\b/g;
            html = html.replace(keywords, '<span class="syntax-keyword">$1</span>');

            // APIs / Objects
            html = html.replace(/\b(console|window|document|fetch|localStorage|JSON|Math|Array|Object|String|Number|Boolean|Date)\b/g, '<span class="syntax-built-in">$1</span>');

            // Numbers
            html = html.replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>');

            return html;
        };

        return {
            searchQuery,
            filteredStructure,
            activePage,
            selectPage,
            currentBlocks,
            highlight
        };
    }
});

app.mount('#app');
