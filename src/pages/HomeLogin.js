import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem/ListingItem";
import { db } from "../firebase/firebase";
import Search from "../components/Search/Search";
import Filter from "../components/Filter/Filter";
import { BiSearch } from "react-icons/bi";
import "./HomeLogin.css";

export default function HomeLogin() {
  const [search, setSearch] = useState(true);
  const url = window.location.href;
  const scrollToRooms = () => {
    if (url.includes("/homeLogin")) {
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
      return;
    }
  };
  useEffect(() => {
    scrollToRooms();
  }, []);
  //offers
  const [offerListings, setOfferListings] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        // get references
        const listingsRef = collection(db, "listings");
        // create the query
        const Query = query(
          listingsRef,
          where("offer", "==", "true"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(Query);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  // discount
  const [discountListings, setDiscountListings] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        // get references
        const listingsRef = collection(db, "listings");
        // create the query
        const Query = query(
          listingsRef,
          where("type", "==", "discount"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(Query);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setDiscountListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  // new room
  const [newRoomListings, setNewRoomListings] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        // get references
        const listingsRef = collection(db, "listings");
        // create the query
        const Query = query(
          listingsRef,
          where("type", "==", "newRoom"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(Query);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setNewRoomListings(listings);
        console.log(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  return (
    <div>
      <Filter />

      <div className="search">
        <BiSearch size={18} className="icon" />
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <div className="flex">
              <h2 className=" px-3 text-2xl mt-6 font-semibold">
                Recent offers
              </h2>
            </div>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
              {offerListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}

        {discountListings && discountListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Recent Discounts
            </h2>
            <Link to="/category/:categoryName">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more discounts
              </p>
            </Link>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
              {discountListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}

        {newRoomListings && newRoomListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Recent New Room
            </h2>
            <Link to="/category/:categoryName">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more New Room
              </p>
            </Link>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
              {newRoomListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
