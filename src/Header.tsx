import React, { useContext } from "react";
import "./App.css";
import { ThemeContext } from "./ThemeContext";

interface HeaderProps {
  todos_completed: number;
  total_todos: number;
}

const Header: React.FC<HeaderProps> = ({ todos_completed, total_todos }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`header ${theme}`}>
      <div className="header-top">
        <h1>Task Done</h1>
        <p>Keep it up</p>
      </div>
      <div className="header-text">
        {todos_completed}/{total_todos}
      </div>
    </div>
  );
};

export default Header;