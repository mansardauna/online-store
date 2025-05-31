// constants/constant.ts
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
  fashion15,
  fashion16,
  fashion2,
  fashion3,
  fashion5,
  fashion6,
  fashion7,
  fashion8,
  fashion9,
  elect,
  elect2,
  elect4,
  elect5,
  elect6,
  elect7,
  men1,
  men2,
  music,
  music2,
  music3,
  car,
  car2,
  car3,
  car5,
  car6,
} from "../assets/images";

export interface FilterOption {
  title: string;
  icon: React.ReactNode;
}

export interface CategoryData {
  title: string;
  label: string;
  items: string[];
}

export interface Product {
  id: string;
  img: string;
  productName: string;
  price: string;
  category: string;
  color: string;
  des: string;
  videoUrl: string;
  filter: string;
  badge: boolean;
  type: string;
  store: string;
  location: string;
  createdAt: string;
}

export interface Notification {
    id: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    timestamp: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'buyer';
    lastActive: string;
  }
  export interface Order {
    id: string;
    productId: string;
    customerId: string;
    quantity: number;
    totalAmount: string;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    orderDate: string;
    deliveryDate?: string;
  }
  export interface Invoice {
    id: string;
    productId: string; // Links to Product
    customer: string;
    amount: string;
    status: 'paid' | 'pending' | 'overdue';
    dueDate: string;
    createdAt: string;
  }
  export const notifications: Notification[] = [
    { id: '1', message: 'New invoice #INV001 created', type: 'info', timestamp: '2025-05-30T10:00:00Z' },
    { id: '2', message: 'Invoice #INV002 is overdue', type: 'warning', timestamp: '2025-05-29T15:00:00Z' },
    { id: '3', message: 'User John Doe registered', type: 'success', timestamp: '2025-05-28T09:00:00Z' },
  ];
  

  export const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', lastActive: '2025-05-30T08:00:00Z' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'buyer', lastActive: '2025-05-29T12:00:00Z' },
    { id: '3', name: 'Alice Johnson', email: 'alice@example.com', role: 'buyer', lastActive: '2025-05-28T10:00:00Z' },
    { id: '4', name: 'Bob Wilson', email: 'bob@example.com', role: 'buyer', lastActive: '2025-05-27T15:00:00Z' },
  ];
  export const orders: Order[] = [
    {
      id: 'ORD001',
      productId: '1',
      customerId: '1',
      quantity: 2,
      totalAmount: '70.00',
      status: 'pending',
      orderDate: '2025-05-10T10:00:00Z',
    },
    {
      id: 'ORD002',
      productId: '2',
      customerId: '2',
      quantity: 1,
      totalAmount: '112.00',
      status: 'shipped',
      orderDate: '2025-05-09T12:00:00Z',
      deliveryDate: '2025-05-15T12:00:00Z',
    },
    {
      id: 'ORD003',
      productId: '3',
      customerId: '1',
      quantity: 1,
      totalAmount: '134000.00',
      status: 'delivered',
      orderDate: '2025-05-08T09:00:00Z',
      deliveryDate: '2025-05-12T09:00:00Z',
    },
    {
      id: 'ORD004',
      productId: '4',
      customerId: '2',
      quantity: 3,
      totalAmount: '336.00',
      status: 'cancelled',
      orderDate: '2025-05-07T14:00:00Z',
    },
    {
      id: 'ORD005',
      productId: '5',
      customerId: '1',
      quantity: 1,
      totalAmount: '134.00',
      status: 'pending',
      orderDate: '2025-05-06T11:00:00Z',
    },
    {
      id: 'ORD006',
      productId: '6',
      customerId: '2',
      quantity: 2,
      totalAmount: '224.00',
      status: 'shipped',
      orderDate: '2025-05-05T13:00:00Z',
      deliveryDate: '2025-05-10T13:00:00Z',
    },
    {
      id: 'ORD007',
      productId: '7',
      customerId: '1',
      quantity: 1,
      totalAmount: '134.00',
      status: 'delivered',
      orderDate: '2025-05-04T10:00:00Z',
      deliveryDate: '2025-05-08T10:00:00Z',
    },
    {
      id: 'ORD008',
      productId: '8',
      customerId: '2',
      quantity: 2,
      totalAmount: '178.00',
      status: 'pending',
      orderDate: '2025-05-03T09:00:00Z',
    },
  ];
    
  
  export const invoices: Invoice[] = [
    {
      id: 'INV001',
      productId: '1', // Cap for Boys
      customer: 'Alice Johnson',
      amount: '35.00',
      status: 'paid',
      dueDate: '2025-05-15',
      createdAt: '2025-05-01T10:00:00Z',
    },
    {
      id: 'INV002',
      productId: '2', // Mystery Novel
      customer: 'Bob Wilson',
      amount: '112.00',
      status: 'overdue',
      dueDate: '2025-05-20',
      createdAt: '2025-04-20T12:00:00Z',
    },
    // Add more invoices linking to paginationItems
  ];  

export const filterOption: FilterOption[] = [
  { title: "All", icon: <BsCardList style={{ fontSize: "28px" }} /> },
  { title: "fashion", icon: <GiAmpleDress style={{ fontSize: "28px" }} /> },
  { title: "phone", icon: <BsPhone style={{ fontSize: "28px" }} /> },
  { title: "book", icon: <GiBookmarklet style={{ fontSize: "28px" }} /> },
  { title: "music", icon: <BsMusicNoteBeamed style={{ fontSize: "28px" }} /> },
  { title: "car", icon: <FaCarSide style={{ fontSize: "28px" }} /> },
  { title: "electronic", icon: <BiDesktop style={{ fontSize: "28px" }} /> },
];

export const categoriesData: Record<string, CategoryData> = {
  fashion: {
    title: "fashion",
    label: "Type",
    items: ["cap", "dress", "shoe"],
  },
  phone: {
    title: "phone",
    label: "By Brand",
    items: ["apple", "samsung", "vivo"],
  },
  book: {
    title: "book",
    label: "Type",
    items: ["novel", "journal", "article"],
  },
  music: {
    title: "music",
    label: "Type",
    items: ["rap", "afro", "trap"],
  },
  car: {
    title: "car",
    label: "By Brand",
    items: ["benz", "toyota", "honda"],
  },
  electronic: {
    title: "electronic",
    label: "By Brand",
    items: ["television", "speaker", "powerbank"],
  },
};

export const paginationItems: Product[] = [
  {
    id: "1",
    img: spfOne,
    productName: "Cap for Boys",
    price: "35.00",
    category: "fashion",
    color: "Black",
    des: "Stylish cap for casual wear.",
    videoUrl: "/cap.mp4",
    filter: "cap",
    badge: true,
    type: "new",
    store: "TrendyWear",
    location: "New York",
    createdAt: "2025-05-01T10:00:00Z",
  },
  {
    id: "2",
    img: book4,
    productName: "Mystery Novel",
    price: "112.00",
    category: "book",
    color: "N/A",
    des: "A gripping mystery novel.",
    videoUrl: "/novel.mp4",
    filter: "novel",
    badge: true,
    type: "special",
    store: "BookHaven",
    location: "Chicago",
    createdAt: "2025-04-20T12:00:00Z",
  },
  {
    id: "3",
    img: car2,
    productName: "Mercedes Benz",
    price: "134000.00",
    category: "car",
    color: "Silver",
    des: "Luxury sedan with advanced features.",
    videoUrl: "/benz.mp4",
    filter: "benz",
    badge: true,
    type: "new",
    store: "AutoElite",
    location: "Los Angeles",
    createdAt: "2025-05-10T09:00:00Z",
  },
  {
    id: "4",
    img: music2,
    productName: "Afro Beats Album",
    price: "112.00",
    category: "music",
    color: "N/A",
    des: "Latest Afro beats collection.",
    videoUrl: "/afro.mp4",
    filter: "afro",
    badge: true,
    type: "best",
    store: "MusicVibes",
    location: "Miami",
    createdAt: "2025-04-15T14:00:00Z",
  },
  {
    id: "5",
    img: elect,
    productName: "Smart TV",
    price: "134.00",
    category: "electronic",
    color: "Black",
    des: "4K Smart TV with streaming apps.",
    videoUrl: "/television.mp4",
    filter: "television",
    badge: true,
    type: "special",
    store: "TechTrend",
    location: "San Francisco",
    createdAt: "2025-05-05T11:00:00Z",
  },
  {
    id: "6",
    img: phone6,
    productName: "Vivo Smartphone",
    price: "112.00",
    category: "phone",
    color: "Blue",
    des: "High-performance smartphone.",
    videoUrl: "/vivo.mp4",
    filter: "vivo",
    badge: true,
    type: "best",
    store: "PhoneZone",
    location: "Boston",
    createdAt: "2025-04-25T13:00:00Z",
  },
  {
    id: "7",
    img: fashion6,
    productName: "Running Shoes",
    price: "134.00",
    category: "fashion",
    color: "White",
    des: "Comfortable running shoes.",
    videoUrl: "/shoe.mp4",
    filter: "shoe",
    badge: true,
    type: "special",
    store: "TrendyWear",
    location: "New York",
    createdAt: "2025-05-02T10:00:00Z",
  },
  {
    id: "8",
    img: fashion15,
    productName: "Men's Sneakers",
    price: "89.00",
    category: "fashion",
    color: "Red",
    des: "Trendy sneakers for men.",
    videoUrl: "/shoe.mp4",
    filter: "shoe",
    badge: true,
    type: "new",
    store: "TrendyWear",
    location: "Seattle",
    createdAt: "2025-05-03T09:00:00Z",
  },
  {
    id: "9",
    img: phone5,
    productName: "Samsung Galaxy",
    price: "799.00",
    category: "phone",
    color: "Black",
    des: "Latest Samsung smartphone.",
    videoUrl: "/samsung.mp4",
    filter: "samsung",
    badge: true,
    type: "best",
    store: "PhoneZone",
    location: "Houston",
    createdAt: "2025-04-28T15:00:00Z",
  },
  {
    id: "10",
    img: book3,
    productName: "Science Journal",
    price: "45.00",
    category: "book",
    color: "N/A",
    des: "Academic science journal.",
    videoUrl: "/journal.mp4",
    filter: "journal",
    badge: true,
    type: "new",
    store: "BookHaven",
    location: "Chicago",
    createdAt: "2025-04-22T11:00:00Z",
  },
  {
    id: "11",
    img: car5,
    productName: "Toyota Camry",
    price: "35000.00",
    category: "car",
    color: "Blue",
    des: "Reliable family sedan.",
    videoUrl: "/toyota.mp4",
    filter: "toyota",
    badge: true,
    type: "special",
    store: "AutoElite",
    location: "Dallas",
    createdAt: "2025-05-08T10:00:00Z",
  },
  {
    id: "12",
    img: music3,
    productName: "Rap Album",
    price: "99.00",
    category: "music",
    color: "N/A",
    des: "Top rap hits collection.",
    videoUrl: "/rap.mp4",
    filter: "rap",
    badge: true,
    type: "best",
    store: "MusicVibes",
    location: "Atlanta",
    createdAt: "2025-04-18T16:00:00Z",
  },
  {
    id: "13",
    img: elect4,
    productName: "Bluetooth Speaker",
    price: "59.00",
    category: "electronic",
    color: "Black",
    des: "Portable Bluetooth speaker.",
    videoUrl: "/speaker.mp4",
    filter: "speaker",
    badge: true,
    type: "new",
    store: "TechTrend",
    location: "San Francisco",
    createdAt: "2025-05-06T12:00:00Z",
  },
  {
    id: "14",
    img: fashion2,
    productName: "Summer Dress",
    price: "65.00",
    category: "fashion",
    color: "Yellow",
    des: "Light summer dress.",
    videoUrl: "/dress.mp4",
    filter: "dress",
    badge: true,
    type: "special",
    store: "TrendyWear",
    location: "Miami",
    createdAt: "2025-05-01T14:00:00Z",
  },
  {
    id: "15",
    img: phone3,
    productName: "iPhone 14",
    price: "999.00",
    category: "phone",
    color: "White",
    des: "Latest Apple iPhone.",
    videoUrl: "/apple.mp4",
    filter: "apple",
    badge: true,
    type: "new",
    store: "PhoneZone",
    location: "New York",
    createdAt: "2025-04-30T10:00:00Z",
  },
  {
    id: "16",
    img: book2,
    productName: "Article Collection",
    price: "30.00",
    category: "book",
    color: "N/A",
    des: "Collection of insightful articles.",
    videoUrl: "/article.mp4",
    filter: "article",
    badge: true,
    type: "best",
    store: "BookHaven",
    location: "Boston",
    createdAt: "2025-04-19T13:00:00Z",
  },
  {
    id: "17",
    img: car6,
    productName: "Honda Civic",
    price: "28000.00",
    category: "car",
    color: "Red",
    des: "Sporty compact car.",
    videoUrl: "/honda.mp4",
    filter: "honda",
    badge: true,
    type: "new",
    store: "AutoElite",
    location: "Phoenix",
    createdAt: "2025-05-09T11:00:00Z",
  },
  {
    id: "18",
    img: music,
    productName: "Trap Mixtape",
    price: "85.00",
    category: "music",
    color: "N/A",
    des: "Latest trap music mixtape.",
    videoUrl: "/trap.mp4",
    filter: "trap",
    badge: true,
    type: "special",
    store: "MusicVibes",
    location: "Los Angeles",
    createdAt: "2025-04-17T15:00:00Z",
  },
  {
    id: "19",
    img: elect5,
    productName: "Power Bank",
    price: "25.00",
    category: "electronic",
    color: "Silver",
    des: "High-capacity power bank.",
    videoUrl: "/powerbank.mp4",
    filter: "powerbank",
    badge: true,
    type: "best",
    store: "TechTrend",
    location: "Seattle",
    createdAt: "2025-05-04T10:00:00Z",
  },
  {
    id: "20",
    img: fashion9,
    productName: "Casual Cap",
    price: "20.00",
    category: "fashion",
    color: "Blue",
    des: "Casual cap for everyday use.",
    videoUrl: "/cap.mp4",
    filter: "cap",
    badge: true,
    type: "new",
    store: "TrendyWear",
    location: "Chicago",
    createdAt: "2025-05-07T09:00:00Z",
  },
];