import { useEffect, useRef, useState } from "react";
import { Todo } from "../model"
import { AiFillEdit } from "react-icons/ai";
import { MdDelete, MdDone } from "react-icons/md";
import { LuSave } from "react-icons/lu";
import { Draggable } from "react-beautiful-dnd";

type Props = {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completed: boolean;
}




const TodoCard = ({ todo, todos, setTodos, index, completed }: Props) => {


    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTodo, setEditedTodo] = useState<string>(todo.todo);

    const handleEditTodo = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map(todo => (
            todo.id === id ?
                { ...todo, todo: editedTodo }
                : todo
        )));
        setIsEditing(false);
    }

    const handleDone = (id: number) => {
        setTodos(
            todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)
        )
    }

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((todo) => todo.id !== id)
        )
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [isEditing])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <div 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="p-6 bg-cyan-300 flex items-center justify-between md:w-96 mt-4 rounded-md shadow-lg hover:bg-cyan-200 cursor-pointer hover:scale-105">
                <div>
                    {
                        isEditing ? (
                            <div className="flex items-center">
                                <input
                                    ref={inputRef}
                                    className="py-1 px-2 rounded-sm"
                                    type="text"
                                    value={editedTodo}
                                    onChange={(e) => {
                                        setEditedTodo(e.target.value);
                                    }}
                                />
                                <LuSave onClick={(e) => handleEditTodo(e, todo.id)} className="text-xl ml-2 text-white hover:text-gray-900 hover:cursor-pointer" />
                            </div>
                        ) : (
                            (todo.isDone || completed) ?
                                <div>
                                    <p className="line-through text-red-500 text-lg">{todo.todo}</p>
                                </div>
                                :
                                <p className="text-lg">{todo.todo}</p>
                        )
                    }
                </div>
                <div className="flex gap-2">
                    <span className="hover:cursor-pointer" onClick={() => {
                        if (!isEditing && !todo.isDone) {
                            setIsEditing(true);
                        }
                    }
                    }><AiFillEdit className="text-2xl hover:text-white" /></span>

                    <span className="hover:cursor-pointer" onClick={() => {
                        handleDelete(todo.id);
                    }}><MdDelete className="text-2xl hover:text-white" /></span>

                    <span className="hover:cursor-pointer" onClick={() => {
                        handleDone(todo.id)
                    }}><MdDone className="text-2xl hover:text-white" /></span>
                </div>
            </div>
                )
            }
        </Draggable>
    )
}

export default TodoCard
