import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";


export default function AuthLayout() {
  return <>
 <Navbar/>
  <div className="bg-gray-200 flex justify-center items-center min-h-screen">
    <Outlet></Outlet>
  </div>
  </>
}
