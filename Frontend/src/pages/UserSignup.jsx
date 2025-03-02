import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      if (res.status === 201) {
        alert("User Registered Successfully");
        setUserData(res.data);
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <img
        className="w-18 py-4 mx-4"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt=""
      />
      <div className="p-7 space-y-4 h-screen">
        <form className=" space-y-3">
          <h3 className="font-semibold">What's your name</h3>
          <div className="flex gap-2">
            <input
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              className="bg-[#EEEEEE]  px-2 py-2 rounded-sm w-1/2 placeholder:text-sm"
              placeholder="First name"
            />
            <input
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
              className="bg-[#EEEEEE] w-1/2 px-2 py-2 rounded-sm placeholder:text-sm "
              placeholder="Second name"
            />
          </div>
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
            Already have a account?
            <Link to="/login" className="text-blue-700 cursor-pointer px-1">
              Login here
            </Link>
          </p>
        </form>
        <p className="  text-xs leading-tight absolute bottom-10">
          By proceeding, you consent to get calls, whatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
