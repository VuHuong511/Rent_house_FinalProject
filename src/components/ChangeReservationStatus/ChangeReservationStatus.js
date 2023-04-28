import { Timestamp, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

const ChangeReservationStatus = ({ reservation, id }) => {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const editReservation = (e, id) => {
    e.preventDefault();
    const reservationConfig = {
      userID: reservation.userID,
      userName: reservation.userName,
      userEmail: reservation.userEmail,
      reservationDate: reservation.reservationDate,
      reservationTime: reservation.reservationTime,
      reservationAmount: reservation.reservationAmount,
      reservationStatus: status,
      wishListItems: reservation.wishListItems,
      billingAddress: reservation.billingAddress,
      timestamp: reservation.timestamp,
      editedAt: Timestamp.now().toDate(),
    };
    try {
      setDoc(doc(db, "reservation", id), reservationConfig);
      toast.success("Reservation status changes successfully");
      navigate("/my-reservation");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="status">
        <card className="card">
          <form onSubmit={(e) => editReservation(e, id)}>
            <span>
              <select
                style={{ width: "100%" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose one --
                </option>
                <option value="Rented">Rented</option>
                <option value="Check out">Checked out</option>
              </select>
            </span>
            <span className="ml-1">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Update
              </button>
            </span>
          </form>
        </card>
      </div>
    </>
  );
};

export default ChangeReservationStatus;
