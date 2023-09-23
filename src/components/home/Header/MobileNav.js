import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo, logoLight } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import HeaderBottom from "./HeaderBottom";

const MobileNav = () => {
  const [showMenu, setShowMenu] = useState(true);
  
  const [sidenav, setSidenav] = useState(false);
  const [category, setCategory] = useState(false);
  const [brand, setBrand] = useState(false);
  const location = useLocation();
  useEffect(() => {
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
  }, []);

  return (
    <div className="w-full mt-5 z-50">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <div className=" items-center justify-between h-full">
          

          <div>
           
              <div className="md:hidden block fixed bottom-0 left-0 w-full h-10 p-2  bg-[#F5F5F3] border-t border-gray-200 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative"
                >
                  <div className="w-full h-full px-5">
                    <div className=" flex flex-row justify-between gap-2">
                      {navBarList.map((item) => (
                        <span
                          className=""
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.icon}
                          </NavLink>
                        </span>
                      ))}
                    </div>
                  </div>
                  
                </motion.div>
              </div>
            
          </div>
          
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
