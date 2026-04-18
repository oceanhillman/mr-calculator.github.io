export interface Texture {
    /**
     * The default sprite for this icon
     */
    default: string,
    hover?: string,
    active?: string
}

export const TEX = {
    logo: {
        default: '../icons/logo.png'
    } as Texture,

    scrollbar: {
        default: 'ui/scrollbar.png'
    } as Texture,
    squareButton: {
        default: 'ui/square-button.png',
        hover: 'ui/square-button-hover.png'
    } as Texture,
    infoButton: {
        default: 'ui/info-button.png',
        hover: 'ui/info-button-hover.png'
    } as Texture,
    button: {
        default: 'ui/button.png',
        hover: 'ui/button-hover.png'
    } as Texture,
    buttonWhite: {
        default: 'ui/button-white.png',
        hover: 'ui/button-white-hover.png'
    } as Texture,
    userCog: {
        default: 'ui/user-cog.png',
        hover: 'ui/user-cog-hover.png',
    } as Texture,
    favouriteCorner: {
        default: 'ui/favourite-corner.png',
    } as Texture,
    checkCorner: {
        default: 'ui/check-corner.png',
    } as Texture,
    checkbox: {
        default: 'ui/checkbox.png',
        hover: 'ui/checkbox-hover.png',
    } as Texture,
    checkboxCheck: {
        default: 'ui/checkbox-check.png'
    } as Texture,
    check: {
        default: 'ui/check.png'
    } as Texture,
    checkBlue: {
        default: 'ui/check-blue.png'
    } as Texture,
    cross: {
        default: 'ui/cross.png'
    } as Texture,
    crossBlue: {
        default: 'ui/cross-blue.png'
    } as Texture,
    panelTabSeparator: {
        default: 'ui/panel-tab-separator.png'
    } as Texture,
    separatorLinesLeft: {
        default: 'ui/separator-lines-left.svg'
    } as Texture,
    separatorLinesRight: {
        default: 'ui/separator-lines-right.svg'
    } as Texture,

    cornerDecoLeftBottom: {
        default: 'ui/corner-deco-left-bottom.png',
    } as Texture,
    cornerDecoLeftTop: {
        default: 'ui/corner-deco-left-top.png',
    } as Texture,
    cornerDecoRightBottom: {
        default: 'ui/corner-deco-right-bottom.png',
    } as Texture,
    cornerDecoRightTop: {
        default: 'ui/corner-deco-right-top.png',
    } as Texture,

    borderTop: {
        default: 'ui/border-top.png',
    } as Texture,
    borderBottom: {
        default: 'ui/border-bottom.png',
    } as Texture,

    top500Element: {
        default: 'ui/top500-element.png',
        hover: 'ui/top500-element-hover.png'
    } as Texture,

    tab: {
        default: 'ui/tab.png',
        active: 'ui/tab-active.png'
    } as Texture,
    leftTriangle: {
        default: 'ui/left-triangle.webp'
    } as Texture,
    rightTriangle: {
        default: 'ui/right-triangle.webp'
    } as Texture,


    cog: {
        default: 'icon/cog.png',
    } as Texture,
    chart: {
        default: 'icon/chart.png',
    } as Texture,
    calculator: {
        default: 'icon/calculator.png'
    } as Texture,
    swap: {
        default: 'icon/swap.png'
    } as Texture,
    chevronLeft: {
        default: 'icon/chevron-left.png'
    } as Texture,
    chevronRight: {
        default: 'icon/chevron-right.png'
    } as Texture,
    chevronDown: {
        default: 'icon/chevron-down.png'
    } as Texture,
    chevronUp: {
        default: 'icon/chevron-up.png'
    } as Texture,
    arrowLeft: {
        default: 'icon/arrow-left.png'
    } as Texture,
    arrowRight: {
        default: 'icon/arrow-right.png'
    } as Texture,
    close: {
        default: 'icon/close.png'
    } as Texture,
    edit: {
        default: 'icon/edit.png'
    } as Texture,
    time: {
        default: 'icon/time.png'
    } as Texture,
    timeArcade: {
        default: 'icon/time-arcade.png'
    } as Texture,
    gameTime: {
        default: 'icon/game-time.png'
    } as Texture,
    mouseScrollUp: {
        default: 'icon/mouse-scroll-up.png'
    } as Texture,
    mouse: {
        default: 'icon/mouse.png'
    } as Texture,
    mouseLeft: {
        default: 'icon/mouse-left.png'
    } as Texture,
    mouseRight: {
        default: 'icon/mouse-right.png'
    } as Texture,
    mouseScroll: {
        default: 'icon/mouse-scroll.png'
    } as Texture,
    mouseScrollClick: {
        default: 'icon/mouse-scroll-click.png'
    } as Texture,
    mouseScrollDown: {
        default: 'icon/mouse-scroll-down.png'
    } as Texture,
    mouseDrag: {
        default: 'icon/mouse-drag.png'
    } as Texture,
    hamburger: {
        default: 'icon/hamburger.png'
    } as Texture,
    gift: {
        default: 'icon/gift.png',
    } as Texture,
    giftGold: {
        default: 'icon/gift-gold.png',
    } as Texture,
    proficiency: {
        default: 'icon/proficiency.png',
        hover: 'icon/proficiency-hover.png',
    } as Texture,
    missionInfinity: {
        default: 'icon/mission-infinity.png',
    } as Texture,
    missionRepeat: {
        default: 'icon/mission-repeat.png',
    } as Texture,
    dropdownCaret: {
        default: 'icon/dropdown-caret.png'
    } as Texture,
    dropdownCheck: {
        default: 'icon/check.png'
    } as Texture,
    favourite: {
        default: 'icon/favourite.png',
        hover: 'icon/favourite-hover.png'
    } as Texture,
    redDot: {
        default: 'icon/red-dot.png'
    } as Texture,
    redDotExcl: {
        default: 'icon/red-dot-excl.png'
    } as Texture,
    minus: {
        default: 'icon/minus.png',
    } as Texture,
    plus: {
        default: 'icon/plus.png',
    } as Texture,
    none: {
        default: 'icon/none.png',
    } as Texture,
    search: {
        default: 'icon/search.png',
    } as Texture,
    target: {
        default: 'icon/target.png',
    } as Texture,
    reset: {
        default: 'icon/reset.png'
    } as Texture,
    competitiveIcon: {
        default: 'icon/competitive.png'
    } as Texture,
    quickMatchIcon: {
        default: 'icon/quick-match.png'
    } as Texture,
    arcadeIcon: {
        default: 'icon/arcade.png'
    } as Texture,
    chain: {
        default: 'icon/chain.png'
    } as Texture,
    chainBroken: {
        default: 'icon/chain-broken.png'
    } as Texture,
    link: {
        default: 'icon/link.png'
    } as Texture,
    unknownHero: {
        default: 'icon/unknown-hero.png'
    } as Texture,
    warning: {
        default: 'icon/warning.png'
    } as Texture,
    delete: {
        default: 'icon/delete.png'
    } as Texture,
    star: {
        default: 'icon/star.png'
    } as Texture,
    levelUp: {
        default: 'icon/level-up.png'
    } as Texture,
    copy: {
        default: 'icon/copy.png'
    } as Texture,
    allHeroesIcon: {
        default: 'icon/all-heroes.png'
    } as Texture,
    download: {
        default: 'icon/download.png'
    } as Texture,
    upload: {
        default: 'icon/upload.png'
    } as Texture,

    whiteBackground: {
        default: 'bg/white.webp'
    } as Texture,
    darkBackground: {
        default: 'bg/dark.png'
    } as Texture,
    biColorBackground: {
        default: 'bg/bi-color-bg.webp'
    } as Texture,
    promotionalBackground: {
        default: 'bg/promotional-bg.webp',
    } as Texture,
    dropdownHover: {
        default: 'bg/dropdown-hover.png'
    } as Texture,
    popup: {
        default: 'bg/popup.png'
    } as Texture,
    heroCardBackground: {
        default: 'bg/hero-card-bg.webp',
        hover: 'bg/hero-card-hover.webp'
    } as Texture,
    heroCardFeatured: {
        default: 'bg/hero-featured-card.webp',
        hover: 'bg/hero-featured-card-hover.webp',
    } as Texture,
    heroCardBorder: {
        default: 'bg/hero-card-border.png'
    } as Texture,
    notification: {
        default: 'bg/notification.png'
    } as Texture,
    popupGoldUpRight: {
        default: 'bg/popup-gold-up-right.png'
    } as Texture,
    popupGoldDownLeft: {
        default: 'bg/popup-gold-down-left.png'
    } as Texture,
    popupGoldDownRight: {
        default: 'bg/popup-gold-down-right.png'
    } as Texture,
    popupGoldUpLeft: {
        default: 'bg/popup-gold-up-left.png'
    } as Texture,
    popupGoldLeft: {
        default: 'bg/popup-gold-left.png'
    } as Texture,
    popupGoldRight: {
        default: 'bg/popup-gold-right.png'
    } as Texture,
    barBackground: {
        default: 'bg/bar-bg.webp'
    } as Texture,
    heroProficiencyLevel: {
        default: 'bg/hero-proficiency-level.png'
    } as Texture,
    levelBackground: {
        default: 'bg/level-bg.png'
    } as Texture,
    levelGoldBackground: {
        default: 'bg/level-gold-bg.png'
    } as Texture,
    panelTabsBackground: {
        default: 'bg/panel-tabs-bg.png'
    } as Texture,
    modalBackground: {
        default: 'bg/modal-bg.png'
    } as Texture,
    itemBackground: {
        default: 'bg/item-bg.png'
    } as Texture,
    allHeroes: {
        default: 'bg/all-heroes.png'
    } as Texture,
    heroSelectFrameGold: {
        default: 'bg/hero-select-frame-gold.png'
    } as Texture,
    heroSelectFrameLeftGold: {
        default: 'bg/hero-select-frame-left-gold.png'
    } as Texture,
    heroSelectFrameRightGold: {
        default: 'bg/hero-select-frame-right-gold.png'
    } as Texture,

    promotionalBackgroundMask: {
        default: 'mask/promotional-bg-mask.png',
    } as Texture,
    barBackgroundMask: {
        default: 'mask/bar-bg-mask.webp'
    } as Texture,
    heroCardMask: {
        default: 'mask/hero-card-mask.png'
    } as Texture,
    heroFeaturedMask: {
        default: 'mask/hero-featured-card-mask.png'
    } as Texture,
    heroPrestigeMask: {
        default: 'mask/hero-prestige.webp'
    } as Texture,
    prestigeBackgroundMask: {
        default: 'mask/prestige-bg.webp'
    } as Texture,
    prestigeLeftMask: {
        default: 'mask/prestige-left.png'
    } as Texture,
    prestigeRightMask: {
        default: 'mask/prestige-right.png'
    } as Texture,
    heroSelectMask: {
        default: 'mask/hero-select-mask.png'
    } as Texture,
    lordGridHeroMask: {
        default: 'mask/lord-grid-hero-mask.png'
    } as Texture,
    ctaMask: {
        default: 'mask/cta-mask.webp'
    } as Texture,



    // LANDING
    promoHeroBackground: {
        default: 'promo/hero.webp'
    } as Texture,
    promoSeparator: {
        default: 'promo/separator.webp'
    } as Texture,
    promoSeparatorFlip: {
        default: 'promo/separator-flip.webp'
    } as Texture,
    promoQuestionBg: {
        default: 'promo/question-bg.webp'
    } as Texture,
    promoFooterBg: {
        default: 'promo/footer.webp'
    } as Texture,
    promoFooterBgMobile: {
        default: 'promo/footer-bg-mobile.webp'
    } as Texture,
    promoCtaTextTexture: {
        default: 'promo/cta-text-texture.png'
    } as Texture,
    promoCtaTextTextureDark: {
        default: 'promo/cta-text-texture-dark.png'
    } as Texture,
    promoGraphBar: {
        default: 'promo/graph-bar.png'
    } as Texture,
    promoSprayMask: {
        default: 'promo/spray-mask.webp'
    } as Texture,
    promoTriangleOverlay: {
        default: 'promo/triangle-overlay.png'
    } as Texture,
    promoTriangleMask: {
        default: 'promo/triangle-mask.png'
    } as Texture,
    promoYellowLine: {
        default: 'promo/yellow-line.png'
    } as Texture,
    promoHeroDetailsBg: {
        default: 'promo/hero-details-bg.png'
    } as Texture,
    promoHeroNameplate: {
        default: 'promo/hero-nameplate.png'
    } as Texture,
    promoFeaturedBar: {
        default: 'promo/featured-bar.png',
        active: 'promo/featured-bar-active.png'
    } as Texture


} satisfies  Record<string, Texture>;

export type TextureKey = keyof typeof TEX;

export function tex(textureKey: TextureKey, state: keyof Texture = 'default') {
    return '/img/tex/' + (TEX[textureKey][state] ?? TEX[textureKey].default);
}
export function texUrl(textureKey: TextureKey, state: keyof Texture = 'default') {
    return `url('${tex(textureKey, state)}')`;
}

const texAsCssVars: Record<string, string> = {};
Object.entries(TEX).forEach(([key, tex]) => {
    texAsCssVars[`--tex-${key}`] = `url('/img/tex/${tex.default}\')`;

    if (tex.hover)
        texAsCssVars[`--tex-${key}-hover`] = `url('/img/tex/${tex.hover}\')`;
    if (tex.active)
        texAsCssVars[`--tex-${key}-active`] = `url('/img/tex/${tex.active}\')`;
})

export const TEX_AS_CSS_VARS = texAsCssVars;

export function injectTexturesCss(manual = false) {
    let texAsCssVarsCss = ":root{";
    Object.entries(TEX_AS_CSS_VARS).forEach(([key, value]) => {
        texAsCssVarsCss += `${key}:${value};`;
    })
    texAsCssVarsCss += "}"

    if (manual) {
        const style = document.createElement('style');
        style.innerText = texAsCssVarsCss;
        document.head.appendChild(style)
    }
    else
        useHead({
            style: [{ innerHTML: texAsCssVarsCss }]
        })
}