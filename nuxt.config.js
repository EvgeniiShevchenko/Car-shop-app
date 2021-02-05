module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'carsell',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/filters.js', '~/plugins/services', '~/plugins/youtube.js', { src: '~/plugins/vueSocialAuth.js', mode: 'client' }, '~/plugins/vue-mask.js'],
  /*
   ** Build configuration
   */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ru',
            file: 'ru.json',
          },
          {
            code: 'ua',
            file: 'ua.json',
          },
        ],
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'ru',
      },
    ],
  ],
  axios: {
    baseURL: process.env.API_URL, // Used as fallback if no runtime config is provided
  },
  styleResources: {
    scss: ['~/assets/scss/app.scss'],
  },
  vuetify: {
    customVariables: ['~/assets/scss/base/vuetify-variables.scss'],
    treeShake: true,
  },
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      // if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/,
      //   });
      // }
    },
  },
  buildModules: ['@nuxtjs/vuetify', '@nuxt/typescript-build'],
};
