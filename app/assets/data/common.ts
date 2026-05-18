import z from "zod";
import { tex } from "./textures";
import avgHeroStats from './average-hero-stats.json';
import heroMatches from './hero-matches.json';
import { AchievementSchema, type Achievement } from "./achievements";

export type HeroRole = 'vanguard'|'duelist'|'strategist';
export const HeroRoleSchema = z.enum(['vanguard', 'duelist', 'strategist']);

// export interface Challenge {
//     type: 'play'|'damage'|'heal'|'damage_heal'|'take_damage'|'finals'|'kos'|'kos_assists',
//     needed: number,
//     reward: number
// }
export const ChallengeSchema = z.object({
    type: z.enum(['play', 'damage', 'heal', 'damage_heal', 'take_damage', 'finals', 'kos', 'kos_assists']),
    needed: z.number(),
    reward: z.number()
})
export type Challenge = z.infer<typeof ChallengeSchema>;

export const CHALLENGE_TEXTS: Record<Challenge['type'], string> = {
    play: 'Hero usage reaches %NEEDED% minutes',
    damage: 'Deal %NEEDED% Damage',
    heal: 'Reach %NEEDED% Healing',
    damage_heal: 'Deal %NEEDED% Damage and Healing',
    take_damage: 'Block %NEEDED% Damage',
    finals: 'Land %NEEDED% Final Hits',
    kos: 'Reach %NEEDED% KOs',
    kos_assists: 'Achieve a total of %NEEDED% KOs and Assists',
}

export const CHALLENGE_NAMES: Record<Challenge['type'], string|null> = {
    play: null,
    damage: 'Damage',
    heal: 'Healing',
    damage_heal: 'Damage and Healing',
    take_damage: 'Damage Blocked',
    finals: 'Final Hits',
    kos: 'KOs',
    kos_assists: 'KOs and Assists',
}

export const CHALLENGE_ICONS: Record<Challenge['type'], string|null> = {
    play: '/img/heroes/challenge-icons/play.webp',
    damage: '/img/heroes/challenge-icons/damage.webp',
    heal: '/img/heroes/challenge-icons/healing.webp',
    damage_heal: '/img/heroes/challenge-icons/damage_heal.webp',
    take_damage: '/img/heroes/challenge-icons/damage_taken.webp',
    finals: '/img/heroes/challenge-icons/finals.webp',
    kos: '/img/heroes/challenge-icons/kos.webp',
    kos_assists: '/img/heroes/challenge-icons/kos_assists.webp',
}

export interface ChallengeStats {
    tooLittle: number,
    tooMuch: number,
    step: number,
    example: number|string,
    interval: [number, number]
}

export const CHALLENGE_STATS: Record<Challenge['type'], ChallengeStats|null> = {
    play: null,
    damage: {
        tooLittle: 999,
        tooMuch: 99999,
        step: 500,
        example: 13432,
        interval: [5000, 15000]
    },
    heal: {
        tooLittle: 999,
        tooMuch: 99999,
        step: 500,
        example: 19236,
        interval: [8000, 20000]
    },
    damage_heal: {
        tooLittle: 999,
        tooMuch: 99999,
        step: 500,
        example: '2370+12633',
        interval: [8000, 20000]
    },
    take_damage: {
        tooLittle: 999,
        tooMuch: 99999,
        step: 1000,
        example: 25741,
        interval: [18000, 35000]
    },
    finals: {
        tooLittle: 0,
        tooMuch: 100,
        step: 5,
        example: 12.3,
        interval: [6, 15]
    },
    kos: {
        tooLittle: 0,
        tooMuch: 500,
        step: 5,
        example: '17.6',
        interval: [10, 30]
    },
    kos_assists: {
        tooLittle: 0,
        tooMuch: 500,
        step: 5,
        example: '14.2+17.5',
        interval: [20, 50]
    },
}

export function getAverageStatsForHero(heroId: string): Record<Challenge['type'], number>|undefined {
    return avgHeroStats[heroId as keyof typeof avgHeroStats] as Record<Challenge['type'], number>|undefined;
}

export const CHALLENGE_PLAY_RANKS: Record<ProficiencyRank['id'], Challenge> = {
    agent: {
        type: 'play',
        needed: 15,
        reward: 20
    },
    knight: {
        type: 'play',
        needed: 15,
        reward: 20
    },
    captain: {
        type: 'play',
        needed: 15,
        reward: 20
    },
    centurion: {
        type: 'play',
        needed: 15,
        reward: 20
    },
    lord: {
        type: 'play',
        needed: 15,
        reward: 60
    },
    count: {
        type: 'play',
        needed: 15,
        reward: 60
    },
    colonel: {
        type: 'play',
        needed: 15,
        reward: 60
    },
    warrior: {
        type: 'play',
        needed: 15,
        reward: 60
    },
    elite: {
        type: 'play',
        needed: 15,
        reward: 60
    },
    guardian: {
        type: 'play',
        needed: 15,
        reward: 60
    },
    champion: {
        type: 'play',
        needed: 15,
        reward: 60
    },
}

export const CHALLENGE_PAIRS: [Challenge['type'], Challenge['type']][] = [
    ['take_damage', 'kos'],
    ['damage', 'finals'],
    ['damage_heal', 'kos_assists'], // priority is reversed
    ['heal', 'kos_assists'],
]

export const CHALLENGE_ROLE_PAIRS: Record<HeroRole, Challenge['type']> = {
    vanguard: 'take_damage',
    duelist: 'damage',
    strategist: 'heal'
}

export const CHALLENGE_REWARDS_PER_RANK: Record<ProficiencyRank['id'], number> = {
    agent: 7,
    knight: 13,
    captain: 20,
    centurion: 26,
    lord: 80,
    count: 80,
    colonel: 80,
    warrior: 80,
    elite: 80,
    guardian: 80,
    champion: 80
}

export const RewardSchema = z.object({
    level: z.number(),
    name: z.string(),
    icon: z.string(),
    iconAnimation: z.object({
        size: z.tuple([z.number(), z.number()]),
        columns: z.number(),
        rows: z.number(),
        fps: z.number(),
        offset: z.tuple([z.number(), z.number()]).optional()
    }).optional(),
    rarity: z.enum(['rare', 'epic', 'legendary']).optional()
});
export type Reward = z.infer<typeof RewardSchema>;


export const ProficiencyRankSchema = z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
    levelStart: z.number(),
    levelEnd: z.number(),
    xpPerLevel: z.number(),
    levelCount: z.number(),

    color: z.string(),

    rewards: z.array(RewardSchema)
})
export type ProficiencyRank = z.infer<typeof ProficiencyRankSchema>;


export const RankSchema = z.object({
    type: ProficiencyRankSchema,
    challenges: z.array(ChallengeSchema)
})
export type Rank = z.infer<typeof RankSchema>;

export const NO_DAILY_POINTS_ATTENUATION_RANK_IDS = ['agent','knight','captain','centurion'];

export const PROFICIENCY_RANKS: Record<string, ProficiencyRank> = {
    agent: {
        id: 'agent',
        name: 'Agent',
        icon: '/img/heroes/ranks/agent.webp',
        levelStart: 1,
        levelEnd: 4,
        xpPerLevel: 125,
        levelCount: 4,

        color: '#5e5342',

        rewards: [
            {
                level: 1,
                name: 'Default KO Prompt',
                icon: '/img/heroes/common-rewards/default-ko-prompt.webp',
                rarity: 'rare'
            },
            {
                level: 1,
                name: 'Default Avatar',
                icon: '%HERO_DATA_DIR%head.webp',
                rarity: 'rare'
            },
            {
                level: 3,
                name: 'Fantastic %HERO_NAME%',
                icon: '%HERO_DATA_DIR%fantastic-nameplate.webp',
                rarity: 'rare'
            }
        ]
    },
    knight: {
        id: 'knight',
        name: 'Knight',
        icon: '/img/heroes/ranks/knight.webp',
        levelStart: 5,
        levelEnd: 9,
        xpPerLevel: 240,
        levelCount: 5,

        color: '#737890',

        rewards: [
            {
                level: 5,
                name: '%HERO_NAME%',
                icon: '%HERO_DATA_DIR%spray.webp',
                rarity: 'rare'
            },
            {
                level: 8,
                name: 'Fantastic %HERO_NAME%',
                icon: '/img/heroes/common-rewards/title.webp',
                rarity: 'rare'
            },
        ]
    },
    captain: {
        id: 'captain',
        name: 'Captain',
        icon: '/img/heroes/ranks/captain.webp',
        levelStart: 10,
        levelEnd: 14,
        xpPerLevel: 400,
        levelCount: 5,

        color: '#5e8896',

        rewards: [
            {
                level: 10,
                name: '%HERO_NAME% KO Prompt 1',
                icon: '%HERO_DATA_DIR%ko-1.webp',
                rarity: 'epic'
            },
            {
                level: 13,
                name: '100 Unstable Molecules',
                icon: '/img/heroes/common-rewards/unstable-mollecule.webp'
            },
        ]
    },
    centurion: {
        id: 'centurion',
        name: 'Centurion',
        icon: '/img/heroes/ranks/centurion.webp',
        levelStart: 15,
        levelEnd: 19,
        xpPerLevel: 480,
        levelCount: 5,

        color: '#6d80a0',

        rewards: [
            {
                level: 15,
                name: '%HERO_NAME% KO Prompt 2',
                icon: '%HERO_DATA_DIR%ko-2.webp',
                rarity: 'epic'
            },
            {
                level: 18,
                name: '100 Units',
                icon: '/img/heroes/common-rewards/units.webp'
            },
        ]
    },
    lord: {
        id: 'lord',
        name: 'Lord',
        icon: '/img/heroes/ranks/lord.webp',
        levelStart: 20,
        levelEnd: 24,
        xpPerLevel: 1600,
        levelCount: 5,

        color: '#d8ad62',

        rewards: [
            {
                level: 20,
                name: '%HERO_NAME% Lord Icon',
                icon: '%HERO_DATA_DIR%head-lord.webp',
                rarity: 'legendary'
            },
            {
                level: 22,
                name: '100 Unstable Molecules',
                icon: '/img/heroes/common-rewards/unstable-mollecule.webp'
            },
            {
                level: 24,
                name: 'Uncanny %HERO_NAME%',
                icon: '%HERO_DATA_DIR%uncanny-nameplate.webp',
                rarity: 'rare'
            }
        ]
    },
    count: {
        id: 'count',
        name: 'Count',
        icon: '/img/heroes/ranks/count.webp',
        levelStart: 25,
        levelEnd: 29,
        xpPerLevel: 1600,
        levelCount: 5,

        color: '#577b81',

        rewards: [
            {
                level: 25,
                name: 'Count Badge',
                icon: '/img/heroes/common-rewards/count-badge.webp',
                rarity: 'rare'
            },
            {
                level: 27,
                name: '100 Units',
                icon: '/img/heroes/common-rewards/units.webp'
            },
            {
                level: 29,
                name: 'Uncanny %HERO_NAME%',
                icon: '/img/heroes/common-rewards/title.webp',
                rarity: 'rare'
            }
        ]
    },
    colonel: {
        id: 'colonel',
        name: 'Colonel',
        icon: '/img/heroes/ranks/colonel.webp',
        levelStart: 30,
        levelEnd: 34,
        xpPerLevel: 1600,
        levelCount: 5,

        color: '#536287',

        rewards: [
            {
                level: 30,
                name: 'Colonel Avatar Frame',
                icon: '/img/heroes/common-rewards/colonel-frame.webp',
                rarity: 'epic'
            },
            {
                level: 32,
                name: '100 Unstable Molecules',
                icon: '/img/heroes/common-rewards/unstable-mollecule.webp'
            },
            {
                level: 34,
                name: 'Amazing %HERO_NAME%',
                icon: '%HERO_DATA_DIR%amazing-nameplate.webp',
                rarity: 'rare'
            }
        ]
    },
    warrior: {
        id: 'warrior',
        name: 'Warrior',
        icon: '/img/heroes/ranks/warrior.webp',
        levelStart: 35,
        levelEnd: 39,
        xpPerLevel: 1600,
        levelCount: 5,

        color: '#5f51a7',

        rewards: [
            {
                level: 35,
                name: 'Warrior Badge',
                icon: '/img/heroes/common-rewards/warrior-badge.webp',
                rarity: 'epic'
            },
            {
                level: 37,
                name: '100 Units',
                icon: '/img/heroes/common-rewards/units.webp'
            },
            {
                level: 39,
                name: 'Amazing %HERO_NAME%',
                icon: '/img/heroes/common-rewards/title.webp',
                rarity: 'rare'
            }
        ]
    },
    elite: {
        id: 'elite',
        name: 'Elite',
        icon: '/img/heroes/ranks/elite.webp',
        levelStart: 40,
        levelEnd: 44,
        xpPerLevel: 1600,
        levelCount: 5,

        color: '#704f40',

        rewards: [
            {
                level: 40,
                name: 'Elite Avatar Frame',
                icon: '/img/heroes/common-rewards/elite-frame.webp',
                rarity: 'legendary'
            },
            {
                level: 42,
                name: '100 Unstable Molecules',
                icon: '/img/heroes/common-rewards/unstable-mollecule.webp'
            },
            {
                level: 44,
                name: '100 Units',
                icon: '/img/heroes/common-rewards/units.webp'
            },
        ]
    },
    guardian: {
        id: 'guardian',
        name: 'Guardian',
        icon: '/img/heroes/ranks/guardian.webp',
        levelStart: 45,
        levelEnd: 49,
        xpPerLevel: 1600,
        levelCount: 5,

        color: '#70405e',

        rewards: [
            {
                level: 45,
                name: 'Guardian Badge',
                icon: '/img/heroes/common-rewards/guardian-badge.webp',
                rarity: 'epic'
            },
            {
                level: 47,
                name: '100 Unstable Molecules',
                icon: '/img/heroes/common-rewards/unstable-mollecule.webp'
            },
            {
                level: 49,
                name: '100 Units',
                icon: '/img/heroes/common-rewards/units.webp'
            },
        ]
    },
    champion: {
        id: 'champion',
        name: 'Champion',
        icon: '/img/heroes/ranks/champion.webp',
        levelStart: 50,
        levelEnd: 70,
        xpPerLevel: 3100,
        levelCount: 20,

        color: '#924247',

        rewards: [
            {
                level: 50,
                name: '%HERO_NAME% Champion Icon',
                icon: '%HERO_DATA_DIR%bust-champion.webp',
                iconAnimation: {
                    size: [3600, 4000],
                    columns: 6,
                    rows: 10,
                    fps: 30,
                },
                rarity: 'legendary'
            },
            {
                level: 55,
                name: 'Champion Badge',
                icon: '/img/heroes/common-rewards/champion-badge.webp',
                rarity: 'legendary'
            },
            {
                level: 60,
                name: 'Immortal %HERO_NAME%',
                icon: '/img/heroes/common-rewards/title.webp',
                rarity: 'epic'
            },
            {
                level: 65,
                name: 'Immortal %HERO_NAME%',
                icon: '%HERO_DATA_DIR%immortal-nameplate.webp',
                rarity: 'epic'
            },
            {
                level: 70,
                name: 'Legendary %HERO_NAME%',
                icon: '/img/heroes/common-rewards/title.webp',
                rarity: 'legendary'
            },
        ]
    },
}
export function levelToRank(level: number, matchStartOnly = false) {
    if (!matchStartOnly)
        return Object.values(PROFICIENCY_RANKS).find(r => r.levelStart <= level && r.levelEnd >= level);

    return Object.values(PROFICIENCY_RANKS).find(r => r.levelStart == level);
}

export function replaceRewardPlaceholders(string: string, hero: HeroData) {
    return string.replaceAll('%HERO_NAME%', hero.name ?? 'Name')
                 .replaceAll('%HERO_DATA_DIR%', hero.dataDir ?? '');
}

export const HeroDataSchema = z.object({
    meta: z.object({
        releasedAt: z.iso.date().optional(),
        featured: z.boolean().optional()
    }).optional(),

    id: z.string(),
    name: z.string(),
    aliases: z.array(z.string()).optional(),
    roles: z.union([HeroRoleSchema, z.array(HeroRoleSchema)]),

    color: z.string(),
    dataDir: z.string(),

    ranks: z.array(RankSchema),

    iconAnimationSize: z.tuple([z.number(), z.number()]).optional(),
    iconAnimationOffset: z.tuple([z.number(), z.number()]).optional(),
    iconLargeAnimationOffset: z.tuple([z.number(), z.number()]).optional(),
    iconLargeMask: z.string().optional()
});
export type HeroData = z.infer<typeof HeroDataSchema>;

export const DEFAULT_ANIMATED_ICON_LARGE_MASK = tex('heroSelectMask');
export function getHeroMatchCount(heroId: string) {
    return heroMatches[heroId as keyof typeof heroMatches];
}
export function getAllMatchCount() {
    return Object.values(heroMatches).reduce((p, c) => p + c, 0);
}

export const ROLE_ICONS: Record<HeroRole, string> = {
    vanguard: '/img/heroes/roles/vanguard.webp',
    duelist: '/img/heroes/roles/duelist.webp',
    strategist: '/img/heroes/roles/strategist.webp'
}


export const PlannerWeekDaySchema = z.object({
    enabled: z.boolean(),
    time: z.number()
});
export type PlannerWeekDay = z.infer<typeof PlannerWeekDaySchema>;

export const WeekDaySchema = z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
])
export type WeekDay = z.infer<typeof WeekDaySchema>;


export const WEEK_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

export const DEFAULT_PLANNER_WEEKDAYS: (time?: number) => Record<WeekDay, PlannerWeekDay> = (time = 0) => ({
    monday: {
        enabled: true,
        time
    },
    tuesday: {
        enabled: true,
        time
    },
    wednesday: {
        enabled: true,
        time
    },
    thursday: {
        enabled: true,
        time
    },
    friday: {
        enabled: true,
        time
    },
    saturday: {
        enabled: true,
        time
    },
    sunday: {
        enabled: true,
        time
    },
})
export const PlayerHeroStoreSchema = z.object({
    rank: z.string().default('agent'),
    level: z.number().default(1),
    points: z.number().default(0),
    goal: z.number().default(1),

    averageStats: z.record(z.string(), z.number()).default({}),
    averageStatsArcade: z.record(z.string(), z.number()).optional().default({}),
    arcadeMaxFeasableMissions: z.number().default(2),
    openedCalculator: z.boolean().default(false),
    usesGenericStats: z.boolean().default(false),

    planner: z.object({
        mode: z.enum(['number-of-days', 'weekly']).default('number-of-days'),
        gameMode: z.enum(['normal', 'arcade']).default('normal'),
        weekly: z.object({
            weekDays: z.record(WeekDaySchema, PlannerWeekDaySchema)
                            .default(() => DEFAULT_PLANNER_WEEKDAYS())
        }),
        numberOfDays: z.object({
            days: z.number().default(0),
        }),
    })
});
export type PlayerHeroStore = z.infer<typeof PlayerHeroStoreSchema>;

export const DEFAULT_HERO_STORE = (): PlayerHeroStore => PlayerHeroStoreSchema.parse({ 
    planner: {
        weekly: {},
        numberOfDays: {}
    }
});


export const PreferencesStoreSchema = z.object({
    sawHeroQuickEditPopup: z.boolean().default(false),
    sawHeroEditPopup: z.boolean().default(false),
    sawAchievementsTab: z.boolean().default(false),
    plannerCalendarMeasureUnit: z.enum(['hours', 'quick_matches', 'comp_matches']).default('quick_matches')
})
export type PreferencesStore = z.infer<typeof PreferencesStoreSchema>;
export const DEFAULT_PREFERENCES_STORE = (): PreferencesStore => 
    PreferencesStoreSchema.parse({});


export const AVG_QUICK_MATCH_DURATION_MIN = 8.5;
export const AVG_COMP_MATCH_DURATION_MIN = 11.7;
export const AVG_ARCADE_MATCH_DURATION_MIN = 4.2;

// ==== SERIALIZATION ====

export interface SerializableDataMap {
    hero: {
        __unknownHero?: boolean,
        id: string,
        hero?: HeroData,
        stored: PlayerHeroStore,
        achievements?: Achievement[],
        isFavourite?: boolean,
        ownedCostumes?: string[]
    },
    profile: {
        storedHeroes: ({ id: string } & PlayerHeroStore)[],
        favourites?: string[],
        achievements?: Achievement[],
        unknownHeroes?: HeroData[],
        preferences?: PreferencesStore,
        ownedCostumes?: Record<string, string[]>
    }
}

export interface SerializableDataSegment<T extends keyof SerializableDataMap> {
    version: number,
    exportedAt: string,
    type: T,
    data: SerializableDataMap[T]
}

export type AnySerializableDataSegment = { [K in keyof SerializableDataMap]: SerializableDataSegment<K> }[keyof SerializableDataMap]

export const HeroSegmentSchema = z.object({
    version: z.number(),
    exportedAt: z.iso.datetime(),
    type: z.literal('hero'),

    data: z.object({
        __unknownHero: z.boolean().optional(),
        id: z.string(),
        isFavourite: z.boolean().optional(),

        stored: PlayerHeroStoreSchema,
        hero: HeroDataSchema.optional(),

        achievements: z.array(AchievementSchema).optional(),
        ownedCostumes: z.array(z.string()).optional(),
    })
})

export const ProfileSegmentSchema = z.object({
    version: z.number(),
    exportedAt: z.iso.datetime(),
    type: z.literal('profile'),

    data: z.object({
        storedHeroes: z.array(z.intersection(z.object({ id: z.string() }), PlayerHeroStoreSchema)),
        favourites: z.array(z.string()).optional(),
        achievements: z.array(AchievementSchema).optional(),
        unknownHeroes: z.array(HeroDataSchema).optional(),
        preferences: PreferencesStoreSchema.optional(),
        ownedCostumes: z.record(z.string(), z.array(z.string())).optional()
    })
})

export const AnySegmentSchema = z.discriminatedUnion('type', [
    HeroSegmentSchema,
    ProfileSegmentSchema
])