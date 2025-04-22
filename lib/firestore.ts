// lib/firestore.ts
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth } from './firebase';
import type { PlanBoxData } from '../components/PlanBox/PlanBox';

// Firestore 인스턴스
const db = getFirestore();

/**
 * 지정된 날짜(date, 'YYYY-MM-DD')에 저장된 PlanBox 배열을 가져옵니다.
 * @param date - '2025-07-12' 형식의 날짜 문자열
 */
export async function loadPlanBoxesForDate(date: string): Promise<PlanBoxData[]> {
  const user = auth.currentUser;
  if (!user) return [];
  // 경로: timeBars/{userId}/bars/{date}
  const ref = doc(db, 'timeBars', user.uid, 'bars', date);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data().planBoxSlots as PlanBoxData[];
  }
  return [];
}

/**
 * 지정된 날짜(date, 'YYYY-MM-DD')에 PlanBox 배열을 저장합니다.
 * @param date - '2025-07-12' 형식의 날짜 문자열
 * @param boxes - 저장할 PlanBoxData 배열
 */
export async function savePlanBoxesForDate(
  date: string,
  boxes: PlanBoxData[]
): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('로그인이 필요합니다.');
  const ref = doc(db, 'timeBars', user.uid, 'bars', date);
  await setDoc(
    ref,
    {
      planBoxSlots: boxes,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}
