import React, { useState, useEffect } from 'react';
import '/src/App.css';

const Todos = () => {
    const [input , setInput] = useState('');
    const [todos, setTodos] = useState([]);
  // ✅ Load from localStorage only once
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);
    const handleAdd = (e) => {

        e.preventDefault();
    if (!input.trim()) return;

    const newTodos = [...todos, input.trim()];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos))
    //localStorage.setItem('todos', JSON.stringify(newTodos));
    setInput('');
        console.log(setTodos([...todos, input.trim()]))
        console.log(input);
    //         const newTodos = todos.filter((_, i) => i !== index);

    }



  const handleDelete = (index) => {
    // const newTodos = todos.filter((_, i) => i !== index);
    // setTodos(newTodos);
    const newTodos = todos.filter((_,i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };
  return (
    <div>
        <form onSubmit={handleAdd}>
            <div>
                <input className='border py-2 p-2 rounded ' 
                type="text" 
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder='input'/>
                <div>
                    <button type="submit"
                     disabled={!input.trim()}>Add</button>
                </div>
            </div>
        </form>

        <div>
            <ul className='list-disc pl-5'>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span>{todo}</span>
                    <button className='text-white'   onClick={() => handleDelete(index)}>
                        Delete
                    </button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Todos