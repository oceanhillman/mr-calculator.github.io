<template>
    <div class="arcade-mission-select">
        <div class="repeats-icon">
            <Tex
                image="missionRepeat"

                width="36px"
                height="36px"
                object-fit="contain"
            />
            <span>{{ 15 * maxFeasableMissions }}</span>
        </div>
        <ul class="missions">
            <li
                v-for="(challenge, index) in [...hero.ranks[0]?.challenges ?? []].toReversed()"
                :class="{
                    selected: index + 1 <= maxFeasableMissions,
                    'has-prev': index == 0 ? false : true,
                    'has-next': index + 2 <= maxFeasableMissions
                }"

                @click="maxFeasableMissions = index + 1"
            >
                <img :src="CHALLENGE_ICONS[challenge.type]!" />
            </li>
        </ul>

        <Tex
            image="infoButton"
            square
            clickable
            hover="auto"

            width="25px"
            height="25px"
            object-fit="contain"

            v-tooltip="({
                text: `<strong>Daily missions to complete</strong>
                <br/><br/>
                How many arcade missions you finish each day before switching to another mode (or stopping). Each mission requires 15 match completions to fully clear.
                <br/>
                Missions are not in a specific order, the first one that gets finished will be the one you do best at according to your average stats (usually completed from last to first in 18v18 Annihilation).
                <br/><br/>
                Current: <b>${maxFeasableMissions}</b>
                `,
                touchEnabled: true
            } satisfies TooltipBinding)"
        />
    </div>
</template>

<style lang="sass" scoped>
.arcade-mission-select
    display: flex
    align-items: center
    gap: 10px

    .repeats-icon
        position: relative

        span
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%

            font-size: 16px
            font-family: RefrigeratorDeluxeBold
            color: #b5d6ff
            
            text-align: center
            line-height: 36px

    .missions
        display: flex
        align-items: center
        gap: 0

        li
            padding: 5px
            width: 35px
            height: 35px
            box-sizing: content-box

            display: flex
            justify-content: center
            align-items: center

            border: 2px solid transparent
            cursor: pointer

            &.selected
                border: 2px solid $light-blue-highlight
                background: color-mix(in srgb, $light-blue-highlight 40%, white)

                &:not(.has-prev)
                    padding-left: 5px + 2px
                &:not(.has-next)
                    padding-right: 5px + 2px

                &.has-prev
                    border-left: none
                &.has-next
                    border-right: none
                    padding-right: 5px + 2px


            &:hover
                background: color-mix(in srgb, $light-blue-highlight 70%, $blue)

            img
                width: 100%
</style>

<script setup lang="ts">
import { CHALLENGE_ICONS, DEFAULT_HERO_STORE, PlayerHeroStoreSchema, type HeroData, type PlayerHeroStore } from '~/assets/data/common';
import type { TooltipBinding } from '~/directives/tooltip';

const props = defineProps<{
    hero: HeroData,
}>();

const storedLevel = useLocalStorage<PlayerHeroStore>(`hero_${props.hero.id}`, DEFAULT_HERO_STORE(), PlayerHeroStoreSchema);

const maxFeasableMissions = ref(storedLevel.value.arcadeMaxFeasableMissions ?? 2);
watch(maxFeasableMissions, (missions) => {
    storedLevel.value.arcadeMaxFeasableMissions = missions;
});
</script>