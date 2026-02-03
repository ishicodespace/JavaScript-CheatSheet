export interface Page {
    slug: string
    title: string
    reference?: string
    content: string
}

export interface Category {
    title: string
    pages: Page[]
}

export interface CheatsheetData {
    [key: string]: Category
}

export interface ParsedBlock {
    title: string
    body: string
}
