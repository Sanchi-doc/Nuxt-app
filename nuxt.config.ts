// https://nuxt.com/docs/api/configuration/nuxt-config
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
        "@nuxt/ui",
        '@sidebase/nuxt-auth',
    ],

    auth: {
        isEnabled: true,
        //disableServerSideAuth: false,
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
                signIn: {path: 'login', method: 'post'},
                signUp: {path: 'register', method: 'post'},
                getSession: {path: '/session', method: 'get'},
            }
        },
        sessionRefresh: {
            enablePeriodically: true,
            enableOnWindowFocus: true,
        }
    },

    compatibilityDate: '2024-08-04'
});