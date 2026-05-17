export type CostumeRarity = 'legendary' | 'epic' | 'rare' | 'default';
export type CostumeCategory = 'shop' | 'battlepass' | 'other';

export type CostumeEntry = {
    name: string;
    rarity: CostumeRarity;
    category: CostumeCategory;
    releaseDate?: string;
    theme?: string;
    source?: string;
    skinType?: 'Original' | 'MCU' | 'Comic / Game' | 'Recolor';
};

// Keyed by hero ID. Source: marvelrivals.fandom.com/wiki/Costumes
export const HERO_COSMETICS: Record<string, CostumeEntry[]> = {

    'adam-warlock': [
        { name: 'COSMIC WARLOCK', rarity: 'legendary', category: 'shop', releaseDate: '2026-01-09' , source: 'Store', skinType: 'Original' },
        { name: 'Blood Soul', rarity: 'epic', category: 'battlepass', releaseDate: '2025-01-10' , theme: 'Gothic Return', source: 'Season 1 Battlepass', skinType: 'Original' },
        { name: 'Guardians of the Galaxy Vol. 3', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Immortal Avatar', rarity: 'epic', category: 'shop', releaseDate: '2025-05-23' , theme: 'Immortal Dragon', source: 'Store', skinType: 'Original' },
        { name: 'LIVING TRIBUNAL', rarity: 'epic', category: 'battlepass', releaseDate: '2026-03-20' , source: 'Season 7 Battlepass', skinType: 'Comic / Game' },
        { name: 'MAGUS', rarity: 'epic', category: 'battlepass', releaseDate: '2025-11-14' , source: 'Season 5 Battlepass', skinType: 'Comic / Game' },
        { name: 'COSMIC JADE', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'King in White', rarity: 'rare', category: 'battlepass', releaseDate: '2025-07-11' , source: 'Season 3 Battlepass', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2025-03-14' , theme: 'Galacta', source: 'Twitch Drops (Expired)', skinType: 'Recolor' },
    ],

    'angela': [
        { name: 'Skuld 2099', rarity: 'legendary', category: 'shop', releaseDate: '2025-09-12' , source: 'Store', skinType: 'Original' },
        { name: 'ACE OF SPADES', rarity: 'epic', category: 'shop', releaseDate: '2026-01-30' , theme: 'TRUMPS OF THE GRANDMASTER', source: 'Store', skinType: 'Original' },
        { name: 'ODIN\'S BEAUTIFUL DAUGHTER', rarity: 'epic', category: 'battlepass', releaseDate: '2025-11-14' , theme: 'Immortal Weapon', source: 'Season 5 Battlepass', skinType: 'Original' },
        { name: 'Cerulean Lightbringer', rarity: 'rare', category: 'shop', releaseDate: '2025-09-12' , source: 'Store', skinType: 'Recolor' },
        { name: 'DOOM ANGEL', rarity: 'rare', category: 'battlepass', releaseDate: '2026-03-20' , source: 'Season 7 Battlepass', skinType: 'Comic / Game' },
        { name: 'Siriana\'s Silver', rarity: 'rare', category: 'other', releaseDate: '2025-09-12' , source: 'Season 4 Ranked Rewards', skinType: 'Recolor' },
    ],

    'black-cat': [
        { name: 'URBAN PREDATOR', rarity: 'epic', category: 'shop', releaseDate: '2026-04-17' , theme: 'ESU COLLEGE LIFE', source: 'Store', skinType: 'Comic / Game' },
        { name: 'BEGUILING BLUE', rarity: 'rare', category: 'other', releaseDate: '2026-04-17' , source: 'Season 7.5 Ranked Rewards', skinType: 'Recolor' },
        { name: 'GILDED SHADOW', rarity: 'rare', category: 'shop', releaseDate: '2026-04-17' , source: 'Store', skinType: 'Recolor' },
    ],

    'black-panther': [
        { name: 'Damisa-Sarki', rarity: 'legendary', category: 'shop', releaseDate: '2025-05-02' , theme: 'Hellfire Gala 2025', source: 'Store', skinType: 'Comic / Game' },
        { name: 'Bast\'s Chosen', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Galactic Claw', rarity: 'epic', category: 'battlepass', releaseDate: '2024-12-06' , theme: 'Imperial Protocol', source: 'Season 0 Battlepass', skinType: 'Original' },
        { name: 'KING OF WAKANDA', rarity: 'epic', category: 'battlepass', releaseDate: '2026-01-16' , theme: 'Old Flames', source: 'Season 6 Battlepass', skinType: 'Comic / Game' },
        { name: 'Phoenix Panther', rarity: 'epic', category: 'shop', releaseDate: '2025-08-01' , theme: 'Phoenix Force', source: 'Store', skinType: 'Original' },
        { name: 'Thrice-Cursed King', rarity: 'epic', category: 'shop', releaseDate: '2025-03-28' , theme: 'Gothic Return', source: 'Store', skinType: 'Original' },
        { name: 'Golden Panther', rarity: 'rare', category: 'battlepass', releaseDate: '2025-07-11' , source: 'Season 3 Battlepass', skinType: 'Recolor' },
        { name: 'ORISHA BLOOD', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'black-widow': [
        { name: 'Lion\'s Heartbeat', rarity: 'epic', category: 'shop', releaseDate: '2025-01-23' , theme: 'Clashing Lions', source: 'Store (Expired)', skinType: 'Original' },
        { name: 'MIDNIGHT SUSPENSE', rarity: 'epic', category: 'battlepass', releaseDate: '2025-11-14' , theme: 'Year One', source: 'Season 5 Battlepass', skinType: 'Comic / Game' },
        { name: 'Mrs. Barnes', rarity: 'epic', category: 'shop', releaseDate: '2025-03-07' , source: 'Event (added to Store)', skinType: 'Comic / Game' },
        { name: 'Phoenix Widow', rarity: 'epic', category: 'battlepass', releaseDate: '2025-08-08' , theme: 'Phoenix Force', source: 'Season 3.5 Event Pass', skinType: 'Original' },
        { name: 'Red Runway Veil', rarity: 'epic', category: 'battlepass', releaseDate: '2025-04-11' , theme: 'Hellfire Gala 2025', source: 'Season 2 Battlepass', skinType: 'Comic / Game' },
        { name: 'White Suit', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Lethal Toxicity', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'blade': [
        { name: 'Polarity Edge', rarity: 'legendary', category: 'shop', releaseDate: '2025-08-08'  , theme: 'Abyssal Flame', source: 'Store', skinType: 'Original' },
        { name: 'BLADE KNIGHT', rarity: 'epic', category: 'other', releaseDate: '2025-10-23' , theme: 'MCU', source: 'Event', skinType: 'MCU' },
        { name: 'Restful Recovery', rarity: 'epic', category: 'shop', releaseDate: '2025-11-28' , theme: 'VAN DYNE DESIGNS', source: 'Shop', skinType: 'Comic / Game' },
        { name: 'STARLIT SHADOW', rarity: 'epic', category: 'shop', releaseDate: '2026-04-17' , theme: 'SPACE OUTLAWS', source: 'Shop', skinType: 'Original' },
        { name: 'Daybreak', rarity: 'rare', category: 'shop', releaseDate: '2025-08-08' , source: 'Store', skinType: 'Recolor' },
        { name: 'Emerald Blade', rarity: 'rare', category: 'other', releaseDate: '2025-08-08' , source: 'Season 3.5 Ranked Rewards', skinType: 'Recolor' },
        { name: 'VAMPIRE SLAYER', rarity: 'rare', category: 'battlepass', releaseDate: '2026-01-16' , theme: 'YEAR ONE', source: 'Season 6 Battlepass', skinType: 'Comic / Game' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2025-09-12' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'bruce-banner': [
        { name: 'Green Scar', rarity: 'legendary', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'INFINITY HULK', rarity: 'epic', category: 'shop', releaseDate: '2026-05-15' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Joe Fixit', rarity: 'epic', category: 'battlepass', releaseDate: '2025-04-11' , theme: 'Hellfire Gala 2025', source: 'Season 2 Battlepass', skinType: 'Comic / Game' },
        { name: 'Maestro', rarity: 'epic', category: 'battlepass', releaseDate: '2025-10-10' , theme: 'Wastelanders', source: 'Season 4.5 Event Pass', skinType: 'Comic / Game' },
        { name: 'Punk Rage', rarity: 'epic', category: 'shop', releaseDate: '2025-02-28' , theme: 'Punk Society', source: 'Store', skinType: 'Comic / Game' },
        { name: 'Mighty G-Bomb', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'captain-america': [
        { name: 'Avengers: Infinity War', rarity: 'legendary', category: 'shop', releaseDate: '2025-02-07' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'BRETT HENDRICK: THE STAR', rarity: 'legendary', category: 'shop', releaseDate: '2026-03-27' , theme: 'ESU SHOWDOWN', source: 'Store', skinType: 'Original' },
        { name: 'Capwolf', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-12-12' , theme: 'The Collector\'s Collection', source: 'Season 5.5 Event Pass', skinType: 'Comic / Game' },
        { name: 'Captain Gladiator', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Captain Klyntar', rarity: 'epic', category: 'shop', releaseDate: '2025-07-04' , theme: 'Klyntar Warriors', source: 'Store', skinType: 'Comic / Game' },
        { name: 'CURSED CAPTAIN', rarity: 'epic', category: 'shop', releaseDate: '2026-03-06' , theme: 'TWISTED NIGHTMARE', source: 'Store', skinType: 'Original' },
        { name: 'Galactic Talon', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'Imperial Protocol', source: 'Store (Expired)', skinType: 'Original' },
        { name: 'PRIMAL PATRIOT', rarity: 'epic', category: 'battlepass', releaseDate: '2026-05-15' , theme: 'SAVAGE LAND', source: 'Season 8 Battle Pass', skinType: 'Comic / Game' },
        { name: 'Star Spangled Style', rarity: 'epic', category: 'battlepass', releaseDate: '2025-04-11' , theme: 'Hellfire Gala 2025', source: 'Season 2 Battlepass', skinType: 'Comic / Game' },
        { name: 'Captain A.I.M.erica', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'Golden Age', rarity: 'rare', category: 'battlepass', releaseDate: '2025-09-12' , theme: 'Year One', source: 'Season 4 Battle Pass', skinType: 'Comic / Game' },
    ],

    'cloak-and-dagger': [
        { name: 'Dance Partner', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-04-11' , theme: 'Hellfire Gala 2025', source: 'Season 2 Battlepass', skinType: 'Original' },
        { name: 'DARING DUO', rarity: 'legendary', category: 'shop', releaseDate: '2026-03-27' , theme: 'Thieves Guild', source: 'Store', skinType: 'Original' },
        { name: 'ICE PAS DE DEUX', rarity: 'legendary', category: 'shop', releaseDate: '2025-12-26' , theme: 'WINTER HOLIDAY 2025', source: 'Store', skinType: 'Original' },
        { name: 'Polarity Bond', rarity: 'legendary', category: 'shop', releaseDate: '2025-08-15'  , theme: 'Abyssal Flame', source: 'Store', skinType: 'Original' },
        { name: 'Growth & Decay', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Twilight Duo', rarity: 'epic', category: 'shop', releaseDate: '2025-03-07' , source: 'Store', skinType: 'Original' },
        { name: 'Lemon Lime', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'daredevil': [
        { name: 'DAREDEVIL: BORN AGAIN SEASON 2', rarity: 'epic', category: 'shop', releaseDate: '2026-03-13' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Devil 2099', rarity: 'epic', category: 'shop', releaseDate: '2025-10-10' , source: 'Store', skinType: 'Original' },
        { name: 'NOT DAREDEVIL', rarity: 'epic', category: 'shop', releaseDate: '2025-12-19' , theme: 'WINTER HOLIDAY 2025', source: 'Store', skinType: 'Comic / Game' },
        { name: 'Twilight Aurora', rarity: 'rare', category: 'other', releaseDate: '2025-10-10' , source: 'Disney+', skinType: 'Recolor' },
        { name: 'Fearless Origin', rarity: 'rare', category: 'shop', releaseDate: '2025-10-10' , source: 'Store', skinType: 'Recolor' },
        { name: 'Shenloong\'s Creed', rarity: 'rare', category: 'other', releaseDate: '2025-10-10' , source: 'Season 4.5 Ranked Rewards', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2026-04-17' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'deadpool': [
        { name: 'MAID-POOL', rarity: 'legendary', category: 'other', releaseDate: '2026-04-10' , theme: 'BLACK, WHITE AND BROOM', source: 'Season 7 Gacha Event', skinType: 'Comic / Game' },
        { name: 'CAPTAIN POOL', rarity: 'epic', category: 'shop', releaseDate: '2026-01-16' , theme: 'NEW MARAUDERS', source: 'Store', skinType: 'Comic / Game' },
        { name: 'MONSTER KING', rarity: 'epic', category: 'shop', releaseDate: '2026-05-15' , source: 'Store', skinType: 'Original' },
        { name: 'WADE WILSON: THE SPIRIT SQUAD', rarity: 'epic', category: 'other', releaseDate: '2026-03-20' , theme: 'MCU', source: 'Season 7 Event', skinType: 'MCU' },
        { name: '100 THIEVES', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'FLYQUEST', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'GEN.G', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'LIQUID CITADEL', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'NAVI', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'NRG SHOCK', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'REJECT', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'SENTINELS', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'SPACESTATION GAMING', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'TEAM HERETICS', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'TSM', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'VIRTUS.PRO', rarity: 'epic', category: 'shop', releaseDate: '2026-03-27' , theme: 'IGNITE 2026', source: 'Store', skinType: 'Recolor' },
        { name: 'WORKWEAR WOES', rarity: 'rare', category: 'other', releaseDate: '2026-01-16' , source: 'Season 6 Ranked Rewards', skinType: 'Recolor' },
        { name: 'X-FORCE?', rarity: 'rare', category: 'shop', releaseDate: '2026-01-16' , source: 'Store', skinType: 'Comic / Game' },
    ],

    'devil-dinosaur': [
        { name: 'CHRONO-ARMOR', rarity: 'epic', category: 'shop', releaseDate: '2026-05-15' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'CORPORATE CRUNCHER', rarity: 'rare', category: 'other', releaseDate: '2026-05-15' , source: 'Season 8 Ranked Rewards', skinType: 'Recolor' },
        { name: 'TROPICAL BEAST', rarity: 'rare', category: 'shop', releaseDate: '2026-05-15' , source: 'Store', skinType: 'Recolor' },
    ],

    'doctor-strange': [
        { name: 'BLEEKER STREET STRUT', rarity: 'legendary', category: 'shop', releaseDate: '2025-11-21' , theme: 'VAN DYNE DESIGNS', source: 'Store', skinType: 'Original' },
        { name: 'Doctor Strange in the Multiverse of Madness', rarity: 'legendary', category: 'shop', releaseDate: '2025-04-18' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Sorcerer Immortal', rarity: 'legendary', category: 'shop', releaseDate: '2025-01-17' , theme: 'Immortal Dragon', source: 'Store', skinType: 'Original' },
        { name: 'God of Magic', rarity: 'epic', category: 'battlepass', releaseDate: '2024-12-06' , source: 'Season 0 Battlepass', skinType: 'Comic / Game' },
        { name: 'Old Man Strange', rarity: 'epic', category: 'battlepass', releaseDate: '2025-08-21' , theme: 'Wastelanders', source: 'Season 3.5 2nd Event Pass', skinType: 'Comic / Game' },
        { name: 'PHANTOM SORCERER', rarity: 'epic', category: 'battlepass', releaseDate: '2026-02-19' , theme: 'Twisted Nightmare', source: 'Season 6.5 Free Pass', skinType: 'Original' },
        { name: 'Sorcerer Supreme of the Galaxy', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'STEPHEN SANDERS: THE DOCTOR', rarity: 'epic', category: 'battlepass', releaseDate: '2026-03-20' , theme: 'ESU SHOWDOWN', source: 'Season 7 Battlepass', skinType: 'Original' },
        { name: 'Astral Wanderer', rarity: 'rare', category: 'battlepass', releaseDate: '2025-09-12' , source: 'Season 4 Battle Pass', skinType: 'Recolor' },
        { name: 'Master of Black Magic', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'elsa-bloodstone': [
        { name: 'BLOODY BLOODSTONE', rarity: 'legendary', category: 'shop' , theme: 'BLACK, WHITE AND BROOM', source: 'Store', skinType: 'Comic / Game' },
        { name: 'YOUNG BLOOD', rarity: 'epic', category: 'shop', releaseDate: '2026-02-13' , theme: 'YEAR ONE', source: 'Store', skinType: 'Comic / Game' },
        { name: 'APEX HUNTRESS', rarity: 'rare', category: 'other', releaseDate: '2026-02-13' , source: 'Season 6.5 Ranked Rewards', skinType: 'Recolor' },
        { name: 'ICY EDGE', rarity: 'rare', category: 'shop', releaseDate: '2026-02-13' , source: 'Store', skinType: 'Recolor' },
    ],

    'emma-frost': [
        { name: 'Hellfire Protocol', rarity: 'legendary', category: 'shop', releaseDate: '2025-10-03' , source: 'Store', skinType: 'Original' },
        { name: 'BLACK QUEEN OF THE MARAUDERS', rarity: 'epic', category: 'shop', releaseDate: '2026-02-20' , theme: 'NEW MARAUDERS', source: 'Store', skinType: 'Comic / Game' },
        { name: 'GALA GLAM', rarity: 'epic', category: 'battlepass', releaseDate: '2026-04-23' , theme: 'HELLFIRE GALA 2026', source: 'Season 7.5 Event Pass', skinType: 'Comic / Game' },
        { name: 'Phoenix Diamond', rarity: 'epic', category: 'battlepass', releaseDate: '2025-07-11' , theme: 'Phoenix Force', source: 'Season 3 Battlepass', skinType: 'Comic / Game' },
        { name: 'QUEEN OF DIAMONDS', rarity: 'epic', category: 'shop', releaseDate: '2026-01-30' , theme: 'TRUMPS OF THE GRANDMASTER', source: 'Store', skinType: 'Original' },
        { name: 'X-Revolution', rarity: 'epic', category: 'shop', releaseDate: '2025-04-11' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Blue Sapphire', rarity: 'rare', category: 'shop', releaseDate: '2025-04-11' , source: 'Store', skinType: 'Recolor' },
        { name: 'Golden Diamond', rarity: 'rare', category: 'other', releaseDate: '2025-04-11' , source: 'Season 2 Ranked Rewards', skinType: 'Recolor' },
        { name: 'Will of Galacta', rarity: 'rare', category: 'other', releaseDate: '2025-05-30' , theme: 'Galacta', source: 'Twitch Drops (Expired)', skinType: 'Recolor' },
    ],

    'gambit': [
        { name: 'MR. X', rarity: 'legendary', category: 'other', releaseDate: '2026-02-13' , theme: 'MR. & MRS. X', source: 'Season 6.5 Gacha Event', skinType: 'Original' },
        { name: 'ALLURING ACE', rarity: 'epic', category: 'shop', releaseDate: '2026-04-24' , theme: 'HELLFIRE GALA 2026', source: 'Store', skinType: 'Comic / Game' },
        { name: 'BARRIER BUSTER', rarity: 'epic', category: 'battlepass', releaseDate: '2026-05-15' , theme: 'Corporate Raiders', source: 'Season 8 Battle Pass', skinType: 'Comic / Game' },
        { name: 'THIEVES GUILDMASTER', rarity: 'epic', category: 'shop', releaseDate: '2025-11-14' , theme: 'THIEVES GUILD', source: 'Store', skinType: 'Original' },
        { name: 'CRIMSON HEART', rarity: 'rare', category: 'shop', releaseDate: '2025-11-14' , source: 'Store', skinType: 'Recolor' },
        { name: 'SACRIFICIAL PAWN', rarity: 'rare', category: 'other', releaseDate: '2025-11-14' , source: 'Season 5 Ranked Rewards', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2026-04-19' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'groot': [
        { name: 'MECHA-FLORA', rarity: 'legendary', category: 'shop', releaseDate: '2026-02-06' , source: 'Store', skinType: 'Original' },
        { name: 'YGGROOT', rarity: 'legendary', category: 'shop', releaseDate: '2025-05-30' , source: 'Store', skinType: 'Original' },
        { name: 'Guardians of the Galaxy Vol. 3', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Holiday Happiness', rarity: 'epic', category: 'shop', releaseDate: '2024-12-20' , theme: 'Winter Holiday', source: 'Store (Expired)', skinType: 'Original' },
        { name: 'ABIES ALGAE', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'BIG BUDDY', rarity: 'rare', category: 'battlepass', releaseDate: '2025-11-14' , theme: 'Year One', source: 'Season 5 Battlepass', skinType: 'Comic / Game' },
        { name: 'Carved Traveler', rarity: 'rare', category: 'shop', releaseDate: '2025-02-21' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Symbiote Flora', rarity: 'rare', category: 'battlepass', releaseDate: '2025-07-11' , theme: 'Klyntar Warriors', source: 'Season 3 Battlepass', skinType: 'Comic / Game' },
    ],

    'hawkeye': [
        { name: 'Ronin', rarity: 'legendary', category: 'shop', releaseDate: '2025-04-04' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Binary Arrow', rarity: 'epic', category: 'other', releaseDate: '2025-05-30' , theme: 'Ultron Virus', source: 'Event', skinType: 'Original' },
        { name: 'Freefall', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Galactic Fangs', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'Imperial Protocol', source: 'Store (Expired)', skinType: 'Original' },
        { name: 'Old Man Hawkeye', rarity: 'epic', category: 'battlepass', releaseDate: '2025-09-12' , theme: 'Wastelanders', source: 'Season 4 Battle Pass', skinType: 'Comic / Game' },
        { name: 'ARGENT ARCHER', rarity: 'rare', category: 'battlepass', releaseDate: '2026-03-20' , source: 'Season 7 Battlepass', skinType: 'Recolor' },
        { name: 'Tiger\'s Eye', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2025-07-11' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'hela': [
        { name: 'HELEN ANGERBODA: THE REBEL', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-03-20' , theme: 'ESU COLLEGE LIFE', source: 'Season 7 Battlepass', skinType: 'Original' },
        { name: 'Queen in Black', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-08-08' , source: 'Season 3.5 Event Pass', skinType: 'Original' },
        { name: 'The Grim Lady', rarity: 'legendary', category: 'shop', releaseDate: '2025-09-26' , source: 'Store', skinType: 'Original' },
        { name: 'DISCO OF THE DEAD', rarity: 'epic', category: 'battlepass', releaseDate: '2026-01-29' , theme: 'Disco Revolution', source: 'Season 6 Event Pass', skinType: 'Original' },
        { name: 'Empress of the Cosmos', rarity: 'epic', category: 'battlepass', releaseDate: '2024-12-06' , source: 'Season 0 Battlepass', skinType: 'Original' },
        { name: 'Goddess of Death', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Yami no Karasu', rarity: 'epic', category: 'shop', releaseDate: '2025-04-25' , theme: 'Peach Momoko\'s Demon Days', source: 'Store', skinType: 'Original' },
        { name: 'MERCIFUL QUEEN', rarity: 'rare', category: 'battlepass', releaseDate: '2025-11-14' , theme: 'MCU', source: 'Season 5 Battlepass', skinType: 'MCU' },
        { name: 'ULTIMATE', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2025-01-10' , theme: 'Galacta', source: 'Twitch Drops (Expired)', skinType: 'Recolor' },
    ],

    'human-torch': [
        { name: 'Future Foundation', rarity: 'epic', category: 'shop', releaseDate: '2025-06-19' , source: 'Event (added to Store)', skinType: 'Comic / Game' },
        { name: 'JACK OF HEARTS', rarity: 'epic', category: 'shop', releaseDate: '2026-01-02' , theme: 'TRUMPS OF THE GRANDMASTER', source: 'Store', skinType: 'Original' },
        { name: 'Negative Zone Gladiator', rarity: 'epic', category: 'shop', releaseDate: '2025-02-21' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'SUNNY SIZZLER', rarity: 'epic', category: 'battlepass', releaseDate: '2025-09-18' , theme: 'Marvel Rivals Swimsuit Special', source: 'Season 4 Event Pass', skinType: 'Original' },
        { name: 'The Fantastic Four: First Steps', rarity: 'epic', category: 'shop', releaseDate: '2025-07-25' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Blood Blaze', rarity: 'rare', category: 'other', releaseDate: '2025-02-21' , theme: 'Gothic Return', source: 'Season 1.5 Ranked Rewards', skinType: 'Recolor' },
        { name: 'First Family', rarity: 'rare', category: 'shop', releaseDate: '2025-02-21' , source: 'Store', skinType: 'Recolor' },
        { name: 'SILVER SPARK', rarity: 'rare', category: 'battlepass', releaseDate: '2026-05-15' , source: 'Season 8 Battle Pass', skinType: 'Recolor' },
    ],

    'invisible-woman': [
        { name: 'AZURE SHADE', rarity: 'legendary', category: 'shop', releaseDate: '2025-09-19' , theme: 'Marvel Rivals Swimsuit Special', source: 'Store (Limited)', skinType: 'Comic / Game' },
        { name: 'Disappearing Dessert', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-11-27' , theme: 'RIVALS\' DAY 2025', source: 'Rivals\' Day 2025 Event Pass', skinType: 'Original' },
        { name: 'PRISM PARADE', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-01-16' , theme: 'Disco Revolution', source: 'Season 6 Battlepass', skinType: 'Original' },
        { name: 'RIANN LANDAU: THE DEBATER', rarity: 'legendary', category: 'shop', releaseDate: '2026-04-03' , theme: 'ESU COLLEGE LIFE', source: 'Store', skinType: 'Original' },
        { name: 'The Life Fantastic', rarity: 'legendary', category: 'shop', releaseDate: '2025-02-14' , theme: '60th Wedding Anniversary', source: 'Store', skinType: 'Original' },
        { name: 'The Fantastic Four: First Steps', rarity: 'epic', category: 'shop', releaseDate: '2025-07-25' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Future Foundation', rarity: 'epic', category: 'shop', releaseDate: '2025-06-13' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Malice', rarity: 'epic', category: 'shop', releaseDate: '2025-01-10' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Blood Shield', rarity: 'rare', category: 'other', releaseDate: '2025-01-10' , theme: 'Gothic Return', source: 'Season 1 Ranked Rewards', skinType: 'Recolor' },
        { name: 'First Family', rarity: 'rare', category: 'shop', releaseDate: '2025-01-10' , source: 'Store', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2026-01-16' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'iron-fist': [
        { name: 'Lion\'s Gaze', rarity: 'legendary', category: 'shop', releaseDate: '2025-01-23' , theme: 'Clashing Lions', source: 'Store (Expired)', skinType: 'Original' },
        { name: 'Binary Fist', rarity: 'epic', category: 'shop', releaseDate: '2025-06-20' , theme: 'Ultron Virus', source: 'Store', skinType: 'Original' },
        { name: 'Immortal Weapon of Agamotto', rarity: 'epic', category: 'battlepass', releaseDate: '2025-04-11' , source: 'Season 2 Battlepass', skinType: 'Comic / Game' },
        { name: 'LIN SHAO: THE KNOCKOUT', rarity: 'epic', category: 'shop', releaseDate: '2026-04-10' , theme: 'ESU SHOWDOWN', source: 'Store', skinType: 'Original' },
        { name: 'Phoenix Fist', rarity: 'epic', category: 'battlepass', releaseDate: '2025-08-21' , theme: 'Phoenix Force', source: 'Season 3.5 2nd Event Pass', skinType: 'Comic / Game' },
        { name: 'Sword Master', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Martial Arts Savant', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'Shenloong Champion', rarity: 'rare', category: 'battlepass', releaseDate: '2025-12-12' , theme: 'Immortal Weapon', source: 'Season 5.5 Event Pass', skinType: 'Original' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2025-12-12' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'ironman': [
        { name: 'Avengers: Endgame', rarity: 'legendary', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Big Shot', rarity: 'legendary', category: 'shop', releaseDate: '2025-10-31' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Extrembiote Armor', rarity: 'legendary', category: 'shop', releaseDate: '2025-08-22' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'IRON MARINER', rarity: 'legendary', category: 'shop', releaseDate: '2026-02-20' , theme: 'NEW MARAUDERS', source: 'Store', skinType: 'Original' },
        { name: 'Blood Edge Armor', rarity: 'epic', category: 'battlepass', releaseDate: '2025-01-10' , theme: 'Gothic Return', source: 'Season 1 Battlepass', skinType: 'Original' },
        { name: 'Mark I', rarity: 'epic', category: 'battlepass', releaseDate: '2025-12-12' , theme: 'The Collector\'s Collection', source: 'Season 5.5 Event Pass', skinType: 'Comic / Game' },
        { name: 'STEAM POWER', rarity: 'epic', category: 'shop', releaseDate: '2025-03-21' , source: 'Store', skinType: 'Original' },
        { name: 'Superior Iron Man', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'THE AVENGERS', rarity: 'epic', category: 'shop', releaseDate: '2026-05-01' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'ARMOR MODEL 42', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'jeff-the-land-shark': [
        { name: 'Business Shark', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-11-27' , theme: 'VAN DYNE DESIGNS', source: 'Rivals\' Day 2025 Event Pass', skinType: 'Comic / Game' },
        { name: 'DEVIL LANDSHARK', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-05-15' , theme: 'SAVAGE LAND', source: 'Season 8 Battle Pass', skinType: 'Original' },
        { name: 'Devouring Duo', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-07-11' , theme: 'Klyntar Warriors', source: 'Season 3 Battlepass', skinType: 'Comic / Game' },
        { name: 'DUCK DEFENDER', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-02-13' , theme: 'ANIMAL PARTY', source: 'Season 6.5 Event Pass', skinType: 'Comic / Game' },
        { name: 'JEFF O\'LANTERN', rarity: 'legendary', category: 'shop', releaseDate: '2025-10-24' , theme: 'VOYAGE TO ASTONISH', source: 'Store', skinType: 'Original' },
        { name: 'Sunshine Land Shark', rarity: 'legendary', category: 'shop', releaseDate: '2025-06-06' , theme: 'Krakoa Resort', source: 'Store', skinType: 'Original' },
        { name: '8-BIT BASH', rarity: 'epic', category: 'other' , source: 'Event', skinType: 'Original' },
        { name: 'Cuddly Fuzzlefin', rarity: 'epic', category: 'shop', releaseDate: '2024-12-20' , theme: 'Winter Holiday', source: 'Event (added to Store)', skinType: 'Original' },
        { name: 'Incognito Dolphin', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'MAID TO CHOMP', rarity: 'epic', category: 'shop', releaseDate: '2026-04-10' , theme: 'BLACK, WHITE AND BROOM', source: 'Store', skinType: 'Original' },
        { name: 'ADOPTED AVENGER', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'loki': [
        { name: 'All-Butcher', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-01-10' , source: 'Season 1 Battlepass', skinType: 'Comic / Game' },
        { name: 'LADY LOKI', rarity: 'legendary', category: 'shop', releaseDate: '2026-01-02' , theme: 'The Collector\'s Collection', source: 'Store (Limited)', skinType: 'Comic / Game' },
        { name: 'Shin Sagi-Shi', rarity: 'legendary', category: 'shop', releaseDate: '2025-04-25' , theme: 'Peach Momoko\'s Demon Days', source: 'Store', skinType: 'Original' },
        { name: 'CRANE DECEIVER', rarity: 'epic', category: 'battlepass', releaseDate: '2025-09-12' , theme: 'Immortal Weapon', source: 'Season 4 Battle Pass', skinType: 'Original' },
        { name: 'Loki Season 2', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'LOW-KEY LOKI', rarity: 'epic', category: 'battlepass', releaseDate: '2026-03-20' , source: 'Season 7 Battlepass', skinType: 'Comic / Game' },
        { name: 'PRESIDENTIAL ATTIRE', rarity: 'epic', category: 'shop', releaseDate: '2025-03-14' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Robe of Relaxation', rarity: 'epic', category: 'shop', releaseDate: '2025-07-18' , theme: 'Marvel Rivals Swimsuit Special', source: 'Store (Limited)', skinType: 'Original' },
        { name: 'THE AVENGERS', rarity: 'epic', category: 'shop', releaseDate: '2026-05-01' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Frost Giant', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'IGNITE Loki (2025)', rarity: 'rare', category: 'shop', releaseDate: '2025-11-02' , theme: 'IGNITE', source: 'Store', skinType: 'Recolor' },
    ],

    'luna-snow': [
        { name: 'Abyssal Glow', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-09-12'  , theme: 'Abyssal Flame', source: 'Season 4 Battle Pass', skinType: 'Original' },
        { name: 'Cherry Delight', rarity: 'legendary', category: 'shop', releaseDate: '2025-12-05' , theme: 'RIVALS\' DAY 2025', source: 'Store', skinType: 'Original' },
        { name: 'Cool Summer', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-07-17' , theme: 'Marvel Rivals Swimsuit Special', source: 'Season 3 Event Pass', skinType: 'Original' },
        { name: 'DISCO POP', rarity: 'legendary', category: 'shop', releaseDate: '2026-01-23' , theme: 'Disco Revolution', source: 'Store', skinType: 'Original' },
        { name: 'Mirae 2099', rarity: 'legendary', category: 'shop', releaseDate: '2025-02-07' , source: 'Store', skinType: 'Original' },
        { name: 'PARK SUN-YOUNG: THE DANCER', rarity: 'epic', category: 'battlepass', releaseDate: '2026-03-20' , theme: 'ESU COLLEGE LIFE', source: 'Season 7 Battlepass', skinType: 'Original' },
        { name: 'Shining Star', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Original' },
        { name: 'MINTY BEATS', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'Nolaehaneun Manyeo', rarity: 'rare', category: 'battlepass', releaseDate: '2025-04-11' , source: 'Season 2 Battlepass', skinType: 'Original' },
    ],

    'magik': [
        { name: 'INFERNAL IDOL', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-03-26' , theme: 'Disco Revolution', source: 'Season 7 Event Pass', skinType: 'Original' },
        { name: 'NETHERWORLD NOBLE', rarity: 'legendary', category: 'shop', releaseDate: '2026-04-24' , theme: 'HELLFIRE GALA 2026', source: 'Store', skinType: 'Original' },
        { name: 'NEW MILLENIA MIGHT', rarity: 'legendary', category: 'shop' , theme: 'VAN DYNE DESIGNS', source: 'Store', skinType: 'Original' },
        { name: 'Punkchild', rarity: 'legendary', category: 'shop', releaseDate: '2025-02-28' , theme: 'Punk Society', source: 'Store', skinType: 'Original' },
        { name: 'Eldritch Armor', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Frozen Demon', rarity: 'epic', category: 'shop', releaseDate: '2024-12-27' , theme: 'Winter Holiday', source: 'Store (Expired)', skinType: 'Original' },
        { name: 'Phoenix Demon', rarity: 'epic', category: 'shop', releaseDate: '2025-08-01' , theme: 'Phoenix Force', source: 'Store', skinType: 'Comic / Game' },
        { name: 'AMETHYST ARMOR', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'Retro X-Uniform', rarity: 'rare', category: 'battlepass', releaseDate: '2025-04-11' , source: 'Season 2 Battlepass', skinType: 'Comic / Game' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2025-06-19' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'magneto': [
        { name: 'Binary Sword', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-05-30' , theme: 'Ultron Virus', source: 'Season 2.5 Combat Chest', skinType: 'Original' },
        { name: 'BLACK & GOLD', rarity: 'epic', category: 'battlepass', releaseDate: '2025-12-18' , source: 'Season 5.5 2nd Event Pass', skinType: 'Recolor' },
        { name: 'King Magnus', rarity: 'epic', category: 'battlepass', releaseDate: '2025-01-10' , source: 'Season 1 Battlepass', skinType: 'Comic / Game' },
        { name: 'Master of Magnetism', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'SEAT OF AUTUMN', rarity: 'epic', category: 'shop', releaseDate: '2026-02-06' , theme: 'QUIET COUNCIL OF KRAKOA', source: 'Store', skinType: 'Comic / Game' },
        { name: 'TEMPORAL TYRANT', rarity: 'epic', category: 'shop', releaseDate: '2025-11-14' , source: 'Store', skinType: 'Original' },
        { name: 'The Trial of Magneto', rarity: 'epic', category: 'battlepass', releaseDate: '2025-09-12' , source: 'Season 4 Battle Pass', skinType: 'Comic / Game' },
        { name: 'UNTAMED OVERLORD', rarity: 'epic', category: 'battlepass', releaseDate: '2026-05-15' , theme: 'SAVAGE LAND', source: 'Season 8 Battle Pass', skinType: 'Comic / Game' },
        { name: 'UNCANNY BLACKSTEEL', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2024-12-06' , theme: 'Galacta', source: 'Twitch Drops (Expired)', skinType: 'Recolor' },
    ],

    'mantis': [
        { name: 'Galactic Wings', rarity: 'legendary', category: 'battlepass', releaseDate: '2024-12-06' , theme: 'Imperial Protocol', source: 'Season 0 Battlepass', skinType: 'Original' },
        { name: 'OCEANIC HARMONY', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-09-18' , theme: 'Marvel Rivals Swimsuit Special', source: 'Season 4 Event Pass', skinType: 'Original' },
        { name: 'Flora Maiden', rarity: 'epic', category: 'other', releaseDate: '2025-04-11' , source: 'Event', skinType: 'Comic / Game' },
        { name: 'Galactic Gladiator', rarity: 'epic', category: 'battlepass', releaseDate: '2026-01-16' , theme: 'The Collector\'s Collection', source: 'Season 6 Battlepass', skinType: 'Original' },
        { name: 'Guardians of the Galaxy Vol. 3', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Jade Maiden', rarity: 'epic', category: 'shop', releaseDate: '2025-01-17' , theme: 'Immortal Dragon', source: 'Store', skinType: 'Original' },
        { name: 'STARLIT MADONNA', rarity: 'epic', category: 'shop', releaseDate: '2026-05-15' , theme: 'SPACE OUTLAWS', source: 'Store', skinType: 'Comic / Game' },
        { name: 'BLACK & GOLD', rarity: 'rare', category: 'battlepass', releaseDate: '2026-04-17' , theme: 'BLACK & GOLD', source: 'Season 7.5 Event Pass', skinType: 'Recolor' },
        { name: 'KNOWHERE CORP', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2025-08-08' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'mister-fantastic': [
        { name: 'The Life Fantastic', rarity: 'legendary', category: 'shop', releaseDate: '2025-02-14' , theme: '60th Wedding Anniversary', source: 'Store', skinType: 'Original' },
        { name: 'Dad-tastic Reed', rarity: 'epic', category: 'battlepass', releaseDate: '2025-11-27' , source: 'Rivals\' Day 2025 Event Pass', skinType: 'Original' },
        { name: 'DANUM KET: THE PROFESSOR', rarity: 'epic', category: 'shop', releaseDate: '2026-04-03' , theme: 'ESU COLLEGE LIFE', source: 'Store', skinType: 'Original' },
        { name: 'The Fantastic Four: First Steps', rarity: 'epic', category: 'shop', releaseDate: '2025-07-25' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Future Foundation', rarity: 'epic', category: 'battlepass', releaseDate: '2025-05-30' , source: 'Season 2.5 Combat Chest', skinType: 'Comic / Game' },
        { name: 'The Maker', rarity: 'epic', category: 'shop', releaseDate: '2025-01-10' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'First Family', rarity: 'rare', category: 'shop', releaseDate: '2025-01-10' , source: 'Store', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2025-10-10' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'moon-knight': [
        { name: 'Lunar General', rarity: 'legendary', category: 'shop', releaseDate: '2025-01-03' , theme: 'Immortal Dragon', source: 'Store', skinType: 'Original' },
        { name: 'Moon Knight Mech', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-09-12' , theme: 'MCU', source: 'Season 4 Battle Pass', skinType: 'MCU' },
        { name: 'SUAVE SPECTOR', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-04-23' , theme: 'HELLFIRE GALA 2026', source: 'Season 7.5 Event Pass', skinType: 'Comic / Game' },
        { name: 'ECLIPSE KNIGHT', rarity: 'epic', category: 'shop', releaseDate: '2026-02-27' , theme: 'TWISTED NIGHTMARE', source: 'Store', skinType: 'Original' },
        { name: 'Fist of Vengeance', rarity: 'epic', category: 'shop', releaseDate: '2025-03-28' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'King of Clubs', rarity: 'epic', category: 'battlepass', releaseDate: '2026-01-16' , theme: 'TRUMPS OF THE GRANDMASTER', source: 'Season 6 Battlepass', skinType: 'Original' },
        { name: 'Mister Knight', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Phoenix Knight', rarity: 'epic', category: 'shop', releaseDate: '2025-06-20' , theme: 'Phoenix Force', source: 'Store', skinType: 'Comic / Game' },
        { name: 'Blood Moon Knight', rarity: 'rare', category: 'battlepass', releaseDate: '2025-01-10' , theme: 'Gothic Return', source: 'Season 1 Battlepass', skinType: 'Recolor' },
        { name: 'Golden Moonlight', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'namor': [
        { name: 'PHANTOM TIDE', rarity: 'legendary', category: 'shop', releaseDate: '2025-10-24' , theme: 'VOYAGE TO ASTONISH', source: 'Store', skinType: 'Original' },
        { name: 'MONSTRO KING', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-11-14' , theme: 'The Collector\'s Collection', source: 'Season 5 Battlepass', skinType: 'Original' },
        { name: 'Black Panther: Wakanda Forever', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Phoenix King', rarity: 'epic', category: 'battlepass', releaseDate: '2025-07-11' , theme: 'Phoenix Force', source: 'Season 3 Battlepass', skinType: 'Comic / Game' },
        { name: 'Retro X-Uniform', rarity: 'epic', category: 'shop', releaseDate: '2025-05-16' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'SEA SAMBA', rarity: 'epic', category: 'battlepass', releaseDate: '2026-03-26' , theme: 'Disco Revolution', source: 'Season 7 Event Pass', skinType: 'Original' },
        { name: 'MAUVE SUB-MARINER', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'Savage Sub-Mariner', rarity: 'rare', category: 'battlepass', releaseDate: '2025-01-10' , source: 'Season 1 Battlepass', skinType: 'Comic / Game' },
        { name: 'Will of Galacta', rarity: 'rare', category: 'other', releaseDate: '2025-04-11' , theme: 'Galacta', source: 'Twitch Drops (Expired)', skinType: 'Recolor' },
    ],

    'peni-parker': [
        { name: 'BADLANDS LULLABY', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-03-20' , theme: 'TWISTED NIGHTMARE', source: 'Season 7 Battlepass', skinType: 'Original' },
        { name: 'FLORAL FRIGHTS', rarity: 'legendary', category: 'shop', releaseDate: '2025-10-23' , theme: 'VOYAGE TO ASTONISH', source: 'Shop', skinType: 'Original' },
        { name: 'SNOW-SP//DR', rarity: 'legendary', category: 'shop', releaseDate: '2025-12-19' , theme: 'WINTER HOLIDAY 2025', source: 'Shop', skinType: 'Original' },
        { name: 'VEN#M', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Wasteland Mech', rarity: 'epic', category: 'shop', releaseDate: '2025-09-05' , theme: 'Wastelanders', source: 'Store', skinType: 'Original' },
        { name: 'Yatsukahagi', rarity: 'epic', category: 'shop', releaseDate: '2025-04-18' , theme: 'Peach Momoko\'s Demon Days', source: 'Store', skinType: 'Original' },
        { name: 'Blue Tarantula', rarity: 'rare', category: 'battlepass', releaseDate: '2025-01-10' , source: 'Season 1 Battlepass', skinType: 'Recolor' },
        { name: 'OLIVE SKIMMER', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'phoenix': [
        { name: 'Chaos Phoenix', rarity: 'legendary', category: 'shop', releaseDate: '2025-07-11' , source: 'Store', skinType: 'Original' },
        { name: 'ICE PHOENIX', rarity: 'legendary', category: 'shop', releaseDate: '2026-01-09' , source: 'Store', skinType: 'Original' },
        { name: 'Dark Phoenix', rarity: 'epic', category: 'battlepass', releaseDate: '2025-09-12' , source: 'Season 4 Battle Pass', skinType: 'Comic / Game' },
        { name: 'SEAT OF SPRING', rarity: 'epic', category: 'shop', releaseDate: '2026-02-27' , theme: 'QUIET COUNCIL OF KRAKOA', source: 'Store', skinType: 'Comic / Game' },
        { name: 'VERDANT VOGUE', rarity: 'epic', category: 'battlepass', releaseDate: '2026-04-23' , theme: 'HELLFIRE GALA 2026', source: 'Season 7.5 Event Pass', skinType: 'Comic / Game' },
        { name: 'Emerald Flames', rarity: 'rare', category: 'other', releaseDate: '2025-07-11' , source: 'Season 3 Ranked Rewards', skinType: 'Recolor' },
        { name: 'The Return of Jean Grey', rarity: 'rare', category: 'shop', releaseDate: '2025-07-11' , source: 'Store', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2025-11-14' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'psylocke': [
        { name: 'Breezy Butterfly', rarity: 'legendary', category: 'shop', releaseDate: '2025-07-18' , theme: 'Marvel Rivals Swimsuit Special', source: 'Store (Limited)', skinType: 'Comic / Game' },
        { name: 'CHOUKO TAKAHASHI: THE PRODIGY', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-04-17' , theme: 'ESU COLLEGE LIFE', source: 'Season 7.5 Event Pass', skinType: 'Original' },
        { name: 'Fleeting Butterfly', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-10-10' , theme: 'Formula R', source: 'Season 4.5 Event Pass', skinType: 'Original' },
        { name: 'DARING DAIFUKU', rarity: 'legendary', category: 'other', releaseDate: '2025-12-04' , theme: 'RIVALS\' DAY 2025', source: 'RIVALS\' Day 2025 Gacha', skinType: 'Original' },
        { name: 'PSYCHEDELIC PULSE', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-01-29' , theme: 'Disco Revolution', source: 'Season 6 Event Pass', skinType: 'Original' },
        { name: 'Blood Kariudo', rarity: 'epic', category: 'shop', releaseDate: '2025-01-31' , theme: 'Gothic Return', source: 'Store', skinType: 'Original' },
        { name: 'ONCE-CAPTIVE CORSAIR', rarity: 'epic', category: 'shop', releaseDate: '2026-03-06' , theme: 'NEW MARAUDERS', source: 'Store', skinType: 'Original' },
        { name: 'Vengeance', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Kirisaki Sakura', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'Retro X-Uniform', rarity: 'rare', category: 'battlepass', releaseDate: '2025-04-11' , source: 'Season 2 Battlepass', skinType: 'Comic / Game' },
    ],

    'rocket-raccoon': [
        { name: 'Sunshine Raccoon', rarity: 'legendary', category: 'shop', releaseDate: '2025-05-09' , theme: 'Krakoa Resort', source: 'Store', skinType: 'Original' },
        { name: 'Bounty Hunter', rarity: 'epic', category: 'battlepass', releaseDate: '2025-01-10' , source: 'Season 1 Battlepass', skinType: 'Original' },
        { name: 'GIANT PANDA', rarity: 'epic', category: 'battlepass', releaseDate: '2026-02-13' , theme: 'ANIMAL PARTY', source: 'Season 6.5 Event Pass', skinType: 'Original' },
        { name: 'Guardians of the Galaxy Vol. 3', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'ROCKET OF THE RAFTERS', rarity: 'epic', category: 'shop', releaseDate: '2025-12-12' , theme: 'THIEVES GUILD', source: 'Store', skinType: 'Original' },
        { name: 'Symbiote Raccoon', rarity: 'epic', category: 'battlepass', releaseDate: '2025-07-11' , theme: 'Klyntar Warriors', source: 'Season 3 Battlepass', skinType: 'Comic / Game' },
        { name: 'Wild Winter', rarity: 'epic', category: 'shop', releaseDate: '2024-12-20' , theme: 'Winter Holiday', source: 'Store (Expired)', skinType: 'Original' },
        { name: 'Rocky', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'ROCKY: THE TRANSFER', rarity: 'rare', category: 'battlepass', releaseDate: '2026-03-20' , theme: 'ESU COLLEGE LIFE', source: 'Season 7 Battlepass', skinType: 'Comic / Game' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2025-09-25' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'rogue': [
        { name: 'MRS. X', rarity: 'legendary', category: 'other', releaseDate: '2026-02-13' , theme: 'MR. & MRS. X', source: 'Season 6.5 Gacha Event', skinType: 'Original' },
        { name: 'STARLIT REBEL', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-05-15' , theme: 'STARLIT OUTLAWS', source: 'Season 8 Battle Pass', skinType: 'Comic / Game' },
        { name: 'ROGUE REDUX', rarity: 'epic', category: 'shop' , theme: 'SAVAGE LAND', source: 'Shop', skinType: 'Comic / Game' },
        { name: 'Queen\'s Defense', rarity: 'rare', category: 'other', releaseDate: '2025-12-12' , source: 'Season 5.5 Ranked Rewards', skinType: 'Recolor' },
        { name: 'SEARING HEART', rarity: 'rare', category: 'shop', releaseDate: '2025-12-12' , source: 'Shop', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2026-05-15' , theme: 'WILL OF GALACTA', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'scarlet-witch': [
        { name: 'Immortal Sovereign', rarity: 'legendary', category: 'shop', releaseDate: '2025-05-23' , theme: 'Immortal Dragon', source: 'Store', skinType: 'Original' },
        { name: 'Phoenix Chaos', rarity: 'legendary', category: 'shop', releaseDate: '2025-08-29' , theme: 'Phoenix Force', source: 'Store', skinType: 'Original' },
        { name: 'TWISTED CONJURER', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-02-19' , theme: 'TWISTED NIGHTMARE', source: 'Season 6.5 Skin Pass', skinType: 'Original' },
        { name: 'WITCH OF THE EVIL EYE', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-11-14' , theme: 'Year One', source: 'Season 5 Battlepass', skinType: 'Comic / Game' },
        { name: 'Chaos Gown', rarity: 'epic', category: 'other', releaseDate: '2025-04-11' , source: 'Event', skinType: 'Comic / Game' },
        { name: 'Doctor Strange in the Multiverse of Madness', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Emporium Matron', rarity: 'epic', category: 'battlepass', releaseDate: '2025-01-10' , source: 'Season 1 Battlepass', skinType: 'Comic / Game' },
        { name: 'The Queen Of The Dead', rarity: 'epic', category: 'shop', releaseDate: '2025-10-31' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'NYX WEAVER', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'WHITE WITCH', rarity: 'rare', category: 'other', releaseDate: '2024-12-06' , source: 'Pre-Release Alpha', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2026-03-20' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'spider-man': [
        { name: 'PETER PARKER: THE PHOTOGRAPHER', rarity: 'legendary', category: 'shop', releaseDate: '2026-04-17' , theme: 'ESU COLLEGE LIFE', source: 'Store', skinType: 'Comic / Game' },
        { name: 'Spider-Man: No Way Home', rarity: 'legendary', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Spider-Oni', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-04-11' , theme: 'Peach Momoko\'s Demon Days', source: 'Season 2 Battlepass', skinType: 'Original' },
        { name: 'SPIDER-PUNK: 2099', rarity: 'legendary', category: 'shop', releaseDate: '2025-03-21' , theme: 'Punk Society', source: 'Store', skinType: 'Original' },
        { name: 'Bag-Man Beyond', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Black & Gold', rarity: 'epic', category: 'battlepass', releaseDate: '2025-10-10' , source: 'Season 4.5 Event Pass', skinType: 'Recolor' },
        { name: 'Black Suit', rarity: 'epic', category: 'battlepass', releaseDate: '2025-07-11' , theme: 'Klyntar Warriors', source: 'Season 3 Battlepass', skinType: 'Comic / Game' },
        { name: 'Future Foundation', rarity: 'epic', category: 'shop', releaseDate: '2025-07-04' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'GROOVY SWING', rarity: 'epic', category: 'battlepass', releaseDate: '2026-01-29' , theme: 'Disco Revolution', source: 'Season 6 Event Pass', skinType: 'Comic / Game' },
        { name: 'Man-Spider', rarity: 'epic', category: 'shop', releaseDate: '2025-10-31' , theme: 'The Collector\'s Collection', source: 'Store', skinType: 'Comic / Game' },
        { name: 'MARVEL COSMIC INVASION', rarity: 'epic', category: 'shop', releaseDate: '2026-01-16' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Marvel\'s Spider-Man 2', rarity: 'epic', category: 'shop', releaseDate: '2025-01-30' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Chasm', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'IRON SPIDER', rarity: 'rare', category: 'other', releaseDate: '2025-11-14' , source: 'Season 5 Event', skinType: 'Comic / Game' },
        { name: 'SCARLET SPIDER', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'squirrel-girl': [
        { name: 'Symbiote Squirrel', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-07-11' , theme: 'Klyntar Warriors', source: 'Season 3 Battlepass', skinType: 'Comic / Game' },
        { name: 'TINSEL TAIL', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-12-18' , theme: 'WINTER HOLIDAY 2025', source: 'Season 5.5 2nd Event Pass', skinType: 'Original' },
        { name: 'TURBO TAILWIND', rarity: 'legendary', category: 'shop', releaseDate: '2025-10-17' , theme: 'Formula R', source: 'Store', skinType: 'Original' },
        { name: 'Cheerful Dragoness', rarity: 'epic', category: 'shop', releaseDate: '2025-01-03' , theme: 'Immortal Dragon', source: 'Store', skinType: 'Original' },
        { name: 'MAUREEN ALLENE: THE PROGRAMMER', rarity: 'epic', category: 'battlepass', releaseDate: '2026-04-17' , theme: 'ESU COLLEGE LIFE', source: 'Season 7.5 Event Pass', skinType: 'Original' },
        { name: 'Nut Rocker', rarity: 'epic', category: 'battlepass', releaseDate: '2025-04-11' , theme: 'Punk Society', source: 'Season 2 Battlepass', skinType: 'Original' },
        { name: 'RED PANDA', rarity: 'epic', category: 'battlepass', releaseDate: '2026-02-13' , theme: 'ANIMAL PARTY', source: 'Season 6.5 Event Pass', skinType: 'Comic / Game' },
        { name: 'Sunshine Squirrel', rarity: 'epic', category: 'shop', releaseDate: '2025-05-09' , theme: 'Krakoa Resort', source: 'Store', skinType: 'Original' },
        { name: 'Urban Hunter', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'ARCTIC LEMMUS', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'star-lord': [
        { name: 'STARCRACKER', rarity: 'legendary', category: 'shop', releaseDate: '2025-12-19' , theme: 'WINTER HOLIDAY 2025', source: 'Store', skinType: 'Original' },
        { name: 'GLORY GUNNER', rarity: 'epic', category: 'battlepass', releaseDate: '2026-05-15' , theme: 'Corporate Raiders', source: 'Season 8 Battle Pass', skinType: 'Original' },
        { name: 'GROOVY GUARDIAN', rarity: 'epic', category: 'battlepass', releaseDate: '2026-03-26' , theme: 'Disco Revolution', source: 'Season 7 Event Pass', skinType: 'Original' },
        { name: 'Guardians of the Galaxy Vol. 3', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'King of Spartax', rarity: 'epic', category: 'shop', releaseDate: '2025-04-11' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Lion\'s Mane', rarity: 'epic', category: 'shop', releaseDate: '2025-01-23' , theme: 'Clashing Lions', source: 'Event (added to Store)', skinType: 'Original' },
        { name: 'Master of the Sun', rarity: 'epic', category: 'shop', releaseDate: '2024-12-13' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Starlit Outlaw', rarity: 'epic', category: 'battlepass', releaseDate: '2025-09-12' , theme: 'SPACE OUTLAWS', source: 'Season 4 Battle Pass', skinType: 'Comic / Game' },
        { name: 'IGNITE STAR-LORD (2025)', rarity: 'rare', category: 'other', releaseDate: '2025-08-10' , theme: 'IGNITE', source: 'Twitch Drops', skinType: 'Recolor' },
        { name: 'Jovial Star', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'Luminous Legend', rarity: 'rare', category: 'shop', releaseDate: '2026-01-16' , source: 'Store', skinType: 'Recolor' },
    ],

    'storm': [
        { name: 'GODDESS OF THUNDER', rarity: 'legendary', category: 'shop', releaseDate: '2025-03-14' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Mohawk Rock', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'Punk Society', source: 'Store', skinType: 'Comic / Game' },
        { name: 'QUEEN OF ORPHANS', rarity: 'epic', category: 'battlepass', releaseDate: '2025-10-10' , theme: 'Immortal Weapon', source: 'Season 4.5 Event Pass', skinType: 'Original' },
        { name: 'QUEEN OF WAKANDA', rarity: 'epic', category: 'battlepass', releaseDate: '2026-01-16' , theme: 'Old Flames', source: 'Season 6 Battlepass', skinType: 'Comic / Game' },
        { name: 'Symbiote Storm', rarity: 'epic', category: 'shop', releaseDate: '2025-07-11' , theme: 'Klyntar Warriors', source: 'Event (added to Store)', skinType: 'Comic / Game' },
        { name: 'Ultimate Wind-Rider', rarity: 'epic', category: 'battlepass', releaseDate: '2025-05-30' , source: 'Season 2.5 Combat Chest', skinType: 'Comic / Game' },
        { name: 'Ivory Breeze', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

    'the-punisher': [
        { name: 'AQUA ARSENAL', rarity: 'legendary', category: 'shop', releaseDate: '2025-09-19' , theme: 'Marvel Rivals Swimsuit Special', source: 'Store (Limited)', skinType: 'Comic / Game' },
        { name: 'Dangan Ronin', rarity: 'legendary', category: 'shop', releaseDate: '2025-05-16' , theme: 'Peach Momoko\'s Demon Days', source: 'Store', skinType: 'Comic / Game' },
        { name: 'Daredevil: Born Again', rarity: 'epic', category: 'shop', releaseDate: '2025-06-27' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'FRANKEN-CASTLE', rarity: 'epic', category: 'battlepass', releaseDate: '2025-11-14' , theme: 'The Collector\'s Collection', source: 'Season 5 Battlepass', skinType: 'Comic / Game' },
        { name: 'MARAUDER MARKSMAN', rarity: 'epic', category: 'shop', releaseDate: '2026-03-20' , theme: 'THE NEW MARAUDERS', source: 'Store', skinType: 'Original' },
        { name: 'Punisher 2099', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Camo', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'Thunderbolts', rarity: 'rare', category: 'battlepass', releaseDate: '2024-12-06' , source: 'Season 0 Battlepass', skinType: 'Comic / Game' },
    ],

    'the-thing': [
        { name: 'FEAR ITSELF', rarity: 'legendary', category: 'shop', releaseDate: '2026-03-13' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'The Fantastic Four: First Steps', rarity: 'epic', category: 'shop', releaseDate: '2025-07-25' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'Future Foundation', rarity: 'epic', category: 'shop', releaseDate: '2025-06-13' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'ROCKY TIDE', rarity: 'epic', category: 'battlepass', releaseDate: '2025-09-18' , theme: 'Marvel Rivals Swimsuit Special', source: 'Season 4 Event Pass', skinType: 'Original' },
        { name: 'Sunshine Thing', rarity: 'epic', category: 'battlepass', releaseDate: '2025-07-17' , theme: 'Krakoa Resort', source: 'Season 3 Event Pass', skinType: 'Original' },
        { name: 'Symbiote-Thing', rarity: 'epic', category: 'battlepass', releaseDate: '2025-08-08' , theme: 'Klyntar Warriors', source: 'Season 3.5 Event Pass', skinType: 'Comic / Game' },
        { name: 'Trench Coat', rarity: 'epic', category: 'shop', releaseDate: '2025-02-21' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'BLUE THING', rarity: 'rare', category: 'battlepass', releaseDate: '2025-11-14' , source: 'Season 5 Battlepass', skinType: 'Recolor' },
        { name: 'First Family', rarity: 'rare', category: 'shop', releaseDate: '2025-02-21' , source: 'Store', skinType: 'Recolor' },
        { name: 'INFINITY THING', rarity: 'rare', category: 'battlepass', releaseDate: '2026-05-15' , source: 'Season 8 Battle Pass', skinType: 'Comic / Game' },
        { name: 'The Unlimited', rarity: 'rare', category: 'other', releaseDate: '2025-04-18' , source: 'Purchasing MARVEL Unlimited', skinType: 'Recolor' },
    ],

    'thor': [
        { name: 'BOOGIE BOLT', rarity: 'legendary', category: 'shop', releaseDate: '2026-01-23' , theme: 'Disco Revolution', source: 'Store', skinType: 'Comic / Game' },
        { name: 'Majestic Raiment', rarity: 'legendary', category: 'shop', releaseDate: '2025-06-27' , theme: 'Hellfire Gala 2025', source: 'Store', skinType: 'Comic / Game' },
        { name: 'Thor: Love and Thunder', rarity: 'legendary', category: 'shop', releaseDate: '2024-12-13' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'GOD OF WINTER', rarity: 'epic', category: 'shop', releaseDate: '2025-12-26' , theme: 'WINTER HOLIDAY 2025', source: 'Store', skinType: 'Comic / Game' },
        { name: 'HERALD OF THUNDER', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'LIGHTNING FAST', rarity: 'epic', category: 'shop', releaseDate: '2025-10-17' , theme: 'Formula R', source: 'Store', skinType: 'Original' },
        { name: 'Lord of Asgard', rarity: 'epic', category: 'shop', releaseDate: '2025-04-04' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'LOW-KEY THOR', rarity: 'epic', category: 'battlepass', releaseDate: '2026-03-20' , source: 'Season 7 Battlepass', skinType: 'Comic / Game' },
        { name: 'UNWORTHY THOR', rarity: 'epic', category: 'battlepass', releaseDate: '2026-05-15' , source: 'Season 8 Battle Pass', skinType: 'Comic / Game' },
        { name: 'Worthy Waves', rarity: 'epic', category: 'battlepass', releaseDate: '2025-07-17' , theme: 'Marvel Rivals Swimsuit Special', source: 'Season 3 Event Pass', skinType: 'Original' },
        { name: 'MIDGARD UMBER', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'Reborn from Ragnarok', rarity: 'rare', category: 'shop', releaseDate: '2025-01-10' , source: 'Store', skinType: 'Comic / Game' },
    ],

    'ultron': [
        { name: 'INFINITY ULTRON', rarity: 'epic', category: 'battlepass', releaseDate: '2025-11-14' , theme: 'MCU', source: 'Season 5 Battlepass', skinType: 'MCU' },
        { name: 'ODINFORCE ULTRON', rarity: 'epic', category: 'shop', releaseDate: '2026-03-20' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Wasteland Robot', rarity: 'epic', category: 'other', releaseDate: '2025-09-12' , theme: 'Wastelanders', source: 'Event', skinType: 'Original' },
        { name: 'X-Tron', rarity: 'epic', category: 'shop', releaseDate: '2025-05-30' , source: 'Store', skinType: 'Original' },
        { name: 'Golden Ultron', rarity: 'rare', category: 'other', releaseDate: '2025-05-30' , source: 'Season 2.5 Ranked Rewards', skinType: 'Recolor' },
        { name: 'Mechanical Phantom', rarity: 'rare', category: 'shop', releaseDate: '2025-05-30' , source: 'Store', skinType: 'Recolor' },
        { name: 'WILL OF GALACTA', rarity: 'rare', category: 'other', releaseDate: '2026-02-13' , theme: 'Galacta', source: 'Twitch Drops', skinType: 'Recolor' },
    ],

    'venom': [
        { name: 'Gummy Surprise', rarity: 'legendary', category: 'shop', releaseDate: '2025-11-28' , theme: 'RIVALS\' DAY 2025', source: 'Shop', skinType: 'Original' },
        { name: 'REBORN KING IN BLACK', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-08-21'  , theme: 'Abyssal Flame', source: 'Season 3.5 2nd Event Pass', skinType: 'Original' },
        { name: 'Snow Symbiote', rarity: 'legendary', category: 'shop', releaseDate: '2024-12-27' , theme: 'Winter Holiday', source: 'Store (Expired)', skinType: 'Original' },
        { name: 'SPACE CORSAIR', rarity: 'legendary', category: 'battlepass', releaseDate: '2026-01-16' , theme: 'NEW MARAUDERS', source: 'Season 6 Battlepass', skinType: 'Original' },
        { name: 'LINGERING IMPRINT', rarity: 'epic', category: 'shop', releaseDate: '2025-03-07' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'MARVEL COSMIC INVASION', rarity: 'epic', category: 'shop', releaseDate: '2026-01-16' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Pink Bubble', rarity: 'epic', category: 'shop', releaseDate: '2025-06-19' , source: 'Event (added to Store)', skinType: 'Recolor' },
        { name: 'Space Knight', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'WAR OF THE REALMS', rarity: 'epic', category: 'shop', releaseDate: '2026-05-08' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'ANTI-VENOM', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'CYAN CLASH', rarity: 'rare', category: 'other', releaseDate: '2024-12-06' , source: 'Pre-Release Beta', skinType: 'Recolor' },
        { name: 'Hyper Orange', rarity: 'rare', category: 'shop', releaseDate: '2025-03-28' , source: 'Event (added to Store)', skinType: 'Recolor' },
    ],

    'white-fox': [
        { name: 'YOON JI-WOO: THE LEADER', rarity: 'epic', category: 'shop', releaseDate: '2026-03-20' , theme: 'ESU COLLEGE LIFE', source: 'Store', skinType: 'Comic / Game' },
        { name: 'ROSY RECON', rarity: 'rare', category: 'shop', releaseDate: '2026-03-20' , source: 'Store', skinType: 'Recolor' },
        { name: 'SECRET AGENT', rarity: 'rare', category: 'other', releaseDate: '2026-03-20' , source: 'Season 7 Ranked Rewards', skinType: 'Recolor' },
    ],

    'winter-soldier': [
        { name: 'Polarity Soldier', rarity: 'legendary', category: 'shop', releaseDate: '2025-08-15' , theme: 'Abyssal Flame', source: 'Store', skinType: 'Original' },
        { name: 'STARLIT GUNSLINGER', rarity: 'legendary', category: 'shop', releaseDate: '2026-05-08' , theme: 'SPACE OUTLAWS', source: 'Store', skinType: 'Original' },
        { name: 'Blood Soldier', rarity: 'epic', category: 'shop', releaseDate: '2025-01-31' , theme: 'Gothic Return', source: 'Store', skinType: 'Original' },
        { name: 'Revolution', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'Thunderbolts*', rarity: 'epic', category: 'shop', releaseDate: '2025-05-02' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'WINTER BUCKAROO', rarity: 'epic', category: 'battlepass', releaseDate: '2025-12-18' , theme: 'WINTER HOLIDAY 2025', source: 'Season 5.5 2nd Event Pass', skinType: 'Original' },
        { name: 'Bucky', rarity: 'rare', category: 'battlepass', releaseDate: '2026-01-16' , theme: 'YEAR ONE', source: 'Season 6 Battlepass', skinType: 'Comic / Game' },
        { name: 'Navy Trooper', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
        { name: 'Winter\'s Veil', rarity: 'rare', category: 'battlepass', releaseDate: '2025-09-12' , source: 'Season 4 Battle Pass', skinType: 'Recolor' },
    ],

    'wolverine': [
        { name: 'Blood Berserker', rarity: 'legendary', category: 'battlepass', releaseDate: '2025-01-10' , theme: 'Gothic Return', source: 'Season 1 Battlepass', skinType: 'Original' },
        { name: 'Deadpool & Wolverine', rarity: 'epic', category: 'shop', releaseDate: '2024-12-06' , theme: 'MCU', source: 'Store', skinType: 'MCU' },
        { name: 'DOG BROTHER X', rarity: 'epic', category: 'shop', releaseDate: '2025-11-07' , theme: 'Immortal Weapon', source: 'Store', skinType: 'Original' },
        { name: 'Patch', rarity: 'epic', category: 'shop', releaseDate: '2025-05-02' , theme: 'Hellfire Gala 2025', source: 'Event (added to Store)', skinType: 'Comic / Game' },
        { name: 'Weapon PhoeniX', rarity: 'epic', category: 'battlepass', releaseDate: '2025-07-11' , theme: 'Phoenix Force', source: 'Season 3 Battlepass', skinType: 'Comic / Game' },
        { name: 'Weapon X', rarity: 'epic', category: 'shop', releaseDate: '2025-06-06' , source: 'Store', skinType: 'Comic / Game' },
        { name: 'WINTER SOLDIER', rarity: 'epic', category: 'battlepass', releaseDate: '2026-01-16' , source: 'Season 6 Battlepass', skinType: 'Comic / Game' },
        { name: 'Lone Wolf', rarity: 'rare', category: 'shop', releaseDate: '2024-12-06' , source: 'Store', skinType: 'Recolor' },
    ],

};

export const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
export const skinSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/, '');

export function getCostumeRarity(heroId: string, costumeApiName: string): CostumeRarity | undefined {
    const hero = HERO_COSMETICS[heroId];
    if (!hero) return undefined;
    const target = normalize(costumeApiName);
    const match = hero.find(c => normalize(c.name) === target);
    return match?.rarity;
}
