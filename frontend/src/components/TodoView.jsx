import TodoItem from "./Todo";

function TodoView(props) {
    return (
        <div className="flex flex-col">
            {props.todoList.map((todo) => (
                <TodoItem
                    title={todo.title}
                    description={todo.description}
                />
            ))}
        </div>
    )
}

export default TodoView