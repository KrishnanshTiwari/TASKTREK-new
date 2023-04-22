
import { useState,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { createUserWithEmailAndPassword
     } from "firebase/auth";
import { auth } from '../firebase';
import  './Card.css';

function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            dispatch({type:"LOGIN", payload:user})
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setError(true);
            // ..
        });
    
  };
  return (
    <div className='wrapper'>
      <h1 className='title'>Sign-up</h1>
    
      <form onSubmit={handleLogin} className="Card">
        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
          className='inp'
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
          className='inp'
        />
        <button className='btn' type="submit">Sign-up</button>
        {error && <span className='warning'>Something went wrong...</span>}
      </form>
   
    </div>
  )
}

export default Login;