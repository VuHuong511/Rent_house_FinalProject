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
  const handleClick = (detailId) => {
    navigate(`/reservation-details/${detailId}`);
  };
  const filtered = reservation.filter(
    (reservation) => reservation.userID === userID
  );

  return (
    <section className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="reservation">
          {isLoading && <div className="spinner"></div>}
          <div className="table">
            {filtered.length === 0 ? (
              <p>No reservation found</p>
            ) : (
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">No.</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((reservation, index) => {
                    const {
                      id,
                      reservationDate,
                      reservationTime,
                      reservationAmount,
                      reservationStatus,
                    } = reservation;
                    return (
                      <tr
                        key={id}
                        onClick={() => handleClick(id)}
                        className="cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
                      >
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">
                          {reservationDate} at {reservationTime}
                        </td>
                        <td className="px-4 py-2">{id}</td>
                        <td className="px-4 py-2">
                          {"$"}
                          {reservationAmount}
                        </td>
                        <td className="px-4 py-2">
                          <p
                            className={`${
                              reservationStatus !== "Rented out"
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
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
        </div>
      </div>
    </section>
  );
};

export default ReservationHistory;
