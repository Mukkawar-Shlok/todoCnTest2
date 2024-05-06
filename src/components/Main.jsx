import React, { useEffect, useState } from 'react'
import ListComponent from './ListComponent'

import CreateTask from './CreateTask';

import { useData } from '../Context';

import './main.css';

const Main = () => {
    const {todos, setTodos} = useData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/todos");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    console.log(todos);

    return (
        <>
            <h2>ToDo APP</h2>
        <div className="main-container">
            <div className="left-container">
                <ListComponent todos={todos} />
            </div>
            <div className="right-container">
                <CreateTask />
            </div>
        </div>
        </>
    );
}
export default Main;
