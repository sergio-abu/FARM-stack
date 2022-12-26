import axios from "axios";

function TodoItem(props) {
    const deleteTodoHandler = (title) => {
        axios.delete(`http://localhost:8000/api/todo/${title}`)
            .then(response => console.log(response.data))
    }
    return (
        <div className="flex justify-center">
            <div className="flex justify-between w-96">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-[#1B998B]">{props.title}</h2>
                    <p className="text-lg">{props.description}</p>
                </div>
                <div className="flex flex-col">
                    <button onClick={() => deleteTodoHandler(props.title)} className="bg-[#1B998B] text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default TodoItem
