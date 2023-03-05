import { getAuth } from 'firebase/auth';
import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import ListingItem from "../../components/ListingItem"

export default function Listing() {
  const auth = getAuth();
  const [listings, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    async function fetchUserListing(){
      const listingRef = collection(db, "listings");
      
      const q = query(listingRef, where("userRef", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) =>{
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing(listings)
      setLoading(false);
    }
    fetchUserListing();
  },[auth.currentUser.uid])
  return (
    <div className='max-w-6xl px-3 mt-6 mx-auto'>
      {!loading && listings.length > 0 && (
        <>
        <h1 className='text-2xl text-center font-semibold'>My listings</h1>
        <ul>
          {listings.map((listing) =>(
            <ListingItem 
            key = {listing.id}
            id={listing.id}
            listing={listing.data}
            />
          ))}
        </ul>
        </>
      )}
    </div>
  )
}
