<script setup lang="ts">
import { initializeApp } from "firebase/app"

const firebaseConfig = {
	apiKey: "AIzaSyDVyP3WELYiQL8OBGFaLpCkZr8gA9cVu-4",
	authDomain: "spacemessenger-fsylvain.firebaseapp.com",
	projectId: "spacemessenger-fsylvain",
	storageBucket: "spacemessenger-fsylvain.appspot.com",
	messagingSenderId: "103202352459",
	appId: "1:103202352459:web:c41f6a1e35492bbd8e4cce"
}

const app = initializeApp(firebaseConfig)

</script>

<template>
	<h1>Space Messenger</h1>
	<button>create a group</button>
</template>

<style scoped>

</style>