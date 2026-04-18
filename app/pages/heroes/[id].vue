<template>
    <div
        class="hero-page"
        :style="{
            '--hero-silhouette': `url(${hero.dataDir}silhouette.webp)`,
        }"
    >
        <nav>
            <div class="head">
                <NuxtLink class="back-arrow" :href="backLink">
                    <Tex
                        image="chevronLeft"
                        hover="color"
                        clickable

                        width="23px"
                        height="23px"
                        object-fit="contain"
                    />
                </NuxtLink>

                <div class="title">
                    <h1>{{ hero.name }}</h1>
                    <Tex
                        class="favourite"
                        image="favourite"
                        :state="isFavourite ? 'hover' : 'default'"
                        hover="auto"
                        clickable

                        width="45px"
                        height="45px"
                        object-fit="cover"

                        @click="toggleFavourite"
                    />
                </div>

                <div
                    class="menu warning-wrapper"
                    @click="menuOpen = !menuOpen"
                >
                    <Tex
                        :image="menuOpen ? 'cross' : 'hamburger'"
                        color="#fff"
                        hover="color"
                        hover-color="var(--color)"

                        clickable
                        :width="menuOpen ? 25 : 28"
                        height="25px"
                    />

                    <Tex
                        v-if="(
                                !storedLevel.openedCalculator
                             || !(hasAvgStats && !isLv1AndGoalLv1 && !isIncorrectSelection)
                            )
                            &&
                            !menuOpen
                        "
                        class="warning-bubble"
                        image="redDotExcl"

                        object-fit="contain"
                    />
                </div>
            </div>

            <ul :class="{visible: menuOpen}">
                <li
                    :class="{ selected: page == 'overview' }"
                    @click="setPage('overview')"
                >
                    Overview
                </li>
                <li
                    :class="{ 'warning-wrapper': 1, selected: page == 'customize' }"
                    @click="setPage('customize')"
                >
                    Customize

                    <ClientOnly>
                        <Tex
                            v-if="!(hasAvgStats && !isLv1AndGoalLv1 && !isIncorrectSelection)"
                            class="warning-bubble"
                            image="redDotExcl"

                            object-fit="contain"
                        />
                    </ClientOnly>
                </li>
                <li
                    :class="{ 'warning-wrapper': 1, selected: page == 'estimates' }"
                    @click="setPage('estimates')"
                >
                    Estimates

                    <ClientOnly>
                        <Tex
                            v-if="!storedLevel.openedCalculator"
                            class="warning-bubble"
                            image="redDotExcl"

                            object-fit="contain"
                        />
                    </ClientOnly>
                </li>
                <li
                    :class="{ selected: page == 'planner' }"
                    @click="setPage('planner')"
                >
                    Planner
                </li>
            </ul>
        </nav>

        <main>
            <div class="hero">
                <div class="prestige">
                    <div class="prestige-bg">
                        <Tex
                            class="prestige-bg-left"
                            image="prestigeLeftMask"
                            :color="changeColor(hero.color, 30)"

                            width="100%"
                            height="100%"
                        />
                        <Tex
                            class="prestige-bg-center"
                            image="prestigeBackgroundMask"
                            :color="`repeating-linear-gradient(-35deg, var(--hero-color-change), var(--hero-color-change) 4px, var(--hero-color) 4px, var(--hero-color) 8px)`"

                            width="100%"
                            height="100%"

                            :style="{
                                '--hero-color': hero.color,
                                '--hero-color-change': changeColor(hero.color, -6)
                            }"
                        />
                        <Tex
                            class="prestige-bg-right"
                            image="prestigeRightMask"
                            :color="changeColor(hero.color, -30)"

                            width="100%"
                            height="100%"
                        />
                    </div>

                    <img
                        class="logo"
                        :src="hero.dataDir + 'logo.webp'"
                    />

                    <div class="prestige-img-wrapper">
                        <img
                            class="prestige-img"
                            :src="hero.dataDir + 'prestige.webp'"
                        />
                    </div>
                </div>

                <ClientOnly>
                    <div class="player-level">
                        <div
                            v-if="showQuickEditPopup" 
                            class="popup"
                            :style="{
                                backgroundImage: texUrl('popup')
                            }"
                        >
                            <div class="message">
                                <p>
                                    <span>Change your rank</span> by pressing on the icon/name.
                                </p>
                                <p>
                                    Level up by pressing on &nbsp;<span>&#708; LV{{ currentRankComp.level }}</span>
                                </p>
                                <p>
                                    <span>Change your points</span> by pressing on the number or <span>dragging</span> the progress bar.
                                </p>
                            </div>

                            <Tex
                                class="close"
                                image="crossBlue"
                                color="var(--blue)"
                                @click.stop="showQuickEditPopup = false"
                            />
                        </div>

                        <div
                            class="current"
                            @click="selectCurrentLevel()"

                            v-tooltip="({
                                text: `Select <b>current level</b>`,
                                icon: 'mouseLeft'
                            } satisfies TooltipBinding)"
                        >
                            <div class="rank">
                                <div class="icon">
                                    <img :src="currentRankComp.rank.icon" />
                                </div>
                                <h2>{{ currentRankComp.rank.name }}</h2>
                            </div>
                            <div
                                :class="{ level: 1, 'can-level-up': canLevelUp.state }"
                                @click.stop="levelUp"
                                v-tooltip="canLevelUp.state ? ({
                                    text: `Level up`,
                                    icon: 'mouseLeft'
                                } satisfies TooltipBinding) : undefined"
                            >
                                <Tex
                                    v-if="canLevelUp.state"

                                    image="levelUp"

                                    color="var(--light-blue-highlight)"
                                    
                                    width="20px"
                                    height="20px"
                                />
                                LV{{ currentRankComp.level }}
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="points">
                                <Tex
                                    class="point-count"
                                    @click="editProficiencyPoints()"

                                    image="proficiency"
                                    hover="auto"
                                    clickable

                                    width="22px"
                                    height="22px"
                                    object-fit="contain"

                                    v-tooltip="({
                                        text: 'Set <b>proficiency points</b>',
                                        icon: 'mouseLeft'
                                    } satisfies TooltipBinding)"
                                >
                                    <p>
                                        {{ currentRankComp.points }}
                                        <span>/{{ currentRankComp.rank.xpPerLevel }}</span>
                                    </p>
                                </Tex>
                                <FormPointsSlider
                                    class="slider"
                                    :hero="hero"

                                    v-model="storedLevel.points"
                                />
                            </div>
                            <div
                                class="set warning-wrapper"
                                @click="modifyHeroData"
                                v-tooltip="({
                                    text: `${hero.name} <b>options</b>`,
                                    icon: 'mouseLeft'
                                } satisfies TooltipBinding)"
                            >
                                <Tex
                                    image="userCog"
                                    hover="auto"
                                    clickable

                                    width="40px"
                                    height="40px"
                                    object-fit="cover"
                                />

                                <Tex
                                    v-if="!hasAvgStats || isLv1AndGoalLv1 || unknownHeroHasPossibleMatch"
                                    class="warning-bubble"
                                    image="redDotExcl"

                                    object-fit="contain"
                                />

                                <div
                                    v-if="showEditPopup"
                                    class="popup"
                                    :style="{
                                        backgroundImage: texUrl('popupGoldDownRight')
                                    }"
                                >
                                    You can change your hero details from here too
                                    <Tex
                                        class="close"
                                        image="crossBlue"
                                        color="var(--blue)"
                                        @click.stop="showEditPopup = false"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ClientOnly>
            </div>

            <div
                v-if="page == 'overview'"
                class="content"
            >
                <PanelTabbedContainer class="tabbed-container" container-class="tab-container">
                    <template #rewards>
                        <PanelHeroProficiencyRewardList
                            :hero="hero"
                            :checked="obtainedRewards"
                            :selectedItemSpecial="true"
                            :selected-item="storedLevel.goal"

                            :tooltip="{
                                text: `Set as <b>goal</b>`,
                                icon: 'mouseLeft'
                            }"

                            @reward-click="setGoal"
                        />

                        <p>(You can select your goal by clicking on an item)</p>

                        <FormButton color-scheme="yellow" size="small" @click="setPage('estimates')">
                            SEE YOUR ESTIMATES
                        </FormButton>
                    </template>
                    <template #missions>
                        <PanelMissionTable
                            :hero="hero"
                            v-model="selectedRank"
                        />
                    </template>
                    <template v-if="stats.avgStats" #stats>
                        <div class="stats-container">
                            <h2>Generic Average Stats per 10 minutes</h2>
                            <ul class="stats with-border-decorations">
                                <li v-for="[statType, statValue] in Object.entries(stats.avgStats)">
                                    <img
                                        :src="CHALLENGE_ICONS[statType as Challenge['type']]!"
                                        :alt="`${CHALLENGE_ICONS[statType as Challenge['type']]!} Icon`"
                                    >
                                    <p>{{ CHALLENGE_NAMES[statType as Challenge['type']]! }}</p>
                                    <p class="stat-value">{{ statValue.toLocaleString(undefined, { maximumFractionDigits: 1 }) }}</p>
                                </li>
                            </ul>
                            <h3>DATA FROM <span>{{ stats.matchCount.toLocaleString() }}</span> MATCHES</h3>

                            <template v-if="hasAvgStats">
                                <ClientOnly>
                                    <h2>Your Average Stats per 10 minutes</h2>
                                    <ul class="stats with-border-decorations">
                                        <li v-for="[statType, statValue] in Object.entries(storedLevel.averageStats).filter(([t]) => t != 'play')">
                                            <img
                                                :src="CHALLENGE_ICONS[statType as Challenge['type']]!"
                                                :alt="`${CHALLENGE_ICONS[statType as Challenge['type']]!} Icon`"
                                            >
                                            <p>{{ CHALLENGE_NAMES[statType as Challenge['type']]! }}</p>
                                            <p class="stat-value">{{ statValue.toLocaleString(undefined, { maximumFractionDigits: 1 }) }}</p>
                                        </li>
                                    </ul>
                                    <FormButton size="small" @click="editAvgStats()">
                                        <Tex
                                            image="gameTime"
                                            color="var(--dark)"

                                            width="40px"
                                            height="40px"
                                        />
                                        CHANGE YOUR STATS
                                    </FormButton>
                                </ClientOnly>
                            </template>
                            <FormButton v-else size="small" @click="editAvgStats()">
                                <Tex
                                    image="gameTime"
                                    color="var(--dark)"

                                    width="40px"
                                    height="40px"
                                />
                                ADD YOUR OWN STATS
                            </FormButton>
                        </div>
                    </template>
                </PanelTabbedContainer>
            </div>
            <div
                v-else-if="page == 'customize'"
                class="content update-stats"
            >
                <ModifyHeroData
                    class="update-stats-modal"
                    :hero="hero"
                    :is-unknown-hero="isUnknownHero"

                    headless
                    @confirm="openWhereModal($event, false)"
                />
            </div>
            <div
                v-else-if="page == 'estimates'"
                class="content"
            >
                <PanelTabbedContainer
                    class="tabbed-container"
                    container-class="tab-container"

                    :slot-labels="{
                        normal: 'QUICK/COMP',
                        arcade: 'ARCADE (18V18)'
                    }"
                >
                    <template #normal>
                        <PanelCalculator
                            v-if="hasAvgStats && !isLv1AndGoalLv1 && !isIncorrectSelection"

                            :hero="hero"
                            :level="storedLevel"
                            :time-estimates="timeEstimates.normal"
                            :time-estimates-arcade="timeEstimates.arcade"

                            :animate="!finishedAnimation"

                            @finished-animation="finishedAnimation = true"
                        />

                        <PanelSetupCalculator
                            v-else
                            :hero="hero"
                            :level="storedLevel"
                            :has-avg-stats="hasAvgStats"
                            :is-lv1-and-goal-lv1="isLv1AndGoalLv1"
                            :is-incorrect-selection="isIncorrectSelection"

                            @open-stats-menu="editAvgStats()"
                            @open-goal-menu="selectLevelGoal(tryShowEditPopup, true)"
                            @open-level-menu="selectCurrentLevel()"
                        />
                    </template>
                    <template #arcade>
                        <PanelCalculator
                            v-if="hasAvgArcadeStats && !isLv1AndGoalLv1 && !isIncorrectSelection"

                            :hero="hero"
                            :level="storedLevel"
                            :time-estimates="timeEstimates.normal"
                            :time-estimates-arcade="timeEstimates.arcade"
                            selected-game-type="arcade"

                            :animate="!finishedAnimation"

                            @finished-animation="finishedAnimation = true"
                        />

                        <!-- ARCADE SETUP -->
                        <PanelSetupCalculator
                            v-else
                            :hero="hero"
                            :level="storedLevel"
                            :has-avg-stats="hasAvgStats"
                            :is-lv1-and-goal-lv1="isLv1AndGoalLv1"
                            :is-incorrect-selection="isIncorrectSelection"

                            arcade
                            :has-avg-arcade-stats="hasAvgArcadeStats"

                            @open-stats-menu="editAvgStats(undefined, undefined, true)"
                            @open-goal-menu="selectLevelGoal(tryShowEditPopup, true)"
                            @open-level-menu="selectCurrentLevel()"
                        />
                    </template>
                </PanelTabbedContainer>
            </div>

            <div
                v-else-if="page == 'planner'"
                class="content planner-wrapper"
            >
                <PanelPlanner
                    v-if="hasAvgStats && !isLv1AndGoalLv1 && !isIncorrectSelection"

                    :hero="hero"
                    v-model="storedLevel"
                    :time-estimates="timeEstimates.normal"
                    :time-estimates-arcade="timeEstimates.arcade"
                />
                <PanelSetupCalculator
                    v-else
                    :hero="hero"
                    :level="storedLevel"
                    :has-avg-stats="hasAvgStats"
                    :is-lv1-and-goal-lv1="isLv1AndGoalLv1"
                    :is-incorrect-selection="isIncorrectSelection"
                    headless

                    @open-stats-menu="editAvgStats()"
                    @open-goal-menu="selectLevelGoal(tryShowEditPopup, true)"
                    @open-level-menu="selectCurrentLevel()"
                />
            </div>
        </main>
    </div>
</template>

<style src="@/assets/style/pages/heroes/id.sass" scoped></style>

<script setup lang="ts">
import { useModalManager } from '#imports';
import { CHALLENGE_ICONS, CHALLENGE_NAMES, DEFAULT_HERO_STORE, DEFAULT_PREFERENCES_STORE, getAverageStatsForHero, getHeroMatchCount, levelToRank, PROFICIENCY_RANKS, replaceRewardPlaceholders, type Challenge, type PlayerHeroStore, type PreferencesStore, type ProficiencyRank, type Reward } from '~/assets/data/common';
import { createHero, deleteHero, editHero, HERO_LIST, UNKNOWN_HERO } from '~/assets/data/heroes';
import AverageStatsModal from '~/components/modals/AverageStatsModal.vue';
import ListSelect from '~/components/modals/ListSelect.vue';
import ModifyHeroData from '~/components/modals/ModifyHeroData.vue';
import { changeColor } from '~/utils/util';
import { type HeroData } from '../../assets/data/common';
import { Calculator } from '~/services/calculator';
import { tex, texUrl } from '~/assets/data/textures';
import ConfigureHeroModal from '~/components/modals/ConfigureHeroModal.vue';
import ConfirmModal from '~/components/modals/ConfirmModal.vue';
import { useAbsoluteUrl } from '~/composables/config';
import ConvertUnknownHeroModal from '~/components/modals/ConvertUnknownHeroModal.vue';
import ProficiencyPointsModal from '~/components/modals/ProficiencyPointsModal.vue';
import type { TooltipBinding } from '~/directives/tooltip';

const { openModal } = useModalManager();
const { notify } = useNotificationManager();

const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);

const router = useRouter();
const route = useRoute();
const heroId = route.params.id;
const unknownHero = unknownHeroes.value.find(h => h.id === heroId);
const hero = ref<HeroData>(HERO_LIST.find(h => h.id === heroId) ?? unknownHero!);

const isUnknownHero = computed(() => !!unknownHero);

const backLink = computed(() => (route.query?.from as string) ?? '/heroes');

// new hero
if (heroId == 'new') {
    // to not crash the page
    hero.value = UNKNOWN_HERO();

    function errorNotify() {
        notify(
            `An unexpected error occured and we couldn't save the hero's data.`,
            3000,
            { image: 'warning', color: '#c94f36' }
        );
    }

    openModal(ConfigureHeroModal, {
        title: 'Set Up Hero',
        message: 'In case this tool is no longer updated, you can add new heroes through this interface.'
    })
    .promise
    .then((hero: HeroData) => {
        if (!hero || !hero.id) {
            errorNotify();
            router.push(backLink.value);
            return;
        }

        // add hero to local storage or route back on error
        if (!createHero(hero)) {
            errorNotify();
            router.push(backLink.value);
            return;
        }

        notify(
            `Hero created successfully!`,
            3000,
            { image: 'check', color: '#458a14' }
        );

        // success, route to new hero
        router.push('/heroes/' + hero.id);
    })
    .catch(() => {
        let backLink = '/heroes';
        if (route.query?.from)
            backLink = route.query.from as string;

        router.push(backLink);
    })
}

if (!hero.value)
    throw createError({ statusCode: 404, message: `Hero doesn't exist!`, stack: `` });

useSeoMeta({
    title: `${hero.value.name} | MR Proficiency Calculator`,
    description: `Calculate proficiency rewards and plan your grind for ${hero.value.name} in Marvel Rivals.`,

    ogTitle: `${hero.value.name} | MR Proficiency Calculator`,
    ogUrl: useAbsoluteUrl('heroes', hero.value.id),
    ogImage: useAbsoluteUrl('/img/seo/og-image-heroes.webp'),
    ogImageWidth: '1200',
    ogImageHeight: '630',
    ogImageAlt: 'Heroes | Marvel Rivals Proficiency Calculator - Calculate how long it takes to unlock every proficiency reward for any hero',

    twitterTitle: 'Heroes | MR Proficiency Calculator',
    twitterDescription: 'Browse all Marvel Rivals heroes and calculate proficiency rewards.',
    twitterImage: useAbsoluteUrl('/img/seo/og-image-heroes.webp'),
    twitterImageAlt: 'Heroes | Marvel Rivals Proficiency Calculator - Calculate how long it takes to unlock every proficiency reward for any hero',
});

const menuOpen = ref(false);

const stats = computed(() => {
    const matchCount = getHeroMatchCount(hero.value.id);
    const avgStats = getAverageStatsForHero(hero.value.id);

    return {
        matchCount,
        avgStats
    }
})

const preferences = useLocalStorage<PreferencesStore>('preferences', DEFAULT_PREFERENCES_STORE());

const favourites = useLocalStorage<HeroData['id'][]>(`favourite_heroes`, []);
const isFavourite = computed(() => favourites.value.includes(hero.value.id));
function toggleFavourite() {
    if (!hero.value)
        return;

    if (isFavourite.value) {
        favourites.value.splice(favourites.value.indexOf(hero.value.id), 1);

        notify(
            `Removed <b>${hero.value.name}</b> from your favourites`,
            3000, 
            { image: 'favourite', color: 'var(--color)' }
        );
    }
    else {
        favourites.value.push(hero.value.id);

        notify(
            `Added <b>${hero.value.name}</b> to your favourites`,
            3000, 
            { image: 'favourite', color: 'var(--color)' }
        );
    }
}

const storedLevel = useLocalStorage<PlayerHeroStore>(`hero_${hero.value.id}`, DEFAULT_HERO_STORE());
const hasAvgStats = useHasAvgStats(hero);
const hasAvgArcadeStats = useHasAvgArcadeStats(hero);
const isLv1AndGoalLv1 = computed(() => storedLevel.value.level == 1 && storedLevel.value.goal == 1);
const unknownHeroHasPossibleMatch = useUnknownHeroHasPossibleMatch(hero.value).value.length;
const isIncorrectSelection = computed(() => storedLevel.value.goal <= storedLevel.value.level);

type PageId = 'overview'|'customize'|'estimates'|'planner';
const page = ref<PageId>('overview');
function setPage(newPage: PageId) {
    page.value = newPage;
    menuOpen.value = false;

    if (newPage == 'estimates' && !storedLevel.value.openedCalculator)
        storedLevel.value.openedCalculator = true;
    if (newPage == 'customize')
        tryShowEditPopup();
}

const selectedRank = ref<ProficiencyRank['id']>(storedLevel.value.rank);

const obtainedRewards = computed(() => {
    const checkedLevels: number[] = [];
    ranksLoop: for (const rank of hero.value.ranks)
        for (const reward of rank.type.rewards) {
            if (reward.level > storedLevel.value.level)
                break ranksLoop;

            checkedLevels.push(reward.level)
        }

    return checkedLevels;
});

const currentRankComp = computed(() => {
    return { 
        rank: PROFICIENCY_RANKS[storedLevel.value.rank] ?? PROFICIENCY_RANKS.agent!,
        level: storedLevel.value.level,
        points: storedLevel.value.points
    };
});

const finishedAnimation = ref(false);

const canLevelUp = computed(() => {
    const level = storedLevel.value.level;
    const maxRank = Object.values(PROFICIENCY_RANKS).at(-1)!;

    return { state: level + 1 <= maxRank.levelEnd, level };
})
function levelUp() {
    if (!canLevelUp.value.state)
        return;

    setLevel(canLevelUp.value.level + 1);

    storedLevel.value.points = 0;

    notify(
        `Leveled up to LV${canLevelUp.value.level}!`,
        2000, 
        { image: 'levelUp', width: 20, height: 20, color: 'var(--color)' }
    );
}

function setLevel(level: number) {
    storedLevel.value.level = level;
    storedLevel.value.rank = levelToRank(level)?.id ?? PROFICIENCY_RANKS.agent!.id;
    if (storedLevel.value.points > PROFICIENCY_RANKS[storedLevel.value.rank]!.xpPerLevel)
        storedLevel.value.points = PROFICIENCY_RANKS[storedLevel.value.rank]!.xpPerLevel - 1;

    selectedRank.value = storedLevel.value.rank;
}

function openWhereModal(where: string, returnToModal = true) {
    if (where == 'proficiency-points')
        editProficiencyPoints(returnToModal ? modifyHeroData : undefined);
    else if (where == 'level')
        selectCurrentLevel(returnToModal ? modifyHeroData : undefined);
    else if (where == 'stats')
        editAvgStats(returnToModal ? modifyHeroData : undefined);
    else if (where == 'goal')
        selectLevelGoal(returnToModal ? modifyHeroData : undefined);
    else if (where == 'edit-unknown-hero')
        editUnknownHero(returnToModal ? modifyHeroData : undefined);
    else if (where == 'convert-unknown-hero')
        convertUnknownHero(returnToModal ? modifyHeroData : undefined);
    else if (where == 'delete-unknown-hero')
        deleteUnknownHero(returnToModal ? modifyHeroData : undefined);
}

function modifyHeroData() {
    openModal(ModifyHeroData, {
        title: 'Update your stats',
        hero: hero.value,
        isUnknownHero: isUnknownHero.value
    })
    .promise
    .then(openWhereModal)
    .catch(() => null)
}

function selectCurrentLevel(callback = () => {}, callbackOnSuccess = false) {
    openModal(ListSelect, {
        title: 'Select your current level',
        hero: hero.value,
        showAllLevels: true,
        currentLevel: storedLevel.value.level
    })
    .promise
    .then((level: number) => {
        setLevel(level);

        notify(
            `Updated your level!`,
            2000, 
            { image: 'check', width: 20, height: 20, color: 'var(--color)' }
        );

        if (callbackOnSuccess)
            callback();
    })
    .catch(callback);
}

function editProficiencyPoints(callback = () => {}, callbackOnSuccess = false) {
    openModal(ProficiencyPointsModal, {
        title: 'Edit your proficiency points',
        inputPlaceholder: 'Type your points...',
        inputValue: storedLevel.value.points,
        numberInput: {
            step: 50,
            min: 0,
            max: currentRankComp.value.rank.xpPerLevel - 1
        },

        hero
    })
    .promise
    .then((points: number) => {
        points = parseFloat(points as any) || 0;

        if (points < 0)
            points = 0;
        if (points > currentRankComp.value.rank.xpPerLevel)
            points = currentRankComp.value.rank.xpPerLevel - 1;

        storedLevel.value.points = points;

        notify(
            `Updated your proficiency points!`,
            2000, 
            { image: 'proficiency', state: 'hover' }
        );

        if (callbackOnSuccess)
            callback();
    })
    .catch(callback);
}

function editAvgStats(callback = () => {}, callbackOnSuccess = false, arcade = false) {
    openModal<{stats: Record<string, string>, statsArcade: Record<string, string>}>(AverageStatsModal, {
        title: 'Set your average stats',
        message: 'Input your Avg/10 Mins stats to get accurate time spans to get your desired rewards!',
        hero: hero.value,
        tab: arcade ? 'arcade' : undefined,

        stats: storedLevel.value.averageStats,
        arcadeStats: storedLevel.value.averageStatsArcade
    })
    .promise
    .then(({stats, statsArcade}) => {
        const parsedStats: Record<string, number> = {};
        Object.entries(stats).forEach(([type, value]) => parsedStats[type] = parseFloat(value) || 0);

        const parsedStatsArcade: Record<string, number> = {};
        Object.entries(statsArcade).forEach(([type, value]) => {
            if (type == 'play') {
                parsedStatsArcade[type] = 0;

                return;
            }

            const parsedValue = parseFloat(value);
            if (!parsedValue || isNaN(parsedValue))
                return;

            parsedStatsArcade[type] = parsedValue;
        });

        storedLevel.value.averageStats = parsedStats;
        storedLevel.value.averageStatsArcade = parsedStatsArcade;

        notify(
            `Updated your average stats!`,
            2000, 
            { image: 'gameTime', color: 'var(--color)' }
        );

        if (callbackOnSuccess)
            callback();
    })
    .catch(callback)
}

function selectLevelGoal(callback = () => {}, callbackOnSuccess = false) {
    openModal(ListSelect, {
        title: 'Set your level/reward goal!',
        hero: hero.value,
        showAllLevels: true,
        currentLevel: storedLevel.value.goal
    })
    .promise
    .then((level: number) => {
        setGoal(level);

        if (callbackOnSuccess)
            callback();
    })
    .catch(callback)
}

function editUnknownHero(callback = () => {}, callbackOnSuccess = false) {
    const currentId = `${hero.value.id}`

    function errorNotify() {
        notify(
            `An unexpected error occured and we couldn't save the hero's data.`,
            3000,
            { image: 'warning', color: '#c94f36' }
        );
    }

    openModal(ConfigureHeroModal, {
        title: 'Edit Hero',
        message: 'Edit the custom hero\'s properties',
        hero: structuredClone(extractRawValue(hero))
    })
    .promise
    .then((editedHero: HeroData) => {
        if (!editedHero || !editedHero.id) {
            errorNotify();
            return;
        }

        // add hero to local storage or route back on error
        if (!editHero(currentId, editedHero)) {
            errorNotify();
            return;
        }

        if (callbackOnSuccess)
            callback();

        hero.value = editedHero as HeroData;

        notify(
            `Hero data edited successfully!`,
            3000,
            { image: 'check', color: '#458a14' }
        );

        // success, route to new hero if id changed
        if (currentId != editedHero.id)
            router.replace('/heroes/' + editedHero.id);
    })
    .catch(callback)
}

function convertUnknownHero(callback = () => {}, callbackOnSuccess = false) {
    openModal(ConvertUnknownHeroModal, {
        title: 'Convert Hero',
        message: 'Moves your stats and progression to an existing hero <br/> <i>(use this when heroes you added manually have been added officially to the calulcator)</i>',
        hero: structuredClone(extractRawValue(hero))
    })
    .promise
    .then((heroId: string) => {
        const officialHero = HERO_LIST.find(h => h.id == heroId)

        if (!officialHero) {
            notify(
                `An unexpected error occured. We couldn't find the target hero.`,
                3000,
                { image: 'warning', color: '#c94f36' }
            );

            return;
        }

        // check missions
        const matchesMissions = !officialHero.ranks[0]?.challenges.some(c =>
            !hero.value.ranks[0]?.challenges.some(hc => hc.type === c.type)
        );

        if (!matchesMissions) {
            notify(
                `Conversion failed. Missions of the custom hero don't match those of the target hero.`,
                5000,
                { image: 'warning', color: '#c94f36' }
            );

            return;
        }

        if (isFavourite.value) {
            const favIndex = favourites.value.indexOf(hero.value.id);
            favourites.value.splice(favIndex, 1);

            if (!favourites.value.includes(heroId))
                favourites.value.push(heroId);
        }

        changeLocalStorageKey(`hero_${hero.value.id}`, `hero_${heroId}`);
        deleteFromLocalStorage(`hero_${hero.value.id}`);
        deleteHero(hero.value.id);

        if (callbackOnSuccess)
            callback();

        notify(
            `Hero converted successfully!`,
            3000,
            { image: 'check', color: '#458a14' }
        );

        // success, route to new hero
        router.replace('/heroes/' + heroId);
    })
    .catch(callback)
}

function deleteUnknownHero(callback = () => {}, callbackOnSuccess = false) {
    openModal(ConfirmModal, {
        title: 'Delete Hero',
        message: 'Are you sure you want to delete this hero? This action is irreversible.',
    })
    .promise
    .then(() => {
        deleteHero(hero.value.id);

        if (callbackOnSuccess)
            callback();

        notify(
            `Hero deleted successfully!`,
            3000,
            { image: 'check', color: '#458a14' }
        );
        
        router.push('/heroes')
    })
    .catch(callback)
}

const showEditPopup = ref(false);
const showQuickEditPopup = ref(false);
watch(showQuickEditPopup, (value) => {
    if (value)
        return;

    // show next popup
    tryShowEditPopup();
});
function tryShowEditPopup() {
    if (!preferences.value.sawHeroQuickEditPopup) {
        preferences.value.sawHeroQuickEditPopup = true;

        showQuickEditPopup.value = true;
        return;
    }

    if (preferences.value.sawHeroEditPopup)
        return;

    preferences.value.sawHeroEditPopup = true;

    showEditPopup.value = true;
    setTimeout(() => 
        showEditPopup.value = false
    , 5000);
}

function setGoal(level: number) {
    storedLevel.value.goal = level;

    let reward: Reward = {
        icon: tex('none'),
        level,
        name: 'No Reward',
    };
    for (const rank of hero.value.ranks) {
        const tryFind = rank.type.rewards.find(r => r.level == level);

        if (tryFind) {
            reward = tryFind;
            break;
        }
    }

    const rewardName = replaceRewardPlaceholders(reward.name, hero.value);

    notify(
        `Selected <b>LV${level}</b> <i>[${rewardName}]</i> as your goal!`, 
        3000, 
        { image: 'target', color: 'var(--color)' }
    );
}


// ==== CALCULATOR =====
const timeEstimates = computed(() => {
    const calculator = new Calculator(hero.value, storedLevel.value);

    const arcade = hasAvgArcadeStats.value ? calculator.totalTimes(true) : undefined;

    return { normal: calculator.totalTimes(), arcade };
});

</script>