import spinner from "../../assets/img/spinner.png";
import "./Spinner.css"
export default function Spinner() {
  return (
    <div className="spinner">
      <div>
        <img src={spinner} alt="Loading..." />
      </div>
    </div>
  );
}