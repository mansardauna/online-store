import React from "react";
interface headingProps{
  heading : string;
}
const Heading: React.FC<headingProps> = ({ heading }) => {
  return <div className="text-3xl font-semibold pb-6">{heading}</div>;
};

export default Heading;
