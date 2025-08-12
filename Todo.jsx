import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
    if (todos.length === 0) {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }
//   const [todos, setTodos] = useState()
// const saved = localStorage.getItem('todos');
// if(saved) {
//   const js = JSON.parse(saved);
//   return js
// }
  // // ✅ Load todos from localStorage when the app starts
  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  //   setTodos(storedTodos);
  // }, []);

  // // ✅ Save todos to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodos = [...todos, input.trim()];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setInput('');
    // setTodos([...todos, input.trim()]);
    // setInput('');
    // console.log([...todos, input.trim()])
  };

  const handleDelete = (index) => {
    // const newTodos = todos.filter((_, i) => i !== index);
    // setTodos(newTodos);
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleAdd}>
        <div>
          <input
            type="text"
            placeholder="Add a todo..."
            onChange={(e) => setInput(e.target.value)} 
            value={input}
            className="mt-2 p-2 w-full px-4 py-2 text-gray-700 border border-gray-400 rounded focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim()}
          className="py-2 mt-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <div className="mt-4">
        <ul className="list-disc pl-5">
          {todos.map((todo, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{todo}</span>
              <button
                onClick={() => handleDelete(index)}
                className="ml-4 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {todos.length === 0 && <p className="text-gray-500">No todos yet.</p>}
      </div>
    </div>
  );
};

export default App;


// import React from 'react'
// import { useState ,useEffect} from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'

// const App = () => {

//   const [input , setInput] = useState('');
//   const  [todos, setTodos] = useState([]);

//     useEffect(() => {
//     const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
//     setTodos(storedTodos);
//   }, []);

//   // ✅ Save todos to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('todos', JSON.stringify(todos));
//   }, [todos]);
//   const handleAdd = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     // Add new todo
//     setTodos([...todos, input.trim()]);
//     setInput('');
//     console.log(setTodos([...todos], input.trim()));
// }
//   return (
// <div>
//       {/* <h1 className='underline bg-blue-500'>hello </h1> */}
//       <form action="" onSubmit={handleAdd}>
//        <div>
//           <input
//             type="text"
//             id="add"
//             className="mt-2 p-2 w-full px-4 py-2 text-gray-500 border-1 border-gray-700 rounded focus:outline-none"
//             placeholder="john@gmail.com"
//             onChange={(e) => setInput(e.target.value)}
//             value={input}
//           />
//       </div>
//       <button type='submit' disabled={!input.trim()}  className=' py-2 mt-2 rounded focus:outline-none'>Add</button>
//       </form>
//       <div>
//         <ul>
//           {todos.map((todo,index) => {
//             <li key={index}>
//               <span>{todo}</span>
//             </li>
//           })}
//         </ul>
//         {todos.length === 0 && <p className="text-gray-500">No todos yet.</p>}
//       </div>
// </div>
//   )
// }

// export default App

