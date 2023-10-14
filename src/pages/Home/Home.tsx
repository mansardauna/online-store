import React from "react";
import Banner from "../../components/Banner/Banner";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";

const Home:React.FC = () => {
  return (
    <div className="w-full p-4 mx-auto">
      <Banner />
      <div className="max-w-container mt-5 mx-auto px-4">
        <NewArrivals />
        <BestSellers />
        <SpecialOffers />
        <YearProduct />
      </div>
    </div>
  );
};

export default Home;
