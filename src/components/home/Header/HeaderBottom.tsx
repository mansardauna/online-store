import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUser, FaCaretDown, FaLanguage } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paginationItems } from "../../../constants/constant";
import { logout, login } from "../../../redux/authSlice";
import { useTranslation } from "react-i18next";
import { BiNotification } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";
import SideCart from "../../ui/SideCart";
import SpecialCase from "../../SpecialCase/SpecialCase";

const HeaderBottom: React.FC = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState<string | null>(null); // Control both user and language dropdowns
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current && ref.current.contains(e.target as Node)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  // Define the toggleDropdown function
  const toggleDropdown = (dropdown: string) => {
    if (showDropdown === dropdown) {
      setShowDropdown(null);
    } else {
      setShowDropdown(dropdown);
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { t, i18n } = useTranslation('layout');
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item: any) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const dispatch = useDispatch();
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/signIn");
  };

  return (
    <div className="w-full mb-4 z-50 border-b shadow-sm bg-white border-gray-100 sticky top-0 rounded-sm pt-1 xl:pt-0 md:pt-7">
      <div className="max-w-container mx-auto">
        <div className="md:hidden block">
          <div className="text-black font-bold font-dancing text-2xl w-full text-center bg-hite p-2 m-auto">
            {t("digital", { ns: "layout" })}
          </div>
        </div>
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between m-auto w-11/12 px-4 pb-4 lg:pb-0 h-full lg:h-24">
        
          <Link to='./products'>
            <div className=" h-14  cursor-pointer xl:block hidden items-center text-primeColor">
              <p className="mt-4 text-gray-700">{t("shop by", { ns: "layout" })}</p>
            </div>
          </Link>
          <div className="relative bg-transparent border  border-gray-400 w-full lg:w-[600px] h-[50px] text-base text-primeColo flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full  outline-none bg-transparent  placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder={t("search", { ns: "layout" })}
            />
            <FaSearch className="w-5 h-5" />
            {searchQuery && (
              <div
                className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
              >
                {searchQuery &&
                  filteredProducts.map((item: any) => (
                    <div
                    onClick={() => {
                      navigate(
                        `/product/${item.productName
                          .toLowerCase()
                          .split(" ")
                          .join("")}`,
                        {
                          state: {
                            item: item,
                          },
                        });
                      setShowSearchBar(true);
                      setSearchQuery("");
                    }}
                      key={item._id}
                      className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                    >
                      <img className="w-24" src={item.img} alt="productImg" />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">
                          {item.productName}
                        </p>
                        <p className="text-xs">{item.des}</p>
                        <p className="text-sm">
                          Price:{" "}
                          <span className="text-primeColor font-semibold">
                            ${item.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center cursor-pointer text-lg relative">
          <SideCart />
        <SpecialCase />
            <div onClick={() => toggleDropdown("user")} className="flex">
              <FaUser />
              <FaCaretDown />
            </div>
            {showDropdown === "user" && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-32 text-[#767676] h-auto p-4 pb-6"
              >
                <Link to="/settings" onClick={() => toggleDropdown(null)}>
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    {t("profile", { ns: "layout" })}
                  </li>
                </Link>
                <Link onClick={() => toggleDropdown(null)} to="/signup">
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    {t("signUp", { ns: "layout" })}
                  </li>
                </Link>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  {t("profile", { ns: "layout" })}
                </li>
                <li
                  onClick={(e) => {
                    toggleDropdown(null);
                    handleLogout(e);
                  }}
                  className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover.border-b-white hover.text-white duration-300 cursor-pointer"
                >
                  {t("logout", { ns: "layout" })}
                </li>
              </motion.ul>
            )}
            <div onClick={() => toggleDropdown("lang")} className="flex text-2xl">
              <FaLanguage />
            </div>
            {showDropdown === "lang" && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-32 text-[#767676] h-auto p-4 pb-6"
              >
                <li
                  onClick={() => {
                    changeLanguage("en");
                    toggleDropdown(null);
                  }}
                  className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover.border-b-white hover.text-white duration-300 cursor-pointer"
                >
                  {t("English", { ns: "layout" })}
                </li>
                <li
                  onClick={() => {
                    changeLanguage("es");
                    toggleDropdown(null);
                  }}
                  className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover.border-b-white hover.text-white duration-300 cursor-pointer"
                >
                  {t("Spanish", { ns: "layout" })}
                </li>
                <li
                  onClick={() => {
                    changeLanguage("ar");
                    toggleDropdown(null);
                  }}
                  className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover.border-b-white hover.text-white duration-300 cursor-pointer"
                >
                  {t("Arabic", { ns: "layout" })}
                </li>
                <li
                  onClick={() => {
                    changeLanguage("fr");
                    toggleDropdown(null);
                  }}
                  className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover.border-b-white hover.text-white duration-300 cursor-pointer"
                >
                  {t("French", { ns: "layout" })}
                </li>
              </motion.ul>
            )}
            <Link to="/notification">
              <MdNotifications />
            </Link>
            
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
