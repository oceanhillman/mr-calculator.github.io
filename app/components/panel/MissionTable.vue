<template>
    <div :class="{'mission-table': 1, small, clickable}">
        <ul class="ranks">
            <li
                v-for="rank in PROFICIENCY_RANKS"
                :class="{selected: selectedRank == rank.id}"
                :style="{
                    '--src': `url('${rank.icon}')`
                }"

                @click="selectedRank = rank.id"
            >
                <img :src="rank.icon" />
            </li>
        </ul>

        <div class="column">
            <div class="head">
                PERMANENT MISSIONS
            </div>
            <ul>
                <li
                    v-for="(challenge, index) in currentChallenges"
                    :class="{ mission: 1, 'no-hover': index == 0 }"

                    @click="$emit('itemClick', selectedRank, challenge, index)"
                    v-tooltip="index != 0 ? missionHoverTooltip?.(selectedRank, challenge, index) : undefined"
                >
                    <div class="repeats-icon">
                        <Tex
                            image="missionInfinity"

                            width="36px"
                            height="36px"
                            object-fit="contain"
                        />
                    </div>

                    <h3>{{ generateChallengeText(challenge.type, challenge.needed) }}</h3>
                    <div class="points">
                        <Tex
                            image="proficiency"
                            state="hover"

                            width="40px"
                            height="40px"
                            object-fit="contain"
                        />
                        <h4>{{ challenge.reward }}</h4>
                    </div>
                </li>
            </ul>
            <div v-if="!small" class="info">
                Repeatable without limits<br/>
                Modes: Quick Match, Competitive
            </div>
        </div>
        <div class="column">
            <div class="head">
                DAILY MISSIONS
            </div>
            <ul>
                <li
                    v-for="challenge in currentChallenges"
                    class="mission no-hover"
                >
                    <div class="repeats-icon">
                        <Tex
                            image="missionRepeat"

                            width="36px"
                            height="36px"
                            object-fit="contain"
                        />
                        <span>15</span>
                    </div>

                    <h3>{{ generateChallengeText(challenge.type, challenge.needed) }}</h3>
                    <div class="points">
                        <Tex
                            image="proficiency"
                            state="hover"

                            width="40px"
                            height="40px"
                            object-fit="contain"
                        />
                        <h4>{{ attenuateRewardPointsForDailyMission(challenge.reward, selectedRank) }}</h4>
                    </div>
                </li>
            </ul>
            <div v-if="!small" class="info">
                Repeatable up to <span>15x</span> every 24h; Resets 9:00:00 (UTC+0)<br/>
                Modes: Arcade (matchmaking)
            </div>
        </div>
    </div>
</template>

<style src="@/assets/style/components/mission-table.sass" scoped></style>

<script setup lang="ts">
import { CHALLENGE_TEXTS, NO_DAILY_POINTS_ATTENUATION_RANK_IDS, PROFICIENCY_RANKS, type Challenge, type HeroData, type ProficiencyRank } from '~/assets/data/common';
import type { TooltipBinding } from '~/directives/tooltip';

const props = defineProps<{
    hero: HeroData,
    small?: boolean,
    clickable?: boolean,
    missionHoverTooltip?: (rankId: string, challenge: Challenge, challengeIndex: number) => TooltipBinding
}>();

const emit = defineEmits<{
    itemClick: [ rankId: string, challenge: Challenge, challengeIndex: number ]
}>()

const selectedRank = defineModel<ProficiencyRank['id']>({ default: 'agent' });

const currentChallenges = computed(() => props.hero.ranks.find(
    r => r.type.id == selectedRank.value)?.challenges?.filter(Boolean) ?? [] as Challenge[]
);

function generateChallengeText(type: Challenge['type'], needed: number) {
    return CHALLENGE_TEXTS[type].replaceAll('%NEEDED%', needed.toLocaleString(undefined, {maximumFractionDigits: 0}));
}

function attenuateRewardPointsForDailyMission(reward: number, rank: ProficiencyRank['id']) {
    if (NO_DAILY_POINTS_ATTENUATION_RANK_IDS.includes(rank))
        return reward;

    return ((reward * 45) / 60).toFixed(0);
}

</script>