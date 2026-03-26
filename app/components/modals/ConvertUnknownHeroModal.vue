<template>
    <div class="modal">
        <h2 v-if="title" v-html="title"/>
        <p v-if="message" class="modal-subtitle" v-html="message" />
        <UiSeparator class="separator" />

        <h3>
            Convert to
        </h3>
        <div class="hero" @click="heroSelectOpen = true">
            <img
                class="hero-head"
                :src="selectedHeroData ? 
                    `${selectedHeroData?.dataDir}head.webp`
                    :
                    '/img/heroes/data/unknown-hero/head.webp' 
                "
            >
            <div class="info">
                <h3>{{ selectedHeroData?.name ?? `Select Hero` }}</h3>
                <Tex
                    image="swap"
                    color="#fff"

                    width="20px"
                    height="20px"
                />
            </div>
        </div>

        <p class="info">
            This will remove the custom added hero and move your data to the selected hero.
            <br/>
            This will also overwrite your current stats for the selected hero, if you have any.
            <br/>
            This action is irreversible!
        </p>

        <div class="buttons">
            <FormButton size="small" @click="$emit('confirm', selectedHero)">
                Confirm
            </FormButton>
            <FormButton size="small" color-scheme="white" @click="$emit('cancel')">Cancel</FormButton>
        </div>

        <InfoOverlay
            v-if="heroSelectOpen"
            title="Select a hero"
            large
            @close="heroSelectOpen = false"
        >
            <PanelHeroList
                :selected-hero="selectedHero"

                :links="false"
                :add-hero-enabled="false"
                :show-unknown-heroes="false"
                :sort-heroes="sortHeroes"

                @click-hero="clickHero"
            />
            <br/>
            <br/>
        </InfoOverlay>
    </div>
</template>

<style lang="sass" scoped>
h3
    font-size: 24px
    text-transform: uppercase

.hero
    width: 300px

    display: grid
    grid-template-columns: 100px auto
    justify-items: center
    align-items: center

    padding: 4px
    border: 3px solid $light-blue
    background: $light-blue-highlight

    color: $light

    cursor: pointer

    &:hover
        border: 3px solid color-mix(in srgb, #{$light-blue} 70%, white)
        background: color-mix(in srgb, #{$light-blue-highlight} 70%, white)

    img
        width: 100%
        height: 100%

        background: $light-blue

    .info
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        gap: 20px

        .change
            display: flex
            gap: 10px

            p
                font-size: 16px

p.info
    margin-top: 20px

    font-size: 16px
    color: $light-blue
    text-align: center

</style>

<script setup lang="ts">
import type { HeroData } from '~/assets/data/common';
import { HERO_LIST } from '~/assets/data/heroes';

const props = defineProps<{
    title: string,
    message: string,

    hero: HeroData
}>();

const unknownHeroHasPossibleMatch = useUnknownHeroHasPossibleMatch(props.hero);

const heroSelectOpen = ref(false);
const selectedHero = ref<string|undefined>(unknownHeroHasPossibleMatch.value?.[0]?.id);
const selectedHeroData = computed(() => HERO_LIST.find(h => selectedHero.value == h.id));

function sortHeroes(a: HeroData, b: HeroData) {
    const hasA = !!unknownHeroHasPossibleMatch.value.find(h => h.id == a.id);
    const hasB = !!unknownHeroHasPossibleMatch.value.find(h => h.id == b.id);
    if (hasA && !hasB)
        return -1;
    if (hasB && !hasA)
        return 1;
    if (hasA && hasB)
        return 0;

    return a.name.localeCompare(b.name);
}

function clickHero(heroId: string) {
    selectedHero.value = heroId;
    heroSelectOpen.value = false;
}
</script>