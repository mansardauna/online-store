import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  // Use useSelector to access userProfile from the Redux store
  const userProfile = useSelector((state) => state.auth.userProfile);

  if (!userProfile) {
    // Handle case when userProfile is not available (e.g., user is not logged in)
    return <div>User is not logged in.</div>;
  }

  return (
    <div>
      <h2>User Profile Page</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      {/* Display other profile information */}
    </div>
  );
};

export default UserProfile;
