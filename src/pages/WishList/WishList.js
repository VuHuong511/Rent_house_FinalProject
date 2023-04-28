import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import {
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_WISH_LIST,
  REMOVE_FROM_WISHLIST,
  selectWishItems,
  selectWishListTotalQuantity,
  CALCULATE_PRICE,
} from "../../redux/slice/wishListSlice";
const WishList = () => {
  const dispatch = useDispatch();
  const wishListTotalQuantity = useSelector(selectWishListTotalQuantity);

  const wishItems = useSelector(selectWishItems);
  const removeFromWishList = (wishList) => {
    dispatch(REMOVE_FROM_WISHLIST(wishList));
  };
  const clearWishList = () => {
    dispatch(CLEAR_WISH_LIST());
  };
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(CALCULATE_PRICE());
  }, [wishItems, dispatch]);

  return (
    <section>
      <div className="mt-[50px]">
        {wishItems.length === 0 ? (
          <>
            <img
              style={{
                margin: "auto",
                height: "5%",
                width: "5%",
                marginTop: 80,
                justifyItems: "center",
              }}
              src="https://cdn-icons-png.flaticon.com/512/158/158398.png"
              alt="example"
            />
            <p style={{ margin: "auto", width: "max-content", marginTop: 10 }}>
              Your wish list is currently empty.
            </p>
            <br />
            <div
              style={{
                margin: "auto",
                width: "max-content",
                marginBottom: 150,
              }}
            >
              <button>
                <Link className="text-white" to="/homeLogin">
                  &larr; Back to Home
                </Link>
              </button>
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
            <div className="mt-[20px] ml-[20px]">
              <button onClick={clearWishList} className="bg-red">
                Clear Wish list
              </button>
              <div className="mt-[10px]">
                <div>
                  <Link to="/homeLogin"> &larr;Back to home</Link>
                </div>
                <br />
                <b> {`Wish list item(s): ${wishListTotalQuantity}`}</b>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default WishList;
