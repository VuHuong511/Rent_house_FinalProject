import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDocument from "../../hooks/useFetchDocument";
import { useSelector } from "react-redux";
import { selectEmail, selectUsername } from "../../redux/slice/authSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import StarsRating from "react-star-rate";
const Review = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [room, setRoom] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("listings", id);
  const userEmail = useSelector(selectEmail);
  const userName = useSelector(selectUsername);
  useEffect(() => {
    setRoom(document);
  }, [document]);
  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userEmail,
      userName,
      roomID: id,
      rate,
      review,
      reviewDate: date,
      timestamp: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section className="px-4 md:px-6 lg:px-8 xl:px-10">
      <h2 className="text-3xl text-center mt-6 font-bold">Rate This Room</h2>
      <div className="flex flex-wrap md:flex-no-wrap">
        {room === null ? (
          <div className="w-full text-center">
            <img
              src=""
              alt="Loading..."
              className="mx-auto"
              style={{ width: "50px" }}
            />
          </div>
        ) : (
          <>
            <div className="w-full md:w-2/4 md:pr-8">
              <div className="mt-6">
                <p>
                  <b>Room name:</b> {room.name}
                </p>
                <div className="mt-4">
                  <img
                    src={room.imgUrls}
                    alt={room.name}
                    className="w-full md:w-4/5 mx-auto md:mx-0"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/4 mt-6 md:mt-0">
              <form onSubmit={(e) => submitReview(e)}>
                <div>
                  <label className="block mb-2">Rating:</label>
                  <StarsRating
                    value={rate}
                    onChange={(rate) => {
                      setRate(rate);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-2">Review</label>
                  <textarea
                    style={{ border: "1px solid" }}
                    value={review}
                    required
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full p-2 rounded-md"
                    cols="30"
                    rows="6"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Review;
