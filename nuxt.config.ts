export default defineNuxtConfig({
  ssr: false,
  nitro: {
    devProxy: {
      '/auth': 'http://localhost:3000/auth'
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
      token: {
        signInResponseTokenPointer: '/token',
        type: 'Bearer',
        cookieName: 'auth.token',
        headerName: 'Authorization',
        maxAgeInSeconds: 1800,
        sameSiteAttribute: 'lax',
        cookieDomain: ''
      },
      endpoints: {
        signIn: {path: 'api/login', method: 'post'},
        signUp: {path: 'api/register', method: 'post'},
        getSession: {path: 'api/session', method: 'get'},
      }
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  },

  compatibilityDate: '2024-08-04'
});