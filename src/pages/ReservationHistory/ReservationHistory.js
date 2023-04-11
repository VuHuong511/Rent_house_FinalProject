import React from "react";
import "./ReservationHistory.css";
import useEffectCollection from "../../hooks/useFetchCollection";
const ReservationHistory = () => {
  const { data, isLoading } = useEffectCollection("reservation");
  console.log(data);
  return <div>Reservation History</div>;
};

export default ReservationHistory;
