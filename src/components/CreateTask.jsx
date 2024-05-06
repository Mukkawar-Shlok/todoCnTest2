import React, { useState } from 'react';
import './createTask.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useData } from '../Context';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const {todos, setTodos} = useData();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/users/1/todos', {
            method: 'POST',
            body: JSON.stringify({
              title: title,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setTitle("")
                setTodos((prev)=>{
                    let updatedTodos=prev.filter((item) => item.id != json.id);
                    updatedTodos.unshift(json);
                    return updatedTodos;
                })
                toast("Created Task!")
                console.log(todos)
            })
            .catch((error)=>{
                console.log(error)
            })
    };

    return (
        <div className="container">
            
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                {/* Hidden fields */}
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default CreateTask;
