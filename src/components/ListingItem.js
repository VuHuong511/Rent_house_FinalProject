import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import {MdLocation, MdLocationOn} from 'react-icons/md'

export default function ListingItem({listing, id}) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center
    shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150
    ">
      <Link to = {'/category/${listing.type}/${id}'}>
        <img className="h-[170px] w-full object-cover hover:scale-150 transition-scale duration-200 ease-in"
        loading="lazy" src ={listing.imgUrls[0]} alt = "" />
        <Moment className="absolute tip-2 left-2 bg-blue-700" fromNow>
          {listing.timestamp?.toDate()}
        </Moment>
        <div className=''>
          <div className=''>
            <MdLocationOn/>
            <p>
              {listing.address}
            </p>
          </div>
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "discount" ? " / month" : ""}
          </p>
          <div>
            <div>
              <p>{listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 bed"}</p>
            </div>
            <div>
              <p>{listing.bathrooms > 1 ? `${listing.bathrooms} baths` : "1 bath"}</p>
            </div>
          </div>

        </div>
      </Link>
    </li>
  )
}
