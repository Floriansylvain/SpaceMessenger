import { createRouter, createWebHistory } from 'vue-router'
import GroupSelection from '@/views/GroupSelection.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: GroupSelection
		},
		{
			path: '/group',
			name: 'Group',
			component: GroupSelection,
			// beforeEnter: (to, from) => {
			// 	return '/'
			// }
		},
	]
})

export default router
