import React, { useState } from "react";

export const AppContext = React.createContext();

const AppProvider = ({ children })=>{

    const [data, setData] = useState("Parteek")

    return(
        <AppContext.Provider value={{ data }}>
            {children}
        </AppContext.Provider>
    )
}
export default AppProvider;