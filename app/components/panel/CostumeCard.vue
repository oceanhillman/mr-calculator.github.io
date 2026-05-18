<template>
    <div
        class="hero-card"
        style="cursor: pointer"
        :style="{
            '--bg-color': 'var(--color)'
        }"
    >
        <Tex
            class="bg"
            image="heroCardBackground"

            width="100%"
            height="100%"
            object-fit="cover"
        />
        <div
            :class="['hero-image', rarity ? `rarity-${rarity.toLowerCase()}` : '']"
            :style="{
                '--hero-image': `url(${src})`,
                '--hero-color': 'var(--color)'
            }"
        >
            <div class="stroke" />
            <img
                :src="src"
                :alt="name"
                :style="imageScale !== 1 ? { transform: `scale(${imageScale})`, transformOrigin: imageOrigin } : undefined"
            />
        </div>

        <Tex
            v-if="owned"
            class="check-corner"
            image="checkCorner"
            width="45px"
            height="45px"
        />

        <div class="info">
            <div class="name">
                <h3>{{ name }}</h3>
            </div>
            <FormCheckbox
                small
                :model-value="owned"
                @update:model-value="$emit('toggle')"
                @click.stop
            />
        </div>
    </div>
</template>

<style src="@/assets/style/components/hero-card.sass" scoped></style>

<style scoped lang="sass">
.hero-card
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45)

    &:hover
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.65)

    .check-corner
        position: absolute
        top: 0
        right: 0
        z-index: 2

    .hero-image
        overflow: hidden

        img
            object-position: center

        &.rarity-rare,
        &.rarity-epic,
        &.rarity-legendary
            &::after
                content: ""
                position: absolute
                bottom: 0
                left: 0
                transform: skewX(88.5deg) scaleX(5) translateX(-50%)

                width: 100%
                height: 8px

                z-index: 3
                pointer-events: none

        &.rarity-rare::after
            background: #65AFE3
        &.rarity-epic::after
            background: #BE85EF
        &.rarity-legendary::after
            background: #FFA72E
</style>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    name: string;
    src: string;
    rarity: string;
    owned: boolean;
    imageScale?: number;
    imageOrigin?: string;
}>(), {
    imageScale: 1,
    imageOrigin: 'center center',
});

defineEmits<{ toggle: [] }>();

</script>