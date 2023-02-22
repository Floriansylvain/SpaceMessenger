<script setup lang="ts">
import { useSessionStore } from "@/stores/useSessionStore"
import { db } from "@/utils/firestore"
import { collection, addDoc, type DocumentData } from "firebase/firestore"
import { useRouter } from "vue-router"

const router = useRouter()
const sessionStore = useSessionStore()

async function getGroup(): Promise<DocumentData | undefined> {
	try {
		return await addDoc(collection(db, "groups"), {})
	} catch (error) {
		console.error("Error adding document: ", error)
		return undefined
	}
}

async function createGroup() {
	const group = await getGroup()

	if (group?.id == undefined) return

	sessionStore.groupId = group.id
	router.push(`/group/${group.id}`)
}
</script>

<template>
	<h1>Space Messenger</h1>
	<button @click="() => createGroup()">create a group</button>
</template>

<style scoped></style>
