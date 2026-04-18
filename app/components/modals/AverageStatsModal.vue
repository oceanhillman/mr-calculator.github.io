<template>
    <div :class="{modal: 1, 'headless-modal': headless}">
        <h2 v-if="title" v-html="title"/>
        <p v-if="message" class="modal-subtitle" v-html="message" />
        <UiSeparator v-if="!headless" class="separator" />
    
        <div class="inputs-wrapper">
            <div class="info-button-wrapper">
                <div class="info-button-container" @click="infoModalOpen = !infoModalOpen">
                    <Tex
                        image="infoButton"
                        square
                        clickable
                        hover="auto"

                        width="26px"
                        height="26px"
                        object-fit="contain"
                    />
                    <p>Where to find my average stats?</p>
                </div>

                <div
                    v-if="!hasAvgStats && genericStatsUsed.length"
                    :class="{'uses-generic': 1, open: genericStatsExpanded}"
                    :title="`You are currently using generic stats.\nGeneric stats are gathered from hundreds of games of the top 500 players on ${hero.name}.`"
                    @click="genericStatsExpanded = !genericStatsExpanded"
                >
                    <h3>GENERIC STATS</h3>

                    <template v-if="genericStatsExpanded">
                        <h4>Current:</h4>
                        <ul>
                            <li
                                v-for="stat in genericStatsUsed"
                            >
                                <div class="stat-type">
                                    <img :src="stat.icon" />
                                    <p>{{ stat.name }}:</p>
                                </div>
                                <p>{{ stat.value?.toFixed(1) }}</p>
                            </li>
                        </ul>
                        <p class="info">
                            Generic stats are gathered from hundreds of games of the top 500 players on {{ hero.name }}.
                        </p>
                    </template>
                </div>
                <!-- <div v-else class="uses-generic blue" @click="useGenericStats">
                    USE GENERIC STATS
                </div> -->
            </div>

            <div class="toggle-wrapper">
                <FormToggle
                    class="toggle"

                    both
                    :model-value="statsType == 'arcade'"
                    @update:model-value="statsType = $event ? 'arcade' : 'normal'"
                >
                    <template #off>
                        Quick/Comp
                    </template>
                    <template #on>
                        Arcade
                    </template>
                </FormToggle>
            </div>

            <ul v-if="neededStats" class="inputs">
                <li
                    v-for="([type, name, icon, stats], index) in neededStats"
                    :key="type!"
                    :class="{play: type == 'play'}"
                >
                    <div v-if="icon" class="icon">
                        <img :src="icon" />
                    </div>
                    <div v-if="type !== 'play'" class="wrapper">
                        <div v-if="warningPopup == type" class="popup">
                            That number looks wrong. Are you sure it's correct?
                            <Tex
                                class="close"
                                image="cross"
                                color="var(--blue)"
                                @click="closePopup"
                            />
                        </div>

                        <span>
                            Average {{ name }} per 10 minutes
                            <span class="info">{{ 
                                type == 'kos_assists' || type == 'damage_heal' ?
                                '(you can add numbers together in here)'
                                : ''
                            }}</span>
                        </span>
                        <FormAdvancedInput
                            :input-placeholder="`e.g.: ${stats.example}`"
                            :number-input="{
                                allowMath: type == 'kos_assists' || type == 'damage_heal',
                                step: stats.step,
                                min: 0
                            }"

                            :tab-index="index + 1"

                            :model-value="statsType == 'normal' ? models[type!] : modelsArcade[type!]"
                            @update:model-value="statsType == 'normal' ? (models[type!] = $event) : (modelsArcade[type!] = $event)"

                            @change="onChange(type!, ($event.target as HTMLInputElement).value)"
                        />
                    </div>
                    <div v-else class="wrapper">
                        <span>
                            10 minutes of gameplay
                        </span>
                    </div>
                </li>
            </ul>
        </div>

        <div v-if="!headless" class="buttons">
            <FormButton size="small" @click="$emit('confirm', { stats: models, statsArcade: modelsArcade })">
                Confirm
            </FormButton>
            <FormButton size="small" color-scheme="white" @click="$emit('cancel')">Cancel</FormButton>
        </div>

        <InfoOverlay
            v-if="infoModalOpen"
            title="How do I find my average stats?"
            @close="infoModalOpen = false"
        >
            <p>
                I. Open Marvel Rivals and go to your Profile.
            </p>
            <img src="/img/info/average-stats/step-1.png" />
            <br />
            <br />

            <p>
                II. Go to the "Statistics" tab.
            </p>
            <img src="/img/info/average-stats/step-2.png" />
            <br />
            <br />

            <p>
                II.I (Optional) If you want your Arcade stats (such as 18v18 Annihilation), click on the dropdown and select your preferred arcade gamemode.
            </p>
            <img src="/img/info/average-stats/step-2.1.png" />
            <br />
            <br />

            <p>
                III. Select the hero you want, then scroll the right panel in order to find the statistics the calculator/missions require.
            </p>
            <img src="/img/info/average-stats/step-3.png" />
            <p>(Optionally, you can select a Season where you played more with your hero.)</p>
            <br />
            <br />

            <p>
                IV. Type out the number in the "Avg/10 Mins" column into its respective field.
                <br/>
                <br/>
                Optionally, you can type in your arcade stats instead - or both.
                <br/>
                (Note: if you only type your arcade stats, you will still be asked if you want to use generic stats or type your own. Feel free to use generic stats if you only care about arcade.)
            </p>
            <img src="/img/info/average-stats/step-4.png" />
            <p>
                Remove the thousands-separator-comma or thousands-separator-period when typing:
                <br/>
                <span class="monospace center">
                    19,236 ⮕ 19236
                    <br/>
                    19.236 ⮕ 19236
                </span>
            </p>
            <p>
                (Tip: you can add numbers together if the stat is a double-stat, like "KOs and Assists" or "Damage and Healing". Once you click away from the text box, the math will do itself for you.)
            </p>
            <p>
                <i>
                    Make sure that decimal numbers (e.g.: <span class="monospace">12.4</span> or <span class="monospace">12,5</span> - depending on where you live) are typed with a period (<span class="monospace">.</span>) and not a comma (<span class="monospace">,</span>).
                    <br/>
                    (Not to be confused with a thousands separator comma, like: <span class="monospace">12<b>,</b>967</span>)
                </i>
            </p>

            <FormButton
                size="small"
                color-scheme="white"

                @click="infoModalOpen = false"
            >
                Got it
            </FormButton>
        </InfoOverlay>
    </div>
</template>

<style lang="sass" scoped>
.inputs-wrapper
    position: relative

    +media-mobile
        padding: 0 20px

.info-button-wrapper
    display: flex
    justify-content: space-between
    align-items: center
    gap: 10px

    +media-mobile
        margin-bottom: 30px

    .info-button-container
        display: flex
        align-items: center
        gap: 5px

        cursor: pointer

        p
            font-family: KelsonSans
            font-size: 17px
            color: $light-blue

            padding: 0 !important

            &:hover
                color: $blue

    .uses-generic
        display: flex
        flex-direction: column
        justify-content: center
        align-items: end
        padding: 3px 6px
        background: #f1b70c

        font-size: 18px
        font-family: RefrigeratorDeluxeBold
        color: #fff

        cursor: pointer

        &:not(.open):hover,
        &.open
            background: $blue

        &.blue
            background: $blue

            &:hover
                background: #f1b70c

        &.open
            h3
                margin-bottom: 10px

            h4
                width: 100%
                font-size: 20px

            ul
                display: flex
                flex-direction: column

                li
                    width: 100%
                    display: flex
                    justify-content: space-between
                    align-items: center
                    gap: 10px

                    .stat-type
                        display: flex
                        align-items: center
                        gap: 5px

                        p
                            font-size: 16px

                    img
                        width: 35px

                    > p
                        font-size: 16px
                        color: $color

            .info
                max-width: 180px
                font-size: 14px
                text-align: right
                color: $light-blue-highlight

.toggle-wrapper
    display: flex
    justify-content: center

    margin: 20px 0

.inputs
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    gap: 20px

    li
        display: flex
        gap: 20px

        background: $light
        // border: 4px solid $light-blue

        +media-mobile
            flex-direction: column
            align-items: center

            padding-bottom: 20px

        +media-desktop
            padding-right: 20px

        &.play
            flex-direction: column
            align-items: center
            background: transparent

            padding-right: 0

            .wrapper
                text-align: center

            .icon
                +media-mobile
                    width: 110px

        .icon
            width: 110px
            height: 110px

            background: #818dab

            display: flex
            justify-content: center
            align-items: center

            +media-mobile
                width: 100%

            img
                display: block
                object-fit: contain

        .wrapper
            position: relative

            display: flex
            justify-content: center
            flex-direction: column
            gap: 10px

            span
                font-family: KelsonSans
                font-size: 19px

                +media-mobile
                    padding: 0 10px
                    text-align: center

                .info
                    font-size: 16px
                    color: $light-blue

            .popup
                position: absolute
                top: 40px
                left: 50%
                transform: translate(-50%, -100%)

</style>

<script setup lang="ts">
import { CHALLENGE_ICONS, CHALLENGE_NAMES, CHALLENGE_STATS, getAverageStatsForHero, type Challenge, type ChallengeStats, type HeroData, type PlayerHeroStore } from '~/assets/data/common';

const props = withDefaults(defineProps<{
    title?: string,
    message?: string,
    hero: HeroData,
    stats: PlayerHeroStore['averageStats'],
    arcadeStats?: PlayerHeroStore['averageStatsArcade'],

    tab?: 'normal'|'arcade'

    headless?: boolean,
    hideGenericStats?: Partial<Record<Challenge['type'], boolean>>
}>(), {
    tab: 'normal'
})

const emit = defineEmits<{
    confirm: [value: { stats: Record<string, string>, statsArcade: Record<string, string> }],
    cancel: []
}>()

const infoModalOpen = ref(false);

const neededStats = computed<[string, string, string, ChallengeStats][]>(() => {
    return props.hero.ranks[0]?.challenges.map(c =>
        [
            c.type,
            CHALLENGE_NAMES[c.type] ?? '',
            CHALLENGE_ICONS[c.type] ?? '',
            CHALLENGE_STATS[c.type] ?? {
                tooLittle: 0,
                tooMuch: 9999999,
                step: 100,
                example: '500',
                interval: [0, 99999]
            }
        ]
    ) ?? [];
});

const hasAvgStats = useHasAvgStats(props.hero, true);
const genericStatsUsed = computed(() => {
    const statsForHero = getAverageStatsForHero(props.hero.id);

    if (!statsForHero)
        return [];

    return neededStats.value.filter(s => {
        if (s[0] == 'play')
            return false;
        if (props.stats[s[0]] && !isNaN(props.stats[s[0]] ?? NaN))
            return false;

        if (typeof props.hideGenericStats !== 'undefined')
            if (props.hideGenericStats[s[0] as Challenge['type']] === true)
                return false;

        return true;
    }).map(s => ({
        name: s[1],
        icon: s[2],
        value: statsForHero?.[s[0] as Challenge['type']] ?? 0
    }));
});
const genericStatsExpanded = ref(false);

const statsType = ref<'normal'|'arcade'>(props.tab);
const models = ref<Record<string, string>>({});
const modelsArcade = ref<Record<string, string>>({});

function setModels() {
    models.value = {};
    neededStats.value?.forEach(stat =>
        models.value![stat[0]] = `${props.stats[stat[0]] ?? ''}`
    );
}
if (Object.values(models.value ?? {}).length == 0)
    setModels();

function setArcadeModels() {
    modelsArcade.value = {};
    neededStats.value?.forEach(stat =>
        modelsArcade.value![stat[0]] = `${props.arcadeStats?.[stat[0]] ?? ''}`
    );
}
if (Object.values(modelsArcade.value ?? {}).length == 0)
    setArcadeModels();

// function useGenericStats() {
//     Object.keys(models.value).forEach(k => models.value[k] = '0');
//     emit('confirm', models.value);
// }

const warningPopup = ref<string|false>(false);
let popupDisappearTask: any;

function onChange(type: string, value: any) {
    const statData = neededStats.value.find(s => s[0] == type);
    const numberValue = parseInt(value);
    if (!statData || isNaN(numberValue))
        return;

    if (numberValue < statData[3].tooLittle) {
        clearTimeout(popupDisappearTask);
        popupDisappearTask = setTimeout(() => warningPopup.value = false, 4000);

        warningPopup.value = type;
    }
    else if (numberValue > statData[3].tooMuch) {
        clearTimeout(popupDisappearTask);
        popupDisappearTask = setTimeout(() => warningPopup.value = false, 4000);

        warningPopup.value = type;
    }
    else {
        clearTimeout(popupDisappearTask);
        warningPopup.value = false;
    }
}

function closePopup() {
    clearTimeout(popupDisappearTask);
    warningPopup.value = false;
}

function reset() {
    setModels();
    setArcadeModels();
}

defineExpose({
    stats: models,
    statsArcade: modelsArcade,
    reset
})


useEvent('keydown', (e: KeyboardEvent) => {
    if (e.code !== 'Enter' || e.shiftKey || e.ctrlKey || e.altKey)
        return;

    emit('confirm', { stats: models.value, statsArcade: modelsArcade.value });
});

</script>