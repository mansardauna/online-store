import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { navBarList, NavItem } from "../../../constants";
import { useTranslation } from "react-i18next";

interface RootState {
  auth: {
    isLogging: boolean;
    userProfile?: {
      name: string;
      email: string;
      password: string;
      role: "admin" | "buyer";
    };
  };
}

const Header: React.FC = () => {
  const { t } = useTranslation(["layout"]);
  const [showMenu, setShowMenu] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const userRole = useSelector((state: RootState) => state.auth.userProfile?.role);

  useEffect(() => {
    const ResponsiveMenu = () => {
      setShowMenu(window.innerWidth >= 667);
    };
    ResponsiveMenu();
    window.addEventListener("resize", ResponsiveMenu);
    return () => window.removeEventListener("resize", ResponsiveMenu);
  }, []);

  const toggleSubmenu = (itemId: string) => {
    setActiveSubmenu(activeSubmenu === itemId ? null : itemId);
  };

  // Filter submenus based on user role
  const filterSubmenu = (subMenu: { title: string; link: string }[]) => {
    if (!userRole) return [];
    return subMenu.filter((item) => {
      if (userRole === "admin") {
        return true; // Admins see all submenu items
      } else {
        // Buyers see only non-admin submenu items
        return !item.link.includes("/dashboard/products") &&
               !item.link.includes("/dashboard/orders") &&
               !item.link.includes("/dashboard/users") &&
               !item.link.includes("/products/add") &&
               !item.link.includes("/settings/admin");
      }
    });
  };

  return (
    <div className="w-full mt-5 z-50">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <div className="items-center justify-between h-full">
          {/* Desktop Menu */}
          <motion.ul
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`${
              showMenu ? "flex" : "hidden"
            } flex-col z-50 p-0 gap-5 md:flex`}
          >
            {navBarList.map((item: NavItem) => (
              <div key={item._id} className="relative">
                <NavLink
                  className="font-normal hover:font-bold w-full justify-center text-xl items-center text-[#767676] hover:text-[#262626] hoverEffect cursor-pointer md:text-lg rounded-lg"
                  to={item.link}
                  state={{ data: location.pathname.split("/")[1] }}
                >
                  <div className="flex gap-4 w-full mb-2 p-2 items-center">
                    <span title={t(`${item.title}`, { ns: "layout" })}>{item.icon}</span>
                    <span>{t(`${item.title}`, { ns: "layout" })}</span>
                  </div>
                </NavLink>
                {/* Desktop Submenu */}
                {item.subMenu && item.subMenu.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-8 mt-2 flex flex-col gap-2"
                  >
                    {filterSubmenu(item.subMenu).map((subItem, index) => (
                      <li key={index}>
                        <NavLink
                          to={subItem.link}
                          className="text-sm text-[#767676] hover:text-[#262626]"
                          state={{ data: location.pathname.split("/")[1] }}
                        >
                          {t(subItem.title, { ns: "layout" })}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            ))}
          </motion.ul>

          {/* Mobile Menu */}
          <div className="md:hidden block fixed bottom-0 left-0 w-full h-auto p-2 bg-[#F5F5F3] border-t border-gray-200 z-50">
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full relative"
            >
              <div className="w-full h-full px-5">
                <div className="flex flex-row justify-between gap-2">
                  {navBarList.map((item: NavItem) => (
                    <div key={item._id} className="relative">
                      <NavLink
                        to={item.link}
                        state={{ data: location.pathname.split("/")[1] }}
                        className="flex items-center justify-center"
                        title={t(`${item.title}`, { ns: "layout" })}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSubmenu(item._id.toString());
                        }}
                      >
                        {item.icon}
                      </NavLink>
                      {activeSubmenu === item._id.toString() && item.subMenu && item.subMenu.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md p-2 w-32 text-center"
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            className="block text-sm font-medium text-[#767676] hover:text-[#262626] mb-2"
                            onClick={() => setActiveSubmenu(null)}
                          >
                            {t(`${item.title}`, { ns: "layout" })}
                          </NavLink>
                          {filterSubmenu(item.subMenu).map((subItem, index) => (
                            <NavLink
                              key={index}
                              to={subItem.link}
                              state={{ data: location.pathname.split("/")[1] }}
                              className="block text-sm text-[#767676] hover:text-[#262626]"
                              onClick={() => setActiveSubmenu(null)}
                            >
                              {t(subItem.title, { ns: "layout" })}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;