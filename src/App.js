import "./App.css";
import { useState, useRef } from "react";

const App = () => {
  const [todos, setTodos] = useState(getFromLocal()?.todos || []);
  const [id, setId] = useState(getFromLocal()?.counter || 0);
  const inputRef = useRef(null);

  function saveToLocal(obj) {
    localStorage.setItem("todos", JSON.stringify(obj));
  }

  saveToLocal({ counter: id, todos: todos });

  function getFromLocal() {
    return JSON.parse(localStorage.getItem("todos"));
  }

  return (
    <div className="App">
      <h1>Todo</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setTodos([
            ...todos,
            { id: id, task: inputRef.current.value, completed: false },
          ]);
          setId(id + 1);
          inputRef.current.value = "";
        }}
      >
        <input key="sex" ref={inputRef} type="text"></input>
        <button key="red" type="submit">
          Add
        </button>
      </form>

      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            {todo.task}
            <button>X</button>
          </li>
        );
      })}
    </div>
  );
};

export default App;
