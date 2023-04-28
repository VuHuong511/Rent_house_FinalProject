import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

const useEffectCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCollection = () => {
    setLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allData);
        setData(allData);
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getCollection();
  }, []);
  return { data, loading };
};
export default useEffectCollection;
