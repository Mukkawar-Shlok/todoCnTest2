import React, { useState } from 'react';
import './listComponent.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useData } from '../Context';

const ListComponent = () => {
    const {todos, setTodos} = useData();
    const [page, setPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);
    const [title, setTitle] = useState('');
    const todosPerPage = 5; 


    const startIndex = page * todosPerPage;
    const endIndex = startIndex + todosPerPage;

    // Get todos for the current page
    const todosToShow = todos.slice(startIndex, endIndex);
    
    const handelDelete = async (id) => {
        console.log(id);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                setTodos((prev)=>{
                    return prev.filter((item) => item.id != id);
                    
                })
                toast(`Deleted Task With Id ${id}`);
            } else {
                console.log('Failed to delete task');
            }
        } catch (error) {
            console.log('error:', error.message);
        }
    };

    const handelComplete = async (id)=>{
        setTodos((prev)=>{
            return prev.map(item =>{
                if(item.id == id){
                    return {...item,completed : true};
                }
                return item;
            })
        })
    }

    const handelUpdate = async (id) =>{
        setSelectedTodoId(id);
        setShowModal(true);
    }

    const handleModalClose = async()=>{
        setShowModal(false);
    }

    const handleModalUpdate = async(id)=>{
        setTodos((prev)=>{
            return prev.map((item)=>{
                if(item.id == id){
                    return {...item,title:title};
                }
                return item;
            })
        })
        toast("Task Updated!.")
        setShowModal(false);
    }

    return (
        <div className="list-container">
             <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />

            <h2 className="list-title">Todos List</h2>
            <ul className="list">
                    {todosToShow.map(todo => (
                        <>
                        <li key={todo.id} className="list-item" style={{ backgroundColor: todo.completed ? 'green' : 'red' }}>
                            {todo.title}
                        </li>
                            <button onClick={()=>handelUpdate(todo.id)}>Update</button>
                            <button onClick={() => handelDelete(todo.id)}>Delete</button>
                            { !todo.completed && (
                                <button onClick={()=>handelComplete(todo.id)} >Mark Complete</button>
                            ) }
                        </>
                    ))}
                </ul>
                {showModal && (
                <div className="overlay"> {/* Overlay */}
                    <div className="modal"> {/* Modal */}
                        <div className="modal-content">
                            
                            <h2>Update Todo</h2>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input-field"
                                required
                                />
                            
                            <button onClick={handleModalClose}>Close</button>
                            <button onClick={()=>handleModalUpdate(selectedTodoId)}>Update</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 0} className="pagination-button">
                    Previous Page
                </button>
                <button onClick={() => setPage(page + 1)} disabled={endIndex >= todos.length} className="pagination-button">
                    Next Page
                </button>
            </div>
        </div>
    );
}

export default ListComponent;
