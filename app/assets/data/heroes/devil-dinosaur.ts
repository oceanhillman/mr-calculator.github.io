import { PROFICIENCY_RANKS, type HeroData } from "../common";

export const DevilDinosaur: HeroData = {
    meta: {
        releasedAt: '2026-05-15',
        featured: true
    },
    id: 'devil-dinosaur',
    name: 'Devil Dinosaur',
    aliases: [
        'Devil Dino',
        'Devil D',
        'Dev',
        'Double D',
        'Prehistoric Powerhouse',
        'Time-Lost Devil-Beast',
        
        'rrrarrrrrrrgh thunder lizard'
    ],
    roles: ['vanguard'],
    color: '#ff6c67',
    dataDir: '/img/heroes/data/devil-dinosaur/',

    iconAnimationOffset: [10, -20],
    iconLargeAnimationOffset: [15, -18],
    
    ranks: [
        {
            type: PROFICIENCY_RANKS.agent!,
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 20
                },
                {
                    type: 'take_damage',
                    needed: 14000,
                    reward: 7
                },
                {
                    type: 'kos',
                    needed: 7,
                    reward: 7
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
                },
                {
                    type: 'take_damage',
                    needed: 27000,
                    reward: 13
                },
                {
                    type: 'kos',
                    needed: 15,
                    reward: 13
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
                },
                {
                    type: 'take_damage',
                    needed: 41000,
                    reward: 20
                },
                {
                    type: 'kos',
                    needed: 22,
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
                },
                {
                    type: 'take_damage',
                    needed: 55000,
                    reward: 26
                },
                {
                    type: 'kos',
                    needed: 29,
                    reward: 26
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
                },
                {
                    type: 'take_damage',
                    needed: 55000,
                    reward: 80
                },
                {
                    type: 'kos',
                    needed: 29,
                    reward: 80
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
                },
                {
                    type: 'take_damage',
                    needed: 55000,
                    reward: 80
                },
                {
                    type: 'kos',
                    needed: 29,
                    reward: 80
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
                },
                {
                    type: 'take_damage',
                    needed: 55000,
                    reward: 80
                },
                {
                    type: 'kos',
                    needed: 29,
                    reward: 80
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
                },
                {
                    type: 'take_damage',
                    needed: 55000,
                    reward: 80
                },
                {
                    type: 'kos',
                    needed: 29,
                    reward: 80
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
                },
                {
                    type: 'take_damage',
                    needed: 55000,
                    reward: 80
                },
                {
                    type: 'kos',
                    needed: 29,
                    reward: 80
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
                },
                {
                    type: 'take_damage',
                    needed: 55000,
                    reward: 80
                },
                {
                    type: 'kos',
                    needed: 29,
                    reward: 80
                }
            ],
        },
        {
            type: {
                ...PROFICIENCY_RANKS.champion!,
                rewards: PROFICIENCY_RANKS.champion!.rewards.map((r, i) => {
                    if (i == 0)
                        return {
                            ...r,
                            iconAnimation: {
                                ...r.iconAnimation!,
                                fps: 20
                            }
                        }

                    return r;
                })
            },
            challenges: [
                {
                    type: 'play',
                    needed: 15,
                    reward: 60
                },
                {
                    type: 'take_damage',
                    needed: 55000,
                    reward: 80
                },
                {
                    type: 'kos',
                    needed: 29,
                    reward: 80
                }
            ],
        },
    ]
}