import React, { useEffect, useState } from "react";
import { BiHistory, BiMoney, BiUser } from "react-icons/bi";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import UserProfile from "./UserProfile";

const aboutItems = [
  {
    title: "Profile",
    link: "/profile",
    icon: <BiUser/>
  },
  {
    title: "Order",
    link: "/order",
    icon: <BsFillBagCheckFill/>,
  },
  {
    title: "Payment Method",
    link: "/coming",
    icon: <BiMoney/> 
  },
  {
    title: "Address",
    link: "/coming",
    icon: <FaAddressBook/> 
  },
  {
    title: "Settings",
    link: "/coming",    icon: <MdSettings/>
  },
  {
    title: "History",
    link: "/coming",    icon: <BiHistory/> 
  },
];

const Dashboard = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4">
      <div>
       <UserProfile />
      </div>
    </div>
  );
};

export default Dashboard;