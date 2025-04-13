import React from "react";

const VehicleAvailability = (props) => {
  return (
    <div className="space-y-3">
      <h5
        onClick={() => props.setVehicleModelOpen(false)}
        className="rounded-full bg-slate-100  flex  items-center gap-3 px-3 py-1 w-[8rem]"
      >
        leave now <i className="ri-arrow-down-circle-fill"></i>
      </h5>

      <div
        onClick={() => {
          props.setVehicleComfirmOpen(true);
          props.setVehicleModelOpen(false);
          props.selectVehicle("car");
        }}
        className="flex justify-between active:border-black border-2 border-slate-200 px-2 py-2 rounded-xl"
      >
        <div className="flex gap-2 items-center justify-center w-[90%]">
          <img
            className="h-[4rem]"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png"
            alt=""
          />
          <div className="">
            <h4 className="font-semibold text-lg">
              UberGo
              <span>
                <i className="ri-user-fill"></i>
              </span>
              4
            </h4>
            <p className="font-medium text-md">3 min away</p>
            <p className="font-medium text-sm">Affordable motorcycle rides</p>
          </div>
        </div>
        <h2 className="font-semibold text-lg">{props.fare.car}</h2>
      </div>
      {/* bike */}

      <div
        onClick={() => {
          props.setVehicleComfirmOpen(true);
          props.setVehicleModelOpen(false);
          props.selectVehicle("motorcycle");
        }}
        className="flex justify-between  active:border-black border-2 border-slate-200 px-2 py-2 rounded-xl"
      >
        <div className="flex gap-2 items-center justify-center w-[90%]">
          <img
            className="h-[4rem]  "
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt=""
          />
          <div className="">
            <h4 className="font-semibold text-lg">
              Moto
              <span>
                <i className="ri-user-fill"></i>
              </span>
              1
            </h4>
            <p className="font-medium text-md">3 min away</p>
            <p className="font-medium text-sm">Affordable motorcycle rides</p>
          </div>
        </div>
        <h2 className="font-semibold text-lg">{props.fare.motorcycle}</h2>
      </div>
      {/* auto */}

      <div
        onClick={() => {
          props.setVehicleComfirmOpen(true);
          props.setVehicleModelOpen(false);
          props.selectVehicle("auto");
        }}
        className="flex justify-between  px-2 py-2 active:border-black border-2 border-slate-200 rounded-xl"
      >
        <div className="flex gap-2 items-center  justify-center w-[90%]">
          <img
            className="h-[4rem]  "
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
          <div className="">
            <h4 className="font-semibold text-lg ">
              Auto
              <span>
                <i className="ri-user-fill"></i>
              </span>
              4
            </h4>
            <p className="font-medium text-md">3 min away</p>
            <p className="font-medium text-sm">Affordable motorcycle rides</p>
          </div>
        </div>
        <h2 className="font-semibold text-lg ">{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehicleAvailability;
