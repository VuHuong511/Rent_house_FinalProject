import React from "react";
import "./DepositSummary.css";
import { Link } from "react-router-dom";
import { selectWishItems } from "../../redux/slice/wishListSlice";
import { useSelector } from "react-redux";
const DepositSummary = () => {
  const wishItems = useSelector(selectWishItems);
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Checkout Summary</h1>
      <div>
        {wishItems.length === 0 ? (
          <>
            <p className="m-auto w-max">No item in your wish list.</p>
            <div className="m-auto w-max">
              <button className="--btn">
                <Link to="/homeLogin">Back To Home</Link>
              </button>
            </div>
          </>
        ) : (
          <div className="m-auto w-max mt-7">
            {wishItems.map((price, index) => {
              const { regularPrice, discountedPrice } = price;
              return <p>Price: {regularPrice - discountedPrice}</p>;
            })}
            {wishItems.map((item, index) => {
              const {
                id,
                name,
                regularPrice,
                discountedPrice,
                imgUrls,
                address,
                type,
              } = item;
              return (
                <div
                  key={id}
                  className="justify-items max-content mb-[25px] border-1 border-solid"
                >
                  <p>Room: {name}</p>
                  <img src={imgUrls} alt={name} style={{ width: "100px" }} />
                  <p> regularPrice: {regularPrice}</p>
                  <p> discount: {discountedPrice}</p>
                  <p> type: {type}</p>
                  <p> address: {address}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositSummary;
