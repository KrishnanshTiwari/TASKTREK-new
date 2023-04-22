import React from 'react';
import  './Card.css';
import { useNavigate } from "react-router-dom";
function User() {
    const navigate = useNavigate();
  return (
    <div className='wrapper'>
      <h1 className="title">TaskTrek</h1>
    <div className='Card'>
        <button className='btn' onClick={()=>navigate("/login")}>Log-in</button>
        <button className='btn' onClick={()=>navigate("/signup")}>Signup</button>
    </div>
    </div>
  )
}

export default User;