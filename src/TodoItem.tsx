// src/TodoItem.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface Todo {
  completed: boolean;
  text: string;
}

interface TodoItemProps {
  todo: Todo;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onComplete: (index: number) => void;
}

function TodoItem({ todo, index, onEdit, onDelete, onComplete }: TodoItemProps) {
  return (
    <div className={`task-list ${todo.completed ? "completed" : ""} listStyle`}>
       <div>
       <input
        className="checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onComplete(index)}
      />
      {todo.text}
      </div>
      <div >
        <button className="icons" onClick={() => onEdit(index)}>
          <FontAwesomeIcon icon={faEdit} className="icon" />
        </button>
        <button className="icons" onClick={() => onDelete(index)}>
          <FontAwesomeIcon icon={faTrashAlt} className="icon" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;