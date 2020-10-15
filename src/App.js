import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  
  const [inputText, setInputtext] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  
  useEffect(() => {
    getLocalTodos();
  },[]);
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  function filterHandler(){
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
          setFilteredTodos(todos);
          break;
    }
  }

  function saveLocalTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  function getLocalTodos(){
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]))
    }
    else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
    <header><h1>ToDo List</h1></header>
    <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputtext={setInputtext} setStatus={setStatus} />
    <TodoList filteredTodos={filteredTodos} setTodos={ setTodos } todos={todos} />
    </div>
  );
}

export default App;
