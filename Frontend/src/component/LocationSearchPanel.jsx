import React from 'react'

const LocationSearchPanel = (props) => {


    
    const location = [
        "Bagadi ward near sai mandir kanpur",
        "killa ward bhadrawati",
        "mg raod bhadrawati",
        "chandrapur naka maharashtra",
        "jawahar Nagar changrapur"
    ]
    const handleOpenModel = () =>{
        props.setVehicleModelOpen(true)
        props.setOpen(false)
    }
  return (
    <div className='space-y-6'>
      {location.map((locate)=>{
        return (
            <div onClick={handleOpenModel} key={locate} className='flex gap-3'>
                <i className="ri-map-pin-line bg-[#EEEEEE] rounded-full"></i>
                <p className='text-medium font-medium'>{locate}</p>
            </div>
        )
      })}
       
    </div>
  )
}

export default LocationSearchPanel