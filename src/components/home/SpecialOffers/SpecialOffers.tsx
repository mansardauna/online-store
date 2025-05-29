import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { paginationItems } from "../../../constants";
import SamplePrevArrow from "../NewArrivals/SamplePrevArrow";
import SampleNextArrow from "../NewArrivals/SampleNextArrow";
import { useTranslation } from "react-i18next";

interface ProductData {
  id: any;
  img: string;
  productName: string;
  price: number;
  color: string;
  catergory: string;
  des: string;
  type: string;
}

const SpecialOffers: React.FC = () => {
  const [filteredData, setFilteredData] = useState<ProductData[]>([]);
  const { t } = useTranslation(['layout']);

  useEffect(() => {
    // Filter items by type and set filteredData
    const result = paginationItems.filter((curData:any) => {
      return curData.type === "special"; // Replace "special" with your actual type name
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
      <Heading heading={t("specialOff", { ns: "layout" })} />
      <Slider {...settings}>
        {filteredData.map((item) => (
          <div className="px-2" key={item.id}>
            <Product
              _id={item.id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={false}
              category={item.catergory}
              des={item.des}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialOffers;
