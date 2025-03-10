import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../component/LocationSearchPanel";
import VehicleAvailability from "../component/VehicleAvailability";
import VehicleComfirm from "../component/VehicleComfirm";
import WaitingForDriver from "../component/WaitingForDriver";
import LookingForDriver from "../component/LookingForDriver";
const Home = () => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [open, setOpen] = useState(false);
  const [vehicleModelOpen, setVehicleModelOpen] = useState(false);
  const [VehicleComfirmOpen, setVehicleComfirmOpen] = useState(false);
  const [lookingDriver, setLookingDriver] = useState(false);
  const [WaitingDriver, setWaitingDriver] = useState(false);

  const panelRef = useRef(null);
  const arrowIcon = useRef(null);
  const VehicleAvailabilityPanelRef = useRef(null);
  const VehicleComfirmpanelRef = useRef(null);
  const WaitingForDriverPanelRef = useRef(null);
  const LookingForDriverPanelRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="absolute bottom-0 h-screen flex flex-col justify-end">
        <div className="h-[30%] bg-white relative">
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
              onChange={(e) => setCurrentLocation(e.target.value)}
              className=" w-full px-2 py-2 bg-[#EEEEEE] rounded-lg"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              required
              value={destination}
              onClick={() => setOpen(true)}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-2 py-2 bg-[#EEEEEE] rounded-lg"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white px-5.5 ">
          <LocationSearchPanel
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
          setVehicleModelOpen={setVehicleModelOpen}
          setVehicleComfirmOpen={setVehicleComfirmOpen}
        />
      </div>
      <div
        ref={VehicleComfirmpanelRef}
        className=" translate-y-full fixed z-40 bottom-0 py-2 rounded-lg  w-full px-2 bg-white"
      >
        <VehicleComfirm setLookingDriver={setLookingDriver} setVehicleComfirmOpen={setVehicleComfirmOpen}/>
      </div>
      <div
        ref={LookingForDriverPanelRef}
        className=" translate-y-full fixed z-40 bottom-0 py-2 rounded-lg  w-full px-2 bg-white"
      >
        <LookingForDriver setLookingDriver={setLookingDriver}/>
      </div>
      <div
        ref={WaitingForDriverPanelRef}
        className="translate-y-full fixed z-40 bottom-0 py-2 rounded-lg  w-full px-2 bg-white"
      >
        <WaitingForDriver setWaitingDriver={setWaitingDriver}/>
      </div>
    </div>
  );
};

export default Home;
