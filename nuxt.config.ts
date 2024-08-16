export default defineNuxtConfig({
  ssr: false,
  nitro: {
    devProxy: {
      '/auth': `${process.env.API_URL}/auth` //TODO only for test local - 'http://localhost:3000/auth'
    }
  },

  vite: {
    vue: {
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    }
  },

  modules: [
    ['@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore',
        ],
      }],
    '@sidebase/nuxt-auth',
  ],

  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    baseURL: 'auth/',
    provider: {
      type: 'local',
      sessionDataType: {
        id: 'string | number',
        email: 'string',
        username: 'string'
      },
      token: {
        signInResponseTokenPointer: '/token',
        type: 'Bearer',
        cookieName: 'auth.token',
        headerName: 'Authorization',
        maxAgeInSeconds: 3600,
        sameSiteAttribute: 'lax',
        cookieDomain: ''
      },
      endpoints: {
        signIn: {path: 'login', method: 'post'},
        signUp: {path: 'register', method: 'post'},
        signOut: {path: 'logout', method: 'post'},
        getSession: {path: 'session', method: 'get'},
      }
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: true,
    }
  },

  router: {
    routes: [
      {
        path: '/tg/:id/:username',
        name: 'signup',
        component: '@/store/tg.vue'
      }
    ]
  },

  compatibilityDate: '2024-08-14'
});