
import { Button, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema } from '../Schema/loginSchema.js';
import { sendSignInData } from '../Services/AuthServices';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext.jsx';


export default function Login() {

 let { setIsLogged} = useContext(AuthContext);

  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const navigateToCreatAccount = useNavigate();

  const {handleSubmit , register , formState:{errors}} = useForm({
    defaultValues:{
      email:'',
      password:'',
        }
        ,
        resolver: zodResolver(schema)
  });

async function signIn(userData) {
  setLoading(true);
  const response = await sendSignInData(userData);
 
  if(response.message=="success"){
    localStorage.setItem("token" , response.token);
    setIsLogged(true );
    navigate('/');
  }
  setLoading(false);
  setApiResponse(response.error);
}

  return <>
  <div className='shadow-2xl px-6 py-10 bg-white rounded-2xl sm:min-w-sm md:min-w-md'>
    <h1 className='text-center text-3xl mb-6 font-bold'>Log in</h1>
   
  <form className='flex flex-col gap-6' onSubmit={handleSubmit(signIn)}>
     <Input isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} {...register("email")} variant='bordered' label="Email" type="email" />
     <Input isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} {...register("password")} variant='bordered' label="Password" type="password" />
     <Button color='primary' isLoading={loading} className='font-semibold' type="submit">Log In</Button>
              {apiResponse == 'success'? <p className="text-center text-green-500 capitalize">{apiResponse}</p>: apiResponse && <p className="text-center text-red-500 capitalize">{apiResponse}</p> }

     <Button color='success' className='text-white w-50 mx-auto font-semibold' onPress={()=>navigateToCreatAccount("/register")} type="submit">Creat new account</Button>

  </form>
  </div>
  
  </>
}
