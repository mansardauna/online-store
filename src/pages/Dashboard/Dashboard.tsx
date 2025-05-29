import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserProfile from "./components/UserProfile";



const Dashboard:React.FC = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  return (
    <div className="max-w-container mx-auto h-[85%] overflow-hidden px-4 mb-4">
      <div>
       <UserProfile />
      </div>
    </div>
  );
};

export default Dashboard;
