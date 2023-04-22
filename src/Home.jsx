import React from "react";
import { useState,useContext} from "react";
import NewTodo from "./components/NewTodo";
import Todo from "./components/Todo";
import {  signOut } from "firebase/auth";
import { AuthContext } from './context/AuthContext';
import { db,auth } from "./firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import './Home.css'
export default function Home() {
    const [todos, setTodos] = useState([]);
    const {currentUser,dispatch} = useContext(AuthContext);
    const mail = currentUser.email;
    console.log(mail);
  React.useEffect(() => {
    const q = query(collection(db, "todos"),where("email","==",`${mail}`));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        
        todosArray.push({ ...doc.data(), id: doc.id });
        
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);
  const Logout = () =>{
    signOut(auth).then(() => {
      dispatch({type:"LOGOUT", payload:currentUser});
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
    
  }
  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    
    <div className="wrapper">
      <div className="top">
      <h2>HELLO {mail}</h2>
      <button onClick={Logout} >Log out</button>
      </div>
        <NewTodo />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      
    </div>
  );
}
