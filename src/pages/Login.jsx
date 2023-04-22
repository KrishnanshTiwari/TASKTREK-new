
import { useState,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword
     } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import './Card.css'
function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        navigate("/")
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(true);
    });

    
  };
  return (
    <div className="wrapper">
      <h1 className='title'>Log-in</h1>
      <form onSubmit={handleLogin} className='Card'>
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
        <button type="submit" className='btn'>Login</button>
        {error && <span className='warning'>Wrong email or password!</span>}
      </form>
    </div>
  )
}

export default Login;