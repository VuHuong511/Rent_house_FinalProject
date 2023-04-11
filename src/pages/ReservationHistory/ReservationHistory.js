import React, { useEffect } from "react";
import "./ReservationHistory.css";
import useEffectCollection from "../../hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_RESERVATION,
  selectReservationHistory,
} from "../../redux/slice/reservationSlice";
import { selectUserID } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
const ReservationHistory = () => {
  const { data, isLoading } = useEffectCollection("reservation");
  const reservation = useSelector(selectReservationHistory);
  const userID = useSelector(selectUserID);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_RESERVATION(data));
  }, [dispatch, data]);
  const handleClick = (id) => {
    navigate(`/reservation-details/${id}`);
  };
  return (
    <section>
      <div className="reservation"></div>
      <h2>Your Reservation History</h2>
      <br />
      <>
        {isLoading}
        <div className="table">
          {reservation.length === 0 ? (
            <p>No reservation found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reservation.map((reservation, index) => {
                  const {
                    id,
                    reservationDate,
                    reservationTime,
                    reservationAmount,
                    reservationStatus,
                    imgUrls,
                  } = reservation;
                  return (
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>
                        {reservationDate} at {reservationTime}
                      </td>
                      <td>{id}</td>
                      <td>{imgUrls}</td>
                      <td>
                        {"$"}
                        {reservationAmount}
                      </td>
                      <td>
                        <p
                          className={
                            reservationStatus !== "Rented out"
                              ? "Pending"
                              : "Rented out"
                          }
                        >
                          {reservationStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </>
    </section>
  );
};

export default ReservationHistory;
