import React from "react";

const VehicleComfirm = ({setLookingDriver,setVehicleComfirmOpen}) => {
  return (
    <div className="">
      <div className="flex flex-col items-center mt-4">
      <h1 className="text-xl font-semibold ">Vehicle Confirm</h1>
      
        <img
          className="w-[12rem]"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png"
          alt=""
        />
        
        <div className="p-4 space-y-7">
       

          <div className="text-lg font-standard flex gap-4 items-center">
            <span>
              <i className="ri-map-pin-range-fill text-lg bg-[#EEEEEE] rounded-full p-2"></i>
            </span>

            <p className="border-b-1 border-gray-300 pb-2">
              
              bagadi ward near sai mandir bhadrawati
           
            </p>
          </div>
          <div className="text-lg font-standard flex gap-4 items-center">
            <span>
              <i className="ri-square-fill text-lg bg-[#EEEEEE] rounded-full p-2"></i>
            </span>

            <p className="w-full border-b-1 border-gray-300 pb-2">
              gandi nagar chandrapur
              
            </p>
          </div>
          <div className="text-md font-medium flex gap-4 items-center w-full">
            <span>
              <i className="ri-bank-card-2-fill text-lg bg-[#EEEEEE] rounded-full p-2"></i>
            </span>

            <p >
              193.20
            
            </p>
          </div>
        </div>
        <button onClick={()=>{setLookingDriver(true); setVehicleComfirmOpen(false)}} className="w-full bg-gray-300 p-1 rounded-md font-medium active:bg-gray-400">Confirm</button>
      </div>
    </div>
  );
};

export default VehicleComfirm;
