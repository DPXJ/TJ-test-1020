import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

/**
 * 创建Markdown解析器实例
 */
export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch (error) {
        console.error('Highlight error:', error)
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})

/**
 * 渲染Markdown为HTML
 */
export function renderMarkdown(content: string): string {
  try {
    return md.render(content)
  } catch (error) {
    console.error('Markdown render error:', error)
    return content
  }
}

/**
 * 渲染行内Markdown
 */
export function renderMarkdownInline(content: string): string {
  try {
    return md.renderInline(content)
  } catch (error) {
    console.error('Markdown inline render error:', error)
    return content
  }
}

