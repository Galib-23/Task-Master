
import React, { useState } from 'react';
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';

const App: React.FC = () =>{

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}]);
      setTodo("");
      console.log(todos)
    }
  }
  return (
    <div className=''>
      <h2 className='text-center text-6xl mt-10 mb-8 font-extrabold'>Task Master</h2>
      <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
      <TodoList />
    </div>
  );
}

export default App;
