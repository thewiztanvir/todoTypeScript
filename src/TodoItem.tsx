// src/TodoItem.tsx
import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "./ThemeContext";

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
  isNew?: boolean;
  isDeleting?: boolean;
  isEditing?: boolean;
  isEditUpdated?: boolean;
}

function TodoItem({ todo, index, onEdit, onDelete, onComplete, isNew, isDeleting, isEditing, isEditUpdated }: TodoItemProps) {
  const { theme } = useContext(ThemeContext);
  const [showDust, setShowDust] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  function getDustColor() {
    if (theme === "dark") {
      // bright golds, whites, yellows for dark mode
      const colors = [
        "#ffe066", // gold
        "#fff9c4", // light yellow
        "#fff",    // white
        "#ffd700", // gold
        "#f6e05e"  // yellow
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    } else {
      // browns, dark golds, greys for light mode
      const colors = [
        "#bfa76f", // brown gold
        "#a89c8d", // grey brown
        "#bdb76b", // dark khaki
        "#8d6748", // brown
        "#c0b283"  // light brown
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }

  function getRandomParticles(count: number) {
    return Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      dx: (Math.random() - 0.5) * 120,
      dy: -Math.random() * 60 - 20,
      delay: Math.random() * 0.2,
      size: 3 + Math.random() * 4,
      color: getDustColor(),
    }));
  }

  useEffect(() => {
    if (isDeleting) {
      setParticles(getRandomParticles(36));
      setShowDust(true);
      setTimeout(() => setShowDust(false), 700);
    }
  }, [isDeleting, theme, getRandomParticles]);

  return (
    <div
      className={`task-list ${todo.completed ? "completed" : ""} listStyle${isNew && !isEditUpdated ? " todo-animate" : ""}${isDeleting ? " vanish" : ""}${isEditing ? " editing" : ""}${isEditUpdated ? " edit-updated" : ""}`}
      style={{ position: "relative", overflow: "visible" }}
    >
      <div>
        <input
          className="checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onComplete(index)}
        />
        {todo.text}
      </div>
      <div>
        <button className="icons" onClick={() => onEdit(index)}>
          <FontAwesomeIcon icon={faEdit} className="icon" />
        </button>
        <button className="icons" onClick={() => onDelete(index)}>
          <FontAwesomeIcon icon={faTrashAlt} className="icon" />
        </button>
      </div>
      {showDust && (
        <div className="dust-container">
          {particles.map((p, i) => (
            <div
              key={i}
              className="dust-particle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                animationDelay: `${p.delay}s`,
                background: p.color
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoItem;