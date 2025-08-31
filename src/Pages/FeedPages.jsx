import { useEffect, useState } from 'react'
import PostCard from '../Components/PostCard'
import { getAllPosts } from '../Services/PostServices'
import LoadingScreen from '../Components/LoadingScreen';
import CreatPost from '../Components/CreatPost';


export default function FeedPages() {

  const [posts, setPosts] = useState([]);



  async function getPosts(){
 
     const response = await getAllPosts();
    
      setPosts(response);
 
  }

  useEffect(()=> {
    getPosts() 
  },[]);

  

  
  
  return <>

<CreatPost callback={getPosts}/>
<div className="w-full mx-auto my-5">
{posts.length?posts.map(post => <PostCard key={post.id} post={post} commentLimit={1} callback={getPosts}/>): <LoadingScreen/>}

</div>
  

  
  </>
}
