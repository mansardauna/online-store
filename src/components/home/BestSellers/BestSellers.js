import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { paginationItems } from "../../../constants";
import SamplePrevArrow from "../NewArrivals/SamplePrevArrow";
import SampleNextArrow from "../NewArrivals/SampleNextArrow";

const BestSellers = () => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter items by type and set filteredData
    const result = paginationItems.filter((curData) => {
      return curData.type === "best"; // Replace "Type1" with your actual type name
    });
    setFilteredData(result);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="Best Sellers" />
      <Slider {...settings}>
      {filteredData.map((item) => (
          <div className="px-2" key={item.id}>
          <Product
            _id={item.id}
            img={item.img}
            productName={item.productName}
            price={item.price}
            color={item.color}
            badge={true}
            des={item.des}
          />
        </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellers;
