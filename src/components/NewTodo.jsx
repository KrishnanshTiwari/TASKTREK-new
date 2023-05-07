import React from "react";
import { useEffect,useState } from "react"; 
import { db,auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {onAuthStateChanged} from "firebase/auth";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './NewTodo.css'
export default function NewTodo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        completed: false,
        email : user.email,
      });
      setTitle("");
    }
  };
  return (
    <div className="Newtodo">
        <form onSubmit={handleSubmit}>
          
            <input
              type="text"
              placeholder="Enter todo..."
              value={title}
              className = "input_field"
              onChange={(e) => setTitle(e.target.value)}
            />
          <button>
              <FontAwesomeIcon icon={faPlus} className="icon" />
            </button>
          </form>
            
         
          
    </div>
  );
}
