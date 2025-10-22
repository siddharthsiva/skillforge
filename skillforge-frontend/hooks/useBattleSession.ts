import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, set } from 'firebase/database';

export function useBattleSession(sessionId: string, userId: string) {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const sessionRef = ref(db, `battles/${sessionId}`);
    const unsubscribe = onValue(sessionRef, (snapshot) => {
      setState(snapshot.val());
    });
    return () => unsubscribe();
  }, [sessionId]);

  const submitAnswer = (answers: any) => {
    set(ref(db, `battles/${sessionId}/answers/${userId}`), answers);
  };

  return { state, submitAnswer };
}
