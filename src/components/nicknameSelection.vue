<script setup lang="ts">
import { useSessionStore } from "@/stores/useSessionStore"
import { ref } from "vue"

const sessionStore = useSessionStore()
const nickname = ref("")

function setNickname() {
	sessionStore.nickname = nickname.value
}
</script>

<template>
	<div>
		<h2>
			Group <br />
			{{ sessionStore.groupId }}
		</h2>

		<form @submit.prevent="setNickname">
			<input
				type="text"
				id="nickname"
				name="nickname"
				v-model="nickname"
				placeholder="enter a nickname"
			/>
		</form>
	</div>
</template>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	min-height: 100vh;
}

div > h2 {
	text-align: center;
	color: var(--color-secondary);
}
</style>
