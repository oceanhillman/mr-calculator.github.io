<template>
    <div
        class="hero-page"
        :style="{
            '--hero-silhouette': `url(${hero.dataDir}silhouette.webp)`,
        }"
    >
        <nav>
            <div class="head">
                <NuxtLink class="back-arrow" href="/heroes">
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
            </div>
            <div
                class="menu warning-wrapper"
                @click="setPage(page == 'overview' ? 'calculator' : 'overview')"
            >
                <img
                    class="menu-icon"
                    :src="page == 'overview' ? tex('calculator') : tex('hamburger')"
                />

                <Tex
                    v-if="!storedLevel.openedCalculator"
                    class="warning-bubble"
                    image="redDotExcl"

                    object-fit="contain"
                />
            </div>
            <!-- @click="menuOpen = !menuOpen" -->

            <!-- :class="{visible: menuOpen}" -->
            <ul>
                <li
                    :class="{ selected: page == 'overview' }"
                    @click="setPage('overview')"
                >
                    Overview
                </li>
                <li
                    :class="{ 'warning-wrapper': 1, selected: page == 'calculator' }"
                    @click="setPage('calculator')"
                >
                    Calculator

                    <Tex
                        v-if="!storedLevel.openedCalculator"
                        class="warning-bubble"
                        image="redDotExcl"

                        object-fit="contain"
                    />
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

                <div class="player-level">
                    <div class="current">
                        <div class="rank">
                            <div class="icon">
                                <img :src="currentRankComp.rank.icon" />
                            </div>
                            <h2>{{ currentRankComp.rank.name }}</h2>
                        </div>
                        <div class="level">
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
                            >
                                <p>
                                    {{ currentRankComp.points }}
                                    <span>/{{ currentRankComp.rank.xpPerLevel }}</span>
                                </p>
                            </Tex>
                            <div
                                class="progress-bar"
                                :style="{
                                    '--progress': (
                                        currentRankComp.points / currentRankComp.rank.xpPerLevel * 100
                                    ) + '%'
                                }"
                            >
                                <div class="inner" />
                            </div>
                        </div>
                        <div class="set warning-wrapper" @click="modifyHeroData">
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
                                You can change your hero details from here
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

                            @reward-click="setGoal"
                        />

                        <p>(You can select your goal by clicking on an item)</p>

                        <FormButton color-scheme="yellow" size="small" @click="setPage('calculator')">
                            SEE YOUR ESTIMATES
                        </FormButton>
                    </template>
                    <template #missions>
                        <PanelMissionTable
                            :hero="hero"
                            v-model="selectedRank"
                        />
                    </template>
                </PanelTabbedContainer>
            </div>
            <div
                v-else-if="page == 'calculator'"
                class="content"
            >
                <PanelTabbedContainer class="tabbed-container" container-class="tab-container">
                    <template #estimates>
                        <PanelCalculator
                            v-if="hasAvgStats && !isLv1AndGoalLv1 && !isIncorrectSelection"

                            :hero="hero"
                            :level="storedLevel"
                            :time-estimates="timeEstimates"

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
                    <template #planner>
                        <PanelPlanner
                            v-if="hasAvgStats && !isLv1AndGoalLv1 && !isIncorrectSelection"

                            :hero="hero"
                            v-model="storedLevel"
                            :time-estimates="timeEstimates"
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
                </PanelTabbedContainer>
            </div>
        </main>
    </div>
</template>

<style src="@/assets/style/pages/heroes/id.sass" scoped></style>

<script setup lang="ts">
import { useModalManager } from '#imports';
import { DEFAULT_HERO_STORE, DEFAULT_PREFERENCES_STORE, levelToRank, PROFICIENCY_RANKS, replaceRewardPlaceholders, type PlayerHeroStore, type PreferencesStore, type ProficiencyRank, type Reward } from '~/assets/data/common';
import { createHero, deleteHero, editHero, HERO_LIST, UNKNOWN_HERO } from '~/assets/data/heroes';
import AverageStatsModal from '~/components/modals/AverageStatsModal.vue';
import InputModal from '~/components/modals/InputModal.vue';
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

const { openModal } = useModalManager();
const { notify } = useNotificationManager();

const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);

const router = useRouter();
const route = useRoute();
const heroId = route.params.id;
const unknownHero = unknownHeroes.value.find(h => h.id === heroId);
const hero = ref<HeroData>(HERO_LIST.find(h => h.id === heroId) ?? unknownHero!);

const isUnknownHero = computed(() => !!unknownHero);

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
        let backLink = '/heroes';
        if (route.query?.from)
            backLink = route.query.from as string;

        if (!hero || !hero.id) {
            errorNotify();
            router.push(backLink);
            return;
        }

        // add hero to local storage or route back on error
        if (!createHero(hero)) {
            errorNotify();
            router.push(backLink);
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
const isLv1AndGoalLv1 = computed(() => storedLevel.value.level == 1 && storedLevel.value.goal == 1);
const unknownHeroHasPossibleMatch = useUnknownHeroHasPossibleMatch(hero.value).value.length;
const isIncorrectSelection = computed(() => storedLevel.value.goal <= storedLevel.value.level);

const page = ref<'overview'|'calculator'>('overview');
function setPage(newPage: 'overview'|'calculator') {
    page.value = newPage;
    menuOpen.value = false;

    if (newPage == 'calculator' && !storedLevel.value.openedCalculator) {
        storedLevel.value.openedCalculator = true;
    }
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

function modifyHeroData() {
    openModal(ModifyHeroData, {
        title: 'Update your stats',
        hero: hero.value,
        isUnknownHero: isUnknownHero.value
    })
    .promise
    .then(where => {
        if (where == 'proficiency-points')
            editProficiencyPoints(modifyHeroData);
        else if (where == 'level')
            selectCurrentLevel(modifyHeroData);
        else if (where == 'stats')
            editAvgStats(modifyHeroData);
        else if (where == 'goal')
            selectLevelGoal(modifyHeroData);
        else if (where == 'edit-unknown-hero')
            editUnknownHero(modifyHeroData);
        else if (where == 'convert-unknown-hero')
            convertUnknownHero(modifyHeroData);
        else if (where == 'delete-unknown-hero')
            deleteUnknownHero(modifyHeroData);
    })
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
        storedLevel.value.level = level;
        storedLevel.value.rank = levelToRank(level)?.id ?? PROFICIENCY_RANKS.agent!.id;
        if (storedLevel.value.points > PROFICIENCY_RANKS[storedLevel.value.rank]!.xpPerLevel)
            storedLevel.value.points = PROFICIENCY_RANKS[storedLevel.value.rank]!.xpPerLevel - 1;

        selectedRank.value = storedLevel.value.rank;

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
    openModal(InputModal, {
        title: 'Edit your proficiency points',
        inputPlaceholder: 'Type your points...',
        inputValue: storedLevel.value.points,
        numberInput: {
            step: 50,
            min: 0,
            max: currentRankComp.value.rank.xpPerLevel - 1
        }
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

function editAvgStats(callback = () => {}, callbackOnSuccess = false) {
    openModal(AverageStatsModal, {
        title: 'Set your average stats',
        message: 'Input your Avg/10 Mins stats to get accurate time spans to get your desired rewards!',
        hero: hero.value,

        stats: storedLevel.value.averageStats
    })
    .promise
    .then((stats: Record<string, string>) => {
        const parsedStats: Record<string, number> = {};
        Object.entries(stats).forEach(([type, value]) => parsedStats[type] = parseFloat(value) || 0);

        storedLevel.value.averageStats = parsedStats;

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
function tryShowEditPopup() {
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

    return calculator.totalTimes();
});

</script>