import { initializeApp } from "@firebase/app"
import { getFirestore } from "@firebase/firestore"
import firebaseConfig from "@/assets/firebase.api.json"

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
