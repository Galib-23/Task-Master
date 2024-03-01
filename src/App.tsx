
import React, { useState } from 'react';
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { act } from 'react-dom/test-utils';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  }

  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;
    //console.log(result) --> see this to understand below codes
    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add; 
    let active = todos; 
    let complete = completedTodos;

    if(source.droppableId === "TodosList"){
      add = active[source.index];
      active.splice(source.index, 1);
    }else{
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if(source.droppableId === "TodosList"){
      complete.splice(destination.index, 0, add);
      //complete.push(add); --> this adds on last but above adds on a particular index
    }else{
      active.splice(destination.index, 0, add);
      //active.push(add) --> this adds on last but above adds on a particular index
    }
    setCompletedTodos(complete);
    setTodos(active);

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='overflow-x-hidden flex flex-col items-center'>
        <h2 className='text-center text-2xl font-bold md:text-6xl mt-10 mb-8 md:font-extrabold'>Task Master</h2>
        <InputField todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;
