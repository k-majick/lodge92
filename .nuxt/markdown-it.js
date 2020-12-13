import MarkdownIt from 'markdown-it'

const handlePlugin = (plugin) => plugin.default || plugin

export default ({ app }, inject) => {
  const md = new MarkdownIt('default', {"linkify":true,"breaks":true,"html":true})

  inject('md', md)
}
