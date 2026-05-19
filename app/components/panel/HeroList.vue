<template>
    <div class="hero-list">
        <div class="view-bar">
            <ul>
                <li :class="{ selected: currentView === 'gallery' }" @click="currentView = 'gallery'">GALLERY<span class="view-label"> VIEW</span></li>
                <li :class="{ selected: currentView === 'list' }" @click="currentView = 'list'">LIST<span class="view-label"> VIEW</span></li>
            </ul>
        </div>
        <div
            ref="tools"
            :class="{ tools: 1, mobile }"
        >
            <NuxtLink v-if="backButton" class="back-button" :to="backButton">
                <Tex
                    image="arrowLeft"
                    hover="color"
                    clickable

                    width="40px"
                    height="40px"
                    object-fit="contain"
                />
            </NuxtLink>
            <div class="search">
                <input
                    ref="searchInput"
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
        <template v-if="currentView === 'list'">
            <slot name="list-view" />
        </template>
        <component
            v-if="currentView === 'gallery' && !!featuredHero"
            :is="links ? NuxtLink : 'div'"
            class="featured-hero"

            :style="{
                '--hero-color': featuredHero.hero.color
            }"

            :to="`/heroes/${featuredHero.hero.id}`"
            @click="clickHero(featuredHero.hero.id)"

            v-tooltip="{
                text: favourites.includes(featuredHero.hero.id) ?
                    '<b>Remove</b> from favorites'
                    :
                    '<b>Add</b> to favorites',
                icon: 'mouseRight'
            }"

            @contextmenu.prevent="favouriteHero(featuredHero.hero.id)"
        >
            <div class="color-mask" />

            <div class="new">
                NEW
            </div>
            <div
                class="prestige"
                :style="{
                    '--prestige-image': `url(${featuredHero.hero.dataDir}prestige.webp)`,
                }"
            >
                <div class="stroke" />
                <img :src="`${featuredHero.hero.dataDir}prestige.webp`" />
            </div>

            <div class="info">
                <h3 class="name">
                    {{ featuredHero.hero.name }}
                </h3>
            </div>

            <div v-if="featuredHeroIsFavourite || featuredHeroIsChecked" class="check">
                <Tex
                    class="check-tex"
                    :image="featuredHeroIsChecked ? 'checkCorner' : 'favouriteCorner'"

                    width="45px"
                    height="45px"
                />
            </div>

            <div class="bar">
                <div class="rank-icon-wrapper">
                    <img v-if="featuredHeroRankDetails" :src="featuredHeroRankDetails.icon" />
                </div>
                <p class="role">
                    <span v-if="heroRolesAsArray(featuredHero.hero.roles).length == 1">
                        {{ heroRolesAsArray(featuredHero.hero.roles)[0] }}
                    </span>
                    <Tex
                        v-for="role in heroRolesAsArray(featuredHero.hero.roles)"
                        :src="ROLE_ICONS[role]"
                        color="#fff"

                        width="30px"
                        height="30px"
                    />
                </p>
            </div>
        </component>
        <ul v-if="currentView === 'gallery'" class="list">
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

                v-tooltip="({
                    text: favourites.includes(hero.id) ?
                        '<b>Remove</b> from favorites'
                        :
                        '<b>Add</b> to favorites',
                    icon: 'mouseRight'
                } satisfies TooltipBinding)"

                @contextmenu.prevent="favouriteHero(hero.id)"
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
import { DEFAULT_HERO_STORE, PlayerHeroStoreSchema, PROFICIENCY_RANKS, ROLE_ICONS, type HeroData, type HeroRole, type PlayerHeroStore } from '~/assets/data/common';
import { getFeaturedHero, HERO_LIST, heroRolesAsArray } from '~/assets/data/heroes';
import { tex, texUrl } from '~/assets/data/textures';
import type { TooltipBinding } from '~/directives/tooltip';

const props = withDefaults(defineProps<{
    selectedHero?: string,

    backButton?: string,

    links?: boolean,
    addHeroEnabled?: boolean,
    showUnknownHeroes?: boolean,

    sortHeroes?: (a: HeroData, b: HeroData) => number,

    view?: 'gallery' | 'list',
}>(), {
    links: true,
    addHeroEnabled: true,
    showUnknownHeroes: true,
    sortHeroes: (a,b) => a.name.localeCompare(b.name),
    view: 'gallery',
});

const emit = defineEmits<{
    clickHero: [ heroId: string ],
    'update:view': [ view: 'gallery' | 'list' ],
    'update:searchText': [string],
    'update:filterByRole': [string],
    'update:filterFavourites': [boolean],
}>();

const currentView = computed({
    get: () => props.view,
    set: (val) => emit('update:view', val),
});

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

const mobile = isMobile();

const tools = useTemplateRef('tools');
const searchInput = useTemplateRef('searchInput');

function getScrollParent(element: HTMLElement|null) {
    if (!element)
        return window;

    let parent = element.parentElement;
    while (parent) {
        const { overflow, overflowY } = getComputedStyle(parent);
        if (/(auto|scroll)/.test(overflow + overflowY))
            return parent;

        parent = parent.parentElement;
    }
    return window; // fallback to viewport
}
const scroller = ref<Window|HTMLElement>();

await useGsap(({ scrollTrigger }) => {
    scroller.value = getScrollParent(tools.value);
    if ((scroller.value as HTMLElement).tagName === 'BODY')
        scroller.value = window;

    scrollTrigger.create({
        trigger: tools.value,
        scroller: scroller.value,
        start: 'top 0%',
        onEnter: () => tools.value?.classList.add('sticky'),
        onLeaveBack: () => tools.value?.classList.remove('sticky'),
    });

    let lastKnownScrollY = 0;
    useEvent('scroll', () => {
        if (!mobile.value)
            return;

        const scrollY = (scroller.value as HTMLElement).scrollTop ?? (scroller.value as Window).scrollY;
        const deltaY = scrollY - lastKnownScrollY;
        lastKnownScrollY = scrollY;

        // scrolling down
        if (deltaY > 0)
            tools.value?.classList.remove('sticky-mobile-show');
        else
            tools.value?.classList.add('sticky-mobile-show');
    }, scroller.value);
});

const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);

const filterByRole = useLocalStorage('heroes_filter_role', 'all-roles');
const filterFavourites = useLocalStorage('heroes_filter_favourites', false);

const favourites = useLocalStorage<HeroData['id'][]>(`favourite_heroes`, []);

const searchText = ref('');

watch(searchText, v => emit('update:searchText', v));
watch(filterByRole, v => emit('update:filterByRole', v), { immediate: true });
watch(filterFavourites, v => emit('update:filterFavourites', v), { immediate: true });

function filterHeroList(list: HeroData[]) {
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
        const storedLevel = useLocalStorage<PlayerHeroStore>(`hero_${hero.id}`, DEFAULT_HERO_STORE(), PlayerHeroStoreSchema);
        
        return { hero, level: storedLevel.value };
    });

    return output;
}

const featuredHero = computed(() => {
    const featured = getFeaturedHero();
    if (!featured)
        return null;

    const filtered = filterHeroList([featured]);
    if (filtered.length == 0)
        return null;

    return filtered[0]!;
});

const featuredHeroRankDetails = computed(() => {
    if (!featuredHero.value?.level.rank)
        return null;

    return PROFICIENCY_RANKS[featuredHero.value.level.rank];
});

const featuredHeroIsFavourite = computed(() => 
    featuredHero.value ? favourites.value.includes(featuredHero.value.hero.id) : false
);
const featuredHeroIsChecked = computed(() => props.selectedHero == featuredHero.value?.hero.id);

const heroList = computed<{ hero: HeroData, level: PlayerHeroStore }[]>(() => {
    let list = [...HERO_LIST, ...(props.showUnknownHeroes ? unknownHeroes.value : [])];

    // remove featured hero from the list
    if (featuredHero.value) {
        const featuredIndex = list.findIndex(h => h.id == featuredHero.value!.hero.id);
        list.splice(featuredIndex, 1);
    }

    return filterHeroList(list);
});

function clickHero(heroId: string) {
    if (props.links)
        return;

    emit('clickHero', heroId);
}

function favouriteHero(heroId: string) {
    const idx = favourites.value.indexOf(heroId);
    if (idx !== -1)
        favourites.value.splice(idx, 1);
    else
        favourites.value.push(heroId);
}


// listen for key a-z key presses to automatically focus the search bar
useEvent('keydown', (e: KeyboardEvent) => {
    if (e.key.match(/[a-zA-Z]{1}/g)?.length === 1)
        searchInput.value?.focus();
});

defineExpose({ searchText, filterByRole, filterFavourites });
</script>