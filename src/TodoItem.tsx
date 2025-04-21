// src/TodoItem.tsx
import React, { useEffect, useState, useContext, useCallback } from "react";
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

  const getDustColor = useCallback(() => {
    if (theme === "dark") {
      const colors = [
        "#ffe066", "#fff9c4", "#fff", "#ffd700", "#f6e05e"
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    } else {
      const colors = [
        "#bfa76f", "#a89c8d", "#bdb76b", "#8d6748", "#c0b283"
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }, [theme]);

  // Restore original getRandomParticles
  const getRandomParticles = useCallback((count: number) => {
    return Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      dx: (Math.random() - 0.5) * 120,
      dy: -Math.random() * 60 - 20,
      delay: Math.random() * 0.2,
      size: 3 + Math.random() * 4,
      color: getDustColor(),
    }));
  }, [getDustColor]);

  // Only add minimal smooth height collapse
  const [itemHeight, setItemHeight] = useState<number | undefined>(undefined);
  const itemRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current && !isDeleting) {
      setItemHeight(undefined); // Let CSS handle height
    }
  }, [todo.text, isDeleting]);

  useEffect(() => {
    if (isDeleting) {
      setParticles(getRandomParticles(36));
      setShowDust(true);
      setTimeout(() => setShowDust(false), 700);
      setTimeout(() => setItemHeight(0), 400); // Collapse after dust
    }
  }, [isDeleting, theme, getRandomParticles]);

  return (
    <div
      ref={itemRef}
      className={`task-list ${todo.completed ? "completed" : ""} listStyle${isNew && !isEditUpdated ? " todo-animate" : ""}${isDeleting ? " vanish" : ""}${isEditing ? " editing editing-active" : ""}${isEditUpdated ? " edit-updated" : ""}`}
      style={{ position: "relative", overflow: "visible", height: itemHeight, transition: itemHeight !== undefined ? 'height 0.4s cubic-bezier(0.4, 0.2, 0.2, 1)' : undefined }}
    >
      <div>
        <input
          className="checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onComplete(index)}
        />
        <span className={isEditing ? "editing-label" : ""}>{todo.text}</span>
      </div>
      <div>
        <button className={`icons${isEditing ? " editing-btn-active" : ""}`} onClick={() => onEdit(index)}>
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