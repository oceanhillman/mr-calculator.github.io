<template>
    <!-- <div v-if="!settings.commitTime || editMode" class="planner"> -->
    <div class="planner">
        <h2 class="rich-title">
            Let's plan your road to
            <span class="icon">
                <img :src="goal.rank?.icon" />
            </span>
            <span class="level">LV{{ goal.level }}</span>!
        </h2>
        <div class="option">
            <div class="label">
                I want to...
            </div>
            <FormToggle
                class="input toggle"

                large
                both
                :model-value="mode == 'weekly'"
                @update:model-value="level.planner.mode = $event ? 'weekly' : 'number-of-days'"
            >
                <template #off>
                    reach my goal in X days
                </template>
                <template #on>
                    set my weekly schedule
                </template>
            </FormToggle>
        </div>
        <template v-if="mode == 'number-of-days'">
            <div class="option">
                <div class="label">
                    In how many days?
                </div>
                <FormAdvancedInput
                    class="input"

                    input-placeholder="e.g.: 6"
                    :numberInput="{
                        min: 0,
                        step: 5
                    }"

                    :model-value="`${settings.numberOfDays.days}`"
                    @update:model-value="settings.numberOfDays.days = parseFloat($event)"
                />
            </div>
        </template>
        <template v-if="hasAvgArcadeStats">
            <div class="option">
                <div class="label">
                    What game modes?
                </div>
                <FormToggle
                    class="input toggle"

                    large
                    both
                    :model-value="level.planner.gameMode == 'arcade'"
                    @update:model-value="level.planner.gameMode = $event ? 'arcade' : 'normal'"
                >
                    <template #off>
                        Quick/Comp
                    </template>
                    <template #on>
                        Arcade (18v18)
                    </template>
                </FormToggle>
            </div>
            <div class="option">
                <div class="label">
                    Max daily missions
                </div>
                <FormArcadeFeasableMissionsSelect
                    :hero="hero"
                />
            </div>
        </template>
        <div v-else class="option">
            <div class="label">
                If you want to see arcade options
            </div>
            <FormButton size="tiny" @click="$emit('openArcadeStatsMenu')">
                <Tex
                    image="gameTime"
                    color="var(--dark)"

                    width="30px"
                    height="30px"
                />
                Set your arcade stats
            </FormButton>
        </div>

        <div v-if="mode == 'weekly'" class="calendar">
            <div class="toolbar">
                <h2>Your schedule</h2>
                <div class="tools">
                    <div class="measure-unit">
                        <div class="label">
                            Measured in: 
                        </div>
                        <FormDropdown
                            small
                            :options="[
                                {
                                    label: 'Quick Matches',
                                    value: 'quick_matches'
                                },
                                {
                                    label: 'Competitive Matches',
                                    value: 'comp_matches'
                                },
                                {
                                    label: 'Hours',
                                    value: 'hours'
                                }
                            ]"

                            v-model="preferences.plannerCalendarMeasureUnit"
                        />
                        <div
                            class="link small-button"
                            @click="valueLinking = !valueLinking"

                            title="Link daily time/match count across all days"
                        >
                            <Tex
                                :image="valueLinking ? 'chain' : 'chainBroken'"
                                color="var(--blue)"

                                width="25px"
                                height="25px"
                                object-fit="contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="days">
                <div
                    v-for="([key, day], index) in Object.entries(weekDays)"
                    :class="{'day-column': 1, disabled: !day.enabled}"
                >
                    <div class="header" @click="day.enabled = !day.enabled">
                        <FormCheckbox
                            class="checkbox"
                            small
                            v-model="day.enabled"
                        />
                        <h3>{{ key.toUpperCase() }}</h3>
                    </div>
                    <div class="set">
                        <div
                            v-if="day.time == -1"
                            class="small-button auto"
                            @click="setTime(key, 1)"
                        >
                            AUTO
                        </div>
                        <FormAdvancedInput
                            v-else
                            class="input"

                            input-placeholder="e.g.: 6"
                            :numberInput="{
                                min: 0,
                                max: calendarMaxDayValue,
                                step: 1,
                                hideExtraButtons: true
                            }"

                            :disabled="!day.enabled"

                            :tab-index="index + 1"

                            :model-value="`${convertTimeToMeasureUnit(day.time)}`"
                            @update:model-value="setTime(key, convertMeasureUnitToTime(parseFloat($event)))"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="mode == 'number-of-days' && settings.numberOfDays.days != 0"
            class="live-preview"
        >
            <ul :class="{data: 1, single: settings.numberOfDays.days < 7}">
                <li>
                    <p>DAILY</p>
                    <h3 v-if="settings.gameMode != 'arcade'">
                        <Tex
                            image="time"
                            color="#4fdbff"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ secondsToHoursString(liveEstimatesNumberOfDays.dailyPlayTime) }}h
                    </h3>
                    <h3 v-if="totalTimesArcade && settings.gameMode == 'arcade'">
                        <Tex
                            image="timeArcade"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ secondsToHoursString(liveEstimatesNumberOfDays.dailyPlayTimeArcade!) }}h
                    </h3>
                    <h3 v-if="settings.gameMode != 'arcade'">
                        <Tex
                            image="quickMatchIcon"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ liveEstimatesNumberOfDays.dailyQuickMatches.toFixed(1) }}
                    </h3>
                    <h3 v-if="settings.gameMode != 'arcade'">
                        <Tex
                            image="competitiveIcon"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ liveEstimatesNumberOfDays.dailyCompMatches.toFixed(1) }}
                    </h3>
                    <h3 v-if="totalTimesArcade && settings.gameMode == 'arcade'">
                        <Tex
                            image="arcadeIcon"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ liveEstimatesNumberOfDays.dailyArcadeMatches!.toFixed(1) }}
                    </h3>
                </li>
                <li v-if="settings.numberOfDays.days >= 7">
                    <p>WEEKLY</p>
                    <h3 v-if="settings.gameMode != 'arcade'">
                        <Tex
                            image="time"
                            color="#4fdbff"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ secondsToHoursString(liveEstimatesNumberOfDays.weeklyPlayTime) }}h
                    </h3>
                    <h3 v-if="totalTimesArcade && settings.gameMode == 'arcade'">
                        <Tex
                            image="timeArcade"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ secondsToHoursString(liveEstimatesNumberOfDays.weeklyPlayTimeArcade!) }}h
                    </h3>
                    <h3 v-if="settings.gameMode != 'arcade'">
                        <Tex
                            image="quickMatchIcon"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ liveEstimatesNumberOfDays.weeklyQuickMatches.toFixed(1) }}
                    </h3>
                    <h3 v-if="settings.gameMode != 'arcade'">
                        <Tex
                            image="competitiveIcon"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ liveEstimatesNumberOfDays.weeklyCompMatches.toFixed(1) }}
                    </h3>

                    <h3 v-if="totalTimesArcade && settings.gameMode == 'arcade'">
                        <Tex
                            image="arcadeIcon"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ liveEstimatesNumberOfDays.weeklyArcadeMatches!.toFixed(1) }}
                    </h3>
                </li>
            </ul>
            <p v-if="totalTimesArcade && settings.gameMode == 'arcade'" class="small">
                (Arcade games can only give points for 15 missions of each type every day. Match limits may vary depending on proficiency rank.)
            </p>

            <p v-if="settings.gameMode == 'normal'">
                At this rate you will reach your goal on
                <span>{{ toDateAndTime(liveEstimatesNumberOfDays.finishDate) }}</span>
            </p>
            <p v-else-if="liveEstimatesNumberOfDays.arcadeFinishDate">
                <template v-if="liveEstimatesNumberOfDays.arcadeFinishTimeOutOfBounds">
                    Due to mission limits imposed on arcade games, you can't finish in {{ settings.numberOfDays.days }} days.
                    <br/>
                    You will finish on
                    <span>{{ toDateAndTime(liveEstimatesNumberOfDays.arcadeFinishDate) }}</span>
                    (<span class="gray">in {{ liveEstimatesNumberOfDays.arcadeDayCount }} days</span>)
                </template>
                <template v-else>
                    At this rate you will reach your goal on
                    <span>{{ toDateAndTime(liveEstimatesNumberOfDays.finishDate) }}</span>
                </template>
            </p>
        </div>
        <div
            v-else-if="mode == 'weekly' && anyWeekDayHasTimeSet"
            class="live-preview"
        >
            <ul class="data">
                <li>
                    <p>TOTAL</p>
                    <h3 v-if="settings.gameMode != 'arcade'"><span>
                        {{ secondsToHoursString(liveEstimatesWeekly.weeklyPlayTime) }}h<span>/week</span>
                    </span></h3>
                    <h3 v-if="settings.gameMode != 'arcade'"><span>
                        {{ weeksToWeeksAndDays(liveEstimatesWeekly.totalWeeks) }} <span>total</span>
                    </span></h3>
                    <h3 v-if="totalTimesArcade && settings.gameMode == 'arcade'"><span>
                        {{ weeksToWeeksAndDays(liveEstimatesWeekly.totalWeeksArcade!) }} <span>arcade</span>
                    </span></h3>
                    <span
                        v-if="totalTimesArcade
                           && settings.gameMode == 'arcade'
                           && liveEstimatesWeekly.limitApplied
                        "
                    >(limit applied)</span>
                </li>
                <li>
                    <p>WEEKLY</p>
                    <h3 v-if="settings.gameMode != 'arcade'">
                        <Tex
                            image="time"
                            color="#4fdbff"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ secondsToHoursString(liveEstimatesWeekly.weeklyPlayTime) }}h
                    </h3>
                    <h3 v-if="settings.gameMode != 'arcade'">
                        <Tex
                            image="quickMatchIcon"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ liveEstimatesWeekly.weeklyQuickMatches.toFixed(1) }}
                    </h3>
                    <h3 v-if="settings.gameMode != 'arcade'">
                        <Tex
                            image="competitiveIcon"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ liveEstimatesWeekly.weeklyCompMatches.toFixed(1) }}
                    </h3>
                    <h3 v-if="totalTimesArcade">
                        <Tex
                            image="arcadeIcon"

                            width="25px"
                            height="25px"
                            object-fit="contain"
                        />
                        {{ liveEstimatesWeekly.weeklyArcadeMatches.toFixed(1) }}
                    </h3>
                </li>
            </ul>

            <p v-if="totalTimesArcade && settings.gameMode == 'arcade'" class="small">
                (Arcade games can only give points for 15 missions of each type every day. Match limits may vary depending on proficiency rank.)
            </p>

            <p v-if="
                settings.gameMode == 'normal'
             || (settings.gameMode == 'arcade' && !liveEstimatesWeekly.limitApplied)
            ">
                At this rate you will reach your goal on
                <span>
                    {{ toDateAndTime(liveEstimatesWeekly.finishDate) }}
                    (<span class="gray">in {{ liveEstimatesWeekly.dayCount }} days</span>)
                </span>
            </p>
            <p v-else-if="liveEstimatesWeekly.limitApplied">
                At this rate you will reach your goal on
                <span>
                    {{ toDateAndTime(liveEstimatesNumberOfDays.arcadeFinishDate!) }}
                    (<span class="gray">in {{ liveEstimatesWeekly.arcadeDayCount }} days</span>)
                </span>
            </p>
        </div>

        <!-- <div class="auto-track">
            <FormCheckbox
                class="input checkbox"
                small
                v-model="settings.track"
            >
                Track my progress automatically
            </FormCheckbox>
            <p>
                (Will change your level and proficiency points based on the plan and time/date.
                <br/>
                Turning this off will require you to manually update your progress for it to apply)
            </p>
        </div> -->

        <!-- <FormButton
            class="button"
            size="small"

            @click="commit"
        >
            {{
                !editMode ?
                    'COMMIT TO PLAN'
                    :
                    'RESET START DATE TO NOW'
            }}
            
        </FormButton>
        <FormButton
            v-if="editMode"
            class="button cancel"
            size="small"
            color-scheme="white"

            @click="editMode = false"
        >
            CANCEL
        </FormButton>
        <FormButton
            v-if="editMode"
            class="button cancel"
            size="small"
            color-scheme="white"

            @click="giveUp"
        >
            GIVE UP
        </FormButton> -->
    </div>
    <!-- <div v-else class="planner">
        <div class="edit-button-wrapper">
            <div class="edit-button" @click="editMode = !editMode">
                <img src="/img/edit_icon.png" style="filter: invert(0.8)" />
            </div>
        </div>

        <h2 class="rich-title">
            Your roadmap to
            <span class="icon">
                <img :src="goal.rank?.icon" />
            </span>
            <span class="level">LV{{ goal.level }}</span>
        </h2>

        <ul
            v-for="month in roadmapMonths"
            class="roadmap-calendar"
        >
            <li class="head">
                <ul>
                    <li
                        v-for="day in WEEK_KEYS"
                        :key="day"
                    >
                        {{ day.toUpperCase().slice(0, 3) }}
                    </li>
                </ul>
            </li>
            <li
                v-for="week in month.weeks"
            >
                <ul>
                    <li
                        v-for="day in week"
                        :class="{outsideMonth: !day.isWithinMonth, outsidePlan: day.isOutsidePlan}"
                    >
                        {{ day.date?.getDate() }}
                    </li>
                </ul>
            </li>
        </ul>
    </div> -->
</template>

<style src="@/assets/style/components/rich-title.sass" scoped></style>
<style src="@/assets/style/components/planner.sass" scoped></style>

<script setup lang="ts">
import { AVG_COMP_MATCH_DURATION_MIN, AVG_QUICK_MATCH_DURATION_MIN, DEFAULT_PREFERENCES_STORE, WEEK_KEYS, type HeroData, type PlayerHeroStore, type PreferencesStore, type WeekDay, type PlannerWeekDay, AVG_ARCADE_MATCH_DURATION_MIN, PreferencesStoreSchema } from '~/assets/data/common';
import type { PersonalRankTimeEstimate } from '~/services/calculator';

const props = defineProps<{
    hero: HeroData,
    timeEstimates: PersonalRankTimeEstimate[],
    timeEstimatesArcade?: PersonalRankTimeEstimate[],

    valueLinking?: boolean
}>();

const emit = defineEmits(['openArcadeStatsMenu'])

const level = defineModel<PlayerHeroStore>({ required: true });
const hasAvgArcadeStats = useHasAvgArcadeStats(props.hero);

const totalTimes = computed(() => {
    let conservative = 0;
    props.timeEstimates.forEach(r => conservative += r.time[0]);
    let avg = 0;
    props.timeEstimates.forEach(r => avg += r.time[1]);
    let optimistic = 0;
    props.timeEstimates.forEach(r => optimistic += r.time[2]);

    return { conservative, avg, optimistic };
});
const totalTimesArcade = computed(() => {
    if (!props.timeEstimatesArcade)
        return null;

    let conservative = 0;
    props.timeEstimatesArcade.forEach(r => conservative += r.time[0]);
    let avg = 0;
    props.timeEstimatesArcade.forEach(r => avg += r.time[1]);
    let optimistic = 0;
    props.timeEstimatesArcade.forEach(r => optimistic += r.time[2]);

    return { conservative, avg, optimistic };
});
const totalDaysArcade = computed(() => {
    if (!props.timeEstimatesArcade)
        return null;

    return props.timeEstimatesArcade.reduce((sum, c) => sum + (c.arcade?.dayCount ?? 0), 0);
});

const preferences = useLocalStorage<PreferencesStore>('preferences', DEFAULT_PREFERENCES_STORE(), PreferencesStoreSchema);
const goal = computed(() => useLevel(level.value.goal, props.hero));

const mode = computed(() => level.value.planner.mode);
const settings = computed(() => level.value.planner);

const valueLinking = ref(typeof props.valueLinking !== 'undefined' ? props.valueLinking : true);

const weekDays = computed(() => level.value.planner.weekly.weekDays);

const anyWeekDayHasTimeSet = computed(() =>
    Object.values(weekDays.value).some(day => day.enabled && day.time != 0)
);

function setTime(day: string, time: number) {
    weekDays.value[day as WeekDay].time = time;

    if (!valueLinking.value)
        return;

    Object.entries(weekDays.value).forEach(([key, day]) => {
        if (day.enabled)
            weekDays.value[key as WeekDay].time = time;
    });
}

function convertTimeToMeasureUnit(time: number): number {
    const unit = preferences.value.plannerCalendarMeasureUnit;
    
    if (unit == 'hours')
        return Math.round((time / 60 / 60) * 10) / 10;
    else if (unit == 'quick_matches')
        return Math.round((time / 60 / AVG_QUICK_MATCH_DURATION_MIN) * 10) / 10;
    else
        return Math.round((time / 60 / AVG_COMP_MATCH_DURATION_MIN) * 10) / 10;
}

function convertMeasureUnitToTime(value: number) {
    const unit = preferences.value.plannerCalendarMeasureUnit;

    if (unit == 'hours')
        return value * 60 * 60;
    else if (unit == 'quick_matches')
        return value * AVG_QUICK_MATCH_DURATION_MIN * 60;
    else
        return value * AVG_COMP_MATCH_DURATION_MIN * 60;
}

const calendarMaxDayValue = computed(() => {
    if (preferences.value.plannerCalendarMeasureUnit == 'hours')
        return 24;

    const totalTimeAvg = totalTimes.value.avg;

    if (preferences.value.plannerCalendarMeasureUnit == 'quick_matches')
        return Math.round(totalTimeAvg / (AVG_QUICK_MATCH_DURATION_MIN * 60) * 10) / 10;
    if (preferences.value.plannerCalendarMeasureUnit == 'comp_matches')
        return Math.round(totalTimeAvg / (AVG_COMP_MATCH_DURATION_MIN * 60) * 10) / 10;

    return undefined;
});


// ==== CALCULATOR ====
const liveEstimatesNumberOfDays = computed(() => {
    const dailyPlayTime = totalTimes.value.avg / settings.value.numberOfDays.days;
    const weeklyPlayTime = dailyPlayTime * 7;

    const dailyQuickMatches = dailyPlayTime / (AVG_QUICK_MATCH_DURATION_MIN * 60);
    const dailyCompMatches = dailyPlayTime / (AVG_COMP_MATCH_DURATION_MIN * 60);

    const weeklyQuickMatches = dailyQuickMatches * 7;
    const weeklyCompMatches = dailyCompMatches * 7;
    
    // const now = settings.value.commitTime ?
    //                 new Date(settings.value.commitTime).getTime()
    //                 :
    //                 Date.now();

    const now = Date.now();

    const finishTime = now / 1000 + (24 * 60 * 60 * settings.value.numberOfDays.days);
    const finishDate = new Date(finishTime * 1000);

    const weekCount = settings.value.numberOfDays.days / 7;

    let dailyPlayTimeArcade = undefined;
    let weeklyPlayTimeArcade = undefined;
    let dailyArcadeMatches = undefined;
    let weeklyArcadeMatches = undefined;
    let arcadeFinishDate = undefined;
    let arcadeDayCount = undefined;
    let arcadeFinishTimeOutOfBounds = false;

    if (totalTimesArcade.value) {
        dailyPlayTimeArcade = totalTimesArcade.value.avg / settings.value.numberOfDays.days;
        weeklyPlayTimeArcade = dailyPlayTimeArcade * 7;
        dailyArcadeMatches = dailyPlayTimeArcade / (AVG_ARCADE_MATCH_DURATION_MIN * 60);
        weeklyArcadeMatches = dailyArcadeMatches * 7;

        if (totalDaysArcade.value) {
            arcadeFinishDate = new Date(Date.now() + totalDaysArcade.value * 24 * 60 * 60 * 1000);
            arcadeDayCount = Math.ceil((arcadeFinishDate.getTime() - now) / 1000 / 60 / 60 / 24);

            if (arcadeFinishDate.getTime() - (finishTime * 1000) > 12 * 60 * 60 * 1000)
                arcadeFinishTimeOutOfBounds = true;
        }
    }

    return {
        dailyPlayTime,
        dailyPlayTimeArcade,

        weeklyPlayTime,
        weeklyPlayTimeArcade,

        dailyQuickMatches,
        dailyCompMatches,
        dailyArcadeMatches,

        weeklyQuickMatches,
        weeklyCompMatches,
        weeklyArcadeMatches,

        arcadeFinishDate,
        arcadeDayCount,
        arcadeFinishTimeOutOfBounds,

        finishDate,

        weekCount
    };
});

const liveEstimatesWeekly = computed(() => {
    const weekDaysArray = Object.entries(settings.value.weekly.weekDays);

    const weeklyPlayTime = weekDaysArray
        .filter(d => d[1].enabled)
        .reduce((total, [, day]) => total + day.time, 0);
    const weeklyQuickMatches = weeklyPlayTime / (AVG_QUICK_MATCH_DURATION_MIN * 60);
    const weeklyCompMatches = weeklyPlayTime / (AVG_COMP_MATCH_DURATION_MIN * 60);

    const totalWeeks = totalTimes.value.avg / weeklyPlayTime;

    // const now = settings.value.commitTime ?
    //                 new Date(settings.value.commitTime).getTime()
    //                 :
    //                 Date.now();

    const now = Date.now();

    const finishTime = now / 1000 + (7 * 24 * 60 * 60 * totalWeeks);
    const finishDate = new Date(finishTime * 1000);

    const dayCount = Math.ceil((finishDate.getTime() - now) / 1000 / 60 / 60 / 24);

    const weeklyArcadeMatches = weeklyPlayTime / (AVG_ARCADE_MATCH_DURATION_MIN * 60);
    let totalWeeksArcade = undefined;
    let limitApplied = false;
    let arcadeFinishDate = undefined;
    let arcadeDayCount = undefined;
    if (totalDaysArcade.value) {
        arcadeFinishDate = new Date(Date.now() + totalDaysArcade.value * 24 * 60 * 60 * 1000);
        arcadeDayCount = Math.ceil((arcadeFinishDate.getTime() - now) / 1000 / 60 / 60 / 24);

        limitApplied = dayCount < arcadeDayCount;

        totalWeeksArcade = limitApplied ? (arcadeDayCount / 7) : (dayCount / 7);
    }

    return {
        weeklyPlayTime,
        weeklyQuickMatches,
        weeklyCompMatches,
        weeklyArcadeMatches,

        totalWeeks,
        totalWeeksArcade,

        arcadeFinishDate,
        arcadeDayCount,
        limitApplied,

        finishDate,
        dayCount
    }
});

function weeksToWeeksAndDays(weeksRaw: number) {
    const weeks = Math.trunc(weeksRaw);
    const days = Math.floor((weeksRaw - weeks) * 7);

    return `${weeks}w` + (days !== 0 ? ` ${days}d` : '');
}

// const editMode = ref(false);

// function commit() {
//     settings.value.commitTime = new Date().toISOString();
//     editMode.value = false;
// }

// function giveUp() {
//     settings.value.commitTime = undefined;
//     editMode.value = false;
// }

// ==== ROADMAP ====

// const today = new Date();

// // Get the user's locale and timezone automatically
// const userLocale = navigator.language;
// const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// // Current day of week (0 = Sunday, 1 = Monday, etc.)
// const currentDayIndex = today.getDay();

// // Format a date nicely in the user's locale
// const formatDate = (date: Date) => date.toLocaleDateString(userLocale, {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     timeZone: userTimezone
// });

// // Get the start of the current week (Monday-based)
// const getWeekStart = (date: Date) => {
//     const d = new Date(date);
//     const day = d.getDay();
//     const diff = (day === 0 ? -6 : 1 - day); // adjust for Sunday
//     d.setDate(d.getDate() + diff);
//     return d;
// };

// // Generate the 7 days of the current week
// const getWeekDays = (date: Date) => {
//     const start = getWeekStart(date);
//     return Array.from({ length: 7 }, (_, i) => {
//         const d = new Date(start);
//         d.setDate(start.getDate() + i);
//         return d;
//     });
// };


// const roadmapMonths = computed(() => {
//     if (!settings.value.commitTime)
//         return [];

//     const weekCount = settings.value.mode == 'number-of-days' ?
//             Math.ceil(liveEstimatesNumberOfDays.value.weekCount)
//             :
//             Math.ceil(liveEstimatesWeekly.value.totalWeeks);

//     const lastPlanDay = settings.value.mode == 'number-of-days' ?
//             liveEstimatesNumberOfDays.value.finishDate
//             :
//             liveEstimatesWeekly.value.finishDate;

//     const months: {
//         month: number,
//         weeks: {
//             key: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
//             date: Date | undefined;
//             isToday: boolean;
//             isWithinMonth: boolean;
//             isOutsidePlan: boolean;
//             weekDay: PlannerWeekDay;
//         }[][]
//     }[] = [];
//     let currentMonthIndex = -1;
//     let currentMonth = -1;

//     for (let i = 0; i < weekCount; i++) {
//         const date = new Date(settings.value.commitTime);
//         date.setDate(date.getDate() + (i * 7));

//         if (date.getMonth() != currentMonth) {
//             currentMonth = date.getMonth();
//             currentMonthIndex++;

//             months[currentMonthIndex] = {
//                 month: date.getMonth(),
//                 weeks: []
//             };
//         }

//         const days = getWeekDays(date);
//         const weekDays = WEEK_KEYS.map((key, i) => ({
//             key,
//             date: days[i],
//             isToday: days[i]?.toDateString() === new Date().toDateString(),
//             isWithinMonth: days[i]?.getMonth() == currentMonth,
//             isOutsidePlan: days[i]!.getTime() > lastPlanDay.getTime(),
//             weekDay: settings.value.weekly.weekDays[key]
//         }))

//         months[currentMonthIndex]!.weeks.push(weekDays);
        
//         if (weekDays.length) {
//             const lastDay = weekDays.at(-1);
//             if (!lastDay || !lastDay.date)
//                 continue;

//             if (lastDay.date.getMonth() == currentMonth)
//                 continue;

//             currentMonth = lastDay?.date?.getMonth();
//             currentMonthIndex++;

//             months[currentMonthIndex] = {
//                 month: currentMonth,
//                 weeks: [
//                     weekDays.map(wd => ({
//                         ...wd,
//                         isWithinMonth: wd.date?.getMonth() == currentMonth,
//                     }))
//                 ]
//             };
//         }
//     }

//     return months;
// });
</script>