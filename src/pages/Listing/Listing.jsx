import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { db } from "../../firebase/firebase";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import "./Listing.css";
import Contact from "../../components/Contact";
import { getAuth } from "firebase/auth";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import useEffectCollection from "../../hooks/useFetchCollection";
import StarsRating from "react-star-rate";
import L from "leaflet";
const Listing = (props) => {
  const icon = L.icon({
    iconUrl: "./placeholder.png",
    iconSize: [38, 38],
  });
  const position = [51.505, -0.09];
  function ResetCenterView(props) {
    const { selectPosition } = props;
    const map = useMap();
    useEffect(() => {
      if (selectPosition) {
        map.setView(
          L.latLng(selectPosition?.lat, selectPosition?.lon),
          map.getZoom(),
          {
            animate: true,
          }
        );
      }
    }, [selectPosition]);
    return null;
  }

  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const auth = getAuth();
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const { data } = useEffectCollection("reviews");
  const [loading, setLoading] = useState(true);
  const [contactLandlord] = useState(true);
  const filteredReviews = data.filter(
    (review) => review.roomID === params.listingId
  );
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <ImSpinner />;
  }

  return (
    <div className="container-xl">
      <Link className="mt-2 mx-9" to="/homeLogin">
        &larr; Go Back
      </Link>
      <div className="row" style={{ display: "flex" }}>
        <div className="w-2/4 mx-9">
          <div className="card">
            <Swiper
              slidesPerView={1}
              navigation
              pagination={{ type: "progressbar" }}
              effect="fade"
              modules={[EffectFade]}
              autoplay={{ delay: 3000 }}
            >
              {listing.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative w-full overflow-hidden h-[300px]"
                    style={{
                      background: `url(${listing.imgUrls[index]}) center no-repeat`,
                      backgroundSize: "cover",
                      borderRadius: 10,
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div
            className=" fixed top-[16%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setShareLinkCopied(true);
              setTimeout(() => {
                setShareLinkCopied(false);
              }, 2000);
            }}
          >
            <FaShare className="text-lg text-slate-500" />
          </div>
          {shareLinkCopied && (
            <p className="fixed top-[24%]  font-semibold border-1 border-gray-400 rounded-md bg-white z-10 p-2">
              Link Copied
            </p>
          )}
          <div className="card" style={{ height: 220 }}>
            <div className=" w-full">
              <p
                style={{ marginLeft: 20 }}
                className="text-2xl font-bold mb-3 text-blue-900"
              >
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
              <p
                style={{ marginLeft: 20 }}
                className="flex items-center mt-6 mb-3 font-semibold"
              >
                <FaMapMarkerAlt className="text-green-700 mr-1" />
                {listing.address}
              </p>
              <div
                style={{ marginLeft: 20 }}
                className="flex justify-start items-center space-x-4 w-[75%]"
              >
                <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
                  {listing.type === "discount" ? "newRoom" : "sale"}
                </p>
                {listing.offer && (
                  <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                    ${+listing.regularPrice - +listing.discountedPrice} discount
                  </p>
                )}
              </div>
              <p style={{ marginLeft: 20 }} className="mt-3 mb-3">
                <span className="font-semibold">Description - </span>
                {listing.description}
              </p>
              <ul
                style={{ marginLeft: 20 }}
                className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6"
              >
                <li className="flex items-center whitespace-nowrap">
                  <FaBed className="text-lg mr-1" />
                  {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                </li>
                <li className="flex items-center whitespace-nowrap">
                  <FaBath className="text-lg mr-1" />
                  {+listing.bathrooms > 1
                    ? `${listing.bathrooms} Baths`
                    : "1 Bath"}
                </li>
                <li className="flex items-center whitespace-nowrap">
                  <FaParking className="text-lg mr-1" />
                  {listing.parking ? "Parking spot" : "No parking"}
                </li>
                <li className="flex items-center whitespace-nowrap">
                  <FaChair className="text-lg mr-1" />
                  {listing.furnished ? "Furnished" : "Not furnished"}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-2/4 mr-9">
          <MapContainer
            center={position}
            zoom={8}
            style={{
              width: "99%",
              height: "55%",
              position: "relative",
              borderRadius: 13,
              marginTop: 12,
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=l841GjLkKJrlZ4sX3MhS"
            />
            {selectPosition && (
              <Marker position={locationSelection} icon={icon}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            )}
            <ResetCenterView selectPosition={selectPosition} />
          </MapContainer>
          <div className="card">
            {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
              <div className="mt-6">
                <Contact />
              </div>
            )}
            {contactLandlord && (
              <Contact userRef={listing.userRef} listing={listing} />
            )}
          </div>
        </div>
      </div>
      <div className="card mx-9">
        <h3 className="text-lg font-bold mb-4">Room Reviews</h3>
        <div>
          {filteredReviews.length === 0 ? (
            <p className="text-gray-600">
              There are no reviews for this room yet.
            </p>
          ) : (
            <>
              {filteredReviews.map((item, index) => {
                const { rate, review, reviewDate, userName } = item;
                return (
                  <div key={index} className="review border-t-2 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <StarsRating value={rate} />
                      <span className="text-gray-600 text-sm">
                        {reviewDate}
                      </span>
                    </div>
                    <p className="text-gray-800">{review}</p>
                    <span className="text-gray-600 text-sm">
                      by: {userName}
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Listing;
