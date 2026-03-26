<template>
    <div class="hero-list">
        <div class="tools">
            <div class="search">
                <input
                    type="text"
                    placeholder="Search..."

                    v-model="searchText"
                />
                <Tex
                    image="search"
                    color="var(--light-blue-highlight)"

                    width="25px"
                    height="25px"
                    object-fit="contain"
                />
            </div>

            <div class="filters">
                <FormCheckbox v-model="filterFavourites">
                    Favourites
                </FormCheckbox>
                <FormDropdown
                    :options="roleDropdownOptions"
                    v-model="filterByRole"
                />
            </div>
        </div>
        <ul class="hero-list">
            <li v-if="addHeroEnabled && filterByRole == 'all-roles' && !filterFavourites && !searchText">
                <component
                    :is="links ? NuxtLink : 'div'"
                    to="/heroes/new"

                    @click="clickHero('new')"
                >
                    <PanelHeroCard
                        id="new"
                        name="Add missing"
                        :roles="[]"
                        color="#ccc"
                        :portrait="tex('allHeroes')"

                        :is-favourite="false"
                        rank="agent"
                    />
                </component>
            </li>
            <li
                v-for="{hero, level} in heroList"
                :key="hero.id"
            >
                <component
                    :is="links ? NuxtLink : 'div'"
                    :to="`/heroes/${hero.id}`"

                    @click="clickHero(hero.id)"
                >
                    <PanelHeroCard
                        :id="hero.id"
                        :name="hero.name"
                        :roles="hero.roles"
                        :color="hero.color"
                        :portrait="`${hero.dataDir}portrait.webp`"

                        :is-favourite="favourites.includes(hero.id)"
                        :is-checked="selectedHero == hero.id"
                        :rank="level.rank"
                    />
                </component>
            </li>
        </ul>
    </div>
</template>

<style src="@/assets/style/components/hero-list.sass" scoped></style>

<script setup lang="ts">
import { NuxtLink } from '#components';
import { DEFAULT_HERO_STORE, type HeroData, type HeroRole, type PlayerHeroStore } from '~/assets/data/common';
import { HERO_LIST } from '~/assets/data/heroes';
import { tex, texUrl } from '~/assets/data/textures';

const props = withDefaults(defineProps<{
    selectedHero?: string,

    links?: boolean,
    addHeroEnabled?: boolean,
    showUnknownHeroes?: boolean,

    sortHeroes?: (a: HeroData, b: HeroData) => number
}>(), {
    links: true,
    addHeroEnabled: true,
    showUnknownHeroes: true,
    sortHeroes: (a,b) => a.name.localeCompare(b.name)
});

const emit = defineEmits<{
    clickHero: [ heroId: string ]
}>();

const roleDropdownOptions = [
    {
        label: `<div class="icon" style="--img:url('/img/heroes/roles/all-roles.webp')"></div> ALL CLASSES`,
        value: 'all-roles' 
    },
    {
        label: `<div class="icon" style="--img:url('/img/heroes/roles/vanguard.webp')"></div> VANGUARD`,
        value: 'vanguard' 
    },
    {
        label: `<div class="icon" style="--img:url('/img/heroes/roles/duelist.webp')"></div> DUELIST`,
        value: 'duelist' 
    },
    {
        label: `<div class="icon" style="--img:url('/img/heroes/roles/strategist.webp')"></div> STRATEGIST`,
        value: 'strategist' 
    },
    {
        label: `<div class="icon" style="--img:${texUrl('favourite')}"></div> FAVOURITES`,
        value: 'favourite'
    }
];

const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);


const filterByRole = ref('all-roles')
const filterFavourites = ref(false);

const favourites = useLocalStorage<HeroData['id'][]>(`favourite_heroes`, []);

const searchText = ref('');

const heroList = computed<{ hero: HeroData, level: PlayerHeroStore }[]>(() => {
    let list = [...HERO_LIST, ...(props.showUnknownHeroes ? unknownHeroes.value : [])];

    if (filterByRole.value != 'all-roles' && filterByRole.value != 'favourite')
        list = list.filter(h => 
            h.roles == filterByRole.value 
         || (
                Array.isArray(h.roles) 
            && h.roles.includes(filterByRole.value as HeroRole)
            )
        );

    if (filterByRole.value == 'favourite' || filterFavourites.value)
        list = list.filter(h => favourites.value.includes(h.id));

    if (searchText.value)
        list = list.filter(h => 
            h.name.toLowerCase().includes(searchText.value.toLowerCase())
         || h.aliases?.find(a => a.toLowerCase().includes(searchText.value.toLowerCase()))
        );

    list.sort(props.sortHeroes);

    const output = list.map(hero => {
        const storedLevel = useLocalStorage<PlayerHeroStore>(`hero_${hero.id}`, DEFAULT_HERO_STORE());
        
        return { hero, level: storedLevel.value };
    });

    return output;
});

function clickHero(heroId: string) {
    if (props.links)
        return;

    emit('clickHero', heroId);
}
</script>