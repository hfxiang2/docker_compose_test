require('dotenv').config()
const path = require('path')
const {getRouterBase} = require('./src/utils')
const {env} = process

;['PUBLIC_PATH', 'API_SERVER', 'NO_LOGIN', 'COOKIE_PATH'].forEach(key =>
  // eslint-disable-next-line no-console
  console.log('%s\t: %s', key, env[key]),
)

const isProd = env.MODE == 'prod'

// 不能以斜杠结尾
let apiServer = env.API_SERVER
// 必须以斜杠结尾
let publicPath = env.PUBLIC_PATH

const config = {
  aliIconFont: '',
  env: {
    dev: {
      '/mock/51': apiServer,
      '/mock/39': apiServer,
    },
  },
}

let axios = {
  proxy: true,
}

// 如果生产指定apiServer, 则使用绝对路径请求api
if (isProd && apiServer) {
  axios = {
    proxy: false,
    baseURL: apiServer,
  }
}

module.exports = {
  srcDir: 'src/',

  mode: 'spa',

  env: {
    NO_LOGIN: env.NO_LOGIN,
    COOKIE_PATH: env.COOKIE_PATH || '/',
    APP_ID: env.APP_ID,
  },

  proxy: config.env[env.MODE],

  router: {
    middleware: ['meta', 'auth'],
    mode: 'hash',
  },

  /*
   ** Build configuration
   */
  build: {
    publicPath,
    extractCSS: isProd,
    babel: {
      presets: [
        [
          '@babel/env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
      ],
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
      ],
    },
    extend(config, {isDev}) {
      /**
       * 有些依赖如 excel-it 组件依赖 XLSX 脚本，体积较大。
       * 这里将该依赖放在script处用引入，可利用cdn加速，并减少项目最终打包体积
       * FYI: 如果不需要 excel-it 组件，记得在移除组件后也要移除在 script 引用的 XLSX 脚本
       */
      // config.externals = {
      //   xlsx: 'XLSX'
      // }
      if (isDev) {
        config.devtool = 'source-map'
      }

      config.module.rules.find(item =>
        item.test.test('.svg'),
      ).test = /\.(png|jpe?g|gif|webp)$/i

      // svg-icon support
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.join(__dirname, 'src', 'assets', 'svg')],
        options: {
          symbolId: 'icon-[name]',
        },
      })
    },
  },

  /*
   ** Headers of the page
   */
  head: {
    title: '',
    htmlAttrs: {
      lang: 'zh-CN',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {'http-equiv': 'x-ua-compatible', content: 'IE=edge, chrome=1'},
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          'https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/favicon32x32.png',
      },
      // {
      //   rel: 'stylesheet',
      //   type: 'text/css',
      //   href: config.aliIconFont
      // },
      {
        rel: 'preconnect',
        href: 'https://cdn.jsdelivr.net',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: `https://cdn.jsdelivr.net/npm/@femessage/element-ui@${
          require('@femessage/element-ui/package').version
        }/lib/theme-chalk/index.min.css`,
      },
    ],
  },

  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#5D81F9',
  },

  /**
   * Share variables, mixins, functions across all style files (no @import needed)
   * @Link https://github.com/nuxt-community/style-resources-module/
   */
  styleResources: {
    less: '~assets/var.less',
  },

  css: [
    {
      src: '~assets/normalize.less',
      lang: 'less',
    },
    {
      src: '~assets/global.less',
      lang: 'less',
    },
  ],

  plugins: [
    {src: '~plugins/axios'},
    {src: '~plugins/filters'},
    {src: '~plugins/api'},
    {src: '~plugins/element'},
    {src: '~plugins/icon-font'},
    {src: '~plugins/svg-icon'},
  ],

  // FYI: https://analytics.google.com/analytics/web/
  // buildModules: [
  //   [
  //     '@nuxtjs/google-analytics',
  //     {
  //       id: ''
  //     }
  //   ]
  // ],

  modules: [
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', {path: './'}],
    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
  ],

  axios,

  workbox: {
    routerBase: getRouterBase(publicPath),
    runtimeCaching: [
      {
        urlPattern: 'https://easy-mock.com/*',
        handler: 'staleWhileRevalidate',
      },
    ],
  },
}
