import React from "react";
import "./DepositSummary.css";
import { Link } from "react-router-dom";
import { selectWishItems } from "../../redux/slice/wishListSlice";
import { useSelector } from "react-redux";
const DepositSummary = () => {
  const wishItems = useSelector(selectWishItems);
  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {wishItems.lenght === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="--btn">
              <Link to="/#products">Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
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
                <card key={id} cardClass="card">
                  <h4>Room: {name}</h4>
                  <img src={imgUrls} alt={name} style={{ width: "100px" }} />
                  <p> regularPrice: {regularPrice}</p>
                  <p> discount: {discountedPrice}</p>
                  <p> type: {type}</p>

                  <p> address: {address}</p>
                </card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositSummary;
