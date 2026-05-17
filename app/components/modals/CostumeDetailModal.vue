<template>
    <div :class="['modal', 'costume-detail-modal', costume.rarity ? `rarity-${costume.rarity}` : '']">
        <div class="costume-image-panel" :style="{ '--hero-color': `var(--color)` }">
            <div
                :class="['hero-image', costume.rarity ? `rarity-${costume.rarity}` : '']"
                :style="{
                    '--hero-image': `url(${src})`,
                    '--hero-color': `var(--color)`
                }"
            >
                <div class="stroke" />
                <img
                    :src="src"
                    :alt="costume.name"
                    :style="imageScale !== 1 ? { transform: `scale(${imageScale})`, transformOrigin: imageOrigin } : undefined"
                />
            </div>
        </div>

        <div class="details-panel">
            <h2>{{ costume.name }}</h2>
            <div class="details">
                <p class="detail">
                    <span class="label">Rarity</span>
                    {{ costume.rarity.charAt(0).toUpperCase() + costume.rarity.slice(1) }}
                </p>
                <p v-if="costume.source" class="detail">
                    <span class="label">Source</span>
                    {{ costume.source }}
                </p>
                <p v-if="costume.skinType" class="detail">
                    <span class="label">Type</span>
                    {{ costume.skinType }}
                </p>
                <p v-if="costume.theme" class="detail">
                    <span class="label">Theme</span>
                    {{ costume.theme }}
                </p>
                <p v-if="formattedDate" class="detail">
                    <span class="label">Released</span>
                    {{ formattedDate }}
                </p>
                
            </div>
        </div>
    </div>
</template>

<style scoped lang="sass">
.costume-detail-modal
    position: relative
    flex-direction: row !important
    align-items: stretch !important
    gap: 0 !important
    padding: 0 !important
    max-width: 1000px
    min-height: 500px
    overflow: hidden !important

    &.rarity-rare,
    &.rarity-epic,
    &.rarity-legendary
        &::after
            content: ""
            position: absolute
            bottom: 0
            left: 0
            width: 100%
            height: 8px
            z-index: 10
            pointer-events: none
            transform: skewX(88.5deg) scaleX(5) translateX(-50%)

    &.rarity-rare::after
        background: #65AFE3
    &.rarity-epic::after
        background: #BE85EF
    &.rarity-legendary::after
        background: #FFA72E

    +media-mobile
        flex-direction: column !important
        max-width: 100%
        min-height: unset
        padding-bottom: 0 !important

.costume-image-panel
    position: relative
    width: 400px
    flex-shrink: 0

    +media-mobile
        width: 100%
        height: 280px

    .bg
        position: absolute
        inset: 0

    .hero-image
        position: absolute
        inset: 0
        overflow: hidden

        img
            width: 100%
            height: 100%
            object-fit: cover
            object-position: center
            position: relative
            z-index: 1

        .stroke
            position: absolute
            inset: 0
            z-index: 2



.details-panel
    flex: 1
    display: flex
    flex-direction: column
    align-items: flex-start
    gap: 12px
    padding: 30px 28px
    margin-left: -20px

    h2
        text-align: left !important
        padding: 0 !important

    .details
        display: flex
        flex-direction: column
        gap: 20px

    .detail
        display: flex
        flex-direction: column
        gap: 2px
        font-size: 1.4em

        .label
            font-size: 0.7em
            opacity: 0.5
            text-transform: uppercase
            letter-spacing: 0.08em
</style>

<script setup lang="ts">
import type { CostumeEntry } from '~/assets/data/cosmeticsRarity';
import { skinSlug } from '~/assets/data/cosmeticsRarity';

const props = withDefaults(defineProps<{
    costume: CostumeEntry;
    heroId: string;
    imageScale?: number;
    imageOrigin?: string;
}>(), {
    imageScale: 1,
    imageOrigin: 'center center',
});

defineEmits<{ cancel: [] }>();

const src = computed(() => `/img/heroes/cosmetics/${props.heroId}/${skinSlug(props.costume.name)}.png`);

const formattedDate = computed(() => {
    if (!props.costume.releaseDate) return null;
    return new Date(props.costume.releaseDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
});
</script>
