import axios from "axios";


const headers = {

        token:localStorage.getItem("token")
    }


export async function getAllPosts() {

    
    try{
        const {data} = await axios.get(`https://linked-posts.routemisr.com/posts`, {
           headers,
           params: {
                sort: '-createdAt',
            }
        });
        
        return data.posts;
    }catch(err){
        console.log(err.response.data);
        return err.response;
    }
    
}

export async function getSinglePost(postId) {

  

    
    try{
        const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${postId}`, {
           headers
        });
        
        return data;
        
        
    }catch(err){
        console.log(err);
        // return err.response.data.error;
    }
    
}





export async function addPost(formData) {

    try{
        const {data} = await axios.post(`https://linked-posts.routemisr.com/posts`,formData ,{
            headers,
            
            
        });
       
        return data;
    }catch(err){
        console.log(err);
        // return err.response.data.error;
    }
    
}
export async function editPost(formData , postId) {

    try{
        const {data} = await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`,formData ,{
            headers,
            
            
        });
        
        return data;
    }catch(err){
        console.log(err.response.post);
        // return err.response.data.error;
    }
    
}
export async function deletePost(postId) {

    try{
        const {data} = await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}` ,{
            headers,
            
            
        });
        
        return data;
    }catch(err){
        console.log(err.response.post);
        // return err.response.data.error;
    }
    
}