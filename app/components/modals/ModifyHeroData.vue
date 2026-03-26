<template>
    <div class="modal">
        <h2 v-if="title" v-html="title"/>
        <p v-if="message" class="modal-subtitle" v-html="message" />
        <UiSeparator class="separator" />
    
        <ul class="options">
            <li @click="$emit('confirm', 'level')">
                <div class="icon-wrapper">
                    <Tex
                        src="/img/heroes/ranks/knight.webp"

                        width="170px"
                        height="170px"
                        object-fit="contain"
                    />
                </div>
                <h3>Current Level</h3>
            </li>
            <li @click="$emit('confirm', 'proficiency-points')">
                <div class="icon-wrapper">
                    <Tex
                        image="proficiency"
                        state="hover"

                        width="70px"
                        height="70px"
                        object-fit="contain"
                    />
                </div>
                <h3>Current Proficiency Points</h3>
            </li>
            <li class="warning-wrapper" @click="$emit('confirm', 'stats')">
                <Tex
                    v-if="!hasAvgStats"
                    class="warning-bubble"
                    image="redDotExcl"

                    width="22px"
                    height="22px"
                    object-fit="contain"
                />

                <div class="icon-wrapper">
                    <Tex
                        image="gameTime"
                        state="hover"

                        width="90px"
                        height="90px"
                        object-fit="contain"
                    />
                </div>
                <h3>Average Stats</h3>
            </li>
            <li class="warning-wrapper" @click="$emit('confirm', 'goal')">
                <Tex
                    v-if="isLv1AndGoalLv1"
                    class="warning-bubble"
                    image="redDotExcl"

                    width="22px"
                    height="22px"
                    object-fit="contain"
                />

                <div class="icon-wrapper">
                    <Tex
                        image="target"
                        state="hover"
                        color="var(--color)"

                        width="90px"
                        height="90px"
                        object-fit="contain"
                    />
                </div>
                <h3>Your Goal</h3>
            </li>
            <li v-if="isUnknownHero" @click="$emit('confirm', 'edit-unknown-hero')">
                <div class="icon-wrapper">
                    <Tex
                        image="edit"
                        state="hover"

                        width="70px"
                        height="70px"
                        object-fit="contain"
                    />
                </div>
                <h3>Edit Hero</h3>
            </li>
            <li
                v-if="isUnknownHero"
                class="warning-wrapper"
                @click="$emit('confirm', 'convert-unknown-hero')"
            >
                <Tex
                    v-if="unknownHeroHasPossibleMatch"
                    class="warning-bubble"
                    image="redDotExcl"

                    width="22px"
                    height="22px"
                    object-fit="contain"
                />

                <div class="icon-wrapper">
                    <Tex
                        image="swap"
                        state="hover"
                        color="#fff"

                        width="45px"
                        height="45px"
                        object-fit="contain"
                    />
                </div>
                <h3>Convert to Official Hero</h3>
            </li>
            <li v-if="isUnknownHero" @click="$emit('confirm', 'delete-unknown-hero')">
                <div class="icon-wrapper">
                    <Tex
                        image="delete"
                        state="hover"
                        color="#fc6b60"

                        width="70px"
                        height="70px"
                        object-fit="contain"
                    />
                </div>
                <h3>Delete Hero</h3>
            </li>
        </ul>

        <div class="buttons">
            <FormButton size="small" color-scheme="white" @click="$emit('cancel')">Back</FormButton>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.options
    padding: 0 20px

    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap
    gap: 20px

    user-select: none

    li
        width: 100%

        display: flex
        flex-direction: column
        gap: 10px
        width: 150px

        cursor: pointer

        &:hover
            .icon-wrapper
                border: 4px solid $color
                .texture
                    transform: scale(1.1)
        
        .icon-wrapper
            width: 100%
            height: 150px

            background: var(--tex-itemBackground) no-repeat
            background-size: 100% 100%

            display: flex
            justify-content: center
            align-items: center

            border: 4px solid $light-blue

            .texture
                transition: transform .1s ease

        h3
            height: 40px
            font-size: 20px
            font-family: RefrigeratorDeluxeBold
            font-weight: normal
            text-transform: uppercase
            text-align: center
            line-height: 20px

</style>

<script setup lang="ts">
import { DEFAULT_HERO_STORE, type HeroData, type PlayerHeroStore } from '~/assets/data/common';
import { useUnknownHeroHasPossibleMatch } from '~/composables/useUnknownHeroHasPossibleMatch';

const props = defineProps<{
    title: string,
    message: string,
    hero: HeroData,

    isUnknownHero?: boolean
}>()

const storedLevel = useLocalStorage<PlayerHeroStore>(`hero_${props.hero.id}`, DEFAULT_HERO_STORE());
const hasAvgStats = useHasAvgStats(() => props.hero);
const isLv1AndGoalLv1 = computed(() => storedLevel.value.level == 1 && storedLevel.value.goal == 1);

const unknownHeroHasPossibleMatch = useUnknownHeroHasPossibleMatch(props.hero).value.length;

</script>