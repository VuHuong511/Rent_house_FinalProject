import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner/Spinner";
import ListingItem from "../components/ListingItem/ListingItem";
import { async } from "@firebase/util";

export default function Offer() {
  const [listings, setlistings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastListing, setLastListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const Query = query(
          listingsRef,
          where("offer", "==", "true"),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(Query);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setlistings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Not listing");
      }
    }
    fetchListings();
  }, []);
  async function onMoreListings() {
    try {
      const listingsRef = collection(db, "listings");
      const Query = query(
        listingsRef,
        where("offer", "==", "true"),
        orderBy("timestamp", "desc"),
        startAfter(lastListing),
        limit(4)
      );
      const querySnap = await getDocs(Query);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setlistings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Not listing");
    }
  }
  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold">Offers</h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastListing && (
            <div className="flex justify-center items-center">
              <button onClick={onMoreListings}>Load more</button>
            </div>
          )}
        </>
      ) : (
        <p> There are no current offers</p>
      )}
    </div>
  );
}
