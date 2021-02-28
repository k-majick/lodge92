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
    ],
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
      "@/assets/scss/_fonts.scss",
      "@/assets/scss/_animations.scss",
      "@/assets/scss/_mixins.scss",
      "@/assets/scss/_transitions.scss",
      "@/assets/scss/_grid.scss",
    ]
  },
  loading: "@/components/Loading.vue",
  serverMiddleware: [
    "~/middleware/redirects",
  ],
  plugins: [],
  components: true,
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/svg",
  ],
  modules: [
    "@nuxtjs/auth",
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "@nuxtjs/markdownit",
    "@nuxtjs/strapi",
    "nuxt-i18n",
    'nuxt-stripe-module',
  ],
  stripe: {
    publishableKey: 'pk_test_51I8B4AIE5xAywf5DEmphvTL0ByRuXdUF4yh2ShW5gtJH6BgpQhGF4mbNgxfpzE4XBnl7HFeyVx301PCvgkWKj0DL00Rm0PowlV',
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'pl',
    seo: true,
    parsePages: false,
    lazy: true,
    langDir: 'assets/i18n/',
    pages: {
      'index/checkout': {
        de: 'kasse',
        en: 'checkout',
        pl: 'kasa',
      },
      'index/contact': {
        de: 'kontakt',
        en: 'contact-us',
        pl: 'kontakt',
      },
      'index/gallery': {
        de: 'galerie',
        en: 'gallery',
        pl: 'galeria',
      },
      'index/reservations': {
        de: 'reservierung',
        en: 'reservations',
        pl: 'rezerwacja',
      },
      'index/start': {
        de: 'start',
        en: 'start',
        pl: 'start',
      },
      'index/account': {
        de: 'konto',
        en: 'account',
        pl: 'konto',
      },
      'index/register': {
        de: 'registrierung',
        en: 'register',
        pl: 'rejestracja',
      },
      'index/passwordLost': {
        de: 'passwort-abrufen',
        en: 'retrieve-password',
        pl: 'odzyskaj-haslo',
      },
      'index/passwordReset': {
        de: 'passwort-zuruecksetzen',
        en: 'reset-password',
        pl: 'zmien-haslo',
      },
    },
    locales: [{
        code: 'de',
        name: 'Deutsch',
        iso: 'de-DE',
        file: 'de-DE.js',
      },
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en-US.js',
      },
      {
        code: 'pl',
        name: 'Polski',
        iso: 'pl-PL',
        file: 'pl-PL.js',
      }
    ]
  },
  auth: {
    watchLoggedIn: false,
    // redirect: {
    //   login: '/start',
    //   logout: '/start',
    //   callback: '/login',
    //   home: '/start'
    // },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/local',
            method: 'post',
            propertyName: 'jwt'
          },
          user: {
            url: 'users/me',
            method: 'get',
            propertyName: false
          },
          logout: false
        },
        autoFetchUser: true
      }
    }
  },
  strapi: {
    url: apiUrl,
    entities: [{
        name: "bookings",
        type: "collection",
      },
      {
        name: "nav-items",
        type: "collection",
      },
      {
        name: "users",
        type: "collection",
      },
      {
        name: "global",
        type: "single",
      },
      {
        name: "start",
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
