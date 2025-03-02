import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import  {CaptainDataContext} from "../context/CaptainContext.jsx"
const CaptainSignup = () => {
  const {captain,setCaptain}=useContext(CaptainDataContext)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("");

  const [userData, setUserData] = useState({});
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
      vehicle: {
        color: color,
        plate: plate,
        vehicleType: vehicleType,
        capacity: capacity,
      },
    };


    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newUser
      );
      if (res.status === 201) {
        alert("User Registered Successfully");
        setUserData(res.data);
  setCaptain(res.data.captain);;
        localStorage.setItem("token", res.data.token);
        setFirstname(" ");
        setLastname(" ");
        setEmail(" ");
        setPassword(" ");
        setColor(" ");
        setPlate(" ");
        setCapacity(" ");
        setVehicleType(" ");
        navigate("/captain-login");
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
          <h3 className="font-medium">Vehicle</h3>
          <div className=" flex gap-2 ">
            <input
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              className="bg-[#EEEEEE] w-1/2 px-2 py-2 rounded-sm placeholder:text-sm"
              placeholder="color"
            />
            <input
              required
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              type="text"
              className="bg-[#EEEEEE] w-1/2 px-2 py-2 rounded-sm placeholder:text-sm"
              placeholder="Plate"
            />
          </div>
          <div className=" flex gap-2 ">
            <input
              required
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
              className="bg-[#EEEEEE] w-1/2 px-2 py-2 rounded-sm placeholder:text-sm"
              placeholder="capacity"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              name=""
              id=""
              className="bg-[#EEEEEE] w-1/2 px-2 py-2 rounded-sm placeholder:text-sm"
            >
              <option value="" disabled>
                Vehicle Option
              </option>
              <option value="Car">Car</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Auto">Auto</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            to="/login"
            className="bg-black flex items-center justify-center text-white py-2 px-2 rounded-lg w-full font-semibold"
          >
            Continue
          </button>
          <p className="flex items-center justify-center font-semibold">
            Already have a account?
            <Link
              to="/captain-login"
              className="text-blue-700 cursor-pointer px-1"
            >
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

export default CaptainSignup;
