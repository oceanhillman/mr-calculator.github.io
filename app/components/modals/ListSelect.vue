<template>
    <div class="modal">
        <h2 v-if="title" v-html="title"/>
        <UiSeparator class="separator" />
        
        <div class="input-level">
            <FormAdvancedInput
                input-placeholder="Level..."
                :number-input="{
                    step: 5,
                    min: 1,
                    max: Object.values(PROFICIENCY_RANKS).at(-1)?.levelEnd ?? 70,
                    hideExtraButtons: mobile
                }"

                :model-value="`${selectedLevel}`"
                @update:model-value="modifySelectedLevelFromInput"
            />
        </div>

        <div ref="listWrapper" class="list-wrapper">
            <PanelHeroProficiencyRewardList
                :hero="hero"
                :selected-item="selectedLevel"
                :show-all-levels="showAllLevels"

                no-tooltip

                :contrast-mode="true"
                :id-prefix="title"

                @reward-click="selectedLevel = $event"
            />
        </div>

        <div class="buttons">
            <FormButton size="small" @click="$emit('confirm', selectedLevel)">
                Confirm
            </FormButton>
            <FormButton size="small" color-scheme="white" @click="$emit('cancel')">Cancel</FormButton>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.input-level
    width: 100%
    padding: 0 30px
    margin-bottom: 30px

    display: flex
    justify-content: center

    .input-wrapper
        +media($minmax: 'max', $size: '550px')
            width: 100%

.list-wrapper
    width: 100%
    max-width: 920px
    height: 100%

    padding: 0 20px

    overflow-x: hidden
    overflow-y: auto
    +scrollbar($background: transparent, $thumb: $light-blue, $active: $color)

    ::v-deep(.rewards)
        padding: 0
</style>

<script setup lang="ts">
import { PROFICIENCY_RANKS, type HeroData } from '~/assets/data/common';

const props = defineProps<{
    title: string,
    hero: HeroData,
    showAllLevels?: boolean,
    currentLevel?: number
}>();

const emit = defineEmits(['confirm', 'cancel'])

const mobile = isMobile(550);

const selectedLevel = ref(props.currentLevel ?? undefined);
function modifySelectedLevelFromInput(level: string) {
    const parsedLevel = parseInt(level);
    if (!parsedLevel || isNaN(parsedLevel))
        return;

    selectedLevel.value = parseInt(level);
    scrollItemIntoView(selectedLevel.value, true);
}

function scrollItemIntoView(level: number, smooth?: boolean) {
    const selectedItemId = `${btoa(props.title)}__level_${level}`;
    const selectedItem = document.getElementById(selectedItemId);
    selectedItem?.scrollIntoView({
        behavior: smooth ? 'smooth' : 'instant'
    });
}

onMounted(() => {
    if (!selectedLevel.value)
        return;

    setTimeout(() => {
        if (!selectedLevel.value)
            return;

        scrollItemIntoView(selectedLevel.value);
    }, 100);
});

useEvent('keyup', (e: KeyboardEvent) => {
    if (e.code !== 'Enter' || e.shiftKey || e.ctrlKey || e.altKey)
        return;

    emit('confirm', selectedLevel.value);
});

</script>