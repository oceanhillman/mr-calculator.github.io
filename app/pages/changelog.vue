<template>
    <div class="common-page">
        <NuxtLink to="/" class="logo-standalone">
            <Tex
                image="logo"

                width="50px"
                height="50px"

                object-fit="contain"
            />
        </NuxtLink>
        <main class="content masked">
            <div class="mask-wrapper">
                <div class="scroll-container">
                    <h1>CHANGELOG</h1>

                    <PanelChangelog />

                    <br/>
                    <p class="disclaimer">
                        This is a filtered changelog that covers significant changes, for all modifications head over to our
                        <a
                            :href="`https://github.com/${config.githubUser}/${config.githubRepo}/commits/main/`"
                            target="_blank"
                        >
                            GitHub Commits</a>.
                    </p>
                    <br/>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="sass" scoped>
.disclaimer
    text-align: center

    a
        text-decoration: underline
</style>

<script setup lang="ts">
useSeoMeta({
    title: 'Changelog | MR Proficiency Calculator',
    description: 'See all changes  made and features added to the tool in chronological order, linked with their GitHub commits.',
    
    ogTitle: 'Changelog | MR Proficiency Calculator',
    ogUrl: useCanonicalUrl('changelog'),
    ogImage: useAbsoluteUrl('/img/seo/og-image-changelog.webp'),
    ogImageWidth: '1200',
    ogImageHeight: '630',
    ogImageAlt: 'Changelog | Marvel Rivals Proficiency Calculator - See all changes  made and features added to the tool in chronological order, linked with their GitHub commits.',
    
    twitterTitle: 'Changelog | MR Proficiency Calculator',
    twitterDescription: 'See all changes  made and features added to the tool in chronological order, linked with their GitHub commits.',
    twitterImage: useAbsoluteUrl('/img/seo/og-image-changelog.webp'),
    twitterImageAlt: 'Changelog | Marvel Rivals Proficiency Calculator - See all changes  made and features added to the tool in chronological order, linked with their GitHub commits.',
})

useHead({
    link: [
        {
            rel: "canonical",
            href: useCanonicalUrl('changelog')
        }
    ]
})
</script>