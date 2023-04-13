import React, { useEffect } from "react";
import useEffectCollection from "../../../hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_RESERVATION,
  selectReservationHistory,
} from "../../../redux/slice/reservationSlice";
import { useNavigate } from "react-router-dom";
const Reservation = () => {
  const { data, isLoading } = useEffectCollection("reservation");
  const reservation = useSelector(selectReservationHistory);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_RESERVATION(data));
  }, [dispatch, data]);
  const handleClick = (detailId) => {
    navigate(`/reservation-details/${detailId}`);
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
                    address,
                  } = reservation;
                  return (
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>
                        {reservationDate} at {reservationTime}
                      </td>
                      <td>{id}</td>
                      <td>${reservationAmount}</td>
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

export default Reservation;
