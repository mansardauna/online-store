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
  },
  {
    _id: 1002,
    title: "Feeds",
    link: "/contact",
  },
  {
    _id: 1003,
    title: "Settings",
    link: "/about",
  },



];
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
    _id: 1001,
    img: spfOne,
    catergory: 'fashion',
    price: "35.00",
    filter: "cap",
    productName: "Cap for Boys",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    id: 1,
    filter: "novel",
    productName: "book",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'book',
    price: 112,
    img: book4
  },
  {
    id: 2,
    filter: "benz",
    productName: "Car",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'car',
    price: 134,
    img: car
  },
  {
    id: 3,
    filter: "afro",
    productName: "Album",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'music',
    price: 112,
    img: music2
  },
  {
    id: 4,
    filter: "television",
    productName: "Electronic",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'electronic',
    price: 134,
    img: elect
  },
  {
    id: 5,
    filter: "vivo",
    productName: "Smart phone",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'phone',
    price: 112,
    img: phone6
  },
  {
    id: 2,
    filter: "shoe",
    productName: "fashion",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'fashion',
    price: 134,
    img: fashion6
  },
  {
    id: 6,
    filter: "toyota",
    productName: "Sport car",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'car',
    price: 112,
    img: car5
  },
  {
    id: 2,
    filter: "shoe",
    productName: "shoe",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'fashion',
    price: 134,
    img: fashion15
  },
  {
    id: 6,
    filter: "rap",
    productName: "Song",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'music',
    price: 112,
    img: music3
  },
  {
    id: 7,
    filter: "article",
    productName: "Novel",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'Book2',
    price: 134,
    img: book3
  },
  {
    id: 8,
    filter: "samsung",
    productName: "Smart phone",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'phone',
    price: 112,
    img: phone5
  },
  {
    id: 9,
    filter: "shoe",
    productName: "Shoe for men",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    Catergory: 'fashion',
    price: 134,
    img: fashion5
  },
  {
    id: 10,
    filter: "shoe",
    productName: "Men wear",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'fashion',
    price: 112,
    img: fashion2
  },
  {
    id: 11,
    filter: "Television",
    productName: "Tv",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'Electronic',
    price: 134,
    img: elect4
  },
  {
    id: 12,
    filter: "dress",
    productName: "Men dress",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    Catergory: 'fashion',
    price: 112,
    img: fashion7
  },
  {
    id: 13,
    filter: "iphone",
    productName: "smart Phone",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'phone',
    price: 134,
    img: phone3
  },

  {
    id: 2,
    filter: "journal",
    productName: "Book",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'book',
    price: 134,
    img: book2
  },
  {
    id: 6,
    filter: "shoe",
    productName: "Shoe",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    Catergory: 'fashion',
    price: 112,
    img: fashion3
  },
  {
    id: 14,
    filter: "speaker",
    productName: "Electronic",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'electronic',
    price: 112,
    img: phone5
  },
  {
    id: 15,
    filter: "trap",
    productName: "Song-Plus",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'music',
    price: 134,
    img: music3
  },
  {
    id: 16,
    filter: "shoe",
    productName: "Neat shoe",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'fashion',
    price: 112,
    img: fashion6
  },
  {
    id: 2,
    filter: "television",
    productName: "gadget",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'Electronic',
    price: 134,
    img: elect5
  },
  {
    id: 6,
    filter: "television",
    productName: "Electronic",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'Electronic',
    price: 112,
    img: elect7
  },
  {
    id: 17,
    filter: "honda",
    productName: "Car_2",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'car',
    price: 134,
    img: car6
  },
  {
    id: 18,
    filter: "shoe",
    productName: "slide",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'fashion',
    price: 112,
    img: fashion9
  },
  {
    id: 19,
    filter: "journal",
    productName: "Books",
    badge: true,
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
    catergory: 'book',
    price: 134,
    img: book4
  },];
// =================== PaginationItems End here =============img