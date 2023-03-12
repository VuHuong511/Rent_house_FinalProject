// import hero
import hero1 from "../assets/img/hero/h1.png";
import hero2 from "../assets/img/hero/h2.png";
import hero3 from "../assets/img/hero/h3.png";
import hero4 from "../assets/img/hero/h4.png";
import hero5 from "../assets/img/hero/h5.png";

// import list
import List1 from "../assets/img/list/list1.jpg";
import List2 from "../assets/img/list/list2.jpg";
import List3 from "../assets/img/list/list3.jpg";
import List4 from "../assets/img/list/list4.jpg";
import List5 from "../assets/img/list/list5.jpg";
import List6 from "../assets/img/list/list6.jpg";

// import location
import Location1 from "../assets/img/location/location1.jpg";
import Location2 from "../assets/img/location/location2.jpg";
import Location3 from "../assets/img/location/location3.jpg";
import Location4 from "../assets/img/location/location4.jpg";
import Location5 from "../assets/img/location/location5.jpg";
import Location6 from "../assets/img/location/location6.jpg";

//import team
import Team1 from "../assets/img/team/team1.jpg";
import Team2 from "../assets/img/team/team2.jpg";
import Team3 from "../assets/img/team/team3.jpg";

export const nav = [
  {
    text: "home",
    path: "/",
  },
  {
    text: "about",
    path: "/about",
  },
  {
    text: "services",
    path: "/services",
  },
  {
    text: "Offers",
    path: "/blog",
  },
  {
    text: "contact",
    path: "/contact",
  },
  {
    text: "listing",
    path: "/homeLogin",
  },
];

export const featured = [
  {
    cover: hero1,
    name: "Normal Apartments",
    total: "34 Property",
  },
  {
    cover: hero2,
    name: "Serviced Apartments",
    total: "52 Property",
  },
  {
    cover: hero3,
    name: "A detached house",
    total: "21 Property",
  },
  {
    cover: hero4,
    name: "Room Rentals",
    total: "41 Property",
  },
  {
    cover: hero5,
    name: "City Villa",
    total: "24 Property",
  },
];
export const list = [
  {
    id: 1,
    cover: List1,
    name: "Normal Apartments",
    location: "210 Ngu Hanh Son",
    price: "1.500.000",
    type: "Apartment",
  },
  {
    id: 2,
    cover: List2,
    name: "A detached house",
    location: "14 Lien Chieu",
    price: "1.500.000",
    type: "Apartment",
  },
  {
    id: 3,
    cover: List3,
    name: "Normal Apartments",
    location: "210 Ngu Hanh Son",
    price: "1.500.000",
    type: "Apartment",
  },
  {
    id: 4,
    cover: List4,
    name: "Normal Apartments",
    location: "210 Ngu Hanh Son",
    price: "1.500.000",
    type: "Apartment",
  },
  {
    id: 5,
    cover: List5,
    name: "Normal Apartments",
    location: "210 Ngu Hanh Son",
    price: "1.500.000",
    type: "Apartment",
  },
  {
    id: 6,
    cover: List6,
    name: "Normal Apartments",
    location: "210 Ngu Hanh Son",
    price: "1.500.000",
    type: "Apartment",
  },
];
export const awards = [
  {
    icon: <i class="fa-solid fa-trophy"></i>,
    num: "32 M	",
    name: "Blue Burmin Award",
  },
  {
    icon: <i class="fa-solid fa-briefcase"></i>,
    num: "43 M",
    name: "Mimo X11 Award",
  },
  {
    icon: <i class="fa-solid fa-lightbulb"></i>,
    num: "51 M",
    name: "Australian UGC Award",
  },
  {
    icon: <i class="fa-solid fa-heart"></i>,
    num: "42 M",
    name: "IITCA Green Award",
  },
];
export const location = [
  {
    id: 1,
    name: "Son Tra",
    Apartments: "10 Apartments",
    Offices: "07 Offices",
    cover: Location1,
  },
  {
    id: 2,
    name: "Hai Chau",
    Apartments: "10 Apartments",
    Offices: "07 Offices",
    cover: Location2,
  },
  {
    id: 3,
    name: "Lien chieu",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: Location3,
  },
  {
    id: 4,
    name: "Ngu Hanh Son",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: Location4,
  },
  {
    id: 5,
    name: "Thanh Khe",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: Location5,
  },
  {
    id: 6,
    name: "Hoa Vang",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: Location6,
  },
];
export const team = [
  {
    list: "50",
    cover: Team1,
    address: "Ngu Hanh Son, Da Nang",
    name: "Nguyen Van A",
    icon: [
      <i class="fa-brands fa-facebook-f"></i>,
      <i class="fa-brands fa-linkedin"></i>,
      <i class="fa-brands fa-twitter"></i>,
      <i class="fa-brands fa-instagram"></i>,
    ],
  },
  {
    list: "70",
    cover: Team2,
    address: "Lien Chieu, Da Nang",
    name: "Nguyen Van B",
    icon: [
      <i class="fa-brands fa-facebook-f"></i>,
      <i class="fa-brands fa-linkedin"></i>,
      <i class="fa-brands fa-twitter"></i>,
      <i class="fa-brands fa-instagram"></i>,
    ],
  },
  {
    list: "80",
    cover: Team3,
    address: "Hai Chau, Da Nang",
    name: "Nguyen Van C",
    icon: [
      <i class="fa-brands fa-facebook-f"></i>,
      <i class="fa-brands fa-linkedin"></i>,
      <i class="fa-brands fa-twitter"></i>,
      <i class="fa-brands fa-instagram"></i>,
    ],
  },
];

export const footer = [
  {
    title: "LAYOUTS",
    text: [
      { list: "Home" },
      { list: "About" },
      { list: "Service" },
      { list: "Offers" },
      { list: "Contact" },
    ],
  },
  {
    title: "ALL SECTIONS",
    text: [
      { list: "Headers" },
      { list: "Features" },
      { list: "Property" },
      { list: "Awards" },
      { list: "Agents" },
      { list: "Footers" },
    ],
  },
  {
    title: "COMPANY",
    text: [
      { list: "About" },
      { list: "Blog" },
      { list: "Pricing" },
      { list: "Affiliate" },
      { list: "Login" },
      { list: "Changelog" },
    ],
  },
];
