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
import NewArrivals from "./components/home/NewArrivals/NewArrivals";
import SpecialOffers from "./components/home/SpecialOffers/SpecialOffers";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Watch from "./pages/Cart/Watch";
import Order from "./pages/Cart/Order";
import SignIn from "./pages/Account/SignIn"
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import ProductList from "./pages/ProductList/ProductList";
import Sidebar from "./components/ui/Sidebar";
import ComingSoon from "./pages/Coming/ComingSoon";
import Dashboard from "./pages/Dashboard/Dashboard";
import Feed from "./pages/feed/feed";
import MobileNav from "./components/home/Header/MobileNav";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import SideCart from "./components/ui/SideCart";
import UserProfile from "./pages/Dashboard/components/UserProfile";
import Notification from "./components/ui/Notification";
import Settings from "./Settings/Settings";



const Layout = () => {
  const isLoggin = useSelector((state) => state.auth.isLoggin);
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
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/feeds" element={<Feed />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/coming" element={<ComingSoon />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>

        <Route path="/watchlist" element={<Watch />}></Route >

       
        < Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order" element={<Order />}></Route>

        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/bestsell" element={<BestSellers />}></Route>
      <Route path="/special" element={<SpecialOffers />}></Route>
      <Route path="/new" element={<NewArrivals />}></Route>
    </Route>

  )
);

function App() {

  return (
    <>
      <div className="font-bodyFont">
        <RouterProvider router={router} />
      </div>
    </>
  );
}


export default App;
