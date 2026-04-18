<template>
    <div class="slider-wrapper">
        <div v-if="showNumbers" class="numbers">
            <p>0</p>
            <p v-if="showModel">{{ pointsModel ?? currentRankComp.points }}</p>
            <p>{{ currentRankComp.rank.xpPerLevel }}</p>
        </div>
        <div
            ref="pointsSlider"

            class="slider-draggable"
            :style="{
                '--progress': (
                    (pointsModel ?? currentRankComp.points) / currentRankComp.rank.xpPerLevel * 100
                ) + '%'
            }"
        >
            <div class="drag-area"
                @pointerdown="pointsDragStart"
                @touchstart="pointsDragStart"

                v-tooltip="({
                    text: 'Drag to set <b>proficiency points<b>',
                    icon: 'mouseDrag'
                } satisfies TooltipBinding)"
            />

            <div class="inner" />
        </div>
    </div>
</template>

<style lang="sass" scoped>
.slider-wrapper
    width: 100%
    display: flex
    flex-direction: column
    gap: 5px

    .numbers
        display: flex
        justify-content: space-between
        align-items: center

        color: $light-blue
        user-select: none
    
    .slider-draggable
        position: relative
        width: 100%
        height: 6px
        background: $light-blue-highlight

        +media-mobile
            height: 12px

        .drag-area
            position: absolute
            width: 100%
            height: 30px
            left: 0
            top: 50%
            transform: translateY(-50%)

            z-index: 2

            cursor: ew-resize

        .inner
            width: var(--progress)
            height: 100%

            background: $color
</style>

<script setup lang="ts">
import { DEFAULT_HERO_STORE, PROFICIENCY_RANKS, type HeroData, type PlayerHeroStore } from '~/assets/data/common';
import type { TooltipBinding } from '~/directives/tooltip';

const props = defineProps<{
    hero: HeroData,

    showNumbers?: boolean,
    showModel?: boolean
}>()

const storedLevel = useLocalStorage<PlayerHeroStore>(`hero_${props.hero.id}`, DEFAULT_HERO_STORE());
const currentRankComp = computed(() => {
    return { 
        rank: PROFICIENCY_RANKS[storedLevel.value.rank] ?? PROFICIENCY_RANKS.agent!,
        level: storedLevel.value.level,
        points: storedLevel.value.points
    };
});

const pointsModel = defineModel<number>();

const pointsDraggableSlider = useTemplateRef('pointsSlider');
const pointsIsDragging = ref(false);
const initialPoints = ref(0);
const pointsInitialX = ref(0);
const pointsCurrentX = ref(0);

const touchDevice = isTouchDevice();

function getClientX(e: PointerEvent|TouchEvent) {
    return (e as PointerEvent).clientX ?? (e as TouchEvent).touches[0]?.clientX ?? 0;
}

function pointsDragStart(e: PointerEvent|TouchEvent) {
    const x = getClientX(e)
    pointsInitialX.value = x;
    pointsIsDragging.value = true;
    initialPoints.value = pointsModel.value ?? currentRankComp.value.points;

    if (!touchDevice.value && pointsDraggableSlider.value) {
        const rect = pointsDraggableSlider.value.getBoundingClientRect();
        const sliderWidth = rect.width;
        const dist = Math.abs(x - rect.left);
        const percent = dist / sliderWidth;

        let points = Math.floor(currentRankComp.value.rank.xpPerLevel * percent);

        if (points < 0)
            points = 0;
        if (points > currentRankComp.value.rank.xpPerLevel)
            points = currentRankComp.value.rank.xpPerLevel - 1;

        pointsModel.value = points;
        initialPoints.value = points;
    }
}

function pointsDragMove(e: PointerEvent|TouchEvent) {
    if (!pointsIsDragging.value || !pointsDraggableSlider.value)
        return;

    pointsCurrentX.value = getClientX(e);

    const sliderWidth = pointsDraggableSlider.value.getBoundingClientRect().width;
    const diff = pointsCurrentX.value - pointsInitialX.value;
    const percent = diff / sliderWidth;
    
    let points = initialPoints.value + Math.floor(currentRankComp.value.rank.xpPerLevel * percent);

    if (points < 0)
        points = 0;
    if (points > currentRankComp.value.rank.xpPerLevel)
        points = currentRankComp.value.rank.xpPerLevel - 1;

    pointsModel.value = points;
}

function pointsDragEnd() {
    pointsIsDragging.value = false;
}

useEvent(['pointermove', 'touchmove'], pointsDragMove);
useEvent(['pointerup', 'touchend'], pointsDragEnd);

useEvent('touchmove', (e: TouchEvent) => {
    if (pointsIsDragging.value)
        e.preventDefault();
    else
        return true;
}, undefined, { passive: false });
</script>