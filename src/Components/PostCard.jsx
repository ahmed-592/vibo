import CardHeader from './Card/CardHeader'
import CardBody from './Card/CardBody'
import CardFooter from './Card/CardFooter'
import CardAction from './Card/CardAction'
import Comment from './Comment'
import { Button, Input } from '@heroui/react'
import { creatComment, getAllComments } from '../Services/CommentServices'
import { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from '@heroui/react'  
import CreatPost from './CreatPost'
import { deletePost } from '../Services/PostServices'




export default function PostCard({post , commentLimit ,callback }) {
  
  const [commentContent, setCommentContent] = useState('');
  const [isUpdating, setIsUpdating] = useState(false)
  const [comments, setComments] = useState(post.comments);
  const [loading, setLoading] = useState(false);

   const {userData} = useContext(AuthContext);


  async function addComment(e) {
    setLoading(true);
    e.preventDefault();
    const response = await creatComment(commentContent , post.id);
    
      setComments(response.comments);
      console.log(response.comments);
      
   
    
    console.log(response);
     setLoading(false);
     setCommentContent('');
  }

    async function getComments() {
        const response = await getAllComments(post.id);
             
     
      setComments(response.comments);
        
      }

     async function deleteMyPost() {
      setLoading(true);
      // e.preventDefault();
      const response = await deletePost(post.id);     
      if(response.message){
        await callback();
        setLoading(false);
      }
      }
  
  return <>
    {isUpdating?<CreatPost post={post} setIsUpdating={setIsUpdating} isUpdating={isUpdating} callback={callback} /> :
    <div className="py-3 ">
      <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3">
        <div className="w-full h-16 flex items-center justify-between ">
      <CardHeader  image={post.user.photo} userName={post.user.name} date={post.createdAt.split('.' , 1)[0].split('T').join(' ')}/>
                {userData._id === post.user._id && <Dropdown>
            {loading?<Spinner/>:null}
      <DropdownTrigger>
        <svg className="w-16 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={()=>setIsUpdating(true)} key="edit">Edit</DropdownItem>
        <DropdownItem onClick={()=>deleteMyPost()} key="delete" className="text-danger" color="danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
            </Dropdown>}

           
        </div>
        
        <CardBody image={post.image} body={post.body}/>
        <CardFooter commentsLength={comments.length}/>
        <CardAction postId={post.id}/>
        
       
                 <form onSubmit={addComment}>

                   <div className="flex -m-3 rounded-b-md p-3 mt-2 gap-3">
                    <Input value={commentContent} onChange={(e)=>setCommentContent(e.target.value)} placeholder='Comment...' variant='bordered'/>
                    <Button isLoading={loading} type='submit' color='primary'>Add comment</Button>
                   </div>
                 </form>
                
        {comments.length > 0 && comments.slice(0 , commentLimit).map(comment => <Comment post={post} key={comment._id} postComment={comment} callback={getComments}/>)}
      </div>
    </div>}
  </>
}
