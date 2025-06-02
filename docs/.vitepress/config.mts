import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "DROVECENTRO API",
  description: "API de productos de Drovencentro",
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía Rápida', link: '/api-guide' }
    ],

    outline: {
      level: 'deep',
      label: 'En esta sección'
    }


  }
})
