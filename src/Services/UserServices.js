import axios from "axios";

const headers = {

        token:localStorage.getItem("token")
    }
export async function uploadProfilePhoto(formData) {

    try{
        const {data} = await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`,formData ,{
            headers,
            
            
        });
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        // return err.response.data.error;
    }
    
}


export async function getUserPosts(userId) {

    try{
        const {data} = await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts` ,{
            headers,
            
            
        });
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        // return err.response.data.error;
    }
    
}

export async function changePassword(userData) {

    try{
        const {data} = await axios.patch(`https://linked-posts.routemisr.com/users/change-password`, userData,{
            headers,
            });
        console.log(data);
        return data;
    }catch(err){
        console.log(err.response.data.error);
        return err.response;
    }
    
}