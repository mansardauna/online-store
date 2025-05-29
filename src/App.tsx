import React from "react";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import BestSellers from "./components/home/BestSellers/BestSellers";
import FooterBottom from "./components/home/Footer/FooterBottom";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import MobileNav from "./components/home/Header/MobileNav";
import NewArrivals from "./components/home/NewArrivals/NewArrivals";
import SpecialOffers from "./components/home/SpecialOffers/SpecialOffers";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import Notification from "./components/ui/Notification";
import Sidebar from "./components/ui/Sidebar";
import SideCart from "./components/ui/SideCart";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Cart/Order";
import Watch from "./pages/Cart/Watch";
import ComingSoon from "./pages/Coming/ComingSoon";
import UserProfile from "./pages/Dashboard/components/UserProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Feed from "./pages/feed/feed";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductList from "./pages/ProductList/ProductList";
import Settings from "./Settings/Settings";


const Layout: React.FC = () => {
  const isLoggin = true;

  return (
    <>
      {isLoggin && (
        <div className="flex">
          <div className="xl:w-[17%] md:w-[22%] h-screen fixed overflow-y-auto bg-[#F5F5F3]  border border-r-gray-200 md:block hidden ">
            <Sidebar />
          </div>

          <div className="xl:w-[83%] md:w-[78%] md:ml-[22%] xl:ml-[17%] w-full ml-0">
            <HeaderBottom />
            <ScrollRestoration />
            <div className=" fixed z-10 md:hidden right-0 bottom-40">
              <SpecialCase />
              <SideCart />
            </div>
            <Outlet />
            <FooterBottom />
            <MobileNav />
          </div>
        </div>
      )}
      {!isLoggin && <SignIn />}
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />} />
        {/* <Route path="/shop" element={<Sho />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feeds" element={<Feed />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/coming" element={<ComingSoon />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/watchlist" element={<Watch />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/paymentgateway" element={<Payment />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/bestsell" element={<BestSellers />} />
      <Route path="/special" element={<SpecialOffers />} />
      <Route path="/new" element={<NewArrivals />} />
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <>
      <div className="font-bodyFont">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
