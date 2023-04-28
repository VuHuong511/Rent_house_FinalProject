import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import ListingItem from "../../ListingItem/ListingItem";
import { useNavigate } from "react-router-dom";

const RecentCard = () => {
  const navigate = useNavigate();
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
  const handleListingClick = () => {
    navigate("/login");
  };
  return (
    <>
      <div onClick={handleListingClick} className="max-w-6xl px-3 mt-6 mx-auto">
        {offerListings && offerListings.length > 0 && (
          <ul
            style={{ alignItems: "center", columnGap: 200 }}
            className="sm:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center"
          >
            {offerListings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default RecentCard;
