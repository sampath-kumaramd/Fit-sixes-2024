import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  type DocumentData,
} from '@firebase/firestore';
import { db } from '@/lib/firebase';
import type { MatchData } from '@/types/match.type';

export function useMatches() {
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const matchesQuery = query(
      collection(db, 'matches'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      matchesQuery,
      (snapshot) => {
        const matchesData = snapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<MatchData, 'id'>),
          id: doc.id,
        })) as MatchData[];
        setMatches(matchesData);
        setLoading(false);
      },
      (err) => {
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { matches, loading, error };
}
