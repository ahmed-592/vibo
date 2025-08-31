import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import CardHeader from "./Card/CardHeader";

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Spinner, Input} from "@heroui/react";
import { deleteComment, updateComment } from "../Services/CommentServices";







export default function Comment({postComment , post , callback}) {




  const {userData} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateContent, setUpdateContent] = useState(postComment.content);
  
 

  async function deleteMyComment(CommentId) {
    setLoading(true);
        const response = await deleteComment(CommentId);
        await callback();
        setLoading(false);
      }


  async function updateMyComment(CommentId , content) {
        setLoading(true);
       
        const response = await updateComment(CommentId ,content);
        console.log(response);
        
        await callback();
        setLoading(false);
        setUpdate(false);
      }

    
  return <>
  
  
  <div className=" bg-gray-300 -m-3 rounded-b-md p-3 mt-2">


         <div className="flex gap-3 items-center justify-between">
          <CardHeader image={postComment.commentCreator?.photo} userName={postComment.commentCreator.name} date={postComment.createdAt.split('.' , 1)[0].split('T').join(' ')}/>

       
           {userData._id === postComment.commentCreator?._id && userData._id === post.user._id && 
           <Dropdown>
           
      <DropdownTrigger>
        <svg className="w-16 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
      </DropdownTrigger>
      
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={()=> setUpdate(true)} key="edit">Edit</DropdownItem>
       <DropdownItem onClick={()=> deleteMyComment(postComment._id)} key="delete" className="text-danger" color="danger">Delete</DropdownItem>
      </DropdownMenu>
            </Dropdown>}

         </div>


         {update?<div>

          <Input type="text" value={updateContent} onChange={(e)=> setUpdateContent(e.target.value)} className="m-2 bg-white rounded-xl border" variant="bordered"/>
          <Button isLoading={loading} onPress={()=> updateMyComment(postComment._id, updateContent)} color="primary" className="m-2" size="sm">Update</Button>
          <Button onPress={()=>setUpdate(false)} className="m-2 border border-red" size="sm" variant="bordered">Cancel</Button>  
         </div>:<p className="ms-4">{postComment.content}</p>}
         
        </div>
  
  </>
}
