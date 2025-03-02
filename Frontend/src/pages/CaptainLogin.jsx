import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        user
      );
      if (res.status === 201) {
        alert("Logged In Successfully");
        setCaptain(res.data.captain);
        localStorage.setItem("token", res.data.token);
        navigate("/captain-home");
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
            type="submit"
            onClick={handleSubmit}
            className="bg-black flex items-center justify-center text-white py-2 px-2 rounded-lg w-full font-semibold"
          >
            Login
          </button>
          <p className="flex items-center justify-center font-semibold">
            Join a fleet?
            <Link
              to="/captain-register"
              className="text-blue-700 cursor-pointer"
            >
              Register new Account
            </Link>
          </p>
        </form>
        <p className="flex justify-center font-semibold">or</p>
        <Link
          to="/login"
          className="bg-black text-white w-full flex items-center justify-center py-2 px-2 font-semibold rounded-lg"
        >
          Sign in as User
        </Link>
      </div>
    </>
  );
};

export default CaptainLogin;
