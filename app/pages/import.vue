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
                        Import data
                    </h1>
                    <div
                        v-if="dataSegment === null"

                        :class="{
                            'upload-container': 1,
                            'with-border-decorations': 1,
                            active: uploadDragOver
                        }"
                        @dragenter.prevent="onDragEnter"
                        @dragleave.prevent="onDragLeave"
                        @dragover.prevent

                        @drop.prevent="onDrop"
                    >
                        <Tex
                            image="upload"

                            width="80px"
                            height="80px"
                        />
                        <p>Drag and drop your <u>.mrprof</u> file here</p>
                        <p class="or">or</p>
                        <ul>
                            <li @click="fileUploadInput?.click()">
                                Select file
                            </li>
                            <li @click="paste">
                                Paste from clipboard
                            </li>
                        </ul>
                    </div>

                    <div v-if="overwriteCheck" class="overwrite-check">
                        <template v-if="overwriteCheck.remaining.length">
                            <h2>
                                You will import the data of the following heroes
                            </h2>
                            <ul class="heroes">
                                <li
                                    v-for="hero in overwriteCheck.remaining"
                                    :class="{
                                        checked: overwriteToggles[hero.heroId],
                                        selected: selectedRemainingHero == hero.heroId
                                    }"
                                    :title="hero.hero.name"

                                    @click="clickHero(hero, true)"
                                >
                                    <!--
                                        :class="{selected: selectedHero == hero.heroId}"
                                        @click="clickHero(hero.heroId)"
                                    -->
                                    <div
                                        v-if="overwriteToggles[hero.heroId] || overwriteUnknownHeroToggles[hero.heroId]"
                                        class="check"
                                    >
                                        <Tex
                                            image="checkCorner"

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

                            <div v-if="selectedRemainingHero && selectedRemainingHeroData" class="selected-hero">
                                <div class="hero-info">
                                    <FormCheckbox
                                        v-if="selectedRemainingHeroData.type == 'both'"
                                        :model-value="overwriteToggles[selectedRemainingHeroData.heroId]! || overwriteUnknownHeroToggles[selectedRemainingHeroData.heroId]!"
                                        @update:model-value="$event => {
                                            overwriteToggles[selectedRemainingHeroData!.heroId] = $event,
                                            overwriteUnknownHeroToggles[selectedRemainingHeroData!.heroId] = $event
                                        }"

                                        small
                                    />
                                    <div class="icon">
                                        <img :src="`${selectedRemainingHeroData.hero.dataDir}head.webp`" />
                                    </div>
                                    <h3>
                                        {{ selectedRemainingHeroData.hero.name }}
                                    </h3>
                                </div>

                                <div class="toggle">
                                    <FormCheckbox
                                        v-if="selectedRemainingHeroData.type == 'both' || selectedRemainingHeroData.type == 'stats'"
                                        v-model="overwriteToggles[selectedRemainingHeroData.heroId]!"  

                                        small
                                        append-slot
                                    >
                                        <h4>Import stats</h4>
                                    </FormCheckbox>
                                    <FormCheckbox
                                        v-if="selectedRemainingHeroData.type == 'both' || selectedRemainingHeroData.type == 'unknown'"
                                        v-model="overwriteUnknownHeroToggles[selectedRemainingHeroData.heroId]!"  

                                        small
                                        append-slot
                                    >
                                        <h4>Import hero info</h4>
                                    </FormCheckbox>

                                    <Tex
                                        image="cross"
                                        color="var(--light-blue)"
                                        hover="color"
                                        hover-color="var(--blue-highlight)"

                                        clickable
                                        @click="selectedRemainingHero = null"

                                        width="20px"
                                        height="20px"
                                        title="Close"
                                    />
                                </div>
                            </div>
                        </template>

                        <template v-if="heroesWithData.length && overwriteCheck.conflicting.length">
                            <div>
                                <h2>
                                    We found conflicts with your current data
                                </h2>
                                <p>The following heroes already have data attached to them. Choose which ones to overwrite.</p>
                            </div>
                            <ul class="heroes">
                                <li
                                    v-for="hero in overwriteCheck.conflicting"
                                    :class="{
                                        checked: overwriteToggles[hero.heroId],
                                        selected: selectedHero == hero.heroId
                                    }"
                                    :title="hero.hero.name"

                                    @click="clickHero(hero)"
                                >
                                    <!--
                                        :class="{selected: selectedHero == hero.heroId}"
                                        @click="clickHero(hero.heroId)"
                                    -->
                                    <div
                                        v-if="overwriteToggles[hero.heroId] || overwriteUnknownHeroToggles[hero.heroId]"
                                        class="check"
                                    >
                                        <Tex
                                            image="checkCorner"

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
                        </template>

                        <div v-if="selectedHero && selectedHeroData" class="selected-hero">
                            <div class="hero-info">
                                <FormCheckbox
                                    v-if="selectedHeroData.type == 'both'"
                                    :model-value="overwriteToggles[selectedHeroData.heroId]! || overwriteUnknownHeroToggles[selectedHeroData.heroId]!"
                                    @update:model-value="$event => {
                                        overwriteToggles[selectedHeroData!.heroId] = $event,
                                        overwriteUnknownHeroToggles[selectedHeroData!.heroId] = $event
                                    }"

                                    small
                                />
                                <div class="icon">
                                    <img :src="`${selectedHeroData.hero.dataDir}head.webp`" />
                                </div>
                                <h3>
                                    {{ selectedHeroData.hero.name }}
                                </h3>
                            </div>

                            <div class="toggle">
                                <FormCheckbox
                                    v-if="selectedHeroData.type == 'both' || selectedHeroData.type == 'stats'"
                                    v-model="overwriteToggles[selectedHeroData.heroId]!"  

                                    small
                                    append-slot
                                >
                                    <h4>Overwrite stats</h4>
                                </FormCheckbox>
                                <FormCheckbox
                                    v-if="selectedHeroData.type == 'both' || selectedHeroData.type == 'unknown'"
                                    v-model="overwriteUnknownHeroToggles[selectedHeroData.heroId]!"  

                                    small
                                    append-slot
                                >
                                    <h4>Overwrite hero info</h4>
                                </FormCheckbox>

                                <Tex
                                    image="cross"
                                    color="var(--light-blue)"
                                    hover="color"
                                    hover-color="var(--blue-highlight)"

                                    clickable
                                    @click="selectedHero = null"

                                    width="20px"
                                    height="20px"

                                    title="Close"
                                />
                            </div>
                        </div>

                        <p>
                            I acknowledge that by importing the data, my current data, stats of / data of (for manually added) heroes that are checked above, preferences and favourites, will be overwritten or modified.
                        </p>
                    </div>

                    <div class="buttons">
                        <FormButton
                            v-if="dataSegment"
                            size="small"

                            @click="importData"
                        >
                            IMPORT DATA
                        </FormButton>
                        <FormButton
                            v-if="dataSegment"
                            size="small"

                            @click="dataSegment = null"
                        >
                            CLEAR
                        </FormButton>
                    </div>

                    <p>
                        You can download your data from other devices
                        <NuxtLink to="/download">here</NuxtLink>.
                    </p>
                </div>
            </div>
        </main>

        <input
            ref="fileUploadInput"
            id="file-upload"
            type="file"

            accept="*.mrprof"

            @change="importFiles(fileUploadInput?.files)"
        >
    </div>
</template>

<style lang="sass" scoped>
.upload-container
    width: 700px
    padding: 40px 60px

    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 10px

    background: color-mix(in srgb, $light-blue 20%, transparent)
    border: 3px dashed $light-blue-highlight

    +media-mobile
        width: 100%
        padding: 20px 10px

    &.active
        background: color-mix(in srgb, $light-blue 40%, transparent)
        border: 3px dashed $light-blue

    p:not(.or)
        font-size: 18px
        text-align: center
        color: $light-blue

        +media-mobile
            font-size: 16px

    p.or
        color: $light-blue-highlight

        +media-mobile
            font-size: 16px

    > ul
        display: flex
        gap: 20px

        li
            font-size: 18px
            color: $blue-accent

            cursor: pointer
            user-select: none

            padding: 5px 10px
            border: 3px solid $light-blue-highlight
            background: color-mix(in srgb, $light-blue 40%, white)

            +media-mobile
                font-size: 16px

            &:hover
                color: $light-blue
                background: color-mix(in srgb, $light-blue-highlight 20%, white)

.overwrite-check
    $width: 900px
    width: $width
    
    display: flex
    align-items: center
    flex-direction: column
    gap: 20px

    +media-mobile
        width: 100%

    h2
        text-align: center

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

    .heroes
        width: 100%

        display: flex
        flex-wrap: wrap
        justify-content: start
        align-items: center
        gap: 10px

        margin-top: 10px

        +media-mobile
            justify-content: center

        li
            position: relative
            cursor: pointer

            &:hover,
            &.selected
                .icon
                    border: 3px solid $color !important

            &:not(.checked)
                .icon
                    border: 3px solid $light-blue-highlight
                    background: color-mix(in srgb, $light-blue-highlight 40%, white)

                    img
                        filter: grayscale(0.5)

            .check
                position: absolute
                top: 0
                right: 0

                pointer-events: none

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

    > p
        max-width: 600px
        font-size: 14px
        text-align: center
        color: $light-blue

        width: 100%

    .selected-hero
        width: 100%
        display: flex
        justify-content: space-between
        align-items: center

        padding: 10px 20px

        border: 3px solid $light-blue
        background: color-mix(in srgb, $light-blue-highlight 60%, white)

        color: $blue
        user-select: none

        +media-mobile
            flex-direction: column
            gap: 25px

        // &:hover
        //     color: $light-blue
        //     border: 3px solid $light-blue-highlight
        //     background: color-mix(in srgb, $light-blue-highlight 40%, white)

        .hero-info
            display: flex
            align-items: center
            gap: 10px

            .icon
                width: 60px
                height: 60px
            h3
                font-size: 26px
                text-transform: uppercase

        .toggle
            display: flex
            align-items: center
            gap: 10px

            h4
                font-size: 18px
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

p
    color: $light-blue
    text-align: center

    a
        text-decoration: underline

        &:hover
            color: $blue

#file-upload
    display: none
</style>

<script setup lang="ts">
import type { Achievement } from '~/assets/data/achievements';
import {
    AnySegmentSchema,
    DEFAULT_HERO_STORE,
    DEFAULT_PREFERENCES_STORE,
    levelToRank,
    PreferencesStoreSchema,
    type AnySerializableDataSegment,
    type HeroData,
    type PlayerHeroStore,
    type PreferencesStore,
    type ProficiencyRank
} from '~/assets/data/common';
import { HERO_LIST } from '~/assets/data/heroes';

useSeoMeta({
    title: 'Import | MR Proficiency Calculator',
    description: 'Import data into the calculator from any other device',
    
    ogTitle: 'Import | MR Proficiency Calculator',
    ogUrl: useCanonicalUrl('import'),
    
    twitterTitle: 'Import | MR Proficiency Calculator',
    twitterDescription: 'Import data into the calculator from any other device',
})

useHead({
    link: [
        {
            rel: "canonical",
            href: useCanonicalUrl('import')
        }
    ]
})

const { notify } = useNotificationManager();

const storedHeroes = Object.entries(localStorage ?? {})
                           .filter(([key]) => key.startsWith('hero_'))
                           .map(([key, v]) => {
                                return {
                                    id: key.substring(5),
                                    ...JSON.parse(v)
                                }
                           }) as ({id: string} & PlayerHeroStore)[];
const favourites = useLocalStorage<HeroData['id'][]>(`favourite_heroes`, []);
const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);
const preferences = useLocalStorage<PreferencesStore>('preferences', DEFAULT_PREFERENCES_STORE(), PreferencesStoreSchema);
const achievementsStore = useLocalStorage<Achievement[]>('achievements', []);

const heroesWithData = computed(() => {
    return storedHeroes.map(heroStore => {
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

        return {
            hero: heroData,
            stored: store,
            rank: levelToRank(heroStore.level),
            isFavourite: favourites.value.includes(heroStore.id),
            isUnknownHero
        }
    }).filter(h => h !== null);
});

const selectedHero = ref<string|null>(null);
const selectedHeroData = computed(() => 
    overwriteCheck.value?.conflicting.find(h => h.heroId == selectedHero.value)
)

const selectedRemainingHero = ref<string|null>(null);
const selectedRemainingHeroData = computed(() => 
    overwriteCheck.value?.remaining.find(h => h.heroId == selectedRemainingHero.value)
)

function clickHero(hero: OverwriteCheck[0], remaining = false) {
    if (hero.type == 'stats') {
        overwriteToggles.value[hero.heroId] = !overwriteToggles.value[hero.heroId];
        
        if (!remaining)
            selectedHero.value = null;
        else
            selectedRemainingHero.value = null;

        return;
    }

    if (!remaining) {
        if (selectedHero.value == hero.heroId)
            selectedHero.value = null;
        else
            selectedHero.value = hero.heroId;
    }
    else {
        if (selectedRemainingHero.value == hero.heroId)
            selectedRemainingHero.value = null;
        else
            selectedRemainingHero.value = hero.heroId;
    }
}

const dataSegment = ref<AnySerializableDataSegment|null>(null);

const overwriteToggles = ref<Record<string, boolean>>({});
const overwriteUnknownHeroToggles = ref<Record<string, boolean>>({});

type OverwriteCheck = {
    type: 'stats'|'unknown'|'both',
    heroId: string,
    hero: HeroData,
    store?: PlayerHeroStore,
    rank?: ProficiencyRank
}[]
const overwriteCheck = computed<{ conflicting: OverwriteCheck, remaining: OverwriteCheck}|null>(() => {
    overwriteToggles.value = {};
    overwriteUnknownHeroToggles.value = {};

    if (!dataSegment.value)
        return null;

    if (dataSegment.value.type === 'hero') {
        const heroSegmentData = dataSegment.value.data;

        overwriteToggles.value[heroSegmentData.id] = true;
        if (heroSegmentData.__unknownHero)
            overwriteUnknownHeroToggles.value[heroSegmentData.id] = true;

        const existingHero = heroesWithData.value.find(h => h.hero.id == heroSegmentData.id);
        if (existingHero) {
            return {
                conflicting: [{
                    type: heroSegmentData.__unknownHero ? 'both' : 'stats',
                    heroId: heroSegmentData.id,
                    hero: existingHero.hero,
                    store: heroSegmentData.stored
                }],
                remaining: []
            };
        }

        let heroData = null;
        if (heroSegmentData.__unknownHero && heroSegmentData.hero)
            heroData = heroSegmentData.hero;
        else
            heroData = HERO_LIST.find(h => h.id == heroSegmentData.id);

        const remaining: OverwriteCheck = [];
        if (heroData)
            remaining.push({
                type: heroSegmentData.__unknownHero ? 'both' : 'stats',
                heroId: heroData.id,
                hero: heroData,
                store: heroSegmentData.stored
            });

        return { conflicting: [], remaining }
    }
    else {
        const profileSegmentData = dataSegment.value.data;

        const conflicting: OverwriteCheck = [];

        for (const hero of heroesWithData.value) {
            const heroInSegmentStore = profileSegmentData.storedHeroes.find(h => h.id == hero.hero.id);
            const heroInSegmentUnknownHeroes = profileSegmentData.unknownHeroes?.find(h => h.id == hero.hero.id);

            if (!!heroInSegmentStore || !!heroInSegmentUnknownHeroes) {
                overwriteToggles.value[hero.hero.id] = true;

                if (heroInSegmentUnknownHeroes)
                    overwriteUnknownHeroToggles.value[hero.hero.id] = true;

                conflicting.push({
                    type: heroInSegmentStore && heroInSegmentUnknownHeroes ? 'both' : (heroInSegmentStore ? 'stats' : 'unknown'),
                    heroId: hero.hero.id,
                    hero: hero.hero,
                    store: heroInSegmentStore,
                    rank: heroInSegmentStore ? levelToRank(heroInSegmentStore.level) : undefined,
                });
            }
        }

        const remaining: OverwriteCheck = [];

        profileSegmentData.storedHeroes.forEach(heroStore => {
            if (conflicting.find(conflictingHero => conflictingHero.heroId == heroStore.id))
                return;

            // look for hero in existing heroes and unknown heroes
            let hero = HERO_LIST.find(h => h.id == heroStore.id);
            if (!hero)
                hero = profileSegmentData.unknownHeroes?.find(h => h.id == heroStore.id);

            if (hero) {
                remaining.push({
                    type: 'stats',
                    heroId: hero.id,
                    hero,
                    store: heroStore,
                    rank: levelToRank(heroStore.level)
                });

                overwriteToggles.value[hero.id] = true;
            }
        });

        profileSegmentData.unknownHeroes?.forEach(hero => {
            if (conflicting.find(conflictingHero => conflictingHero.heroId == hero.id))
                return;

            // if it exists, change type to both
            const index = remaining.findIndex(h => h.heroId == hero.id);
            if (index != -1)
                remaining[index]!.type = 'both'
            // otherwise add unknown hero as standalone
            else
                remaining.push({
                    type: 'unknown',
                    heroId: hero.id,
                    hero
                });

            overwriteUnknownHeroToggles.value[hero.id] = true;
        });

        return { conflicting, remaining };
    }
});

let dragCounter = 0;
const uploadDragOver = ref(false);

function onDragEnter(e: DragEvent) {
    dragCounter++;
    uploadDragOver.value = true;
}

function onDragLeave(e: DragEvent) {
    dragCounter--;
    if (dragCounter === 0)
        uploadDragOver.value = false;
}

function onDrop(e: DragEvent) {
    dragCounter = 0;
    uploadDragOver.value = false;
    if (e.dataTransfer?.files)
        importFiles(e.dataTransfer.files);
}

const fileUploadInput: Ref<HTMLInputElement|null> = ref(null);

function convertDataSegmentToVersion(version: number, dataSegment: AnySerializableDataSegment) {
    switch(version) {
        case 1:
            return dataSegment;
        case 2:
            // reset hero edit popup acknowledgement
            // set hero quick edit popup acknowledgement to default
            if (dataSegment.type == 'profile' && dataSegment.data.preferences) {
                const defaultPref = DEFAULT_PREFERENCES_STORE();
                dataSegment.data.preferences.sawHeroEditPopup = defaultPref.sawHeroEditPopup;
                dataSegment.data.preferences.sawHeroQuickEditPopup = defaultPref.sawHeroQuickEditPopup;
            }

            return dataSegment;
    }

    return dataSegment;
}

function convertDataSegment(data: AnySerializableDataSegment) {
    if (data.version > config.dataVersion)
        return null;

    if (data.version == config.dataVersion)
        return data;

    for (let i = data.version; i <= config.dataVersion; i++)
        data = convertDataSegmentToVersion(i, data);

    return data;
}

function processContent(content: string) {
    let data = JSON.parse(content)
    let result = AnySegmentSchema.safeParse(data);

    // validation failed, try to convert versions
    if (!result.success) {
        try {
            data = convertDataSegment(data);
        }
        catch {
            data  = null;
        }

        // conversion failed
        if (data === null) {
            notify(
                `Failed to parse imported file, version mismatch could not be resolved. Try hard refreshing (Shift + R) the website or try again later.`,
                5000,
                { image: 'warning', color: '#c94f36' }
            );

            return;
        }

        // conversion didn't fail, validate again
        result = AnySegmentSchema.safeParse(data);

        // validation was still unsuccessful, throw
        if (!result.success)
            throw new Error('Failed to parse imported file', { cause: result.error });
    }

    // validation was finally successful, set the dataSegment in place
    dataSegment.value = result.data;
}

function importFiles(files?: FileList|null) {
    if (!files)
        return;

    for (const file of files) {
        if (!file.name.endsWith('.mrprof')) {
            notify(
                `${file.name} could not be imported as it is the wrong type of file`,
                3000,
                { image: 'warning', color: '#c94f36' }
            );
            continue;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                if (typeof e.target?.result !== 'string')
                    throw new Error(`${file.name} could not be imported as it is the wrong type of file`)

                processContent(e.target!.result as string);
            }
            catch (e) {
                notify(
                    `The file \"${file.name}\" is invalid`,
                    3000,
                    { image: 'warning', color: '#c94f36' }
                );

                console.error('Error thrown while parsing/validating imported data file', e);
            }
        }

        reader.readAsText(file)
    }
}

function paste() {
    navigator.clipboard.readText()
        .then(text => processContent(text))
        .catch(err => {
            notify(
                `We were unable to read your clipboard`,
                3000,
                { image: 'warning', color: '#c94f36' }
            );

            console.error(err);
        })
}

// PWA file handler
onMounted(async () => {
    if (!('launchQueue' in window))
        return;

    (window as any).launchQueue.setConsumer(async (launchParams: any) => {
        const files = launchParams.files as FileSystemFileHandle[]

        if (!files?.length)
            return
        
        const file = await files[0]!.getFile()
        const text = await file.text()
        
        try {
            processContent(text);
        }
        catch (e) {
            notify(
                `The file \"${file.name}\" is invalid`,
                3000,
                { image: 'warning', color: '#c94f36' }
            );

            console.error('Error thrown while parsing/validating imported data file', e);
        }
    });
})

function importData() {
    if (!dataSegment.value)
        return;

    if (dataSegment.value.type == 'hero') {
        const id = dataSegment.value.data.id;

        if (
            dataSegment.value.data.__unknownHero
         && dataSegment.value.data.hero
         && overwriteUnknownHeroToggles.value[id]
        ) {
            const existingIndex = unknownHeroes.value.findIndex(h => h.id == id);
            if (existingIndex != -1)
                unknownHeroes.value[existingIndex] = dataSegment.value.data.hero;
            else
                unknownHeroes.value.push(dataSegment.value.data.hero);
        }

        if (overwriteToggles.value[id])
            localStorage.setItem(`hero_${id}`, JSON.stringify(dataSegment.value.data.stored));

        if (
            typeof dataSegment.value.data.isFavourite !== 'undefined'
         && !favourites.value.includes(id)
        )
            favourites.value.push(id);

        if (dataSegment.value.data.achievements) {
            dataSegment.value.data.achievements.forEach(a => {
                const existing = achievementsStore.value.find(existing => existing.id == a.id);
                if (existing)
                    existing.current = a.current;
                else
                    achievementsStore.value.push(a);
            });
        }

        if (dataSegment.value.data.ownedCostumes)
            localStorage.setItem(`cosmetics_owned_${id}`, JSON.stringify(dataSegment.value.data.ownedCostumes));
    }
    else if (dataSegment.value.type == 'profile') {
        if (dataSegment.value.data.unknownHeroes) {
            for (const unknownHero of dataSegment.value.data.unknownHeroes) {
                if (!overwriteUnknownHeroToggles.value[unknownHero.id])
                    continue;

                const existingIndex = unknownHeroes.value.findIndex(h => h.id == unknownHero.id);
                if (existingIndex != -1)
                    unknownHeroes.value[existingIndex] = unknownHero;
                else
                    unknownHeroes.value.push(unknownHero);
            }
        }

        for (const hero of dataSegment.value.data.storedHeroes) {
            const { id, ...stored } = hero;

            if (overwriteToggles.value[id])
                localStorage.setItem(`hero_${hero.id}`, JSON.stringify(stored));
        }

        if (dataSegment.value.data.favourites)
            favourites.value = dataSegment.value.data.favourites;

        if (dataSegment.value.data.preferences)
            preferences.value = dataSegment.value.data.preferences;

        if (dataSegment.value.data.achievements) {
            dataSegment.value.data.achievements.forEach(a => {
                const existing = achievementsStore.value.find(existing => existing.id == a.id);
                if (existing)
                    existing.current = a.current;
                else
                    achievementsStore.value.push(a);
            });
        }

        if (dataSegment.value.data.ownedCostumes !== undefined) {
            Object.keys(localStorage)
                .filter(key => key.startsWith('cosmetics_owned_'))
                .forEach(key => localStorage.removeItem(key));

            for (const [heroId, ownedList] of Object.entries(dataSegment.value.data.ownedCostumes))
                localStorage.setItem(`cosmetics_owned_${heroId}`, JSON.stringify(ownedList));
        }
    }

    nextTick(resetLocalStorageCache);

    dataSegment.value = null;

    notify(
        `The data was imported successfully.`,
        3000,
        { image: 'check', color: '#458a14' }
    );
}

</script>