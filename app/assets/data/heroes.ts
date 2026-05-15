import { PROFICIENCY_RANKS, type HeroData, type HeroRole } from "./common";
import { AdamWarlock } from "./heroes/adam-warlock";
import { CloakAndDagger } from "./heroes/cloak-and-dagger";
import { Deadpool } from "./heroes/deadpool";
import { Gambit } from "./heroes/gambit";
import { InvisibleWoman } from "./heroes/invisible-woman";
import { JeffTheLandShark } from "./heroes/jeff-the-land-shark";
import { Loki } from "./heroes/loki";
import { LunaSnow } from "./heroes/luna-snow";
import { Mantis } from "./heroes/mantis";
import { RocketRaccoon } from "./heroes/rocket-raccoon";
import { Ultron } from "./heroes/ultron";
import { BlackPanther } from "./heroes/black-panther";
import { BlackWidow } from "./heroes/black-widow";
import { Blade } from "./heroes/blade";
import { Daredevil } from "./heroes/daredevil";
import { ElsaBloodstone } from "./heroes/elsa-bloodstone";
import { Hawkeye } from "./heroes/hawkeye";
import { Hela } from "./heroes/hela";
import { HumanTorch } from "./heroes/human-torch";
import { IronFist } from "./heroes/iron-fist";
import { Ironman } from "./heroes/ironman";
import { Magik } from "./heroes/magik";
import { MisterFantastic } from "./heroes/mister-fantastic";
import { MoonKnight } from "./heroes/moon-knight";
import { Namor } from "./heroes/namor";
import { Phoenix } from "./heroes/phoenix";
import { Psylocke } from "./heroes/psylocke";
import { ScarletWitch } from "./heroes/scarlet-witch";
import { SpiderMan } from "./heroes/spider-man";
import { SquirrelGirl } from "./heroes/squirrel-girl";
import { StarLord } from "./heroes/star-lord";
import { Storm } from "./heroes/storm";
import { ThePunisher } from "./heroes/the-punisher";
import { WinterSoldier } from "./heroes/winter-soldier";
import { Wolverine } from "./heroes/wolverine";
import { Angela } from "./heroes/angela";
import { CaptainAmerica } from "./heroes/captain-america";
import { DoctorStrange } from "./heroes/doctor-strange";
import { EmmaFrost } from "./heroes/emma-frost";
import { Groot } from "./heroes/groot";
import { BruceBanner } from "./heroes/bruce-banner";
import { Magneto } from "./heroes/magneto";
import { PeniParker } from "./heroes/peni-parker";
import { Rogue } from "./heroes/rogue";
import { TheThing } from "./heroes/the-thing";
import { Thor } from "./heroes/thor";
import { Venom } from "./heroes/venom";
import { WhiteFox } from "./heroes/white-fox";
import { BlackCat } from "./heroes/black-cat";
import { DevilDinosaur } from "./heroes/devil-dinosaur";

export const HERO_LIST: HeroData[] = [
    AdamWarlock,
    Angela,
    BlackCat,
    BlackPanther,
    BlackWidow,
    Blade,
    BruceBanner,
    CaptainAmerica,
    CloakAndDagger,
    Daredevil,
    Deadpool,
    DevilDinosaur,
    DoctorStrange,
    ElsaBloodstone,
    EmmaFrost,
    Gambit,
    Groot,
    Hawkeye,
    Hela,
    HumanTorch,
    InvisibleWoman,
    IronFist,
    Ironman,
    JeffTheLandShark,
    Loki,
    LunaSnow,
    Magik,
    Magneto,
    Mantis,
    MisterFantastic,
    MoonKnight,
    Namor,
    PeniParker,
    Phoenix,
    Psylocke,
    RocketRaccoon,
    Rogue,
    ScarletWitch,
    SpiderMan,
    SquirrelGirl,
    StarLord,
    Storm,
    ThePunisher,
    TheThing,
    Thor,
    Ultron,
    Venom,
    WhiteFox,
    WinterSoldier,
    Wolverine
]

export const UNKNOWN_HERO: () => HeroData = () => ({
    id: '__unknown',
    name: 'Unknown Hero',
    roles: [],
    color: '#6077d9',
    dataDir: '/img/heroes/data/unknown-hero/',

    iconAnimationSize: [2952, 2980],
    iconAnimationOffset: [-10, -40],

    ranks: [
        {
            type: PROFICIENCY_RANKS.agent!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 20
                }
            ],
        },
        {
            type: PROFICIENCY_RANKS.knight!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 20
                }
            ],
        },
        {
            type: PROFICIENCY_RANKS.captain!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 20
                }
            ],
        },
        {
            type: PROFICIENCY_RANKS.centurion!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 20
                }
            ],
        },
        {
            type: PROFICIENCY_RANKS.lord!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 60
                }
            ],
        },
        {
            type: PROFICIENCY_RANKS.count!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 60
                }
            ],
        },
        {
            type: PROFICIENCY_RANKS.colonel!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 60
                }
            ],
        },
        {
            type: PROFICIENCY_RANKS.warrior!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 60
                }
            ],
        },
        {
            type: PROFICIENCY_RANKS.elite!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 60
                }
            ],
        },
        {
            type: PROFICIENCY_RANKS.guardian!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 60
                }
            ],
        },
        {
            type: PROFICIENCY_RANKS.champion!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 60
                }
            ],
        },
    ]
});

export function createHero(hero: HeroData) {
    const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);

    // check to see if hero with same name/id exists
    if (unknownHeroes.value.find(h => h.id == hero.id || h.name == hero.name))
        return false;

    unknownHeroes.value.push(hero);

    return true;
}

export function editHero(id: string, hero: HeroData) {
    const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);

    // check to see if hero with same name/id exists
    if (id !== hero.id)
        if (unknownHeroes.value.find(h => h.id == hero.id || h.name == hero.name))
            return false;

    // check to see if hero with the id exists
    const heroIndex = unknownHeroes.value.findIndex(h => h.id == id);
    if (heroIndex == -1)
        return false;

    unknownHeroes.value[heroIndex] = hero;

    return true;
}

export function deleteHero(id: string) {
    const unknownHeroes = useLocalStorage<HeroData[]>('unknown_heroes', []);

    const heroIndex = unknownHeroes.value.findIndex(h => h.id == id);
    unknownHeroes.value.splice(heroIndex, 1);
}


export function getFeaturedHero(maxDisplayDayCount = 25) {
    const featuredHeroes = HERO_LIST.filter(h => h.meta?.featured && !!h.meta?.releasedAt);

    let latestDate = new Date('1970-01-01');
    let latestHero: HeroData|null = null;
    for (const hero of featuredHeroes) {
        const heroDate = new Date(hero.meta!.releasedAt!);
        if (latestDate.getTime() < heroDate.getTime()) {
            latestHero = hero;
            latestDate = heroDate;
        }
    }

    if (!latestHero)
        return null;

    if (Date.now() - new Date(latestHero.meta!.releasedAt!).getTime() < maxDisplayDayCount * 24 * 60 * 60 * 1000)
        return latestHero;

    return null;
}

export function heroRolesAsArray(heroRoles: HeroRole|HeroRole[]) {
    if (Array.isArray(heroRoles))
        return heroRoles;

    return [ heroRoles ]
}