import "./App.css";
import { useState, useRef, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState(getFromLocal()?.todos || []);
  const [id, setId] = useState(getFromLocal()?.counter || 0);
  const inputRef = useRef(null);
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || {
      name: "light",
      icon: "fa fa-sun-o",
    }
  );

  let html = document.documentElement;

  function handleSubmit(event) {
    event.preventDefault();
    if (inputRef.current.value.trim() === "") return;
    setTodos([
      ...todos,
      { id: id, task: inputRef.current.value, completed: false },
    ]);
    setId(id + 1);
    inputRef.current.value = "";
  }

  function handleDelete(delId) {
    console.log(delId);
    let remainingTodos = todos.filter((todo) => todo.id !== delId);
    setTodos(remainingTodos);
  }

  function handleClear() {
    setId(0);
    setTodos([]);
  }

  function handleTheme() {
    if (theme.name === "light") {
      setTheme({ name: "dark", icon: "fa fa-moon-o" });
    } else {
      setTheme({ name: "light", icon: "fa fa-sun-o" });
    }
  }

  useEffect(() => {
    saveToLocal({ counter: id, todos: todos });
  }, [todos, id]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    html.classList.value = "theme-" + theme.name;
  }, [theme, html.classList]);

  return (
    <div className="App ">
      <center>
        <h1>ToDo</h1>
      </center>
      <form id="input" onSubmit={handleSubmit}>
        <input ref={inputRef} id="inputTodo" type="text"></input>
        <button type="submit" id="todoAdd" className="mainButtons">
          Add
        </button>
        <button
          type="button"
          id="clearBtn"
          onClick={handleClear}
          className="mainButtons"
        >
          Clear
        </button>
      </form>
      <section id="lists">
        {todos.map((todo) => {
          return (
            <li className="todo" key={todo.id}>
              <div className="todoText">{todo.task}</div>
              <button
                className="deleteBtn"
                onClick={() => handleDelete(todo.id)}
              >
                <i className="material-icons">delete</i>
              </button>
            </li>
          );
        })}
      </section>
      <footer>
        <div className="left">
          <a href="https://github.com/AbhinavDhakal">Abhinav Dhakal</a> |
          <a href="https://github.com/AbhinavDhakal/todo-reactjs"> Code</a>
        </div>
        <div className="right">
          <button onClick={handleTheme} className="themeChanger">
            <i className={theme.icon}></i>
          </button>
        </div>
      </footer>
    </div>
  );
};

function getFromLocal() {
  return JSON.parse(localStorage.getItem("todos"));
}

function saveToLocal(obj) {
  localStorage.setItem("todos", JSON.stringify(obj));
}

export default App;
