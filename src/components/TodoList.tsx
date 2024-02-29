import { Todo } from "../model"
import TodoCard from "./TodoCard";
import { VscLayersActive } from "react-icons/vsc";
import { VscVmRunning } from "react-icons/vsc";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="mt-14 flex gap-10">
        <div className="bg-green-200 p-7">
          <h2 className="text-2xl font-bold text-amber-600 flex items-center gap-3">Active Tasks <span><VscVmRunning /></span></h2>
          <hr className="mt-2 h-px border-0 bg-amber-600 mb-5" />
          {
            todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
            ))
          }
        </div>
        <div className="bg-fuchsia-200 p-7">
          <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-3">Completed Tasks <span><VscLayersActive /></span></h2>
          <hr className="mt-2 h-px border-0 bg-blue-700 mb-5" />
          {
            todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default TodoList
