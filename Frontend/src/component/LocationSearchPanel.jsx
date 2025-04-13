import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setCurrentLocationSuggestions,
  setCurrentLocation,
  setDestination,
  activeField,
}) => {
  const handleOpenModel = (suggestion) => {
    if(activeField === "pickup"){
      
      setCurrentLocation(suggestion);
    }else(
      setDestination(suggestion)
     
    )
    
  };
  return (
    <div className="space-y-6">
      {suggestions.map((element) => {
        return (
          <div
            onClick={() => handleOpenModel(element.description)}
            key={element.place_id}
            className="flex gap-3"
          >
            <i className="ri-map-pin-line bg-[#EEEEEE] rounded-full"></i>
            <p className="text-medium font-medium">{element.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
