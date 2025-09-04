import { Button, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { addPost, editPost } from "../Services/PostServices";



export default function CreatPost({callback , post , setIsUpdating , isUpdating}) {

const [postBody, setPostBody] = useState(post?.body??'');
const [postImage, setPostImage] = useState(null);
const [urlImage, setUrlImage] = useState(post?.image??'');
const [loading, setLoading] = useState(false);
 
async function urlToFile() {
  
let response = await fetch(post.image);
let blobData = await response.blob();

setPostImage(new File([blobData] , 'image' , {type : 'image/jpg'}));
}

useEffect(()=> {post && urlToFile}, [])
function restPost() {
  
setPostBody('');
setPostImage(null);
setUrlImage('');
}
async function handleSubmitPost(e) {
  setLoading(true);
  e.preventDefault();
  const formData = new FormData();


postImage && formData.append('image', postImage);
postBody &&  formData.append('body', postBody);

  let response;
    if(isUpdating){
       response = await editPost(formData , post.id);
       setIsUpdating(false);
    }else{
       response = await addPost(formData);
    }
  
  if(response.message){
    await callback();
    setLoading(false);
    restPost();
  }
  
  
}

function handleImage(e) {
  setPostImage(e.target.files[0]);

  setUrlImage(URL.createObjectURL(e.target.files[0]));

  e.target.value = '';

}


  return (
    <>
    <div className="bg-white w-full mx-auto rounded-md shadow-md p-4 relative">
     <form onSubmit={handleSubmitPost} >
        <textarea
        
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          className="w-full border p-2 resize-none rounded-md bg-gray-100"
          rows={4}
          placeholder="what's your mind? ............."
        ></textarea>
        <div className="relative mt-3">
          <img src={urlImage} className="w-full"/>

          <svg
          onClick={() => {setUrlImage('')} }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex justify-between items-center mt-3">
          <label className="cursor-pointer hover:text-blue-600">
            <input onChange={handleImage} type="file" className="hidden" />
            <div className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span className=" font-semibold">Image</span>
            </div>
          </label>

          <div className="flex gap-4">
            <button type="reset" className="cursor-pointer">
              Cancel
            </button>
            <Button type="submit" className="cursor-pointer" color="primary">
              Post
            </Button>
          </div>
        </div>
      </form>
      {loading && <div className="absolute flex justify-center items-center inset-0 w-full h-full bg-gray-200 opacity-70">
        <Spinner/>
      </div>}
      </div> 
     

      
    </>
  );
}
