import { useTranslation } from "react-i18next";
import { AiFillContacts, AiFillHome } from "react-icons/ai";

import { BiDesktop } from "react-icons/bi";
import { BsBagFill, BsCardList, BsMusicNoteBeamed, BsPhone } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { GiAmpleDress, GiBookmarklet } from "react-icons/gi";
import { MdDashboard, MdFeed, MdProductionQuantityLimits, MdSettings } from "react-icons/md";
import {
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
  book1,
  book2,
  book3,
  book4,
  phone,
  phone2,
  phone3,
  phone4,
  phone5,
  phone6,
  fashion15, fashion16, fashion2, fashion3, fashion5, fashion6, fashion7, fashion8, fashion9,
  elect, elect2, elect4, elect5, elect6, elect7,
  men1,
  men2,
  music,
  music2,
  music3,
  car, car2, car3, car5, car6,
} from "../assets/images/index";

// =================== NavBarList Start here ====================

export const navBarList = [
  {
    _id: 1001,
    title: "Home",
    link: "/",
    icon: <AiFillHome style={{ fontSize: "22px" }} />,
    subMenu: [], // No submenu for Home
  },
  {
    _id: 1002,
    title: "Dashboard",
    link: "/dashboard",
    icon: <MdDashboard style={{ fontSize: "22px" }} />,
    subMenu: [
      // Admin-specific submenus
      { title: "Manage Products", link: "/dashboard/products" },
      { title: "Manage Orders", link: "/dashboard/orders" },
      { title: "Manage Users", link: "/dashboard/users" },
      // Client-specific submenus
      { title: "My Dashboard", link: "/dashboard/client" },
    ],
  },
  {
    _id: 1003,
    title: "Products",
    link: "/products",
    icon: <BsBagFill style={{ fontSize: "22px" }} />,
    subMenu: [
      // Client-specific submenus
      { title: "All Products", link: "/products/all" },
      { title: "Cart", link: "/cart" },
      // Admin-specific submenu
      { title: "Add Product", link: "/products/add" },
    ],
  },
  {
    _id: 1004,
    title: "Feeds",
    link: "/feeds",
    icon: <MdFeed style={{ fontSize: "22px" }} />,
    subMenu: [
      // Client-specific submenus
      { title: "Latest Feeds", link: "/feeds/latest" },
      { title: "Followed Feeds", link: "/feeds/followed" },
    ],
  },
  {
    _id: 1005,
    title: "Settings",
    link: "/settings",
    icon: <MdSettings style={{ fontSize: "22px" }} />,
    subMenu: [
      // Shared submenus
      { title: "Profile", link: "/profile" },
      { title: "Preferences", link: "/settings/preferences" },
      // Admin-specific submenu
      { title: "Admin Settings", link: "/settings/admin" },
    ],
  },
];




export const filterOption = [
  { title: 'All', icon: <BsCardList style={{ fontSize: '28px' }} /> },
  { title: 'fashion', icon: <GiAmpleDress style={{ fontSize: '28px' }} /> },
  { title: 'phone', icon: <BsPhone style={{ fontSize: '28px' }} /> },
  { title: 'book', icon: <GiBookmarklet style={{ fontSize: '28px' }} /> },
  { title: 'music', icon: <BsMusicNoteBeamed style={{ fontSize: '28px' }} /> },
  { title: 'car', icon: <FaCarSide style={{ fontSize: '28px' }} /> },
  { title: 'Electronic', icon: <BiDesktop style={{ fontSize: '28px' }} /> },
];

export const categoriesData = {
  fashion: {
    title: 'fashion',
    label: 'Type',
    items: ['cap', 'dress', 'shoe'],
  },
  phone: {
    title: 'phone',
    label: 'By Brand',
    items: ['apple', 'samsung', 'vivo'],
  },
  book: {
    title: 'book',
    label: 'Type',
    items: ['novel', 'journal', 'article'],
  },
  music: {
    title: 'music',
    label: 'Type',
    items: ['rap', 'afro', 'trap'],
  },
  car: {
    title: 'car',
    label: 'By Brand',
    items: ['benz', 'toyota', 'honda'],
  },
  Electronic: {
    title: 'Electronic',
    label: 'By Brand',
    items: ['television', 'speaker', 'powerbank'],
  },
};
// =================== NavBarList End here ======================
// =================== Special Offer data Start here ============
export const SplOfferData = [
  {
    _id: "201",
    img: fashion15,
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "202",
    img: car,
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    type: "new",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "203",
    img: book2,
    productName: "Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    _id: "204",
    img: elect4,
    productName: "Sun glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
];
// =================== Special Offer data End here ==============

// =================== PaginationItems Start here ===============

export const paginationItems = [
  {
    _id: 1,
    img: spfOne,
    catergory: 'fashion',
    price: "35.00",
    filter: "cap",
    productName: "Cap for Boys",
    videoUrl:"/cap.mp4",
    badge: true,
    type: "new",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    id: 2,
    filter: "novel",
    productName: "book",
    badge: true,
    type: "special",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'book',
    price: 112,
    img: book4
  },
  {
    id: 3,
    filter: "benz",
    productName: "Car",
    badge: true,
    type: "new",
    videoUrl:"/vid.mp4",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'car',
    price: 134,
    img: car
  },
  {
    id: 4,
    filter: "afro",
    productName: "Album",
    badge: true,
    type: "best",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'music',
    price: 112,
    img: music2
  },
  {
    id: 5,
    filter: "television",
    productName: "Electronic",
    badge: true,
    type: "special",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'electronic',
    price: 134,
    img: elect
  },
  {
    id: 6,
    filter: "vivo",
    productName: "Smart phone",
    badge: true,
    type: "best",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'phone',
    price: 112,
    img: phone6
  },
  {
    id: 7,
    filter: "shoe",
    productName: "fashion",
    badge: true,
    type: "special",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'fashion',
    price: 134,
    img: fashion6
  },
  {
    id: 8,
    filter: "toyota",
    productName: "Sport car",
    badge: true,
    type: "new",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'car',
    price: 112,
    img: car5
  },
  {
    id: 9,
    filter: "shoe",
    productName: "shoe",
    badge: true,
    type: "best",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'fashion',
    price: 134,
    img: fashion15
  },
  {
    id: 10,
    filter: "rap",
    productName: "Song",
    badge: true,
    type: "special",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'music',
    price: 112,
    img: music3
  },
  {
    id: 11,
    filter: "article",
    productName: "Novel",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'Book2',
    price: 134,
    img: book3
  },
  {
    id: 12,
    filter: "samsung",
    productName: "Smart phone",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'phone',
    price: 112,
    img: phone5
  },
  {
    id: 13,
    filter: "shoe",
    productName: "Shoe for men",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    Catergory: 'fashion',
    price: 134,
    img: fashion5
  },
  {
    id: 14,
    filter: "shoe",
    productName: "Men wear",
    badge: true,
    type: "new",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'fashion',
    price: 112,
    img: fashion2
  },
  {
    id: 15,
    filter: "Television",
    productName: "Tv",
    badge: true,
    type: "best",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'Electronic',
    price: 134,
    img: elect4
  },
  {
    id: 16,
    filter: "dress",
    productName: "Men dress",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    Catergory: 'fashion',
    price: 112,
    img: fashion7
  },
  {
    id: 17,
    filter: "iphone",
    productName: "smart Phone",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'phone',
    price: 134,
    img: phone3
  },

  {
    id: 18,
    filter: "journal",
    productName: "Book",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'book',
    price: 134,
    img: book2
  },
  {
    id: 19,
    filter: "shoe",
    productName: "Shoe",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    Catergory: 'fashion',
    price: 112,
    img: fashion3
  },
  {
    id: 20,
    filter: "speaker",
    productName: "Electronic",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'electronic',
    price: 112,
    img: phone5
  },
  {
    id: 21,
    filter: "trap",
    productName: "Song-Plus",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'music',
    price: 134,
    img: music3
  },
  {
    id: 22,
    filter: "shoe",
    productName: "Neat shoe",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'fashion',
    price: 112,
    img: fashion6
  },
  {
    id: 23,
    filter: "television",
    productName: "gadget",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'Electronic',
    price: 134,
    img: elect5
  },
  {
    id: 24,
    filter: "television",
    productName: "Electronic",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'Electronic',
    price: 112,
    img: elect7
  },
  {
    id: 25,
    filter: "honda",
    productName: "Car_2",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'car',
    price: 134,
    img: car6
  },
  {
    id: 26,
    filter: "shoe",
    productName: "slide",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'fashion',
    price: 112,
    img: fashion9
  },
  {
    id: 27,
    filter: "journal",
    productName: "Books",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'book',
    price: 134,
    img: book4
  },];
// =================== PaginationItems End here =============img