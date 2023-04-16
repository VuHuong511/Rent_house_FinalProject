import React, { useEffect } from "react";
import "./Dashboard.css";
import InfoBox from "../../InforBox/InfoBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ROOMS, selectRooms } from "../../../redux/slice/roomSlice";
import {
  CALCULATOR_TOTAL_RESERVATION,
  STORE_RESERVATION,
  selectReservationAmount,
  selectReservationHistory,
} from "../../../redux/slice/reservationSlice";
import useEffectCollection from "../../../hooks/useFetchCollection";
import Chart from "../../Chart/Chart";
const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;
const Dashboard = () => {
  const rooms = useSelector(selectRooms);
  const reservations = useSelector(selectReservationHistory);
  const totalReservationAmount = useSelector(selectReservationAmount);

  const fbRooms = useEffectCollection("listings");
  const { data } = useEffectCollection("reservation");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_ROOMS({
        rooms: fbRooms.data,
      })
    );

    dispatch(STORE_RESERVATION(data));

    dispatch(CALCULATOR_TOTAL_RESERVATION());
  }, [dispatch, data, fbRooms]);
  return (
    <div>
      <h2>DashBoard</h2>
      <div className="info-box"></div>
      <InfoBox
        className="card"
        title={"Earnings"}
        count={`$${totalReservationAmount}`}
        icon={earningIcon}
      />
      <InfoBox
        className="card"
        title={"Rooms"}
        count={rooms.length}
        icon={productIcon}
      />
      <InfoBox
        className="card"
        title={"Reservation"}
        count={reservations.length}
        icon={ordersIcon}
      />
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
