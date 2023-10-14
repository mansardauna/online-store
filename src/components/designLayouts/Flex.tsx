import React, { ReactNode } from "react";

interface flexProps{
  children:ReactNode;
  className : string;

}
const Flex:React.FC<flexProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default Flex;
