
import axios from 'axios'
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const CaptainLogout = () => {
    const navigate = useNavigate()
   
        const token =localStorage.getItem("token")
  
        
            const res =  axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(res.status === 200){
                alert(res.message)
                localStorage.removeItem('token')
                navigate("/captain-login")
            }
  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout