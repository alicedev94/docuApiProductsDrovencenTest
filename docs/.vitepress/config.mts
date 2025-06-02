import { defineConfig } from 'vitepress'

export default defineConfig({
  title: " ",
  description: "API de productos de Drovencentro",
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía Rápida', link: '/api-guide' }
    ],

    outline: {
      level: 'deep',
      label: 'En esta sección'
    },

    logo: {
      src: '/logo.jpeg',
      alt: 'Drovencentro Logo'
    },

    siteTitle: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
