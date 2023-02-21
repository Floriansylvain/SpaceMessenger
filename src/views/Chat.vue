<script setup lang="ts">
import NicknameSelection from "@/components/nicknameSelection.vue"
import { useSessionStore } from "@/stores/useSessionStore"
import { db } from "@/utils/firestore"
import {
	addDoc,
	collection,
	onSnapshot,
	QuerySnapshot,
	type DocumentData,
} from "@firebase/firestore"
import { onMounted, ref, type Ref } from "vue"

const sessionStore = useSessionStore()
const messages: Ref<Array<DocumentData>> = ref([])

const currentMessage = ref("")
const lastUserMessageId = ref("")

const messagesPath = collection(
	db,
	"groups",
	sessionStore.groupId as string,
	"messages"
)

interface Message {
	author: string
	message: string
}

async function postMessage(): Promise<void> {
	const message: Message = {
		author: sessionStore.nickname as string,
		message: currentMessage.value,
	}

	const messageReference = await addDoc(messagesPath, message)
	lastUserMessageId.value = messageReference.id
}

function updateMessages(querSnap: QuerySnapshot<DocumentData>): void {
	console.log(querSnap.docs) // TODO
}

onMounted(() => {
	if (!sessionStore.groupId) return

	onSnapshot(messagesPath, updateMessages)
})
</script>

<template>
	<NicknameSelection v-if="!sessionStore.nickname"></NicknameSelection>

	<template v-else>
		<div class="messages">
			<div>
				<h3>Author</h3>
				<p>Author's message</p>
			</div>
		</div>

		<form @submit.prevent="postMessage">
			<label for="message">Message</label>
			<input
				type="text"
				name="message"
				id="message"
				v-model="currentMessage"
			/>
			<button type="submit">Send</button>
		</form>
	</template>
</template>

<style scoped>
.messages > div {
	padding: 16px;
}

.messages > div h3,
.messages > div p {
	margin: 0;
}
</style>
