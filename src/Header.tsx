import React, { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { ThemeContext } from "./ThemeContext";

interface HeaderProps {
  todos_completed: number;
  total_todos: number;
}

const Header: React.FC<HeaderProps> = ({ todos_completed, total_todos }) => {
  const { theme } = useContext(ThemeContext);
  const [animate, setAnimate] = useState(false);
  const prevCount = useRef(todos_completed);

  useEffect(() => {
    if (prevCount.current !== todos_completed) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 400);
      prevCount.current = todos_completed;
      return () => clearTimeout(timeout);
    }
  }, [todos_completed]);

  return (
    <div className={`header ${theme}`}>
      <div className="header-top">
        <h1>ToDo List</h1>
        <p>Stay Organized</p>
      </div>
      <div className="header-text">
        <span className={animate ? "count-animate" : ""}>{todos_completed}</span>/{total_todos}
      </div>
    </div>
  );
};

export default Header;