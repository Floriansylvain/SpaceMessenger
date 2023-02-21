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
	<h2>Group {{ sessionStore.groupId }}</h2>

	<form @submit.prevent="setNickname">
		<label for="nickname">Nickname</label>
		<input type="text" id="nickname" name="nickname" v-model="nickname" />
		<button type="submit">confirm</button>
	</form>
</template>

<style scoped></style>
