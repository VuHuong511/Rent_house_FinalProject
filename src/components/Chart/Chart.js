import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { selectReservationHistory } from "../../redux/slice/reservationSlice";
import { useSelector } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};
const Chart = () => {
  const reservations = useSelector(selectReservationHistory);
  // create a new array of reservation status
  const array = [];
  reservations.map((item) => {
    const { reservationStatus } = item;
    array.push(reservationStatus);
  });
  const getReservationCount = (a, value) => {
    return a.filter((n) => n === value).length;
  };
  const [q1, q2, q3] = ["Reservation Placed...", "Rented", "Check out"];
  const placed = getReservationCount(array, q1);
  const Rented = getReservationCount(array, q2);
  const checkedOut = getReservationCount(array, q3);
  const data = {
    labels: ["Reservation Placed", "Rented", "Checked out"],
    datasets: [
      {
        label: "Reservation count",
        data: [placed, Rented, checkedOut],
        backgroundColor: "#1b4965",
      },
    ],
  };
  return (
    <div className="charts">
      <div className="card">
        <h3 className="mx-auto" style={{ width: "max-content" }}>
          Reservation Status Chart
        </h3>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default Chart;
