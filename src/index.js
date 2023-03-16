// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// // import router
// import { BrowserRouter as Router } from "react-router-dom";

// // import house context provider
// import HouseContextProvider from "./components/HouseContext";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <HouseContextProvider>
//     {/* <Router> */}
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     {/* </Router> */}
//   </HouseContextProvider>
// );

import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
