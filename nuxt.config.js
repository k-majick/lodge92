const apiUrl = process.env.API_URL || "http://localhost:1337";

export default {
  target: "server",
  head: {
    title: process.env.APP_TITLE,
    meta: [{
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "msapplication-TileColor",
        content: "#ffffff",
      },
      {
        name: "theme-color",
        content: "#ffffff",
      }
    ],
    link: [{
        rel: "icon",
        sizes: "16x16",
        type: "image/png",
        href: "/favicon-16x16-min.png",
      },
      {
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
        href: "/favicon-32x32-min.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon-min.png",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito:wght@200;400&display=swap",
      }
    ]
  },
  publicRuntimeConfig: {
    appTitle: process.env.APP_TITLE,
    appUrl: process.env.BASE_URL || "http://localhost:8888",
    apiUrl: process.env.API_URL || "http://localhost:1337",
  },
  router: {
    linkActiveClass: "active",
    linkExactActiveClass: "active",
  },
  styleResources: {
    scss: [
      "@/assets/scss/_variables.scss",
      "@/assets/scss/_mixins.scss",
      "@/assets/scss/_fonts.scss",
      "@/assets/scss/_animations.scss",
      "@/assets/scss/_transitions.scss",
    ]
  },
  loading: "@/components/loading.vue",
  serverMiddleware: [
    "~/middleware/redirects",
    // "~/server/index",
  ],
  plugins: [],
  components: true,
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/svg",
  ],
  modules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/markdownit",
    "@nuxtjs/strapi",
    "nuxt-i18n",
  ],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'pl',
    parsePages: false,
    pages: {
      'index/start': {
        en: 'start',
        de: 'anfang',
        pl: 'wjazd'
      }
    },
    locales: [{
        code: 'en',
        name: 'English',
      },
      {
        code: 'pl',
        name: 'Polski',
      },
      {
        code: 'de',
        name: 'Deutsch',
      }
    ]
  },
  strapi: {
    url: apiUrl,
    entities: [{
        name: "articles",
        type: "collection",
      },
      {
        name: "categories",
        type: "collection",
      },
      {
        name: "homepage",
        type: "single",
      },
      {
        name: "global",
        type: "single",
      },
    ],
  },
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true,
    html: true,
  },
  build: {
    extend: function(config, {
      isDev,
      isClient
    }) {
      config.node = {
        fs: "empty",
        net: "empty"
      };
    }
  },
}
