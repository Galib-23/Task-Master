import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model"
import TodoCard from "./TodoCard";
import { VscLayersActive } from "react-icons/vsc";
import { VscVmRunning } from "react-icons/vsc";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
  return (
      <div className="mt-14 flex flex-col lg:flex-row gap-10 mb-14">
        <Droppable droppableId="TodosList">
          {
            (provided) => (
              <div 
              className="bg-green-200 h-fit p-7 md:min-w-96" 
              ref={provided.innerRef} 
              {...provided.droppableProps}
              >
                <h2 className="text-2xl font-bold text-amber-600 flex items-center gap-3">Active Tasks <span><VscVmRunning /></span></h2>
                <hr className="mt-2 h-px border-0 bg-amber-600 mb-5" />
                {
                  todos.map((todo, index) => (
                    <TodoCard completed={false} index={index} key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
                  ))
                }
                {provided.placeholder}
              </div>
            )
          }    
          
        </Droppable>
        <Droppable droppableId="TodosRemove">
          {
            (provided) => (
              <div className="bg-fuchsia-200 h-fit p-7 md:min-w-96" ref={provided.innerRef} {...provided.droppableProps}>
                <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-3">Completed Tasks <span><VscLayersActive /></span></h2>
                <hr className="mt-2 h-px border-0 bg-blue-700 mb-5" />
                {
                 completedTodos && completedTodos.map((todo, index) => (
                    <TodoCard completed={true} index={index} key={todo.id} todo={todo} todos={completedTodos} setTodos={setCompletedTodos} />
                  ))
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </div>
  )
}

export default TodoList
