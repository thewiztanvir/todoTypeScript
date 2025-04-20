// src/Todo.tsx
import React, { useState, useContext, useEffect } from "react";
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
  const [editUpdatedIndex, setEditUpdatedIndex] = useState<number | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    if (todos.length > 0 && todos.every((todo) => todo.completed)) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 2500);
    }
  }, [todos]);

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
      setTimeout(() => setLastAddedIndex(null), 500); // Reset after animation duration
      return newTodos;
    });
  };

  // Updates an existing todo
  const updateExistingTodo = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === todoIndexBeingEdited ? { ...todo, text: currentInputValue } : todo
    );
    setTodos(updatedTodos);
    setEditUpdatedIndex(todoIndexBeingEdited); // trigger update effect
    setTodoIndexBeingEdited(null);
    setTimeout(() => setEditUpdatedIndex(null), 700); // match animation duration
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
      {showCongrats && (
        <div className="congrats-overlay-full">
          <div className="fireworks-stars">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="star-burst"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${1.2 + Math.random() * 2.5}rem`,
                  color: `hsl(${Math.random() * 360}, 90%, 70%)`,
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              >
                ✨
              </span>
            ))}
          </div>
        </div>
      )}
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
                isEditing={index === todoIndexBeingEdited}
                isEditUpdated={index === editUpdatedIndex}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;