// GlobalStateContext.js
import React, { createContext, useState } from 'react';

// Create a context with a default value
const GlobalContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    quantity: 0,
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalStateProvider };
