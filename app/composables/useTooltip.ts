import type { TextureKey } from "~/assets/data/textures";
import type { TexProps } from "~/directives/tooltip";

interface TooltipData {
    element: HTMLElement,
    text: string
    icon?: TextureKey|TexProps
    x?: number
    y?: number
}

const tooltipHistory = ref<TooltipData[]>([]);
const tooltip = ref<TooltipData | null>(null);

export function useTooltip() {
    function show(text: string, element: HTMLElement, icon?: TextureKey|TexProps, x?: number, y?: number) {
        const tooltipData = { element, text, icon, x, y };
        tooltip.value = tooltipData;

        // prevent resetting causing duplicate entries
        if (element != tooltip.value?.element)
            tooltipHistory.value.push(tooltipData);
    }

    function hide(element: HTMLElement) {
        if (tooltip.value?.element != element)
            return;

        tooltipHistory.value.splice(tooltipHistory.value.findIndex(tt => tt.element == element), 1);

        // try to restore previous tooltip
        tooltip.value = tooltipHistory.value.at(-1) ?? null;
    }

    return { tooltip, show, hide };
}