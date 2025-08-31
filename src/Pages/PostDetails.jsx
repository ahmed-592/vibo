
import { useParams } from "react-router-dom";
import PostCard from "../Components/PostCard";
import { useEffect, useState } from "react";
import { getSinglePost } from "../Services/PostServices";
import LoadingScreen from "../Components/LoadingScreen";

export default function PostDetails() 
{


  const {id} = useParams();

 const [post, setPost] = useState(null);
 const [loading, setLoading] = useState(false);


  async function getPost(){
    setLoading(true);
   
     const response = await getSinglePost(id);

       
      setPost(response.post);
      setLoading(false);
   
    
    
  }

  useEffect(()=> {
    getPost() 
  },[]);




  
  return <>

 {post? <PostCard post={post} commentLimit={post.comments.length}/>: <LoadingScreen/>}
 
 
  </>
}
