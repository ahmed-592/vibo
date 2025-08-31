import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { getUserPosts, uploadProfilePhoto } from '../Services/UserServices';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Spinner } from '@heroui/react';
import CreatPost from '../Components/CreatPost';
import PostCard from '../Components/PostCard';
import LoadingScreen from '../Components/LoadingScreen';
import {Card, Skeleton} from "@heroui/react";

export default function Profile() {


  const {userData , setUserData , getUserDataApi} = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [choosePhoto, setChoosePhoto] = useState(false);
  const [urlImage, setUrlImage] = useState(null);
  const [savePhoto, setSavePhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);



async function getUserAllPosts() {
  const response = await getUserPosts(userData._id);
  setPosts(response.posts);
 setLoadingPosts(false)
  
}


useEffect(() => {       
getUserAllPosts()
}, [userData]);



async function addPhoto(e) {
  setLoading(true);
  e.preventDefault();
   const formData = new FormData();
   formData.append('photo', profilePhoto);
   const response = await uploadProfilePhoto(formData);
   console.log(response);
    if(response.message){
      await getUserDataApi();
      console.log(userData.photo);
      setSavePhoto(false);
      setLoading(false);
    }
}

function handleImage(e) {
 
  setProfilePhoto(e.target.files[0]);
  setChoosePhoto(true);

  // e.target.value = '';
  console.log(e.target.value);
    setUrlImage(URL.createObjectURL(e.target.files[0]));
  

}

 



// ...existing code...

// const [loadingPosts, setLoadingPosts] = useState(true); // Add this state

// async function getUserAllPosts() {
//   setLoadingPosts(true); // Start loading
//   const response = await getUserPosts(userData._id);
//   setPosts(response.posts);
//   setLoadingPosts(false); // Stop loading
// }

// useEffect(() => {       
//   getUserAllPosts()
// }, [userData]);

// // ...existing code...

// <div className="w-fullmx-auto my-5 rounded-lg shadow-md relative">
//   <h2 className='bg-white p-3 rounded-t-lg font-semiboldbold text-2xl'>Posts</h2>
//   {loadingPosts ? (
//     <LoadingScreen />
//   ) : posts && posts.length > 0 ? (
//     posts.map(post => (
//       <PostCard key={post.id} post={post} commentLimit={posts.length} callback={getUserAllPosts} />
//     ))
//   ) : (
//     <p className="text-center text-gray-500 py-8 bg-white rounded-b-lg">No posts found.</p>
//   )}
// </div>










    return <>

{userData?.photo?<div className="w-full mx-auto my-5 bg-white rounded-lg shadow-md p-5 relative">
      
      
        <img className="w-32 h-32 rounded-full mx-auto border" src={userData?.photo} alt="Profile picture" />
      <form  onSubmit={addPhoto} className='relative'>
    {loading?<div className='absolute top-0 bottom-0 right-0 left-0 bg-gray-200 opacity-50 z-2'>
        <Spinner className='absolute top-[50%] right-[50%]' size='lg' color='primary'/>
      </div>:null}
      
  <label className="mt-2 cursor-pointer text-blue-500 hover:text-blue-700 bg-white p-1 rounded-full absolute -top-8 right-[50%] transform -translate-x-[50%]">
    <input onChange={handleImage} type="file" className='hidden' />
    {!savePhoto?<div className=''>
    <svg className='w-[10px]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
     </svg>
    
    </div>:null}

  </label>
      {choosePhoto?<div className='p-10 bg-gray-200 absolute bottom-0 right-1/2 transform translate-x-[50%] translate-y-[60%] z-1'>
       <img className="size-70 rounded-full mx-auto border" src={urlImage} alt="Profile picture" />
          <div className='absolute bottom-0 right-2 space-x-3'>
       <Button onPress={()=>setChoosePhoto(false)} type='submit' className='' size='sm' >Cancle</Button>
        <Button onPress={()=>{setChoosePhoto(false);setSavePhoto(true) }} type='submit' className='' size='sm' color='primary'>Done</Button>
          </div>
      </div>:null}
       {savePhoto?<Button type='submit' className='mt-2 cursor-pointer relative left-[50%] transform -translate-x-[50%]' size='sm' color='primary'>Save</Button>:null}

  
    </form>


   
  <h2 className="text-center text-2xl font-semibold mt-3">{userData?.name}</h2>
  <p className="text-center text-gray-600 mt-1">Software Engineer</p>
  <div className="flex justify-center mt-5">
    <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
    <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
    <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
  </div>
  <div className="mt-5">
    <h3 className="text-xl font-semibold">Bio</h3>
    <p className="text-gray-600 mt-2">John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
  </div>


  
</div>:<Card className="w-full mx-auto space-y-5 mt-4 p-4" radius="lg">
    <div className="flex-col justify-items-center space-y-3 ">
<Skeleton className="rounded-full w-30 h-30"></Skeleton>
   
      <Skeleton className="rounded-lg w-40 h-4"></Skeleton>
    <Skeleton className="rounded-lg w-50 h-2"></Skeleton>
    
</div>
    
    <div className="flex justify-center space-x-3">
        
        <Skeleton className="h-3 w-10 rounded-lg"></Skeleton>
        <Skeleton className="h-3 w-10 rounded-lg"></Skeleton>
        <Skeleton className="h-3 w-10 rounded-lg"></Skeleton>
        
      </div>

      <div className="space-y-3">
        <Skeleton className="h-3 w-15 rounded-lg"></Skeleton>
        <Skeleton className="h-4 w-4/5 rounded-lg"></Skeleton>
       
      </div>
      
    </Card>
}



       <div className="w-fullmx-auto my-5 rounded-lg shadow-md relative">
       <h2 className='bg-white p-3 rounded-t-lg font-semiboldbold text-2xl'>Posts</h2>
       
    

{loadingPosts? <LoadingScreen/> : posts.length === 0 ? <p className='text-center p-3'>No posts available</p> : posts.map(post => (<PostCard key={post.id} post={post} commentLimit={posts.length} callback={getUserAllPosts} />))}



</div>



    
    </>
}

