import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../hooks/useFetchDocument";
import ChangeReservationStatus from "../ChangeReservationStatus/ChangeReservationStatus";

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
      <div className="container mx-auto flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2">
          <div className="my-4">
            <h2 className="text-2xl font-bold mb-2">My Reservation Details</h2>
            <div>
              <Link
                to="/my-reservation"
                className="text-blue-500 hover:underline"
              >
                &larr;Back To Reservations
              </Link>
            </div>
            <br />
            {reservation === null ? (
              <div className="flex justify-center items-center">
                <img
                  src=""
                  alt="Loading..."
                  className="w-10 h-10 animate-spin"
                />
              </div>
            ) : (
              <>
                <p className="font-semibold">Reservation ID: {id}</p>
                <p className="font-semibold">
                  Reservation Amount: ${reservation.reservationAmount}
                </p>
                <p className="font-semibold">
                  Reservation Status: {reservation.reservationStatus}
                </p>
                <p className="font-semibold">Billing Address</p>
                <div className="pl-4">
                  <p className="mt-2">
                    Name: {reservation.billingAddress.name},
                  </p>
                  <p className="mt-2">
                    Email: {reservation.billingAddress.email}
                  </p>
                  <p className="mt-2">
                    Address: {reservation.billingAddress.address}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2 my-4 mt-[50px] shadow-lg">
          {reservation && (
            <>
              <p className="text-2xl font-bold mb-2">Room Details</p>
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Room</th>
                    <th className="py-2 px-4 border">Price</th>
                    <th className="py-2 px-4 border">Address</th>
                    <th className="py-2 px-4 border">Update Status</th>
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
                      <tr
                        key={id}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <td className="py-2 px-4 border">{name}</td>
                        <td className="py-2 px-4 border">
                          <img
                            src={imgUrls}
                            alt={name}
                            className="w-24 h-24 object-cover"
                          />
                        </td>
                        <td className="py-2 px-4 border">
                          ${regularPrice - discountedPrice}
                        </td>
                        <td className="py-2 px-4 border">{address}</td>
                        <td className="py-2 px-4 border">
                          <ChangeReservationStatus
                            reservation={reservation}
                            id={id}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyReservationDetail;
