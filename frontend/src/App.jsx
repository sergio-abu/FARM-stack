import {React, useState, useEffect} from "react"
import axios from "axios"
import TodoView from "./components/TodoView"


function App() {

  const [todoList, setTodoList] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // read all todos
  useEffect(() => {
    axios.get("http://localhost:8000/api/todo").then((response) => {
      setTodoList(response.data)
    })
  })

  // post a todo
  const addTodoHandler = () => {
    axios.post("http://localhost:8000/api/todo", {
      title: title,
      description: description,
    }).then(response => console.log(response))
  }


  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center text-[#1B998B] p-10">
        FARM stack project
        <h1 className="text-xl text-centers]">
        another todo app
        </h1>
      </h1>

      <div className="flex justify-center">
        <div>
          <div className="form-floating mb-3 xl:w-96">
            <h2>Add your Task</h2>
            <input onChange={event => setTitle(event.target.value)}
            className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Title"/>
          </div>
          <div className="form-floating mb-3 xl:w-96">
            <input onChange={event => setDescription(event.target.value)}
            className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Description"/>
          </div>
          <button onClick={addTodoHandler}>ADD</button>
          <h2>Your tasks</h2>
          <div className="form-floating mb-3 xl:w-96">
          <TodoView todoList={todoList} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
