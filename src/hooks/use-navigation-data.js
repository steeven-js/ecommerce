import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/utils/firebase';

export const useNavigationData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const categoriesSnap = await getDocs(categoriesRef);

        const navigationData = categoriesSnap.docs.map(doc => ({
          id: doc.id,
          title: doc.data().name,
          path: `/category/${doc.id}`,
          children: doc.data().subcategories?.map(sub => ({
            subheader: sub.name,
            items: sub.items?.map(item => ({
              title: item.name,
              path: `/category/${doc.id}/${item.slug}`
            })) || []
          })) || []
        }));

        setData(navigationData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationData();
  }, []);

  return { data, loading, error };
};
