import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Book } from '@/data/mockBooks';

export function useBooks(options: { 
  category?: string, 
  featured?: boolean,
  limitCount?: number 
} = {}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        let q = query(collection(db, 'books'));

        if (options.featured) {
          q = query(q, where('featured', '==', true));
        }
        
        if (options.category) {
          q = query(q, where('category', '==', options.category));
        }

        q = query(q, orderBy('createdAt', 'desc'));

        if (options.limitCount) {
          q = query(q, limit(options.limitCount));
        }

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Book[];

        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [options.category, options.featured, options.limitCount]);

  return { books, loading, error };
}
