import { useState } from "react";
import { Todo } from "../model"
import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdDone } from "react-icons/md";
import { LuSave } from "react-icons/lu";

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}




const TodoCard = ({ todo, todos, setTodos }: Props) => {


    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTodo, setEditedTodo] = useState<string>(todo.todo);

    const handleEditTodo = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map(todo=>(
            todo.id === id ?
            {...todo, todo: editedTodo}
             : todo
        )));
        setIsEditing(false);
    }

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone}: todo)
        )
    }

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((todo) => todo.id !== id)
        )
    }

    return (
        <div className="p-6 bg-cyan-400 flex items-center justify-between w-96 mt-4 rounded-sm shadow-lg hover:bg-cyan-300 cursor-pointer">
            <div>
                {
                    isEditing ? (
                        <div className="flex items-center">
                            <input
                                className="py-1 px-2 rounded-sm"
                                type="text"
                                value={editedTodo}
                                onChange={(e)=>{
                                    setEditedTodo(e.target.value);
                                }}
                            />
                            <LuSave onClick={(e)=>handleEditTodo(e,todo.id)} className="text-xl ml-2 text-white hover:text-gray-900" />
                        </div>
                    ) : (
                        todo.isDone ? 
                        <div>
                            <p className="line-through text-red-500 text-lg">{todo.todo}</p>
                        </div>
                        :
                        <p className="text-lg">{todo.todo}</p>
                    )
                }
            </div>
            <div className="flex gap-2">
                <span onClick={() => {
                    if(!isEditing && !todo.isDone){
                    setIsEditing(true);
                    }
                }
                }><AiFillEdit className="text-2xl hover:text-white" /></span>

                <span onClick={()=>{
                    handleDelete(todo.id);
                }}><MdDelete className="text-2xl hover:text-white" /></span>

                <span onClick={()=> {
                    handleDone(todo.id)
                }}><MdDone className="text-2xl hover:text-white" /></span>
            </div>
        </div>
    )
}

export default TodoCard