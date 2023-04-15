import { useState } from "react";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Spinner from "../../components/Spinner/Spinner";
import "./Create.css";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [geolocationEnabled, setGeolocationEnable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "discount",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;
  function onChange(e) {
    let boolean = null;
    if (e.target.value === "false") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (images.length > 5) {
      setLoading(false);
      toast.error("Maximum 5 images are allowed");
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined) {
        setLoading(true);
        toast.error("Please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storeageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storeageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("image not uploaded");
      return;
    });
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;

    // !formDataCopy.offer && delete formDataCopy.discountedPrice;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("create successfully");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="create">
      <h1>Create Room</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="container-xl">
          <div className="card mb-4 bg-slate-300">
            <div className="row" style={{ display: "flex" }}>
              <div className="w-2/4 mx-9">
                <p>Discount / New Room</p>
                <div className="flex">
                  <button
                    type="button"
                    id="type"
                    value="discount"
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                      type === "newroom"
                        ? "bg-white text-black"
                        : "bg-slate-600 text-white"
                    }`}
                  >
                    discount
                  </button>
                  <button
                    type="button"
                    id="type"
                    value="newroom"
                    onClick={onChange}
                    className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                      type === "discount"
                        ? "bg-white text-black"
                        : "bg-slate-600 text-white"
                    }`}
                  >
                    new room
                  </button>
                </div>

                <p>Parking spot</p>
                <div className="flex">
                  <button
                    type="button"
                    id="parking"
                    value={true}
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                      !parking
                        ? "bg-white text-black"
                        : "bg-slate-600 text-white"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="parking"
                    value={false}
                    onClick={onChange}
                    className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                      parking
                        ? "bg-white text-black"
                        : "bg-slate-600 text-white"
                    }`}
                  >
                    no
                  </button>
                </div>
                <p>Furnished</p>
                <div className="flex">
                  <button
                    type="button"
                    id="furnished"
                    value={true}
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                      !furnished
                        ? "bg-white text-black"
                        : "bg-slate-600 text-white"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    id="furnished"
                    value={false}
                    onClick={onChange}
                    className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                      furnished
                        ? "bg-white text-black"
                        : "bg-slate-600 text-white"
                    }`}
                  >
                    No
                  </button>
                </div>
                <p className="text-lg font-semibold">Offer</p>
                <div className="flex mb-1">
                  <button
                    type="button"
                    id="offer"
                    value={true}
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                      !offer ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}
                  >
                    yes
                  </button>
                  <button
                    type="button"
                    id="offer"
                    value={false}
                    onClick={onChange}
                    className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                      offer ? "bg-white text-black" : "bg-slate-600 text-white"
                    }`}
                  >
                    no
                  </button>
                </div>
                <div className="flex items-center">
                  <div>
                    <p style={{ marginTop: 5 }} className="font-semibold">
                      Regular price
                    </p>
                    <div className="flex w-full justify-center items-center space-x-6">
                      <input
                        type="number"
                        id="regularPrice"
                        value={regularPrice}
                        onChange={onChange}
                        min="50"
                        required
                        style={{ width: 100 }}
                        className="px-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                      />
                      <p
                        className="whitespace-nowrap"
                        style={{ marginLeft: 10, width: 190 }}
                      >
                        $ / Month
                      </p>
                    </div>
                  </div>

                  <div>
                    <p style={{ marginTop: 5 }} className="font-semibold">
                      Discount price
                    </p>
                    <div className="flex w-full justify-center items-center space-x-6">
                      <input
                        type="number"
                        id="discountedPrice"
                        value={discountedPrice}
                        onChange={onChange}
                        min="0"
                        required
                        style={{ width: 100 }}
                        className="px-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                      />
                      <p
                        className="whitespace-nowrap"
                        style={{ marginLeft: 10, width: 190 }}
                      >
                        $ / Month
                      </p>
                    </div>
                  </div>

                  {/* {offer && (
                    <div className="">
                      <p className="text-lg font-semibold">Discounted price</p>
                      <div className="flex w-full justify-center items-center space-x-6">
                        <input
                          type="number"
                          id="discountedPrice"
                          value={discountedPrice}
                          onChange={onChange}
                          min="50"
                          required={offer}
                          style={{ width: 100 }}
                          className="px-4 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                        />

                        <p
                          style={{ marginLeft: 10, width: 190 }}
                          className="whitespace-nowrap"
                        >
                          $ / Month
                        </p>
                      </div>
                    </div>
                  )} */}
                </div>

                <div className="mb-5">
                  <p className="text-lg font-semibold">
                    Images (maximum 5 images)
                  </p>
                  <input
                    type="file"
                    id="images"
                    onChange={onChange}
                    accept=".jpg,.png,.jpeg"
                    multiple
                    required
                    className="w-full px-3 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
                  />
                </div>
              </div>
              <div className="w-2/4 mx-9">
                <p>Name</p>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Name"
                  maxLength="20"
                  minLength="5"
                  required
                  className="text-gray-700 bg-white border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                  style={{ marginTop: 0 }}
                />
                <div className="flex space-x-6">
                  <div>
                    <p className="text-lg font-semibold">Beds</p>
                    <input
                      type="number"
                      id="bedrooms"
                      value={bedrooms}
                      onChange={onChange}
                      min="1"
                      max="50"
                      required
                      style={{ marginTop: 0, width: 100 }}
                      className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                    />
                  </div>
                  <div>
                    <p
                      style={{ marginLeft: 50 }}
                      className="text-lg font-semibold"
                    >
                      Baths
                    </p>
                    <input
                      type="number"
                      id="bathrooms"
                      value={bathrooms}
                      onChange={onChange}
                      min="1"
                      max="50"
                      required
                      style={{ marginTop: 0, marginLeft: 50, width: 100 }}
                      className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                    />
                  </div>
                </div>
                <p>Address</p>
                <textarea
                  type="text"
                  id="address"
                  value={address}
                  onChange={onChange}
                  placeholder="Address"
                  required
                  style={{ border: "1px solid #ccc" }}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />
                {!geolocationEnabled && (
                  <div className="flex space-x-6 justify-start mb-6">
                    <div className="">
                      <p className="text-lg font-semibold">Latitude</p>
                      <input
                        type="number"
                        id="latitude"
                        value={latitude}
                        onChange={onChange}
                        required
                        min="-90"
                        max="90"
                        className="text-gray-700 bg-white border border-gray-300 transition ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600"
                      />
                    </div>
                    <div className="">
                      <p className="text-lg font-semibold">Longitude</p>
                      <input
                        type="number"
                        id="longitude"
                        value={longitude}
                        onChange={onChange}
                        required
                        min="-180"
                        max="180"
                        className="text-gray-700 bg-white border border-gray-300 transition ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600"
                      />
                    </div>
                  </div>
                )}
                <p>Description</p>
                <textarea
                  type="text"
                  id="description"
                  value={description}
                  onChange={onChange}
                  placeholder="Description"
                  required
                  style={{ border: "1px solid #ccc" }}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
                />

                <button
                  type="submit"
                  style={{ height: 50, marginTop: 10 }}
                  className=" w-full px-7 bg-blue-700 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Create Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
