<template>
    <div
        :class="{'hero-card': 1, favourite: isFavourite || isChecked}"
        :style="{
            '--bg-color': color
        }"
    >
        <Tex
            class="bg"
            image="heroCardBackground"

            width="100%"
            height="100%"
            object-fit="cover"
        />
        <img
            class="hero-image"
            :src="portrait"
        />
        <Tex
            class="favourite-bg"
            image="heroCardBorder"

            width="100%"
            height="100%"
        />
        <Tex
            class="favourite-check"
            :image="isChecked ? 'checkCorner' : 'favouriteCorner'"

            width="45px"
            height="45px"
        />
        
        <div class="info">
            <div class="name">
                <div class="rank-icon-wrapper">
                    <img v-if="rankDetails" :src="rankDetails.icon" />
                </div>
                <h3>{{ name }}</h3>
            </div>
            <ul class="classes">
                <li
                    v-if="(typeof roles !== 'string')"
                    v-for="role in roles"
                    :key="role"
                >
                    <img :src="ROLE_ICONS[role]">
                </li>
                <li
                    v-else
                >
                    <img :src="ROLE_ICONS[roles]">
                </li>
            </ul>
        </div>
    </div>
</template>

<style src="@/assets/style/components/hero-card.sass" scoped></style>

<script setup lang="ts">
import { 
    PROFICIENCY_RANKS,
    ROLE_ICONS,
    type
    HeroData,
    type
    HeroRole,
    type ProficiencyRank 
} from '~/assets/data/common';

const props = defineProps<{
    id: HeroData['id'],
    name: HeroData['name'],
    roles: HeroData['roles'],
    color: HeroData['color'],
    portrait: string,

    isFavourite: boolean,
    isChecked?: boolean,
    rank?: ProficiencyRank['id']
}>();

const rankDetails = computed(() => {
    if (!props.rank)
        return null;

    return PROFICIENCY_RANKS[props.rank];
});

</script>