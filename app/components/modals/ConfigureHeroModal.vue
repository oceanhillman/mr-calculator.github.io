<template>
    <div class="modal">
        <h2 v-if="title" v-html="title"/>
        <p v-if="message" class="modal-subtitle" v-html="message" />
        <UiSeparator class="separator" />
    
        <div class="settings">
            <div class="setting">
                <label>Name</label>
                <FormAdvancedInput
                    input-placeholder="e.g.: Colossus"
                    v-model="heroName"
                />

                <div
                    v-if="invalidName"
                    class="popup"
                >
                    This name already exists, choose another.
                </div>
            </div>
            <div class="setting">
                <label>Role(s)</label>
                <FormDropdown
                    :options="ROLES_DROPDOWN"
                    multi
                    v-model="heroRoles"
                />
            </div>

            <h3>MISSIONS</h3>

            <div
                class="mission"
                v-for="(mission, index) in missions"
            >
                <div class="title">
                    <h3>
                        MISSION {{ index + 1 }}
                        <span v-if="mission.inserted && !mission.guessed" class="inserted">VALID</span>
                        <span v-else-if="mission.guessed" class="guessed">AUTO</span>
                        <span
                            v-else
                            class="invalid"

                            title="Since no value was provided, this mission was not added"
                        >
                            INVALID
                        </span>
                    </h3>
                    <Tex
                        image="delete"
                        color="var(--blue)"
                        hover="color"
                        hover-color="var(--light-blue)"
                        clickable

                        width="32px"
                        height="32px"

                        @click="removeMission(index)"
                    />
                </div>
                <div class="setting">
                    <label>Type</label>
                    <FormDropdown
                        :options="MISSION_TYPES"
                        v-model="mission.type"
                    />
                </div>

                <div v-if="!mission.editingRank" class="setting">
                    <label>Any requirement</label>
                    <p>
                        <Tex
                            image="infoButton"
                            width="14px"
                            height="14px"

                            inline
                        />
                        <span>
                            Type the mission's required stat number at any rank and we'll determine the rest.
                        </span>
                    </p>
                    <FormAdvancedInput
                        :input-placeholder="`e.g.: ${CHALLENGE_STATS[mission.type]?.example}`"
                        :number-input="{
                            allowMath: mission.type == 'damage_heal' || mission.type == 'kos_assists',
                            step: CHALLENGE_STATS[mission.type]?.step ?? 100
                        }"

                        :model-value="`${mission.neededAny == -1 ? '' : mission.neededAny}`"
                        @update:model-value="mission.neededAny = parseFloat($event) || -1"
                    />

                    <p class="info clickable">
                        You can also manually type in every rank's requirements and points reward by clicking on the mission in the preview table or by
                        <u @click="startEditMission(selectedRank, index + 1)">clicking here</u>.
                    </p>

                    <p v-if="mission.guessed" class="info">
                        <Tex
                            image="check"
                            color="#53c936"

                            width="12px"
                            height="12px"
                            inline
                        />
                        We were able to determine all requirements.
                    </p>
                    <p v-else-if="mission.guessed === false" class="info">
                        <Tex
                            image="cross"
                            color="#c94f36"

                            width="12px"
                            height="12px"
                            inline
                        />
                        We were unable to find a match.
                    </p>
                </div>

                <div v-else class="setting">
                    <label class="with-image">
                        EDITING 
                        <img :src="mission.editingRank.icon" />
                        {{ mission.editingRank.name }} RANK
                    </label>
                    <p>
                        <Tex
                            image="infoButton"
                            width="14px"
                            height="14px"

                            inline
                        />
                        <span>
                            Type the mission's required stat number at the <b>{{ mission.editingRank.name }}</b> rank.
                        </span>
                    </p>

                    <label class="with-image">
                        <img :src="CHALLENGE_ICONS[mission.type] ?? ''" />
                        REQUIREMENT
                    </label>
                    <FormAdvancedInput
                        :input-placeholder="`e.g.: ${CHALLENGE_STATS[mission.type]?.example}`"
                        :number-input="{
                            allowMath: mission.type == 'damage_heal' || mission.type == 'kos_assists',
                            step: CHALLENGE_STATS[mission.type]?.step ?? 100
                        }"

                        :model-value="`${
                            findMission(index, mission.editingRank.id)?.needed == 0 ? 
                                '' : (findMission(index, mission.editingRank.id)?.needed ?? '')
                        }`"
                        @update:model-value="
                            editMission(index, mission.editingRank.id, parseFloat($event) || 0)
                        "
                    />
                    <label class="with-image small">
                        <img :src="tex('proficiency', 'hover')" />
                        REWARD
                    </label>
                    <FormAdvancedInput
                        :input-placeholder="`e.g.: 20`"
                        :number-input="{
                            step: 5
                        }"

                        :model-value="`${
                            findMission(index, mission.editingRank.id)?.reward == 0 ? 
                                '' : (findMission(index, mission.editingRank.id)?.reward ?? '')
                        }`"
                        @update:model-value="
                            editMission(index, mission.editingRank.id, undefined, parseFloat($event) || 0)
                        "
                    />

                    <p class="info clickable">
                        <u @click="stopEditMission(index + 1)">Go back to automatic</u>
                        (Warning: this will reset the numbers you inserted!)
                    </p>
                </div>
            </div>

            <div class="mission add" @click="addMission">
                <div class="title">
                    <h3>ADD MISSION</h3>
                    <Tex
                        image="plus"
                        color="var(--blue)"
                        hover="color"
                        hover-color="var(--light-blue)"
                        clickable

                        width="20px"
                        height="20px"
                    />
                </div>
            </div>

            <h3>PREVIEW</h3>
            <div class="setting preview">
                <PanelMissionTable
                    :hero="newHero"
                    small
                    clickable
                    :mission-hover-tooltip="rankId => ({
                        text: `Edit mission at rank <b>${PROFICIENCY_RANKS[rankId]?.name}</b>`,
                        icon: 'mouseLeft'
                    })"

                    @item-click="(rankId, _, challengeIndex) => startEditMission(rankId, challengeIndex)"
                    v-model="selectedRank"
                />
            </div>
        </div>

        <div class="buttons">
            <FormButton size="small" @click="confirm">
                Confirm
            </FormButton>
            <FormButton size="small" color-scheme="white" @click="$emit('cancel')">Cancel</FormButton>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.settings
    width: 100%
    display: flex
    flex-direction: column
    gap: 10px

    padding: 0 20px

    +media-desktop
        width: 650px

    h3
        color: $blue
        font-size: 26px
        font-family: RefrigeratorDeluxeBold
        text-transform: uppercase

        margin-top: 20px

    .input-wrapper
        padding: 0

    .setting
        position: relative
        width: 100%

        &.preview
            border: 3px solid $light-blue-highlight

        label
            color: $blue
            font-size: 22px
            font-family: RefrigeratorDeluxeBold
            text-transform: uppercase

            &.with-image
                display: flex
                align-items: center

                &.small
                    img
                        width: 20px
                        height: 20px
                        margin-right: 5px

            + *:not(p)
                margin-top: 5px
            + p
                margin-bottom: 5px

            img
                width: 30px
                height: 30px

                object-fit: contain

        p
            color: $light-blue
            font-size: 16px
            font-family: KelsonSans

            padding: 0

            &.info
                margin-top: 5px

            &.clickable
                u
                    cursor: pointer

                    &:hover
                        color: $blue

        ::v-deep(input)
            width: 100% !important

        .popup
            position: absolute
            top: 20px
            left: 50%

            transform: translate(-50%, -100%)


    .mission
        width: 100%

        background: $light
        border: 3px solid $light-blue
        padding: 10px

        display: flex
        flex-direction: column
        gap: 10px

        +media-desktop
            background: transparent

        &.add
            background: #d6dcee

            cursor: pointer
            user-select: none

            &:hover
                border: 3px solid #fff

                .title
                    h3
                        color: $light-blue

        .title
            display: flex
            justify-content: space-between
            align-items: center

        h3
            margin: 0

            span
                display: inline-block
                padding: 1px 2px

                font-size: 16px
                color: #fff

                &.inserted
                    background: #53c936
                &.guessed
                    background: #f1b70c
                &.invalid
                    background: #c94f36

</style>

<script setup lang="ts">
import { CHALLENGE_ICONS, CHALLENGE_NAMES, CHALLENGE_PAIRS, CHALLENGE_REWARDS_PER_RANK, CHALLENGE_ROLE_PAIRS, CHALLENGE_STATS, PROFICIENCY_RANKS, type Challenge, type HeroData, type HeroRole, type ProficiencyRank } from '~/assets/data/common';
import { guessChallenge } from '~/assets/data/converge';
import { HERO_LIST, UNKNOWN_HERO } from '~/assets/data/heroes';
import { tex } from '~/assets/data/textures';
import type { Option } from '../form/Dropdown.vue';
import type { TooltipBinding } from '~/directives/tooltip';

const { notify } = useNotificationManager();

const props = defineProps<{
    title: string,
    message: string,
    /**
     * Cannot be mutated after modal is opened! (well it can be but it will do nothing)
     */
    hero?: HeroData
}>();

const emit = defineEmits<{
    confirm: [ hero: HeroData ],
    cancel: []
}>();

const MISSION_TYPES = Object.entries(CHALLENGE_NAMES).filter(([id]) => id != 'play').map(([id, name]) => {
    return {
        label: `<div class="icon" style="--img:url('${CHALLENGE_ICONS[id as Challenge['type']]}')"></div> ${name}`,
        value: id
    }
});
const ROLES_DROPDOWN: Option[] = [
    {
        label: `<div class="icon" style="--img:url('/img/heroes/roles/vanguard.webp')"></div> VANGUARD`,
        whenCurrentLabel: `<div class="icon" style="--img:url('/img/heroes/roles/vanguard.webp')"></div>`,
        value: 'vanguard' 
    },
    {
        label: `<div class="icon" style="--img:url('/img/heroes/roles/duelist.webp')"></div> DUELIST`,
        whenCurrentLabel: `<div class="icon" style="--img:url('/img/heroes/roles/duelist.webp')"></div>`,
        value: 'duelist' 
    },
    {
        label: `<div class="icon" style="--img:url('/img/heroes/roles/strategist.webp')"></div> STRATEGIST`,
        whenCurrentLabel: `<div class="icon" style="--img:url('/img/heroes/roles/strategist.webp')"></div>`,
        value: 'strategist' 
    },
];

const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);

const INITIAL_NAME = `${props.hero?.name}`;

const heroName = ref(props.hero?.name ?? '');
const heroRoles = ref<HeroRole[]>(
    Array.isArray(props.hero?.roles) ? 
        props.hero?.roles
        :
        (props.hero?.roles ? [props.hero?.roles as HeroRole] : [])
);

interface LocalMission { 
    type: Challenge['type'],
    neededAny: Challenge['needed'],
    guessed?: boolean,
    inserted?: boolean,
    editingRank?: ProficiencyRank|null
}
const missions = ref<LocalMission[]>([]);

// process hero props into missions
if (props.hero && props.hero.ranks?.[0]?.challenges) {
    missions.value = props.hero.ranks[0].challenges
                        .map(challenge => {
                            if (challenge.type == 'play')
                                return null;

                            const guessed = guessChallenge(challenge.type, challenge.needed);

                            return {
                                type: challenge.type,
                                neededAny: challenge.needed,
                                editingRank: !!guessed ? null : props.hero!.ranks[0]?.type
                            } as LocalMission
                        })
                        .filter(c => !!c)
}

const newHero = ref(props.hero ?? UNKNOWN_HERO());
const selectedRank = ref<ProficiencyRank['id']>('agent');

const invalidName = ref(false);
watch(heroName, (newName) => {
    const newId = newName
                        // Replace all whitespace sequences with a single dash
                        .replace(/\s+/g, "-")
                        // Remove all characters except alphanumeric, dash, and underscore
                        .replace(/[^a-zA-Z0-9-_]/g, "")
                        // Replace multiple dashes with a single dash
                        .replace(/-+/g, "-")
                        // Trim leading and trailing dashes
                        .replace(/^-+|-+$/g, "")
                        .toLowerCase();

    // check name against existing heroes and saved unknown heroes
    if (newName.toLowerCase() != INITIAL_NAME.toLowerCase()) {
        // check against existing heroes (with normal id (without __unknown_ prefix))
        if (
            HERO_LIST.find(h => h.id == newId || h.name == newName)
        || unknownHeroes.value.find(h => h.id == `__unknown_${newId}` || h.name == newName)
        )
            invalidName.value = true;
        else
            invalidName.value = false;
    }
    else
        invalidName.value = false;

    newHero.value.name = newName;
    newHero.value.id = `__unknown_${newId}`;
});
watch(heroRoles, (roles) => newHero.value.roles = roles, { deep: true });

function addMission() {
    const prevMission = missions.value.at(-1);
    let missionType: Challenge['type'] = 'damage';
    // automatically try to infer first mission based on hero role
    if (heroRoles.value.length == 1)
        missionType = CHALLENGE_ROLE_PAIRS[heroRoles.value[0]!] ?? 'damage';

    // automatically infer this mission type based on previous
    if (missions.value.length < 2 && prevMission) {
        CHALLENGE_PAIRS.forEach(([k1, k2]) => {
            if (k1 == prevMission.type)
                missionType = k2;
            if (k2 == prevMission.type)
                missionType = k1;
        });
    }

    missions.value.push({
        type: missionType,
        neededAny: -1
    });
}

function removeMission(index: number) {
    const mission = missions.value[index];
    if (!mission)
        return;

    missions.value.splice(index, 1);

    if (mission.inserted) {
        newHero.value.ranks.forEach((_, rankIndex) => {
            newHero.value.ranks[rankIndex]?.challenges?.splice(index + 1, 1);
        });
    }
}

function startEditMission(rankId: string, challengeIndex: number) {
    if (challengeIndex - 1 < 0)
        return;

    const mission = missions.value.at(challengeIndex - 1);
    if (!mission)
        return;

    mission.editingRank = PROFICIENCY_RANKS[rankId];

    if (!mission.inserted) {
        mission.neededAny = 0;
    }
}

function stopEditMission(challengeIndex: number) {
    if (challengeIndex - 1 < 0)
        return;

    const mission = missions.value.at(challengeIndex - 1);
    if (!mission)
        return;

    mission.editingRank = null;
}

watch(selectedRank, (rank) => {
    missions.value.forEach((m, i) => {
        if (!m.editingRank)
            return;

        startEditMission(rank, i + 1);
    })
})

watch(missions, (missions) => {
    missions.forEach((mission, index) => {
        const guessed = guessChallenge(mission.type, mission.neededAny);
        if (!guessed) {
            // not sure if this breaks anything else
            // fixes edge case of middle mission removed/changed causing reset to other missions
            if (!!mission.editingRank && mission.inserted) {
                mission.guessed = false;

                return;
            }

            if (mission.neededAny == -1) {
                newHero.value.ranks.forEach((_, rankIndex) => {
                    const challengeAtIndex = newHero.value.ranks[rankIndex]!.challenges[index + 1];
                    if (challengeAtIndex) {
                        if (index == missions.length - 1)
                            newHero.value.ranks[rankIndex]!.challenges.splice(index + 1, 1);
                        else
                            newHero.value.ranks[rankIndex]!.challenges[index + 1] = null as never;
                    }
                });

                mission.inserted = false;
                return;
            }

            newHero.value.ranks.forEach((rank, rankIndex) => {
                newHero.value.ranks[rankIndex]!.challenges[index + 1] = {
                    type: mission.type,
                    needed: mission.neededAny,
                    reward: CHALLENGE_REWARDS_PER_RANK[rank.type.id] ?? 0
                }
            });

            mission.guessed = false;
            mission.inserted = true;
            return;
        }
        else
            mission.guessed = true;

        Object.entries(guessed).forEach(([id, challenge]) => {
            const rankIndex = newHero.value.ranks.findIndex(r => r.type.id == id);
            newHero.value.ranks[rankIndex]!.challenges[index + 1] = challenge;
        });

        mission.inserted = true;
    });
}, { deep: true, immediate: true });

function findMission(missionIndex: number, rankId: string) {
    const rankIndex = newHero.value.ranks.findIndex(r => r.type.id == rankId);
    if (rankIndex == -1)
        return null;

    if (!newHero.value.ranks[rankIndex]!.challenges[missionIndex + 1])
        return null;

    return newHero.value.ranks[rankIndex]!.challenges[missionIndex + 1];
}

function editMission(missionIndex: number, rankId: string, needed?: number, reward?: number) {
    const mission = findMission(missionIndex, rankId);

    if (!mission)
        return;

    if (typeof needed !== 'undefined')
        mission.needed = needed;
    if (typeof reward !== 'undefined')
        mission.reward = reward;
}


function confirm() {
    if (invalidName.value) {
        notify(
            `The hero's name is invalid`,
            3000,
            { image: 'warning', color: '#c94f36' }
        );

        return;
    }

    if (!newHero.value.name.trim() || newHero.value.id === '__unknown') {
        notify(
            `The hero's name is empty`,
            3000,
            { image: 'warning', color: '#c94f36' }
        );

        return;
    }

    emit('confirm', newHero.value);
}

useEvent('keydown', (e: KeyboardEvent) => {
    if (e.code !== 'Enter' || e.shiftKey || e.ctrlKey || e.altKey)
        return;

    confirm();
});

</script>