import type { SitemapUrlInput } from '@nuxtjs/sitemap';
import { HERO_LIST } from './app/assets/data/heroes';
import config from './app/composables/config'

const prerenderableHeroPages: Record<string, { ssr: boolean }> = {};
HERO_LIST.forEach(h => prerenderableHeroPages[`/heroes/${h.id}`] = { ssr: true });

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2026-03-03',
    devtools: { enabled: false },

    // ssr: false, // for dev
    routeRules: {
        '/heroes/new': { ssr: false },
        '/heroes/**': { ssr: false },
        ...prerenderableHeroPages,
        '/download': { ssr: false },
        '/import': { ssr: false },
    },

    nitro: {
        prerender: {
            failOnError: false,
            crawlLinks: true,
            routes: [
                '/',
                '/heroes',
                ...HERO_LIST.map(h => `/heroes/${h.id}`)
            ]
        },
    },

    app: {
        baseURL: '/',

        head: {
            htmlAttrs: { lang: 'en' },
            title: 'Marvel Rivals Proficiency Calculator',
            link: [
                {
                    rel: 'icon', type: 'image/png',
                    href: '/img/icons/favicon.ico',
                },

                { rel: 'manifest', href: '/manifest.webmanifest' }
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
                // { name: 'author', content: 'mrprof' },
                { name: 'robots', content: 'index, follow' },
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: 'Marvel Rivals Proficiency Calculator' },
                { name: 'twitter:card', content: 'summary_large_image' },
            ]
        },
    },

    css: [
        '@/assets/style/main.sass',
        '@/assets/style/fonts.css'
    ],
    vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    // Automatically add css vars and mixins to all sass/scss files
                    additionalData: '@use "@/assets/style/mixins.sass" as *\n@use "@/assets/style/vars.sass" as *\n',
                },
            },
        },
    },

    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    'defineStore', // import { defineStore } from 'pinia'
                    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
        '@vite-pwa/nuxt',
        '@nuxtjs/sitemap',
    ],

    pwa: {
        devOptions: {
            enabled: true,
            type: 'module'
        },

        registerType: 'autoUpdate',
        manifest: {
            name: 'Marvel Rivals Proficiency Calculator',
            short_name: 'MR Proficiency',
            description: 'Calculate how long it takes to unlock every proficiency reward',
            theme_color: '#2b2b56',
            background_color: '#2b2b56',
            display: 'standalone',
            icons: [
                {
                    src: 'img/icons/icon-192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'img/icons/icon-512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ],
            // file handler for .mrprof extension
            file_handlers: [
                {
                    action: '/import',
                    accept: {
                        'application/octet-stream': ['.mrprof']
                    }
                }
            ]
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,png,webp,svg,ico,json,ttf}'],
            globIgnores: ['img/heroes/data/**/*', 'img/seo/**/*']
        }
    },

    site: {
        url: config.domainHttp,
    },

    sitemap: {
        strictNuxtContentPaths: false,
        urls: [
            ...HERO_LIST.map(h => ({
                loc: `/heroes/${h.id}`,
                changefreq: 'monthly',
                priority: 0.7
            } as SitemapUrlInput))
        ]
    },

    devServer: {
        host: "192.168.0.199",
        port: 5500
    }
})
