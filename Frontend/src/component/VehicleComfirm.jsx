import React from "react";

const VehicleComfirm = ({
  setLookingDriver,
  setVehicleComfirmOpen,
  currentLocation,
  vehicleType,
  destination,
  fare,
  createRide,
}) => {
  const car =
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png";
  const motorcycle =
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png";
  const auto =
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png";
  let vehicaleImg = "";
  if (vehicleType === "car") {
    vehicaleImg = car;
  } else if (vehicleType === "motorcycle") {
    vehicaleImg = motorcycle;
  } else if (vehicleType === "auto") {
    vehicaleImg = auto;
  }
  return (
    <div className="">
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-xl font-semibold ">Vehicle Confirm</h1>

        <img className="w-[12rem]" src={vehicaleImg} alt="" />

        <div className="p-4 space-y-7">
          <div className="text-lg font-standard flex gap-4 items-center">
            <span>
              <i className="ri-map-pin-range-fill text-lg bg-[#EEEEEE] rounded-full p-2"></i>
            </span>

            <p className="border-b-1 border-gray-300 pb-2">{currentLocation}</p>
          </div>
          <div className="text-lg font-standard flex gap-4 items-center">
            <span>
              <i className="ri-square-fill text-lg bg-[#EEEEEE] rounded-full p-2"></i>
            </span>

            <p className="w-full border-b-1 border-gray-300 pb-2">
              {destination}
            </p>
          </div>
          <div className="text-md font-medium flex gap-4 items-center w-full">
            <span>
              <i className="ri-bank-card-2-fill text-lg bg-[#EEEEEE] rounded-full p-2"></i>
            </span>

            <p>{fare[vehicleType]}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setLookingDriver(true);
            setVehicleComfirmOpen(false);
            createRide();
          }}
          className="w-full bg-gray-300 p-1 rounded-md font-medium active:bg-gray-400"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default VehicleComfirm;
