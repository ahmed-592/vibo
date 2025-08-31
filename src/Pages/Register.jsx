import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendSignUpData } from "../Services/AuthServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../Schema/registerSchema.js";





export default function Register() {

  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const navigate = useNavigate();

 const {handleSubmit , register ,formState:{errors}} =useForm({
  defaultValues: {
    name:'',
    email:'',
    password:'',
    rePassword:'',
    dateOfBirth:'',
    gender:'',
  },
  resolver: zodResolver(schema)
 });



async function signUP(userDate){
    setLoading(true);
   const message = await sendSignUpData(userDate);
   setApiResponse(message);
   if(message=='success'){
    navigate("/Login");
   }
    setLoading(false);
}
  return <>
  <div className="shadow-2xl px-6 py-10 bg-white rounded-2xl sm:min-w-sm md:min-w-md">
    <h1 className="text-center text-3xl mb-6 font-bold">Register Now</h1>
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(signUP)}>
     <Input isInvalid={Boolean(errors.name)} errorMessage={errors.name?.message} {...register("name")} variant="bordered" label="Name" type="name" />
     <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} {...register("email")} variant="bordered" label="Email" type="email" />
     <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} {...register("password")} variant="bordered" label="Password" type="password" />
     <Input isInvalid={Boolean(errors.rePassword)} errorMessage={errors.rePassword?.message} {...register("rePassword")} variant="bordered" label="Confirm Password" type="password" />
     <div className="flex gap-4">
     <Input isInvalid={Boolean(errors.dateOfBirth)} errorMessage={errors.dateOfBirth?.message} {...register("dateOfBirth")} variant="bordered" label="Date of Birth" type="date" />
      
      <Select isInvalid={Boolean(errors.gender)} errorMessage={errors.gender?.message} {...register("gender")} variant="bordered" className="max-w-xs" label="Favorite Animal" placeholder="Select an animal">
        
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
       
      </Select>
     </div>
    <Button isLoading={loading} color="success" type="submit" className="font-semibold text-white">Register</Button>

    {apiResponse == 'success'? <p className="text-center text-green-500 capitalize">{apiResponse}</p>: apiResponse && <p className="text-center text-red-500 capitalize">{apiResponse}</p> }
  
    <Link to={"/login"} className="text-blue-500 text-center font-semibold">Already have an account?</Link>
    </form>
    
  </div>



  
 

  </>
}
