<template>
    <div :class="{'input-wrapper': 1, disabled}">
        <template v-if="!!numberInput && !numberInput.hideExtraButtons">
            <button class="small-button step" @click="add((numberInput.step ?? 100) * -1)">
                -{{numberInput.step ?? 100}}
            </button>
            <button class="small-button" @click="add(-1)">
                <Tex
                    image="minus"
                    color="var(--dark)"

                    width="20px"
                    height="20px"
                    object-fit="contain"
                />
            </button>
        </template>

        <input
            ref="input"
            :class="{'input': 1, number: !!numberInput}"

            :type="inputType"
            :step="numberInput?.step"
            :min="numberInput?.min"
            :max="numberInput?.max"

            :placeholder="inputPlaceholder"

            :disabled="disabled"

            :tabindex="tabIndex"

            v-model="inputModel"

            @change="onChange"
        />

        <template v-if="!!numberInput && !numberInput.hideExtraButtons">
            <button class="small-button" @click="add(1)">
                <Tex
                    image="plus"
                    color="var(--dark)"

                    width="20px"
                    height="20px"
                    object-fit="contain"
                />
            </button>
            <button class="small-button step" @click="add(numberInput.step ?? 100)">
                +{{numberInput.step ?? 100}}
            </button>
        </template>
    </div>
</template>

<style lang="sass" scoped>
.input-wrapper
    display: flex
    gap: 5px

    touch-action: none

    +media($size: 550px, $minmax: 'max')
        flex-wrap: wrap
        justify-content: center

        padding: 0 20px

    .input
        width: 100%
        padding: 10px 20px
        background: #d6dcee

        border: 3px solid $light-blue-highlight
        outline: none
        
        font-size: 20px
        font-family: KelsonSans

        +media-desktop
            width: 650px

        &::placeholder
            color: #606d91

        &:focus
            border: 3px solid #fff

        &[disabled]
            background: #babecc

        &.number
            width: 100%
            text-align: center

            +media-desktop
                width: 320px

    button.small-button.step
        width: 100px
</style>

<script setup lang="ts">
const props = defineProps<{
    inputPlaceholder?: string,
    inputProps?: any,
    numberInput?: {
        allowMath?: boolean
        step?: number
        min?: number
        max?: number,

        hideExtraButtons?: boolean
    },

    disabled?: boolean,

    tabIndex?: number
}>();

const emit = defineEmits<{
    change: [payload: Event]
}>()

const inputType = computed(() => {
    if (!!props.numberInput)
        if (props.numberInput.allowMath)
            return 'text'
        else
            return 'number'
    
    return 'text'
})

const inputModel = defineModel<string>({ default: '' });

// const MATH_SYMBOLS = ['+', '-', '*', '/', '%', '(', ')', '.'];
const MATH_SYMBOLS_REGEX = /[0-9+\-*/().]/g;
const NON_MATH_SYMBOLS_REGEX = /[^0-9+\-*/().]/g;
function onChange(e: Event) {
    emit('change', e);

    const value = (e.target as HTMLInputElement).value;

    if (!props.numberInput?.allowMath || !value.match(MATH_SYMBOLS_REGEX))
        return;

    const evaluated = eval(value);
    const parsed = parseFloat(evaluated);
    let toString = parsed + '';
    if (parsed % 1 != 0)
        toString = parsed.toFixed(1);

    inputModel.value = toString;
}

watch(inputModel, (value) => {
    if (!props.numberInput)
        return;

    // if the user is doing math currently (hasn't been replaced by result yet), dont do anything
    if (props.numberInput.allowMath && value.match(MATH_SYMBOLS_REGEX)) {
        // only replace if there are illegal characters
        if (value.match(NON_MATH_SYMBOLS_REGEX)) {
            inputModel.value = value.replace(NON_MATH_SYMBOLS_REGEX, '');
        }

        return;
    }

    let numberVal = parseFloat(value);
    if (isNaN(numberVal)) {
        inputModel.value = props.numberInput.allowMath ? '' : '0';
        return;
    }

    if (typeof props.numberInput.min !== 'undefined' && numberVal < props.numberInput.min)
        inputModel.value = props.numberInput.min + '';
    if (typeof props.numberInput.max !== 'undefined' && numberVal > props.numberInput.max)
        inputModel.value = props.numberInput.max + '';
})

function add(number: number) {
    let numberVal = parseFloat(inputModel.value);
    if (isNaN(numberVal))
        numberVal = 0;

    inputModel.value = (numberVal + number) + '';
}

</script>