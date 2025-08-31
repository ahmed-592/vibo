import {Navbar as HeruUiNavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  let {isLogged , setIsLogged ,setUserData} = useContext(AuthContext);
  const pagePath = location.pathname;
  const navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    setIsLogged(null);
    navigate('/login');
    setUserData(null);
  }
  return <>
  <HeruUiNavbar className="">

      <NavbarBrand>
        <p className="font-bold text-inherit">Vibo</p>
      </NavbarBrand>


     {isLogged?<>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
       
      </NavbarContent>
      
      
      <NavbarContent justify="end">
        {pagePath=="/profile"?<NavbarItem>
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer" onClick={()=>navigate('/')}>
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>


        </NavbarItem>:<NavbarItem>
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 cursor-pointer" onClick={()=>navigate('/profile')}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

        </NavbarItem>}
        <NavbarItem>
          <Dropdown>
                 
            <DropdownTrigger>
              <svg className="w-16 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
            </DropdownTrigger>
            
            <DropdownMenu aria-label="Static Actions">
                           <DropdownItem onClick={()=>navigate("change-password")}>Change password</DropdownItem>

              <DropdownItem className="text-red-600" onClick={logOut}>Log out</DropdownItem>
            </DropdownMenu>
                  </Dropdown>
        </NavbarItem>
      </NavbarContent></>
      
      :
      <NavbarContent justify="end">
        
        <NavbarItem>
          <NavLink to={"/register"}>Sign Up</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to={"/login"}>Sign In</NavLink>
        </NavbarItem>
      </NavbarContent>
     
      }




      

      




    </HeruUiNavbar>
  
  
  </>
    
}
