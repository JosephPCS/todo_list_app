import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos,setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState("");
  const [listInputs,setListInputs] = useState({});
 


  const handleAddTodo = () =>{
    if(headingInput.trim() !== ""){
        setTodos([...todos, {heading : headingInput, lists:[]} ]); //this is spread syntax
        //the spread syntax creates an new object with a heading proeprty that is set to heading input
        //also initializes an empty array called lists, im assuming this is what is used for the sub to-dos of the corresponding heading
        setHeadingInput("");
    }

   
   
  };

  const handleAddList = (index) => {
    if(listInputs[index].trim() !== '' && listInputs[index]){
        const newTodos = [...todos];
        newTodos[index].lists.push({text : listInputs[index], crossed: false});
        setTodos(newTodos);
        setListInputs({...listInputs, [index]: ''});

    }
};

const handleListInputChange = (index, value) =>{
    setListInputs({...listInputs, [index]: value});
};

const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);

};

const isCrossed = (index, listIndex) => {
    const newTodos = [...todos];
    newTodos[index].lists[listIndex].crossed = !newTodos[index].lists[listIndex].crossed;
    setTodos(newTodos);
 }

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            value={headingInput}
            onChange={(e) => {setHeadingInput(e.target.value);}}
            placeholder="Enter heading"
            
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => (
            <div key={index} className='todo-card'>
                <div className='heading_todo'>
                    <h3>{todo.heading}</h3>
                    <button
                                className="delete-button-heading"
                                onClick={() => handleDeleteTodo(index)}
                            >
                                Delete Heading
                            </button>
                </div>

                <ul>
                    {todo.lists.map((list, listIndex) => (
                        <li key={listIndex} className='todo_inside_list'>
                            <p style={{textDecoration: list.crossed ? 'line-through' : 'none'}}>{list.text}</p>
                            <button className='complete-button' onClick={() => isCrossed(index,listIndex)}>{list.crossed ? 'Completed' : 'Complete'}</button>
                            
                        </li>
                    ))}
                </ul>

         <div className='add_list'>
            {/* Input field for adding a new item under a specific heading */}
            <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[index] || ''}// Use the value from listInputs array based on the current heading index
                onChange={(e) => handleListInputChange(index, e.target.value)}
                />
            {/* Button to add the list item to the corresponding heading */}
            <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
         </div>
               
            </div>
        ))}
        
       
      </div>
    </>
  );
};

export default TodoList;
