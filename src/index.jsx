// src/index.jsx
import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";

import Todo from "./Todo.tsx";
import reportWebVitals from "./reportWebVitals.js";
import { ThemeProvider, ThemeContext } from "./ThemeContext.tsx";

function AppWrapper() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Apply the current theme to the body element
    document.body.className = theme;
  }, [theme]);

  return <Todo />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  </React.StrictMode>
);


reportWebVitals();
