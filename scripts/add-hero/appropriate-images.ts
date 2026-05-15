import 'dotenv/config'
import { log } from "@clack/prompts";
import fs from "fs"
import path from "path";
import sharp from "sharp";

/**
 * From pak: pakchunkHQ-Windows.utoc
 * To export root directories:
 * - HeroDetail/
 * - HeroGallery_V3/
 * - HeroLogo/
 * - HeroPortrait/
 * - Item/
 * - Mastery/
 * - Show/
 */

const FILES = {
    'fantastic-nameplate': 'Item/Nameplate/item_nameplate_3%HERO_ID%002',
    'uncanny-nameplate': 'Item/Nameplate/item_nameplate_3%HERO_ID%003',
    'amazing-nameplate': 'Item/Nameplate/item_nameplate_3%HERO_ID%004',
    'immortal-nameplate': 'Item/Nameplate/item_nameplate_3%HERO_ID%005',

    'bust': 'HeroPortrait/SelectHero/img_selecthero_%HERO_ID%001',
    'bust-champion': 'Mastery/Common/%HERO_ID%/fb_mastery2%HERO_ID%020',
    'bust-lord': 'HeroPortrait/TransverseHeroHead/Proficiency/img_commontransverse_2%HERO_ID%020_avatar',
    'head': 'HeroPortrait/SquareHeroHead/img_squarehead_%HERO_ID%0010_avatar',
    'head-lord': 'HeroPortrait/SquareHeroHead/Proficiency/img_squarehead_2%HERO_ID%020_avatar',

    'ko-1': 'Item/Kill/item_kill_2%HERO_ID%12',
    'ko-2': 'Item/Kill/item_kill_2%HERO_ID%13',

    'logo': 'HeroLogo/img_herologo_%HERO_ID%_logo',
    'portrait': 'Show/Skin/OriginalSkin/img_heroportrait_%HERO_ID%0010_portrait',
    'prestige': 'HeroGallery_V3/HeroDetail/Prestige/HeroPrestige/img_prestige_%HERO_ID%0010_hero',
    'silhouette': 'HeroDetail/img_herogallery_silhouette_%HERO_ID%_bg',
    'spray': 'Show/Spray/img_spray_4%HERO_ID%002'
};

/**
 * With FModel: Path/to/FModel/Output/Exports/Marvel/Content/Marvel/UI/Textures
 * PAK path: Marvel/Content/Marvel/UI/Textures
 */
const GAME_FILES_DIRECTORY = process.env.GAME_FILES_DIRECTORY!;

/**
 * Copies and converts all necessary images to the hero's own folder
 * @param internalId Marvel Game ID (e.g.: 1031)
 * @param heroId kebab-case id of hero
 */
export async function copyImages(internalId: string, heroId: string, logger: typeof log) {
    const heroDir = `./public/img/heroes/data/${heroId}/`;
    if (!fs.existsSync(heroDir))
        fs.mkdirSync(heroDir)

    for (const [result, resourcePathAny] of Object.entries(FILES)) {
        const resourcePath = resourcePathAny.replaceAll('%HERO_ID%', internalId);
        const resourceFullPath = path.join(GAME_FILES_DIRECTORY, resourcePath) + '.png';

        if (!fs.existsSync(resourceFullPath)) {
            logger.error(`Couldn\'t find resource [${resourcePath}], skipping.`);
            continue;
        }

        // cut portrait above the knees
        if (result == 'portrait') {
            await sharp(resourceFullPath)
                .extract({ left: 201, top: 41, width: 295, height: 556 })
                .webp({ quality: 85 })
                .toFile(path.join(heroDir, result) + '.webp')
        }
        else {
            await sharp(resourceFullPath)
                .webp({ quality: 85 })
                .toFile(path.join(heroDir, result) + '.webp')
        }
    }
}