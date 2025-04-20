// src/Todo.tsx
import React, { useState, useContext } from "react";
import "./App.css";
import Header from "./Header";
import ThemeToggleButton from "./ThemeToggleButton";
import TodoItem from "./TodoItem";
import { ThemeContext } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faEdit } from "@fortawesome/free-solid-svg-icons"; // Import the faEdit icon

interface Todo {
  text: string;
  completed: boolean;
}

interface TodoAppProps {
  // No props
}

function TodoApp(props: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>([]);  // Manages list of todos
  const [currentInputValue, setCurrentInputValue] = useState<string>("");  // Manages input field value
  const [todoIndexBeingEdited, setTodoIndexBeingEdited] = useState<number | null>(null);  // Index of the todo being edited
  const { theme } = useContext(ThemeContext);  // Current theme (light or dark)
  const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  // Handles input field changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInputValue(event.target.value);
  };

  // Handles form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoIndexBeingEdited !== null) {
      updateExistingTodo();
    } else {
      addNewTodo();
    }
    setCurrentInputValue("");
  };

  const addNewTodo = () => {
    setTodos((prev) => {
      const newTodos = [...prev, { text: currentInputValue, completed: false }];
      setLastAddedIndex(newTodos.length - 1);
      return newTodos;
    });
  };

  // Updates an existing todo
  const updateExistingTodo = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === todoIndexBeingEdited ? { ...todo, text: currentInputValue } : todo
    );
    setTodos(updatedTodos);
    setTodoIndexBeingEdited(null);
  };

  // Deletes a todo
  const deleteTodo = (index: number) => {
    setDeletingIndex(index);
    setTimeout(() => {
      setTodos((prev) => prev.filter((_, i) => i !== index));
      setDeletingIndex(null);
    }, 500); // Match the vanish animation duration
  };

  // Sets the todo for editing
  const editTodo = (index: number) => {
    setCurrentInputValue(todos[index].text);
    setTodoIndexBeingEdited(index);
  };

  // Toggles the completed state of a todo
  const toggleTodoComplete = (index: number) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Counts incomplete todos
  const countIncompleteTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className={`container ${theme}`}>
      <ThemeToggleButton />
      <div className="card">
        <Header todos_completed={countIncompleteTodos} total_todos={todos.length} />
        
        <div className="task-list-part">
          <form className="form" onSubmit={handleFormSubmit}>
            <input
              placeholder="✨ Add an awesome task..."
              type="text"
              value={currentInputValue}
              onChange={handleInputChange}
              className="input-style"
            />
            <button className="btn" type="submit">
              {todoIndexBeingEdited !== null ? (
                <FontAwesomeIcon icon={faEdit} className="icon" />
              ) : (
                "+"
              )}
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                index={index}
                onEdit={editTodo}
                onDelete={deleteTodo}
                onComplete={toggleTodoComplete}
                isNew={index === lastAddedIndex}
                isDeleting={index === deletingIndex}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;