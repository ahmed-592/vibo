import axios from "axios";






export async function getUserData() {

    try{
        const {data} = await axios.get(`https://linked-posts.routemisr.com/users/profile-data` , {
            headers:{
                token: localStorage.getItem('token')
            }
        });
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        return err;
    }
}
    
export async function sendSignUpData(userData) {

    try{
        const {data} = await axios.post(`https://linked-posts.routemisr.com/users/signup` , userData);
        console.log(data.message);
        return data.message;
    }catch(err){
        console.log(err.response.data.error);
        return err.response.data.error;
    }
    
}

export async function sendSignInData(userData) {

    try{
        const {data} = await axios.post(`https://linked-posts.routemisr.com/users/signin` , userData);
        console.log(data.message);
        return data;
    }catch(err){
        console.log(err.response.data.error);
        return err.response.data;
    }
    
}