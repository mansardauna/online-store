import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
  book1,
  phone,
  fashion15,
  car2,
  shoe2
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { paginationItems } from "../../../constants";
import { useTranslation } from "react-i18next";
const NewArrivals = () => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter items by type and set filteredData
    const result = paginationItems.filter((curData) => {
      return curData.type === "new"; // Replace "Type1" with your actual type name
    });
    setFilteredData(result);
  }, []);

  const { t } = useTranslation(["layout"])

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
      <Heading heading=     {t("newArr", { ns: "layout" })} />
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
            category={item.catergory}
            des={item.des}
            videoUrl={item.videoUrl}
          />
        </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
