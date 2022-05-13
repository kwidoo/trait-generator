export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'trait-generator',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: ['~/plugins/vform.ts'],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-clipboard',
    '@nuxtjs/fontawesome',
    '@nuxtjs/toast',
    ['nuxt-highlightjs', { style: 'vs2015' }],
  ],

  toast: {
    position: 'top-right',
    duration: 1000,
  },

  fontawesome: {
    icons: {
      solid: true,
    },
  },

  modules: [],

  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.php$/,
        loader: 'raw-loader',
      })
    },
  },
  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
  },
}
