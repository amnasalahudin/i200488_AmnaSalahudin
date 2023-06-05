import React, { useState, useEffect, useContext } from "react";


export const UserContext = React.createContext([{}, function(){}]); // Initial value as [user, setUser]

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
