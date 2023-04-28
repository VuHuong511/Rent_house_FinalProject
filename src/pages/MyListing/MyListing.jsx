import { getAuth } from "firebase/auth";
import "./MyListing.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import ListingItem from "../../components/ListingItem/ListingItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Listing() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [listings, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserListing() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing(listings);
      setLoading(false);
    }
    fetchUserListing();
  }, [auth.currentUser.uid]);
  console.log(listings);
  async function onDelete(ListingId) {
    if (window.confirm("Are you sure you want to delete")) {
      await deleteDoc(doc(db, "listings", ListingId));
      const updatedListing = listings.filter(
        (listing) => listing.id !== ListingId
      );
      setListing(updatedListing);
      toast.success("successfully deleted listings");
    }
  }
  function onEdit(ListingId) {
    navigate(`/edit/${ListingId}`);
  }
  return (
    <div className="max-w-6xl px-3 mt-6 mx-auto">
      {!loading && listings.length > 0 && (
        <>
          <h1 className="text-2xl text-center font-semibold mb-6">
            My list room
          </h1>
          <ul className="sm:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing.data}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
