import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Todo.css';


export default function Todo({ todo, toggleComplete, handleDelete, handleEdit }) {
  const [newTitle, setNewTitle] = React.useState(todo.title);
  const [editmode, setEditmode] = React.useState("disabled");
  const handleChange = (e) => {

    e.preventDefault();
    if (todo.completed === true) {
      setNewTitle(todo.title);

    } else {
      todo.title = "";
      setNewTitle(e.target.value);

    }

  };
  const editchange = (e) => {
    e.preventDefault();
    setEditmode("disabled")
    handleEdit(todo, newTitle)
  }

  return (



    <div className="todo">


      <form onSubmit={editchange}>
        <input
          style={{ textDecoration: todo.completed && "line-through" }}
          type="text"
          value={todo.title === "" ? newTitle : todo.title}
          className="list"
          disabled={editmode}
          onChange={handleChange}

        />
      </form>

      <button
        className="button-complete"
        onClick={() => toggleComplete(todo)}
      >
        <FontAwesomeIcon icon={faCheck} className="icon check" />
      </button>
      <button
        className="button-edit"
        onClick={() => { setEditmode("") }}
      >
        <FontAwesomeIcon icon={faEdit} className="icon" />
      </button>
      <button className="button-delete" onClick={() => handleDelete(todo.id)}>
        <FontAwesomeIcon icon={faTrash} className="icon" />
      </button>


    </div>



  );
}