import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const aboutItems = [
  {
    title: "Profile",
    link: "/profile",
    icon: "",
  },
  {
    title: "Order",
    link: "/order",
    icon: "",
  },
  {
    title: "Payment Method",
    link: "/payment",
    icon: "", 
  },
  {
    title: "Address",
    link: "/address",
    icon: "", 
  },
  {
    title: "Settings",
    link: "/settings",
    icon: "",
  },
  {
    title: "History",
    link: "/history",
    icon: "", 
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
        <div className="grid grid-cols-2 w-10/12 m-auto p-2 gap-4 md:grid-cols-3">
          {aboutItems.map((item) => (
              <Link to={item.link}>
            <div key={item.title} className=" w-11/12 bg-slate-300 hover:bg-slate-400 shadow-md rounded-md h-32 p-4 items-center"> 
                <div>{item.icon}</div>
                <div className="m-auto w-fit text-lg text-center md:text-xl font-semibold">{item.title}</div>
            </div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
