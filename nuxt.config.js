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
  // purgeCSS: { whitelistPatterns: [/(^slick-)\w+/] },
  /*
   ** Plugins to load before mounting the App
   */
  // plugins: [{ src: '~/plugins/vue-slick-carousel', mode: 'client' }],
  /*
   ** Build configuration
   */
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['~/assets/scss/app.scss'],
  },
  build: {
    extractCSS: true,
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
  // extractCSS: true,
  buildModules: ['@nuxtjs/vuetify'],
  // vuetify: {
  //   optionsPath: './vuetify.options.js',
  //   treeShake: true,
  // },
};
