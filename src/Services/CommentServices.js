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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
        return data;
    }catch(err){ 
        console.log(err);
        // return err.response.data.error;
    }
    
}


