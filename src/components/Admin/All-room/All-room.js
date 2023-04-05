import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { toast } from "react-toastify";
import "./All-room.css";
import { useDispatch } from "react-redux";

function All_room() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getRoom = () => {
    setLoading(true);
    try {
      const roomRef = collection(db, "listings");
      const q = query(roomRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        const allRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allRooms);
        setListing(allRooms);
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getRoom();
  });
  return <div></div>;
}

export default All_room;
