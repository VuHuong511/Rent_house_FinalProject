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
import { db } from "../../../firebase";
import { list } from "../../data";
import ListingItem from "../../ListingItem/ListingItem";

const RecentCard = () => {
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

  return (
    <>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {offerListings && offerListings.length > 0 && (
          <ul
            style={{ margin: -30, alignItems: "center" }}
            className="sm:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5"
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
      {/* <div className='content grid3 mtop'>
        {list.map((val, index) => {
          const { cover, location, name, price, type } = val
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
              <div className='text'>
                <h4>{name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{price}</button> <label htmlFor=''>/Month</label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          )
        })}
      </div> */}
    </>
  );
};

export default RecentCard;
