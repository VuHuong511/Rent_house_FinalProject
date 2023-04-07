import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import {
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_WISH_LIST,
  REMOVE_FROM_WISHLIST,
  selectWishItems,
  selectWishListTotalQuantity,
} from "../../redux/slice/wishListSlice";
import { FaTrashAlt } from "react-icons/fa";
const WishList = () => {
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector(selectWishListTotalQuantity);
  const wishItems = useSelector(selectWishItems);
  const removeFromWishList = (wishList) => {
    dispatch(REMOVE_FROM_WISHLIST(wishList));
  };
  const clearWishList = () => {
    dispatch(CLEAR_WISH_LIST());
  };
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [wishItems, dispatch]);

  return (
    <section>
      <div className="">
        <h2>Shopping Cart</h2>
        {wishItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/homeLogin">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Regular Price</th>
                  <th>Discount</th>
                  <th>Price</th>
                  <th>Action</th>
                  <th>Checkout</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {wishItems.map((wishList, index) => {
                  const {
                    id,
                    name,
                    type,
                    regularPrice,
                    discountedPrice,
                    imgUrls,
                  } = wishList;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imgUrls}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{type}</td>
                      <td>{regularPrice}</td>
                      <td>{discountedPrice}</td>

                      <td>{regularPrice - discountedPrice}</td>
                      <td>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromWishList(wishList)}
                        />
                      </td>
                      <td>
                        <Link to="/deposit-details">
                          <button>Check out</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div>
              <button onClick={clearWishList}>Clear Wish list</button>
              <div>
                <div>
                  <Link to="/#homeLogin"> Continue to view your wish list</Link>
                </div>
                <br />
                <cart>
                  <p>
                    <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                </cart>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default WishList;
