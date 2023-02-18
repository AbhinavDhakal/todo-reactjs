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

  const html = document.documentElement;

  //For Normal Todo
  function Todo(props) {
    const completedRef = useRef(false);

    const handleCompleted = (compId) => {
      let updatedTodos = todos.map((todo) => {
        if (todo.id === compId) {
          let editedTodo = { ...todo };
          editedTodo.completed = completedRef.current.checked;
          return editedTodo;
        } else {
          return todo;
        }
      });

      setTodos(updatedTodos);
    };

    let todoClass = "todoText";
    if (props.todo.completed) todoClass += " completedTodo";

    return (
      <li className="todo">
        <input
          ref={completedRef}
          className="checkboxTodo"
          type="checkbox"
          onChange={() => {
            handleCompleted(props.todo.id);
          }}
          checked={props.todo.completed}
        />
        <div className={todoClass}>{props.todo.task}</div>
        <div className="buttons">
          <button className="editBtn" onClick={() => handleEdit(props.todo.id)}>
            <i className="material-icons">edit</i>
          </button>
          <button
            className="deleteBtn"
            onClick={() => handleDelete(props.todo.id)}
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
      </li>
    );
  }
  //When editing mode is on for a particular todo, this todo is shown instead of normal

  function EditTodo(props) {
    const [updatedTask, setUpdatedTask] = useState(props.todo.task);

    function handleSave() {
      if (updatedTask.trim() === "") return;
      handleEdit(props.todo.id, updatedTask);
    }

    return (
      <li className="todo">
        <textarea
          className="todoEditText"
          defaultValue={props.todo.task}
          onChange={(e) => setUpdatedTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSave(props.todo.id);
          }}
          autoFocus
          onFocus={(e) => {
            e.target.selectionStart = e.target.value.length;
          }}
        ></textarea>

        <div className="buttons">
          <button
            type="submit"
            onClick={() => handleSave(props.todo.id)}
            className="editBtn"
          >
            <i className="material-icons">check</i>
          </button>
        </div>
      </li>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputRef.current.value.trim() === "") return;
    setTodos([
      ...todos,
      { id: id, task: inputRef.current.value, completed: false, edit: false },
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
  function handleEdit(editId, updatedTask) {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        let editedTodo = { ...todo };
        if (todo.edit) {
          editedTodo.edit = false;
          editedTodo.task = updatedTask;
          return editedTodo;
        } else {
          editedTodo.edit = true;
          return editedTodo;
        }
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
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
        <div>
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
        </div>
      </form>
      <section id="lists">
        {todos.map((todo) => {
          if (!todo.edit) {
            return <Todo todo={todo} key={todo.id} />;
          } else {
            return <EditTodo todo={todo} key={todo.id} />;
          }
        })}
      </section>
      <footer>
        <div className="left">
          <a href="https://github.com/AbhinavDhakal" rel="noreferrer">
            Abhinav Dhakal
          </a>{" "}
          |<a href="https://github.com/AbhinavDhakal/todo-reactjs"> Code</a>
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
