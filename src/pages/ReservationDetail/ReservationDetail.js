import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../hooks/useFetchDocument";

const ReservationDetail = () => {
  const [rooms, setRooms] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("reservation", id);
  useEffect(() => {
    setRooms(document);
  }, [document]);
  return (
    <section>
      <div className="table">
        <button>
          <Link className="text-white" to="/reservation-history">
            &larr;Back To Orders
          </Link>
        </button>
        <h1 className="text-3xl text-center mt-6 font-bold">
          Reservation Details
        </h1>
        <br />
        {rooms === null ? (
          <img src="" alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b style={{ marginRight: 5 }}>Order ID: </b>
              {id}
            </p>
            <p>
              <b>Order Amount: </b> ${rooms.reservationAmount}
            </p>
            <p>
              <b>Order Status: </b> {rooms.reservationStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Room</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.wishListItems.map((wishList, index) => {
                  const {
                    id,
                    name,
                    regularPrice,
                    discountedPrice,
                    imgUrls,
                    address,
                  } = wishList;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <b>{name}</b>
                      </td>
                      <td>
                        <img
                          src={imgUrls}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{regularPrice - discountedPrice}</td>
                      <td>{address}</td>
                      <td className="icons">
                        <Link to={`/review-room/${id}`}>
                          <button className="--btn --btn-primary">
                            Review Room
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default ReservationDetail;
