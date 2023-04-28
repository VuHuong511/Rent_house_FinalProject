import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyReservation.css";
import { selectUserID } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useEffectCollection from "../../hooks/useFetchCollection";
import {
  STORE_RESERVATION,
  selectReservationHistory,
} from "../../redux/slice/reservationSlice";

export default function MyReservation() {
  const { data, isLoading } = useEffectCollection("reservation");
  const reservation = useSelector(selectReservationHistory);
  const userID = useSelector(selectUserID);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_RESERVATION(data));
  }, [dispatch, data]);
  console.log(data);
  const filtered = reservation.filter((reservation) =>
    reservation.wishListItems.some((item) => item.userRef === userID)
  );
  console.log(filtered);
  const handleClick = (id) => {
    navigate(`/my-reservation-details/${id}`);
  };
  return (
    <section>
      <div className="reservation"></div>
      <h2 class="mt-3 text-xl font-bold mb-4 w-max m-auto">My Reservations</h2>
      <br />
      <>
        {isLoading}
        <div className="table">
          {filtered.length === 0 ? (
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
                {filtered.map((reservation, index) => {
                  const {
                    id,
                    reservationDate,
                    reservationTime,
                    reservationAmount,
                    reservationStatus,
                  } = reservation;
                  return (
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>
                        {reservationDate} at {reservationTime}
                      </td>
                      <td>{id}</td>
                      <td>
                        {reservation.wishListItems.map((item, index) => (
                          <td key={index}>
                            {item.imgUrls.map((url, index) => (
                              <img
                                style={{ width: "100px" }}
                                src={url}
                                alt={`Item ${index}`}
                              />
                            ))}
                          </td>
                        ))}
                      </td>
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
}
