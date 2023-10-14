import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navBarList } from "../../../constants";
import { Location } from "history"; // Add this import

const MobileNav: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [sidenav, setSidenav] = useState<boolean>(false);
  const [category, setCategory] = useState<boolean>(false);
  const [brand, setBrand] = useState<boolean>(false);
  const location: Location = useLocation();

  useEffect(() => {
    const responsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };

    responsiveMenu();
    window.addEventListener("resize", responsiveMenu);

    return () => {
      window.removeEventListener("resize", responsiveMenu);
    };
  }, []);

  return (
    <div className="w-full mt-5 z-50">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <div className="items-center justify between h-full">
          <div>
            <div className="md:hidden block fixed bottom-0 left-0 w-full h-10 p-2 bg-[#F5F5F3] border-t border-gray-200 z-50">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative"
              >
                <div className="w-full h-full px-5">
                  <div className="flex flex-row justify-between gap-2">
                    {navBarList.map((item:any) => (
                      <span className="" key={item._id}>
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
