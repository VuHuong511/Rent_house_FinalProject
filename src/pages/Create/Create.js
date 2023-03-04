import { useState } from "react";
import "./Create.css"

export default function Create(){
  const [formData, setFormData] = useState({
    type:"sale",
    name: "",
    bedrooms: 1,
    bathrooms:1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 0,
    discountedPrice: 0,
  });
  const {type, 
    name, 
    bedrooms, 
    bathrooms, 
    parking, 
    furnished, 
    address,
    description,
    offer,
    regularPrice,
    discountedPrice} = formData;
  function onChange(){}
  return (
    <main className="create">
    <h1>Create a Listing</h1>
    <form className="form">
      <p>Discount / New room</p>
      <div className="button">
        <button
          type="button" 
          id="type"
          value="discount"
          onClick={onChange}
        >
          Discount
        </button>
        <button
          type="button"
          id="type"
          value="newRoom"
          onClick={onChange}
      
        >
          New Room
        </button>
      </div>
      <p>Name</p>
      <input
        type="text"
        id="name"
        value={name}
        onChange={onChange}
        placeholder="Name"
        maxLength="32"
        minLength="3"
        required
      />
      <div className="button">
        <div >
          <p>Beds</p>
          <input
            type="number"
            id="bedrooms"
            value={bedrooms}
            onChange={onChange}
            min="1"
            max="50"
            required
          />
        </div>
        <div>
          <p className="text-lg font-semibold">Baths</p>
          <input style={{marginLeft:10}}
            type="number"
            id="bathrooms"
            value={bathrooms}
            onChange={onChange}
            min="1"
            max="50"
            required
  
          />
        </div>
      </div>
      <p className="form">Parking spot</p>
      <div className="button">
        <button
          type="button"
          id="parking"
          value={true}
          onClick={onChange}
        >
          Yes
        </button>
        <button
          type="button"
          id="parking"
          value={false}
          onClick={onChange}
          className={` ${
            parking ? "bg-white text-black" : "bg-slate-600 text-white"
          }`}
        >
          no
        </button>
      </div>
      <p >Furnished</p>
      <div className="button">
        <button
          type="button"
          id="furnished"
          value={true}
          onClick={onChange}
          className={` ${
            !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
          }`}
        >
          yes
        </button>
        <button
          type="button"
          id="furnished"
          value={false}
          onClick={onChange}
          className={` ${
            furnished ? "bg-white text-black" : "bg-slate-600 text-white"
          }`}
        >
          no
        </button>
      </div>
      <p>Address</p>
      <textarea
        type="text"
        id="address"
        value={address}
        onChange={onChange}
        placeholder="Address"
        required
      />
      {/* {!geolocationEnabled && ( */}
        <div className="flex space-x-6 justify-start mb-6">
          <div className="">
            <p className="text-lg font-semibold">Latitude</p>
            <input
              type="number"
              id="latitude"
              // value={latitude}
              onChange={onChange}
              required
              min="-90"
              max="90"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold">Longitude</p>
            <input
              type="number"
              id="longitude"
              // value={longitude}
              onChange={onChange}
              required
              min="-180"
              max="180"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
            />
          </div>
        </div>
      {/* )} */}
      <p className="text-lg font-semibold">Description</p>
      <textarea
        type="text"
        id="description"
        value={description}
        onChange={onChange}
        placeholder="Description"
        required
      />
      <p className="form">Offer</p>
      <div className="button">
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
      <div className="flex items-center mb-6">
        <div className="">
          <p>Regular price</p>
          <div className="flex w-full justify-center items-center space-x-6">
            <input
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={onChange}
              min="50"
              max="400000000"
              required
            />

               $ / Month
          
     
          </div>
        </div>
      </div>
      {offer && (
        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold">Discounted price</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onChange}
                min="50"
                max="400000000"
                required={offer}
              />
              {type === "rent" && (
             
                  <p >
                    $ / Month
                  </p>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mb-6">
        <p className="text-lg font-semibold">Images</p>
        <input
          type="file"
          id="images"
          onChange={onChange}
          accept=".jpg,.png,.jpeg"
          multiple
          required
        />
      </div>
      <button style={{ marginTop: '20px', width: '100%' , marginBottom:'20px'}}
        type="submit"
        
      >
        Create Listing
      </button>
    </form>
  </main>
  )

}