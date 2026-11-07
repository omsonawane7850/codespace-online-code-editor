const initialFiles = {
  "/App.js": {
    code: `import "./styles.css";

function App() {
  return (
    <div className="app">
      <h1>Hello, CodeSpace!</h1>
      <p>Start building something amazing.</p>
      <button>Get Started</button>
    </div>
  );
}

export default App;`,
  },

  "/styles.css": {
    code: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #f8fafc;
  color: #111827;
}

h1 {
  font-size: 36px;
}

p {
  color: #64748b;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: white;
  cursor: pointer;
}`,
  },

  "/index.js": {
    code: `import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },

  "/public/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodeSpace</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
  },
};

export default initialFiles;
