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
	<div>
		<h1>Space Messenger</h1>
		<button @click="() => createGroup()" class="button-primary">
			create a group
		</button>
	</div>
</template>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 32px;

	min-height: 100vh;
	padding: 16px;

	color: var(--color-secondary);
}

div button {
	width: 100%;
	max-width: 250px;
}
</style>
