import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["icon"]?: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["ui"]?: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,  modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@nuxt/icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxt/ui", Exclude<NuxtConfig["ui"], boolean>] | ["@sidebase/nuxt-auth", Exclude<NuxtConfig["auth"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["icon"]?: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["ui"]?: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["auth"]?: typeof import("@sidebase/nuxt-auth").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,  modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@nuxt/icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxt/ui", Exclude<NuxtConfig["ui"], boolean>] | ["@sidebase/nuxt-auth", Exclude<NuxtConfig["auth"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },

   icon: {
      serverKnownCssClasses: Array<any>,
   },
  }
  interface PublicRuntimeConfig {
   auth: {
      computed: {
         origin: any,

         pathname: string,

         fullBaseUrl: string,
      },

      isEnabled: boolean,

      disableServerSideAuth: boolean,

      sessionRefresh: {
         enablePeriodically: boolean,

         enableOnWindowFocus: boolean,

         handler: any,
      },

      globalAppMiddleware: {
         isEnabled: boolean,

         allow404WithoutAuth: boolean,

         addDefaultCallbackUrl: boolean,
      },

      baseURL: string,

      provider: {
         type: string,

         pages: {
            login: string,
         },

         endpoints: {
            signIn: {
               path: string,

               method: string,
            },

            signOut: {
               path: string,

               method: string,
            },

            signUp: {
               path: string,

               method: string,
            },

            getSession: {
               path: string,

               method: string,
            },
         },

         token: {
            signInResponseTokenPointer: string,

            type: string,

            cookieName: string,

            headerName: string,

            maxAgeInSeconds: number,

            sameSiteAttribute: string,

            secureCookieAttribute: boolean,

            cookieDomain: string,
         },

         session: {
            dataType: {
               id: string,
            },

            dataResponsePointer: string,
         },
      },
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }