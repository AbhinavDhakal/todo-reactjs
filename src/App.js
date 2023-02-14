import "./App.css";
import Todo from "./Todo/Todo.js";
import { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <Todo />
      <div id="counter">
        <button
          onClick={() => {
            setCounter((prevCounter) => prevCounter + 1);
          }}
        >
          +
        </button>
        <h2>{counter}</h2>
        <button
          onClick={() => {
            setCounter((prevCounter) => prevCounter - 1);
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default App;
