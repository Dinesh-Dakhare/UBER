import React, { useState, useRef, useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import RideRequest from "../component/RideRequest";
import CaptainDataTemplate from "../component/CaptainDataTemplate";
import ConfirmRideRequest from "../component/ConfirmRideRequest";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../component/LiveTracking";
const CaptainHome = () => {
  const [RideRequestOpen, setRideRequestOpen] = useState(false);
  const [RideDataClose, setRideDataClose] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [ride,setRide]= useState();
const [passenger,setPassenger]=useState()
  const RideRef = useRef(null);
  const RideDataRef = useRef(null);
  const RideConfirmRef = useRef(null);

  //socket

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
 

  useEffect(() => {
    
    socket.emit("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  });
  socket.on('new-ride', (data) => {
    if(data){
      setRideRequestOpen(true)
      console.log(data);

      setRide(data);
    }else{
      setRideRequestOpen(false)
    }
   
  });
const acceptRide = async()=>{
  const token =localStorage.getItem("token")

const res = await axios.post( `${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
  rideId:ride._id
},{
  headers: {
    Authorization: `Bearer ${token}`,
}
})
if(res.status === 200){
  console.log(res);
  setPassenger(res.data)
}
}
  useGSAP(
    function () {
      if (RideRequestOpen) {
        gsap.to(RideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(RideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [RideRequestOpen]
  );

  useGSAP(
    function () {
      if (confirmRide) {
        gsap.to(RideConfirmRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(RideConfirmRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRide]
  );
  return (
    <div className="h-screen space-y-2 ">
      <div className="h-screen w-screen">
        {/* <img
          className="h-1/2 w-screen object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        <LiveTracking/>
      </div>
      <div
        ref={RideDataRef}
        className="px-4 py-2 fixed bottom-0 w-full rounded-2xl "
      >
        <CaptainDataTemplate captainData={captain} />
      </div>
      <div
        ref={RideRef}
        className="px-4 py-2 translate-y-full fixed bottom-0 w-full bg-white rounded-2xl"
      >
        <RideRequest
          setRideRequestOpen={setRideRequestOpen}
          setConfirmRide={setConfirmRide}
          ride={ride}
          acceptRide={acceptRide}
        />
      </div>
      <div
        ref={RideConfirmRef}
        className="px-4 py-2 translate-y-full fixed bottom-0 w-full bg-white rounded-2xl"
      >
        <ConfirmRideRequest
          setConfirmRide={setConfirmRide}
          setRideRequestOpen={setRideRequestOpen}
          passenger={passenger}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
