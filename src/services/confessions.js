import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

const COLLECTION = 'confessions'
const MAX_CONFESSIONS = 50

export function subscribeConfessions(callback) {
  const q = query(
    collection(db, COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(MAX_CONFESSIONS),
  )

  return onSnapshot(q, (snapshot) => {
    const confessions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(confessions)
  })
}

export async function addConfession(text, color, rotation) {
  await addDoc(collection(db, COLLECTION), {
    text,
    color,
    rotation,
    createdAt: serverTimestamp(),
  })
}
