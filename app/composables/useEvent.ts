type SpecialEventsKeys = 
 | 'mousewheel'
 | 'gesturestart'
 | 'gesturechange'
 | 'gestureend';

type EventMap = WindowEventMap & DocumentEventMap & HTMLElementEventMap;
type EventKey = keyof EventMap|SpecialEventsKeys;

export const useEvent = <K extends EventKey>(
    events: K|K[], 
    handler: (...args: any[]) => any,
    element?: HTMLElement|Document|Window,
    options?: boolean | AddEventListenerOptions | undefined
) : { remove: () => void, event: K|K[], handler: () => any, element?: HTMLElement|Document|Window } => 
{
    if (!element)
        element = window;

    const addEvents = () => {
        if (Array.isArray(events))
            events.forEach(e => element?.addEventListener(e, handler, options));
        else
            element?.addEventListener(events, handler, options);
    }
    const removeEvents = () => {
        if (Array.isArray(events))
            events.forEach(e => element?.removeEventListener(e, handler, options));
        else
            element?.removeEventListener(events, handler, options);
    }

    // if this runs outside a component/page instance, add directly
    // also add if registered after on mounted, keeping removing functionality
    const instance = getCurrentInstance();
    if (instance) {
        if (instance.isMounted && !instance.isUnmounted) {
            // already mounted, add immediately
            addEvents();
            onUnmounted(removeEvents);
        }
        else {
            onMounted(addEvents);
            onUnmounted(removeEvents);
        }
    }
    else
        addEvents();

    return {
        remove: removeEvents,
        event: events,
        handler,
        element
    }
}