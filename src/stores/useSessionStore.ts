import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useSessionStore = defineStore('session', () => {
    const groupId: Ref<string | undefined> = ref(undefined)
    const nickname: Ref<string | undefined> = ref(undefined)

    return { groupId, nickname }
})