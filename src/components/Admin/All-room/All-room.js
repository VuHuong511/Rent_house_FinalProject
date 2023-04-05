import React, { useEffect, useState } from "react";
import "./All-room.css";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ROOMS, selectRooms } from "../../../redux/slice/roomSlice";
import useEffectCollection from "../../../hooks/useFetchCollection";

function All_room() {
  const { data } = useEffectCollection("listings");
  const rooms = useSelector(selectRooms);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_ROOMS({
        rooms: data,
      })
    );
  }, [dispatch, data]);

  return (
    <>
      <div className="table">
        <h2>All Products</h2>
        {rooms.length === 0 ? (
          <p>No room found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Regular Price</th>
                <th>Discounted Price</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => {
                const {
                  id,
                  imgUrls,
                  name,
                  type,
                  regularPrice,
                  discountedPrice,
                  address,
                } = room;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imgUrls}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{`$${regularPrice}`}</td>
                    <td>{`$${discountedPrice}`}</td>
                    <td>{address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default All_room;
