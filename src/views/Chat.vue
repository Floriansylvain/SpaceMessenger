<script setup lang="ts">
import NicknameSelection from "@/components/nicknameSelection.vue"
import { useSessionStore } from "@/stores/useSessionStore"
import { db } from "@/utils/firestore"
import {
	addDoc,
	collection,
	FieldValue,
	onSnapshot,
	QuerySnapshot,
	serverTimestamp,
	type DocumentData,
} from "@firebase/firestore"
import { onMounted, ref, type Ref } from "vue"

const sessionStore = useSessionStore()
const messages: Ref<Array<DocumentData>> = ref([])

const currentMessage = ref("")
const lastUserMessageId = ref("")

const messagesPath = collection(db, "groups", sessionStore.groupId as string, "messages")

interface Message {
	author: string
	message: string
	timestamp: FieldValue
}

async function postMessage(): Promise<void> {
	const message: Message = {
		author: sessionStore.nickname as string,
		message: currentMessage.value,
		timestamp: serverTimestamp(),
	}

	const messageReference = await addDoc(messagesPath, message)
	lastUserMessageId.value = messageReference.id
}

function updateMessages(querSnap: QuerySnapshot<DocumentData>): void {
	messages.value = querSnap.docs.map((x) => x.data({ serverTimestamps: "estimate" }))

	messages.value = messages.value.sort((a, b) => {
		return a.timestamp.toDate() - b.timestamp.toDate()
	})
}

async function onFormSubmit() {
	await postMessage()
	currentMessage.value = ""
}

function getShareUrl() {
	return window.location.href
}

function getMessageClass(message: Message) {
	return message.author === sessionStore.nickname ? "author-message" : "message"
}

onMounted(() => {
	if (!sessionStore.groupId) return

	onSnapshot(messagesPath, updateMessages)
})
</script>

<template>
	<NicknameSelection v-if="!sessionStore.nickname"></NicknameSelection>

	<div class="container" v-else>
		<p>
			share the link: <a :href="getShareUrl()" target="_blank">{{ getShareUrl() }}</a>
		</p>

		<div class="messages">
			<template v-for="message of messages">
				<div :class="getMessageClass(message as Message)">
					<h3>{{ message.author }}</h3>
					<p>{{ message.message }}</p>
				</div>
			</template>
		</div>

		<form @submit.prevent="onFormSubmit">
			<input
				type="text"
				name="message"
				id="message"
				v-model="currentMessage"
				placeholder="Your message"
			/>
			<button type="submit" class="button-primary">Send</button>
		</form>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;

	height: 100vh;
	padding: 16px;
}

.container > p {
	color: var(--color-neutral-light);
	text-align: center;
}

.messages {
	display: flex;
	flex-direction: column;
	gap: 32px;

	padding: 16px 0;

	max-height: 100%;
	overflow: scroll;
}

.author-message,
.message {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.author-message p,
.message p {
	width: fit-content;
	padding: 16px;
	margin: 0;

	color: #fff;

	border: solid 2px var(--color-neutral-light);
	border-radius: 16px;
}

.author-message h3,
.message h3 {
	margin: 0 8px;

	font-size: 16px;
	font-stretch: semi-expanded;
	font-weight: 500;

	color: #fff;
}

form {
	display: flex;
	gap: 16px;
}

form > input {
	width: 100%;
}

.author-message h3,
.author-message {
	place-self: flex-end;
}

.author-message p {
	border: none;
	background-color: var(--color-neutral-light);
}
</style>
