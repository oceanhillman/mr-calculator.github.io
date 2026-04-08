<template>
    <div class="tabbed-container" :data-current-tab="tab">
        <ul class="tabs">
            <li
                v-for="[name] in Object.entries($slots)"
                :key="name"

                :class="{ selected: tab == name }"
                @click="tab = name"
            >
                {{ slotLabels?.[name] ?? name.toUpperCase() }}
            </li>
        </ul>

        <div :class="['tab-container', ...containerClassComp]">
            <slot :name="tab" />
        </div>
    </div>
</template>

<style lang="sass" scoped>
.tabbed-container
    display: flex
    flex-direction: column

.tabs
    position: sticky
    top: 0
    width: 100%
    height: 52px

    display: flex
    justify-content: center

    background: #222635

    z-index: 2

    +media-desktop
        justify-content: start

    &.center
        justify-content: center !important

    &::before
        content: ""
        position: absolute
        top: 0
        left: 0
        width: 157px
        height: 100%

        background: var(--tex-panelTabsBackground) no-repeat
        background-position: 0
        background-size: 240px 52px

        z-index: 1

    &::after
        content: ""
        position: absolute
        top: 0
        right: 0
        width: 75px
        height: 100%

        background: var(--tex-panelTabsBackground) no-repeat
        background-position: -157px
        background-size: 240px 52px

        z-index: 1

    > * 
        z-index: 2

    li
        width: auto
        height: 100%
        padding: 0 30px

        font-size: 20px
        font-family: RefrigeratorDeluxeBold
        color: $light

        text-align: center
        line-height: 52px

        user-select: none
        cursor: pointer

        +media-desktop
            padding: 0 60px

        +media-ml-desktop
            padding: 0 100px

        &:not(:last-of-type)
            position: relative

            &::after
                content: ""
                position: absolute
                top: 0
                right: 0

                width: 9px
                height: 100%

                background: var(--tex-panelTabSeparator) no-repeat
                background-size: contain
                background-position: center

        &:hover
            color: #fff

        &.selected
            color: $color

.tab-container
    width: 100%
</style>

<script setup lang="ts">
const props = defineProps<{
    containerClass?: string|string[],
    slotLabels?: Record<string, string>
}>();

const containerClassComp = computed(() => {
    return Array.isArray(props.containerClass) ? [...props.containerClass] : [props.containerClass]
})

const slots = useSlots();
const tab = ref(Object.keys(slots)[0]);
</script>