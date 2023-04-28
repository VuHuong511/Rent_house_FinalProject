import React, { useEffect } from "react";
import "./Dashboard.css";
import InfoBox from "../../InforBox/InfoBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsHouseFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
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
const roomIcon = <BsHouseFill size={30} color="#1f93ff" />;
const reservationIcon = <FaCalendarAlt size={30} color="orangered" />;
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
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-between">
        <InfoBox
          className="w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-0"
          title="Earnings"
          count={`$${totalReservationAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          className="w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-0"
          title="Rooms"
          count={rooms.length}
          icon={roomIcon}
        />
        <InfoBox
          className="w-full md:w-1/3 lg:w-1/4"
          title="Reservations"
          count={reservations.length}
          icon={reservationIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
