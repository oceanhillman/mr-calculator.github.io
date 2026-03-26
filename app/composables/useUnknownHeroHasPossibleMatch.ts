import type { HeroData } from "~/assets/data/common";
import { HERO_LIST } from "~/assets/data/heroes";

export const useUnknownHeroHasPossibleMatch = (hero: HeroData) => {
    const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);
    const isUnknownHero = computed(() => !!unknownHeroes.value.find(h => h.id === hero.id));

    return computed(() => {
        if (!isUnknownHero.value)
            return [];

        const possibleHeroes = HERO_LIST.filter(h => 
            hero.id.includes(h.id) || hero.name.toLowerCase() == h.name
        );

        return possibleHeroes;
    });
}