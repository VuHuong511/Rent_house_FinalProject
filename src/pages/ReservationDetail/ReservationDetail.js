import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectWishItems } from "../../redux/slice/wishListSlice";
import useFetchDocument from "../../hooks/useFetchDocument";
import { toast } from "react-toastify";
import { selectRooms } from "../../redux/slice/roomSlice";
import { selectUserID } from "../../redux/slice/authSlice";
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
        <h2>Reservation Details</h2>
        <div>
          <Link to="/reservation-history"> Back To Orders</Link>
        </div>
        <br />
        {rooms === null ? (
          <img src="" alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID</b>
              {rooms.id}
            </p>
            <p>
              <b>Order Amount</b> ${rooms.reservationAmount}
            </p>
            <p>
              <b>Order Status</b> {rooms.reservationStatus}
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
                        <Link to={`/review-product/${id}`}>
                          <button className="--btn --btn-primary">
                            Review Product
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
