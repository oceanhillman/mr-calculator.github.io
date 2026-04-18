<template>
    <div>
        <NuxtLoadingIndicator color="#fbdc2c" />
        <NuxtLayout :name="layout">
            <NuxtPage />
        </NuxtLayout>

        <UiModalsInjector />
        <UiNotificationsInjector />
        <UiTooltipInjector />
    </div>
</template>

<style src="@/assets/style/components/notifications.sass"></style>

<script setup>
import { injectTexturesCss } from './assets/data/textures';

const layout = ref('default');

injectTexturesCss();
</script>