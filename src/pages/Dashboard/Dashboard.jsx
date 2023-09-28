import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";



const Dashboard = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  return (
    <div className="max-w-container mx-auto px-4 mb-4">
      <div>
       <UserProfile />
      </div>
    </div>
  );
};

export default Dashboard;
