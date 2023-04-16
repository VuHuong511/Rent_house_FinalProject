import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

const ChangeReservationStatus = ({ reservation, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log(reservation);

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
      navigate("/deposit-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="status">
        <card className="card">
          <h4>Update Status</h4>
          <form onSubmit={(e) => editReservation(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose one --
                </option>
                <option value="Reserved">Reserved</option>
                <option value="Rented">Rented</option>
                <option value="Check out">Checked out</option>
              </select>
            </span>
            <span>
              <button>Update Status</button>
            </span>
          </form>
        </card>
      </div>
    </>
  );
};

export default ChangeReservationStatus;
