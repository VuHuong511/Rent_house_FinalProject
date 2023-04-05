import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { toast } from "react-toastify";
import "./All-room.css";
import { useDispatch } from "react-redux";

function All_room() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getRoom = () => {
    setLoading(true);
    try {
      const roomRef = collection(db, "listings");
      const q = query(roomRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        const allRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allRooms);
        setListing(allRooms);
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getRoom();
  });
  return (
    <>
      <div className="table">
        <h2>All Products</h2>
        {listing.length === 0 ? (
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
              {listing.map((room, index) => {
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
