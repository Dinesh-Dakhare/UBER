import { useState, useRef, useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../component/LocationSearchPanel";
import VehicleAvailability from "../component/VehicleAvailability";
import VehicleComfirm from "../component/VehicleComfirm";
import WaitingForDriver from "../component/WaitingForDriver";
import LookingForDriver from "../component/LookingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../component/LiveTracking";

const Home = () => {
  const [currentLocation, setCurrentLocation] = useState(""); //pickup location
  const [destination, setDestination] = useState(""); //destination location
  const [currentLocationSuggestions, setCurrentLocationSuggestions] = useState(
    []
  );
  const [destinationLocationSuggestions, setDestinationLocationSuggestions] =
    useState([]);
  const [ride, setRide] = useState({});
  const [fare, setFare] = useState({});
  const [activeField, setActiveField] = useState("pickup");
  const [open, setOpen] = useState(false);
  const [vehicleModelOpen, setVehicleModelOpen] = useState(false);
  const [VehicleComfirmOpen, setVehicleComfirmOpen] = useState(false);
  const [lookingDriver, setLookingDriver] = useState(false);
  const [WaitingDriver, setWaitingDriver] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [driverDetail, setDriverDetail] = useState();
  const panelRef = useRef(null);
  const arrowIcon = useRef(null);
  const VehicleAvailabilityPanelRef = useRef(null);
  const VehicleComfirmpanelRef = useRef(null);
  const WaitingForDriverPanelRef = useRef(null);
  const LookingForDriverPanelRef = useRef(null);
  const navigate = useNavigate();
  //socket connection
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setLookingDriver(false);
    setWaitingDriver(true);
    setDriverDetail(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitingDriver(false);
    navigate("/riding",{state:{ride:ride}});
  });
  const pickupSuggesionHandler = async (e) => {
    setCurrentLocation(e.target.value);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        setActiveField("pickup");
        setCurrentLocationSuggestions(res.data.suggestions);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //destination handler
  const destinationSuggesionHandler = async (e) => {
    setDestination(e.target.value);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        setActiveField("destination");
        setDestinationLocationSuggestions(res.data.suggestions);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getFare = async () => {
    if (currentLocation.length > 0 && destination.length > 0) {
      setVehicleModelOpen(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/getFare`,
          {
            params: { pickup: currentLocation, destination },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 200) {
          setOpen(false);
          setFare(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter both pickup and destination locations");
    }
  };
  const createRide = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,

        { pickup: currentLocation, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 201) {
        setRide(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // socket.on("new-ride", (data) => {
  //   console.log(data);
  // });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //Animation snippet
  useGSAP(
    function () {
      if (open) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
        gsap.to(arrowIcon.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(arrowIcon.current, {
          opacity: 0,
        });
      }
    },
    [open]
  );
  useGSAP(
    function () {
      if (vehicleModelOpen) {
        gsap.to(VehicleAvailabilityPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(VehicleAvailabilityPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleModelOpen]
  );

  useGSAP(
    function () {
      if (VehicleComfirmOpen) {
        gsap.to(VehicleComfirmpanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(VehicleComfirmpanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [VehicleComfirmOpen]
  );
  useGSAP(
    function () {
      if (lookingDriver) {
        gsap.to(LookingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(LookingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingDriver]
  );
  useGSAP(
    function () {
      if (WaitingDriver) {
        gsap.to(WaitingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(WaitingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [WaitingDriver]
  );

  return (
    <div className="relative overflow-hidden">
      <div>
        <img
          className="w-18 py-4 mx-4 absolute"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
        />
      </div>
      <div className="h-screen w-screen">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        <LiveTracking/>
      </div>
      <div className="absolute bottom-0 h-screen flex flex-col justify-end">
        <div className="h-[35%] bg-white relative">
          <h5
            ref={arrowIcon}
            onClick={() => setOpen(false)}
            className="text-2xl absolute right-4 top-1 "
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <form
            onSubmit={handleSubmit}
            className="w-full  px-4 py-4 space-y-4 rounded-b-xl"
          >
            <h1 className="text-2xl font-bold  ">Find a Trip</h1>
            <input
              required
              value={currentLocation}
              onClick={() => setOpen(true)}
              onChange={pickupSuggesionHandler}
              className=" w-full px-2 py-2 bg-[#EEEEEE] rounded-lg"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              required
              value={destination}
              onClick={() => setOpen(true)}
              onChange={destinationSuggesionHandler}
              className="w-full px-2 py-2 bg-[#EEEEEE] rounded-lg"
              type="text"
              placeholder="Enter your destination"
            />
            <button
              onClick={getFare}
              to="/login"
              className="bg-black flex items-center justify-center text-white py-2 px-2 rounded-lg w-full"
            >
              Continue
            </button>
          </form>
        </div>
        <div ref={panelRef} className="bg-white px-5.5 ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? currentLocationSuggestions
                : destinationLocationSuggestions
            }
            currentLocationSuggestions={currentLocationSuggestions}
            setCurrentLocationSuggestions={setCurrentLocationSuggestions}
            setCurrentLocation={setCurrentLocation}
            setDestination={setDestination}
            activeField={activeField}
            vehicleModelOpen={vehicleModelOpen}
            setVehicleModelOpen={setVehicleModelOpen}
            setOpen={setOpen}
          />
        </div>
      </div>

      <div
        ref={VehicleAvailabilityPanelRef}
        className=" translate-y-full fixed z-40 bottom-0 py-2 rounded-lg  w-full px-2 bg-white"
      >
        <VehicleAvailability
          fare={fare}
          setVehicleModelOpen={setVehicleModelOpen}
          setVehicleComfirmOpen={setVehicleComfirmOpen}
          selectVehicle={setVehicleType}
        />
      </div>
      <div
        ref={VehicleComfirmpanelRef}
        className=" translate-y-full fixed z-40 bottom-0 py-2 rounded-lg  w-full px-2 bg-white"
      >
        <VehicleComfirm
          ride={ride}
          fare={fare}
          setLookingDriver={setLookingDriver}
          setVehicleComfirmOpen={setVehicleComfirmOpen}
          currentLocation={currentLocation}
          destination={destination}
          createRide={createRide}
          vehicleType={vehicleType}
        />
      </div>
      <div
        ref={LookingForDriverPanelRef}
        className=" translate-y-full fixed z-40 bottom-0 py-2 rounded-lg  w-full px-2 bg-white"
      >
        <LookingForDriver setLookingDriver={setLookingDriver} ride={ride} />
      </div>
      <div
        ref={WaitingForDriverPanelRef}
        className="translate-y-full fixed z-40 bottom-0 py-2 rounded-lg  w-full px-2 bg-white"
      >
        <WaitingForDriver driverDetail={driverDetail} />
      </div>
    </div>
  );
};

export default Home;
