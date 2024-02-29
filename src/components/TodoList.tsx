import { Todo } from "../model"
import TodoCard from "./TodoCard";

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({todos, setTodos}: Props) => {
  return (
    <div>
      {
        todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
        ))
      }
    </div>
  )
}

export default TodoList
