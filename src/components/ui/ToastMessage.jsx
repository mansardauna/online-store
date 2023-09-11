import React from "react";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ message, onClose }) => {
  return (
    <div className="custom-toast">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
