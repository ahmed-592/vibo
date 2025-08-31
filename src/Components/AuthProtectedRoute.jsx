import { useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


export default function AuthProtectedRoute({children}) {
  const {isLogged} = useContext(AuthContext);


  return !isLogged? children : <Navigate to={"/"}/>
}
