
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';


export default function MainLayout() {
  return <>
  <Navbar/>
  <div className='bg-gray-200 py-4'>
    <div className="bg-gray-200 mx-auto max-w-full sm:max-w-5/6 md:max-w-4/6 ">
    <Outlet></Outlet>
  </div>
  </div>
  
  </>
}
 