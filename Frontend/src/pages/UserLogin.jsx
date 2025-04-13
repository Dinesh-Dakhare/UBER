import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const user = {
        email,
        password,
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        user
      );
      if (res.status === 201) {
        // alert("Logged In Successfully");
        setUserData(res.data);
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        gsap.to(window, {
          duration: 0.5, // Animation duration in seconds
          opacity: 0, // Fade out
          onComplete: () => {
            // Navigate to the new page after the animation completes
            navigate('/home'); // Replace with your desired route
          },
        });
        // navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <img
        className="w-18 py-4 mx-4"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />
      <div className="p-7 space-y-4 h-screen">
        <form className=" space-y-3">
          <h3 className="font-semibold">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="bg-[#EEEEEE] w-full px-2 py-2 rounded-sm placeholder:text-sm"
            placeholder="email@example.com"
          />
          <h3 className="font-semibold">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-[#EEEEEE] w-full px-2 py-2 rounded-sm placeholder:text-sm"
            placeholder="password"
          />
          <button
            onClick={handleSubmit}
            className="bg-black  text-white py-2 px-2 rounded-lg w-full font-semibold"
          >
            Login
          </button>
          <p className="flex items-center justify-center font-semibold">
            New here?
            <Link to="/register" className="text-blue-700 cursor-pointer">
              {" "}
              Create new Account
            </Link>
          </p>
        </form>
        <p className="flex justify-center font-semibold">or</p>
        <Link
          to="/captain-login"
          className="bg-black text-white w-full flex items-center justify-center py-2 px-2 font-semibold rounded-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </>
  );
};

export default UserLogin;
