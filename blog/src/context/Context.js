import { createContext, useReducer } from "react"
import Reducer from "./Reducer";
import { useEffect } from "react";


const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFecthing: false,
    error: false,
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer,INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(state.user))
    }, [state.user])
    


    return (
        <Context.Provider
            value={{
                user:state.user,
                isFecthing:state.isFecthing,
                error:state.error,
                dispatch,
            }}    
        >
            {children}
        </Context.Provider>
    )
}