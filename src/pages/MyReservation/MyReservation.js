import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import ListingItem from "../../components/ListingItem/ListingItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./MyReservation.css";

export default function MyReservation() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservation() {
      const reservationRef = collection(db, "reservation");

      const q = query(
        reservationRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let reservation = [];
      querySnap.forEach((doc) => {
        return reservation.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setReservation(reservation);
      setLoading(false);
    }
    fetchReservation();
  }, [auth.currentUser.uid]);
  const handleClick = (id) => {
    navigate(`/my-reservation-details/${id}`);
  };
  console.log(reservation);

  return (
    <div className="max-w-6xl px-3 mt-6 mx-auto">
      {!loading && reservation.length > 0 && (
        <>
          <h1 className="text-2xl text-center font-semibold mb-6">
            My list room
          </h1>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>ID</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservation.map((r, index) => (
                <tr key={r.id} onClick={() => handleClick(r.id)}>
                  <td>{index + 1}</td>
                  <td>
                    {r.data.reservationDate} at {r.data.reservationTime}
                  </td>
                  <td>{r.id}</td>
                  <td>${r.data.reservationAmount}</td>
                  <td>
                    <p
                      className={
                        r.data.reservationStatus !== "Rented out"
                          ? "Pending"
                          : "Rented out"
                      }
                    >
                      {r.data.reservationStatus}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
