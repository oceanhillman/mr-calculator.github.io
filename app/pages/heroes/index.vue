<template>
    <main>
        <div class="container">
            <div class="title">
                <NuxtLink class="back" to="/">
                    <Tex
                        image="arrowLeft"
                        hover="color"
                        clickable

                        width="40px"
                        height="40px"
                        object-fit="contain"
                    />
                </NuxtLink>
                <h1>
                    Select your hero
                </h1>
            </div>
            <UiSeparator />
            <ClientOnly>
                <PanelHeroList
                    back-button="/"
                />
            </ClientOnly>
        </div>
    </main>
</template>

<style src="@/assets/style/pages/heroes/index.sass" scoped></style>

<script setup lang="ts">
import { useAbsoluteUrl } from '~/composables/config';

useSeoMeta({
    title: 'Heroes | MR Proficiency Calculator',
    description: 'Browse all Marvel Rivals heroes and calculate proficiency rewards.',
    
    ogTitle: 'Heroes | MR Proficiency Calculator',
    ogUrl: useCanonicalUrl('heroes'),
    ogImage: useAbsoluteUrl('/img/seo/og-image-heroes.webp'),
    ogImageWidth: '1200',
    ogImageHeight: '630',
    ogImageAlt: 'Heroes | Marvel Rivals Proficiency Calculator - Calculate how long it takes to unlock every proficiency reward for any hero',
    
    twitterTitle: 'Heroes | MR Proficiency Calculator',
    twitterDescription: 'Browse all Marvel Rivals heroes and calculate proficiency rewards.',
    twitterImage: useAbsoluteUrl('/img/seo/og-image-heroes.webp'),
    twitterImageAlt: 'Heroes | Marvel Rivals Proficiency Calculator - Calculate how long it takes to unlock every proficiency reward for any hero',
})

useHead({
    link: [
        {
            rel: "canonical",
            href: useCanonicalUrl('heroes')
        }
    ]
})

const { save, restore } = useScrollPosition();
onMounted(restore);
onBeforeUnmount(save);
</script>