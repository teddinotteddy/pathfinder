/*export default function Todo() {
  return (
    <div className="todo flex flex-col items-center min-h-screen p-4">
      <h1 className="text-xl">My To-Do's</h1> 
      
    </div>
  )
}*/
"use client";

import React, { useState } from 'react';
import './style.css'; 

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput('');
  };

  const deleteAll = () => {
    setTodos([]);
  };

  const toggleCompletion = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    const newTodos = [...todos];
    const draggedTodo = newTodos[draggedIndex];

    // Prevent default to allow drop
    newTodos.splice(draggedIndex, 1);
    newTodos.splice(index, 0, draggedTodo);
    setTodos(newTodos);
    setDraggedIndex(index);
  };

  const handleDrop = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="bg-gray-100 p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Draggable To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={addTodo} className="bg-blue-500 text-white p-2 w-full">
        Add Task
      </button>
      <button onClick={deleteAll} className="bg-red-500 text-white p-2 w-full mt-2">
        Delete All
      </button>

      <ul className="mt-4 border rounded-lg overflow-hidden">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-2 border-b cursor-move ${todo.completed ? 'line-through bg-gray-300' : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={() => handleDragOver(index)}
            onDrop={handleDrop}
            onDragEnd={handleDrop}
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={todo.completed}
              onChange={() => toggleCompletion(index)}
            />
            <span
              contentEditable
              suppressContentEditableWarning
              className="flex-1"
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(index)}
              className="bg-red-500 text-white p-1 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
