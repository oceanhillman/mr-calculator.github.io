import type { Directive } from 'vue'
import type { TextureKey } from '~/assets/data/textures';
import type Tex from '~/components/Tex.vue';

export type TexProps = InstanceType<typeof Tex>['$props'];
export interface TooltipBinding {
    text: string
    icon?: TextureKey|TexProps,
    bindToRect?: boolean
}

const stateMap = new WeakMap<HTMLElement, TooltipBinding>();

export const vTooltip: Directive<HTMLElement, TooltipBinding> = {
    mounted(el, binding) {
        if (!binding.value)
            return;

        stateMap.set(el, binding.value);

        const { tooltip, show, hide } = useTooltip();

        let scrollEventRemove: (() => void) | null = null;
        useEvent('mouseenter', _ => {
            const stateBinding = stateMap.get(el) || binding.value;

            if (stateBinding.bindToRect) {
                scrollEventRemove = useEvent('scroll', () => {
                    if (!tooltip.value)
                        return;

                    const rect = el.getBoundingClientRect();
                    tooltip.value.x = rect.left + rect.width / 2;
                    tooltip.value.y = rect.top;

                }).remove;

                const rect = el.getBoundingClientRect();
                show(stateBinding.text, el, stateBinding.icon, rect.left + rect.width / 2, rect.top);
            }
            else
                show(stateBinding.text, el, stateBinding.icon);
        }, el);

        useEvent('mouseleave', () => {
            scrollEventRemove?.();
            hide(el);
        }, el);
    },
    updated(el, binding) {
        stateMap.set(el, binding.value);

        const { tooltip } = useTooltip();
        // reset tooltip only if this is hovered
        if (tooltip.value?.element != el)
            return;

        const rect = el.getBoundingClientRect();

        if (binding.value.bindToRect) {
            tooltip.value.x = rect.left + rect.width;
            tooltip.value.y = rect.top;
        }

        tooltip.value.text = binding.value.text;
        tooltip.value.icon = binding.value.icon;
    },
    unmounted(el, binding) {
        stateMap.delete(el);

        if (!binding.value)
            return;

        const { hide } = useTooltip();

        hide(el);
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        vTooltip: Directive<HTMLElement, TooltipBinding>
    }
}