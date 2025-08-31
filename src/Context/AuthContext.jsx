import { createContext, useEffect, useState } from "react";
import { getUserData } from "../Services/AuthServices";



export let AuthContext = createContext();

export default function AuthContextProvider({children}){

 

    const [userData, setUserData] = useState(null);


    async function getUserDataApi() {
        const response = await getUserData();
        if(response.message){
            setUserData(response.user);
            return response.user;
        }
    }


   
   
    const [isLogged, setIsLogged] = useState(localStorage.getItem("token") != null);

     useEffect(()=> {
        if(isLogged){
            getUserDataApi();
        }else{
            setUserData(null);
        }
     }
    ,[isLogged])

    return<AuthContext.Provider value={{isLogged , setIsLogged ,userData , setUserData ,getUserDataApi}}> {children}</AuthContext.Provider>

   
    
}