import React from "react";
import "react-toastify/dist/ReactToastify.css";
interface ToastProps{
  message:any;
  onClose:any;
}
const Toast:React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="custom-toast">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
