import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  
  return (
    <div>
      <CaptainDataContext.Provider value={{ captain,setCaptain }}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;
