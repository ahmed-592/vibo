
import { Button, Input } from '@heroui/react';
import {schema} from '../Schema/changePassword.js'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { changePassword } from '../Services/UserServices.js';
import { useState } from 'react';
export default function ChangePassword() {

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

    const {handleSubmit , register , formState:{errors}} = useForm({
        defaultValues:{
            password:'',
            newPassword:''
            }
            ,
            resolver: zodResolver(schema)
      });
    

  async function changrYourPassword(userData) {
  setLoading(true);
  const response = await changePassword(userData);
 
  if(response.message=="success"){
    
  localStorage.setItem("token" , response.token);

  
    setLoading(false);
    setDone(true)
  }else{
setLoading(false);
    return;
  }
  

      }

  return <>
  <section class="h-150 place-content-center bg-white shadow-2xl rounded-md text-slate-300">
  
    <h1 className='text-center text-3xl mb-6 font-bold pt-6 text-black'>Change Password</h1>
    
  <form className="flex flex-col gap-6 w-[50%] mx-auto" onSubmit={handleSubmit(changrYourPassword)}>
     <Input className='text-black' isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} {...register("password")} variant="bordered" label="Password" type="password" />
     <Input className='text-black' isInvalid={Boolean(errors.newPassword)} errorMessage={errors.newPassword?.message} {...register("newPassword")} variant="bordered" label="New Password" type="password" />
    
      
    <Button isLoading={loading} color="primary" type="submit" className="font-semibold text-white">Save</Button>
      {done?<p className='text-green-500 text-center'>Password has been changed</p>:null}
  
    </form>


</section>
  </>
}