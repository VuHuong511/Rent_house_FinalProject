import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  STORE_RESERVATION,
  selectReservationHistory,
} from "../../redux/slice/reservationSlice";
import useFetchDocument from "../../hooks/useFetchDocument";

const MyReservationDetail = () => {
  const [reservation, setReservation] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("reservation", id);

  useEffect(() => {
    setReservation(document);
  }, [document]);
  console.log(reservation);

  return (
    <>
      <div className="table">
        <h2>Order Details</h2>
        <div>
          <Link to="/my-reservation"> Back To Orders</Link>
        </div>
        <br />
        {reservation === null ? (
          <img src="" alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>{/* <b>Reservation ID</b> {reservation.id} */}</p>
            <p>
              <b>Reservation Amount</b> ${reservation.reservationAmount}
            </p>
            <p>
              <b>Reservation Status</b> {reservation.reservationStatus}
            </p>
            <p>
              <b>Billing Address</b>
              <br />
              Name: {reservation.billingAddress.name},
              <br />
              Email: {reservation.billingAddress.email}
              <br />
              Address: {reservation.billingAddress.address}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Room</th>
                  <th>Price</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {reservation.wishListItems.map((wishList, index) => {
                  const {
                    id,
                    name,
                    imgUrls,
                    regularPrice,
                    discountedPrice,
                    address,
                  } = wishList;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>{name}</td>
                      <td>
                        <img
                          src={imgUrls}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{regularPrice - discountedPrice}</td>
                      <td>{address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default MyReservationDetail;
