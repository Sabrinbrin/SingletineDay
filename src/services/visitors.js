import { doc, getDoc, increment, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const DOC_REF = doc(db, 'meta', 'visitors')

export async function recordVisit() {
  // Only count once per browser session
  if (sessionStorage.getItem('singletine-visited')) {
    const snap = await getDoc(DOC_REF)
    return snap.exists() ? snap.data().count : 0
  }

  sessionStorage.setItem('singletine-visited', '1')

  try {
    await updateDoc(DOC_REF, { count: increment(1) })
  } catch {
    // Document doesn't exist yet — create it
    await setDoc(DOC_REF, { count: 1 })
  }

  const snap = await getDoc(DOC_REF)
  return snap.exists() ? snap.data().count : 1
}
