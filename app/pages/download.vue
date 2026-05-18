<template>
    <div class="common-page">
        <NuxtLink to="/" class="logo-standalone">
            <Tex
                image="logo"

                width="50px"
                height="50px"

                object-fit="contain"
            />
        </NuxtLink>
        <main class="content masked">
            <div class="mask-wrapper">
                <div class="scroll-container">
                    <h1>
                        Download your data
                    </h1>
                    <h2>You have data for the following heroes:</h2>
                    <ul class="heroes">
                        <li :class="{selected: selectedHero == null}" @click="clickHero(null)">
                            <div class="icon">
                                <img :src="tex('allHeroesIcon')" />
                            </div>
                        </li>
                        <li
                            v-for="hero in heroesWithData"
                            :class="{selected: selectedHero == hero.hero.id}"
                            :title="hero.hero.name"

                            @click="clickHero(hero.hero.id)"
                        >
                            <div
                                v-if="hero.isFavourite"
                                class="favourite"
                            >
                                <Tex
                                    image="favouriteCorner"

                                    width="35px"
                                    height="35px"
                                />
                            </div>
                            <div class="icon">
                                <img :src="`${hero.hero.dataDir}head.webp`" />
                            </div>
                            <div
                                v-if="hero.rank?.icon && hero.rank.id != 'agent'"
                                class="badge"
                            >
                                <img :src="hero.rank?.icon" />
                            </div>
                        </li>
                    </ul>
                    <div
                        :class="{expandable: 1, active: dataExpanded}"
                        @click="closeDataDisplay"
                    >
                        <h2>
                            {{ !selectedHero ?
                                (dataExpanded ? 'Hide your raw data' : 'View your raw data')
                                :
                                (dataExpanded ? `Hide ${selectedHeroData?.possesiveName} raw data` : `View ${selectedHeroData?.possesiveName} raw data`)
                            }}
                        </h2>
                        <Tex
                            :image="dataExpanded ? 'chevronUp' : 'chevronDown'"
                            color="var(--blue)"

                            width="18px"
                            height="18px"
                            object-fit="contain"
                        />
                    </div>
                    <div v-if="dataExpanded" class="data-display">
                        <Tex
                            class="copy"
                            image="copy"
                            hover="color"
                            hover-color="var(--light-blue)"

                            width="30px"
                            height="30px"

                            clickable
                            square

                            @click="copyData"
                        />
                        <div class="scroll-container">
                            <PanelJSONDisplay
                                class="json-display"
                                :code="!!selectedHero ? heroData : allData"
                            />
                        </div>
                    </div>
                    <ul class="options">
                        <li v-if="!selectedHero">
                            <FormCheckbox
                                v-model="includeUnknownHeroes"

                                small
                            >
                                <h4>Include added heroes</h4>
                            </FormCheckbox>
                        </li>
                        <li>
                            <FormCheckbox
                                v-model="includeFavourites"

                                small
                            >
                                <h4 v-if="!selectedHero">Include favourite heroes</h4>
                                <h4 v-else>Include favourite status</h4>
                            </FormCheckbox>
                        </li>
                        <li>
                            <FormCheckbox
                                v-model="includeAchievements"

                                small
                            >
                                <h4 v-if="!selectedHero">Include achievements progress</h4>
                                <h4 v-else>Include this hero's achievements progress</h4>
                            </FormCheckbox>
                        </li>
                        <li v-if="!selectedHero">
                            <FormCheckbox
                                v-model="includePreferences"

                                small
                            >
                                <h4>Include preferences</h4>
                            </FormCheckbox>
                        </li>
                    </ul>
                    <div class="buttons">
                        <FormButton
                            v-if="selectedHero"
                            size="small"

                            @click="downloadHeroData"
                        >
                            DOWNLOAD {{ selectedHeroData?.possesiveName }} DATA
                        </FormButton>
                        <FormButton
                            size="small"

                            @click="downloadData"
                        >
                            {{ !!selectedHero ? `DOWNLOAD ALL DATA` : `DOWNLOAD MY DATA` }}

                            <Tex
                                image="download"
                                color="var(--text-color)"

                                width="25px"
                                height="25px"
                            />
                        </FormButton>
                    </div>

                    <p>
                        You can import the data into the calculator on any other device
                        <NuxtLink to="/import">here</NuxtLink>.
                    </p>

                    <br/>
                    <p v-if="hasData">
                        You can also <u @click="deleteData">delete your data</u>.
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="sass" scoped>
.heroes
    $width: 900px
    width: $width

    display: flex
    flex-wrap: wrap
    justify-content: start
    align-items: center
    gap: 10px

    margin-top: 10px

    +media-mobile
        width: 100%

        justify-content: center

    li
        position: relative
        cursor: pointer

        &:hover,
        &.selected
            .icon
                border: 3px solid $color

        .favourite
            position: absolute
            top: 0
            right: 0

            pointer-events: none

        .icon
            width: calc(($width - 70px) / 8)
            height: calc(($width - 70px) / 8)

            border: 3px solid $light-blue
            background: color-mix(in srgb, $light-blue-highlight 60%, white)

            img
                display: block
                width: 100%
                height: 100%

                object-fit: cover

                user-select: none

        .badge
            position: absolute
            bottom: 0
            left: 0

            width: 40px
            height: 40px

            transform: translate(-35%, 50%)

            img
                display: block
                width: 100%
                height: 100%

                object-fit: cover

                user-select: none
                pointer-events: none

.expandable
    width: 900px
    display: flex
    justify-content: space-between
    align-items: center

    padding: 10px 20px

    border: 3px solid $light-blue
    background: color-mix(in srgb, $light-blue-highlight 60%, white)

    color: $blue
    cursor: pointer
    user-select: none

    +media-mobile
        width: 100%

    &:hover,
    &.active
        color: $light-blue
        border: 3px solid $light-blue-highlight
        background: color-mix(in srgb, $light-blue-highlight 40%, white)

        .texture
            --tex-color: #{$light-blue} !important


.data-display
    position: relative
    width: 900px
    max-height: 700px

    +media-mobile
        width: 100%

    .scroll-container
        width: 100%
        max-height: 700px

        overflow: auto

        +scrollbar($background: $blue, $thumb: $light-blue, $active: $color, $thickness: 12px)

        .json-display
            min-width: fit-content
            font-size: 14px

    .copy
        position: absolute
        right: 12px
        top: 12px

        width: 30px
        height: 30px

        +media-desktop
            top: 0

.options
    margin-top: 20px

    display: flex
    justify-content: center
    align-items: center
    gap: 20px

    +media-mobile
        width: 100%
        flex-wrap: wrap
        gap: 15px 20px

    li
        .checkbox
            outline: 3px solid $light-blue-highlight
        h4
            color: $blue

.buttons
    margin-top: 20px

    display: flex
    align-items: center
    gap: 20px

    +media-mobile
        flex-direction: column
        gap: 5px

    .button.small
        width: auto
        min-width: 355px

        .texture
            margin-right: 0

p
    color: $light-blue

    text-align: center

    a,
    u
        text-decoration: underline
        cursor: pointer

        &:hover
            color: $blue
</style>

<script setup lang="ts">
import { getAchievements, type Achievement } from '~/assets/data/achievements';
import {
    DEFAULT_PREFERENCES_STORE,
    levelToRank,
    PreferencesStoreSchema,
    type AnySerializableDataSegment,
    type HeroData,
    type PlayerHeroStore,
    type PreferencesStore,
    type SerializableDataMap,
    type SerializableDataSegment
} from '~/assets/data/common';
import { HERO_LIST } from '~/assets/data/heroes';
import { tex } from '~/assets/data/textures';
import ConfirmModal from '~/components/modals/ConfirmModal.vue';

useSeoMeta({
    title: 'Download | MR Proficiency Calculator',
    description: 'Download (export) your data from the calculator to import on any other device',
    
    ogTitle: 'Download | MR Proficiency Calculator',
    ogUrl: useCanonicalUrl('download'),
    
    twitterTitle: 'Download | MR Proficiency Calculator',
    twitterDescription: 'Download (export) your data from the calculator to import on any other device',
})

useHead({
    link: [
        {
            rel: "canonical",
            href: useCanonicalUrl('download')
        }
    ]
})

const { openModal } = useModalManager();
const { notify } = useNotificationManager();

const storedHeroes = ref(Object.entries(localStorage ?? {})
                           .filter(([key]) => key.startsWith('hero_'))
                           .map(([key, v]) => {
                                return {
                                    id: key.substring(5),
                                    ...JSON.parse(v)
                                }
                           }) as ({id: string} & PlayerHeroStore)[]);
const favourites = useLocalStorage<HeroData['id'][]>(`favourite_heroes`, []);
const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);
const preferences = useLocalStorage<PreferencesStore>('preferences', DEFAULT_PREFERENCES_STORE(), PreferencesStoreSchema);
const achievementsStore = useLocalStorage<Achievement[]>('achievements', []);

const route = useRoute();
const heroFromUrl = route.query?.hero;

const heroesWithData = computed(() => {
    return storedHeroes.value.map(heroStore => {
        const heroes = HERO_LIST;
        let heroData = heroes.find(hd => hd.id == heroStore.id);

        let isUnknownHero = false;
        if (!heroData) {
            heroData = unknownHeroes.value.find(uh => uh.id == heroStore.id);

            if (!heroData)
                return null;

            isUnknownHero = true;
        }

        const { id, ...store } = heroStore;

        const heroAchievements = getAchievements(undefined, heroStore.id);
        const filteredAchievements = achievementsStore.value.filter(as => 
            !!heroAchievements.find(a => a.id == as.id)
        );

        return {
            hero: heroData,
            stored: store,
            rank: levelToRank(heroStore.level),
            achievements: filteredAchievements,
            isFavourite: includeFavourites ? favourites.value.includes(heroStore.id) : undefined,
            isUnknownHero
        }
    }).filter(h => h !== null);
});

const selectedHero = ref<string|null>(heroFromUrl as string ?? null);
const selectedHeroData = computed(() => {
    const heroData = heroesWithData.value.find(h => h.hero.id == selectedHero.value);
    if (!heroData)
        return null;

    return {
        possesiveName: heroData.hero.name + (heroData.hero.name.endsWith('s') ? '\'' : '\'s'),
        ...heroData
    }
});
function clickHero(heroId: string|null) {
    if (heroId == null) {
        selectedHero.value = null;

        return;
    }

    if (selectedHero.value == heroId)
        selectedHero.value = null;
    else
        selectedHero.value = heroId;
}

const dataExpanded = ref(false);

const includeUnknownHeroes = ref(true);
const includeFavourites = ref(true);
const includePreferences = ref(true);
const includeAchievements = ref(true);

const dataBase: Pick<SerializableDataSegment<keyof SerializableDataMap>, 'version' | 'exportedAt'> = {
    version: config.dataVersion,
    exportedAt: new Date().toISOString(),
}
function dataWithBase<T extends keyof SerializableDataMap>
    (type: T, data: SerializableDataMap[T]): SerializableDataSegment<T> {
        return {
            ...dataBase,
            type,
            data
        };
}

const allData = computed<AnySerializableDataSegment>(() => {
    const ownedCostumesMap: Record<string, string[]> = {};
    Object.entries(localStorage ?? {})
        .filter(([key]) => key.startsWith('cosmetics_owned_'))
        .forEach(([key, v]) => {
            const heroId = key.substring('cosmetics_owned_'.length);
            const owned = JSON.parse(v) as string[];
            if (owned.length)
                ownedCostumesMap[heroId] = owned;
        });

    const data = {
        storedHeroes: storedHeroes.value,
        favourites: includeFavourites.value ? favourites.value : undefined,
        achievements: includeAchievements.value ? achievementsStore.value : undefined,
        unknownHeroes: includeUnknownHeroes.value ? unknownHeroes.value : undefined,
        preferences: includePreferences.value ? preferences.value : undefined,
        ownedCostumes: ownedCostumesMap
    }

    return dataWithBase('profile', data);
})

const heroData = computed<AnySerializableDataSegment>(() => {
    const heroData = heroesWithData.value.find(h => h.hero.id == selectedHero.value);
    if (!selectedHero.value || !heroData)
        return allData.value;

    const rawOwned = localStorage.getItem(`cosmetics_owned_${heroData.hero.id}`);
    const ownedCostumes = rawOwned ? JSON.parse(rawOwned) as string[] : undefined;

    if (heroData.isUnknownHero)
        return dataWithBase('hero', {
            __unknownHero: true,
            id: heroData.hero.id,
            hero: heroData.hero,
            stored: heroData.stored,
            achievements: heroData.achievements,
            isFavourite: heroData.isFavourite,
            ownedCostumes: ownedCostumes?.length ? ownedCostumes : undefined
        })

    return dataWithBase('hero', {
        id: heroData.hero.id,
        stored: heroData.stored,
        achievements: heroData.achievements,
        isFavourite: heroData.isFavourite,
        ownedCostumes: ownedCostumes?.length ? ownedCostumes : undefined
    });
})

function closeDataDisplay() {
    dataExpanded.value = !dataExpanded.value;
}

function copyData() {
    const whichData = !!selectedHero.value ? heroData.value : allData.value;
    setClipboard(JSON.stringify(whichData));

    const message = !!selectedHero.value ? 
        `Copied ${selectedHeroData.value?.possesiveName} data to clipboard`
        :
        `Copied your data to clipboard`

    notify(
        message,
        3000,
        { image: 'check', color: '#458a14' }
    );
}

function downloadFile(content: string, filename: string, mimeType = 'application/octet-stream') {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    
    URL.revokeObjectURL(url)
}

function downloadHeroData() {
    downloadFile(JSON.stringify(heroData.value), `${selectedHeroData.value?.possesiveName} data [Marvel Rivals Proficiency Calculator].mrprof`);
}
function downloadData() {
    downloadFile(JSON.stringify(allData.value), `Your Data [Marvel Rivals Proficiency Calculator].mrprof`);
}

const hasData = computed(() => !!localStorage.length);
function deleteData() {
    openModal(ConfirmModal, {
        title: 'Delete Your Data',
        message: 'Are you sure you want to delete your data? This action is irreversible.<br/><i>P.S.: The data lives on your device.</i>',
    })
    .promise
    .then(() => {
        localStorage.clear();
        sessionStorage.setItem('dataDeleted', '1');
        window.location.reload();
    })
    .catch(() => null)
}

onMounted(() => {
    if (sessionStorage.getItem('dataDeleted')) {
        sessionStorage.removeItem('dataDeleted');
        notify(`Your data was deleted successfully.`, 3000, { image: 'check', color: '#458a14' });
    }
})

</script>