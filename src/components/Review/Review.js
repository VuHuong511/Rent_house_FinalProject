import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDocument from "../../hooks/useFetchDocument";
import { useSelector } from "react-redux";
import { selectUserID, selectUsername } from "../../redux/slice/authSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import "./Review.css";
import StarsRating from "react-star-rate";
const Review = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [room, setRoom] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("listings", id);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUsername);

  useEffect(() => {
    setRoom(document);
  }, [document]);

  return (
    <section>
      <div className="review">
        <h2>Review Products</h2>
        {room === null ? (
          <img src="" alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Room name:</b> {room.name}
            </p>
            <img
              src={room.imgUrls}
              alt={room.name}
              style={{ width: "100px" }}
            />
          </>
        )}

        <card cardClass="card">
          <form>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button>Submit Review</button>
          </form>
        </card>
      </div>
    </section>
  );
};

export default Review;
