import type { WatchHandle } from "vue";

const state: Record<string, Ref<any>> = {};
const watchers: Record<string, WatchHandle> = {};

export function useLocalStorage<T>(key: string, defaultValue: T) {
    // const state = ref(defaultValue) as Ref<T>

    if (!import.meta.client) {
        return ref(defaultValue) as Ref<T>;
    }

    if (!state[key]) {
        const saved = localStorage.getItem(key)
        if (saved)
            state[key] = ref(JSON.parse(saved))
        else
            state[key] = ref(defaultValue);
    }

    watchers[key]?.stop();
    watchers[key] = watch(state[key], (val) => {
        localStorage.setItem(key, JSON.stringify(extractRawValue(val)))
    }, { deep: true })

    return state[key] as Ref<T>;
}

export function resetLocalStorageCache() {
    Object.entries(state).forEach(([key, _ref]) => {
        const saved = localStorage.getItem(key)
        if (saved)
            state[key]!.value = JSON.parse(saved);

        // if it wasn't saved, it means the default value was never modified,
        // ergo we don't need to do anything
    });
}

export function changeLocalStorageKey(currentKey: string, newKey: string) {
    if (!state[currentKey])
        return false;

    watchers[currentKey]?.stop();
    delete watchers[currentKey];

    const currentRef = state[currentKey];
    delete state[currentKey];

    state[newKey] = currentRef;
    
    localStorage.removeItem(currentKey);
    localStorage.setItem(newKey, JSON.stringify(extractRawValue(currentRef)));

    watchers[newKey] = watch(state[newKey], (val) => {
        localStorage.setItem(newKey, JSON.stringify(extractRawValue(val)))
    }, { deep: true })
}

export function deleteFromLocalStorage(key: string) {
    delete state[key];
    watchers[key]?.stop();
    delete watchers[key];

    localStorage.removeItem(key);
}