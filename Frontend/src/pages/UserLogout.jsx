import axios from 'axios'
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const UserLogout = () => {

   
    const navigate = useNavigate()
   
        const token =localStorage.getItem("token")
  
        
            const res =  axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(res.status === 200){
                alert("User Logged Out Successfully")
                localStorage.removeItem('token')
                navigate("/login")
            }
       
  return (
    <div>userlogout</div>
  )
}

export default UserLogout