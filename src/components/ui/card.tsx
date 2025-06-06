import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;