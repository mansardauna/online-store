import React from "react";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  Navigate,
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
import AdminDashboard from "./pages/Dashboard/AdminDashbboard";
import ManageProducts from "./pages/Dashboard/components/ManageProduct";
import ManageOrders from "./pages/Dashboard/components/ManageOrder";
import ManageUsers from "./pages/Dashboard/components/ManageUser";
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

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({
  children,
  adminOnly = false,
}) => {
  const { isLogging, userProfile } = useSelector((state: RootState) => state.auth);
  if (!isLogging) {
    return <Navigate to="/signin" replace />;
  }
  if (adminOnly && userProfile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const Layout: React.FC = () => {
  const isLogging = useSelector((state: RootState) => state.auth.isLogging);

  return (
    <>
      {isLogging ? (
        <div className="flex">
          <div className="xl:w-[15%] md:w-[22%] h-screen fixed overflow-y-auto bg-[#e8f0e8f1] border border-r-gray-300 md:block hidden">
            <Sidebar />
          </div>
          <div className="xl:w-[85%] md:w-[78%] md:ml-[22%] xl:ml-[15%] w-full ml-0">
            <HeaderBottom />
            <ScrollRestoration />
            <div className="fixed z-10 md:hidden right-0 bottom-40">
              <SpecialCase />
              <SideCart />
            </div>
            <Outlet />
            <FooterBottom />
            <MobileNav />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/bestsell" element={<BestSellers />} />
      <Route path="/special" element={<SpecialOffers />} />
      <Route path="/new" element={<NewArrivals />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:_id" element={<ProductDetails />} />
      <Route path="/coming" element={<ComingSoon />} />

      {/* Protected Routes (Buyer or Admin) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feeds"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notification"
        element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <Watch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/offer"
        element={
          <ProtectedRoute>
            <Offer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order"
        element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        }
      />
      <Route
        path="/paymentgateway"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      {/* Admin-Only Routes */}
      <Route
        path="/dashboard/products"
        element={
          <ProtectedRoute adminOnly>
            <ManageProducts/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/orders"
        element={
          <ProtectedRoute adminOnly>
            <ManageOrders/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute adminOnly>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/add"
        element={
          <ProtectedRoute adminOnly>
            <div>Add Product</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/admin"
        element={
          <ProtectedRoute adminOnly>
            <div>Admin Settings</div>
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;