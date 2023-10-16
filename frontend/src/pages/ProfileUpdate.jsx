import axios from "axios";
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation} from "react-router-dom"

const ProfileUpdate = ()=>{
    const [userPersonal, setUserPersonal] = useState({
        f_name: "",
        m_name: "",
        l_name: "",
        suffix: "",
        sex_id: "",
        cvl_id: "",
        b_date: "",
        b_place: "",
        res_id: "",
        czn_id: "",
    });

const navigate= useNavigate()
const location= useLocation();
const userID= location.pathname.split("/")[2]

const handleChange=(e)=>{
    setUserPersonal((prev)=>({...prev, [e.target.name]: e.target.value}))
};

const handleClick= async e=>{
    e.preventDefault()
    try{
        await axios.put(`http://localhost:8800/profile/${userID}`, user)
        navigate("/")
    }catch(err){
        console.log(err)
    }
}

console.log(user)
    
return(
        
                <div className= 'form'>
                    <h1> Update Furniture </h1>
                    
                    <input type="text" placeholder="Furniture Name" onChange={handleChange} name="prod_name" />
                    <input type="text" placeholder="Furniture Description" onChange={handleChange} name="prod_desc" />
                    <input type="text" placeholder="Furniture Image" onChange={handleChange} name="prod_image" />
                    <input type="text"  placeholder="Furniture Price" onChange={handleChange} name="prod_price" />
                        <button onClick={handleClick}>Update Furniture</button>
                </div>
            
    )
}

export default Update