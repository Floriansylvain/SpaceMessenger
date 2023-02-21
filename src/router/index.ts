import { createRouter, createWebHistory } from 'vue-router'
import GroupSelection from '@/views/GroupSelection.vue'
import { doc, getDoc } from "firebase/firestore"
import { db } from '@/utils/firestore'
import { useSessionStore } from '@/stores/useSessionStore'

async function isGroupOk(id: string): Promise<boolean> {
	const docSnap = await getDoc(doc(db, "groups", id))
	return docSnap.exists()
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: GroupSelection
		},
		{
			path: '/group/:groupId',
			name: 'Group',
			component: () => import('@/views/Chat.vue'),
			beforeEnter: async (to, from) => {
				const sessionStore = useSessionStore()
				const userAllowed = await isGroupOk(to.params.groupId as string)
				if (!userAllowed) return '/'
				sessionStore.groupId = to.params.groupId as string
			}
		},
	]
})

export default router
