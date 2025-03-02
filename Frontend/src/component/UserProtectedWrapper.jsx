import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
 import { UserDataContext } from "../context/UserContext";
import { useState } from "react";
import axios from "axios";
const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
const {user,setUser} = useContext(UserDataContext)
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/login");
      });


  }, [token]);
  return <>{children}</>;
};

export default UserProtectedWrapper;
