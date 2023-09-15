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
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import NewArrivals from "./components/home/NewArrivals/NewArrivals";
import SpecialOffers from "./components/home/SpecialOffers/SpecialOffers";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Watch from "./pages/Cart/Watch";
import Order from "./pages/Cart/Order";
import Contact from "./pages/Contact/Contact";
import SignIn from "./pages/Account/SignIn"
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import ProductList from "./pages/ProductList/ProductList";
import Toast from "./components/ui/ToastMessage";
import UserProfile from "./pages/About/UserProfile";
import Sidebar from "./components/ui/Sidebar";



const Layout = () => {
  const isLoggin = useSelector((state) => state.auth.isLoggin);
  return (
    <>
      {isLoggin && (
        <div className="flex">
          <div className="w-[17%] h-screen fixed overflow-y-auto bg-[#F5F5F3] border border-r-gray-300 md:block hidden">
    <Sidebar />
        
          </div>

          <div className="md:w-[83%] md:ml-[17%] w-full ml-0">
            <HeaderBottom/>
            <ScrollRestoration />
            <Outlet />
          <FooterBottom/>
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
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/filter" element={<ProductList />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>

        <Route path="/watchlist" element={<Watch />}></Route >

        {/* ==================== Header Navlink End here ===================== */}
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
