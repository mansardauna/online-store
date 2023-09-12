import React, { useEffect, useState } from "react";
import { BiHistory, BiMoney, BiUser } from "react-icons/bi";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

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
    link: "/payment",
    icon: <BiMoney/> 
  },
  {
    title: "Address",
    link: "/address",
    icon: <FaAddressBook/> 
  },
  {
    title: "Settings",
    link: "/settings",
    icon: <MdSettings/>
  },
  {
    title: "History",
    link: "/history",
    icon: <BiHistory/> 
  },
];

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Settings" prevLocation={prevLocation} />
      <div>
        <div className="grid grid-cols-2 md:w-9/12 w-10/12 m-auto p-2 gap-4 md:grid-cols-3">
          {aboutItems.map((item) => (
              <Link to={item.link}>
            <div key={item.title} className=" md:w-9/12 w-11/12 bg-slate-100 hover:bg-slate-300 shadow-md rounded-md h-32 p-4 items-center"> 
                <div className="item-center w-fit m-auto">{item.icon}</div>
                <div className="m-auto mt-3 w-fit text-lg text-center md:text-xl">{item.title}</div>
            </div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
