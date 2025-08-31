import axios from "axios";

const headers = {

        token:localStorage.getItem("token")
    }



export async function creatComment(contentComment, postId) {

    try{
        const {data} = await axios.post(`https://linked-posts.routemisr.com/comments`,{
    content:contentComment,
    post:postId
} ,{ 
            headers,
        });
       
        return data;
    }catch(err){
        console.log(err.response.data);
        // return err.response.data.error;
    }
    
}

export async function deleteComment(commentId) {

    try{
        const {data} = await axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`,{
            headers,
        });
        
        return data;
    }catch(err){ 
        console.log(err);
        // return err.response.data.error;
    }
    
}
export async function updateComment(commentId , content) {

    try{
        const {data} = await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`,{content:content},{
            headers,
           
        });
        
        return data;
    }catch(err){ 
        console.log(err);
        // return err.response.data.error;
    }
    
}

export async function getAllComments(postId) {

    try{
        const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`,{
            headers,
        });
        
        return data;
    }catch(err){ 
        console.log(err);
        // return err.response.data.error;
    }
    
}


