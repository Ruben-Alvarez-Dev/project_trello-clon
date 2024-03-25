import React, { useState, useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import './AddCardorList.css';
import { v4 } from 'uuid';

export const AddCardorList = ({ type, list, setData }) => {
  
  // Accessing data from the DataContext
  const { lists, setLists, tasks, setTasks } = useContext(DataContext);

  // State variables
  const [showInput, setShowInput] = useState(false);
  const [inputValueTask, setInputValueTask] = useState('');
  const [inputValueList, setInputValueList] = useState('');

  // Function to open task input
  const openTaskInput = (e) => {
  const parent = e.target.parentElement;
  parent.children[0].style.display = 'flex';
  parent.children[0].children[0].style.display = 'flex';
  parent.children[1].style.display = 'none';
  }

  // Function to open list input
  const openListInput = (e) => {
  const current = e.target;
  const parent = e.target.parentElement;
  parent.children[0].style.display = 'flex';
  parent.children[0].style.flexDirection = 'column';
  parent.children[1].style.display = 'none';
  }

  // Function to close task input
  const closeTaskInput = (e) => {
  const parent = e.target.parentElement.parentElement.parentElement;
  parent.children[0].style.display = 'none';
  parent.children[1].style.display = 'flex';
  }

  // Function to close list input
  const closeListInput = (e) => {
  const parent = e.target.parentElement.parentElement.parentElement;
  parent.children[1].style.display = 'flex';
  parent.children[0].style.display = 'none';
  }

  // Function to add a new task
  const addTaskInput = (e) => {
  e.preventDefault();
  if (list && inputValueTask) {
    const newTask = {
    id: v4(),
    title: inputValueTask,
    value: inputValueTask,
    };

    const updatedLists = lists.map((l) => {
    if (l.id === list.id) {
      return {
      ...l,
      value: [...l.value, newTask.id],
      };
    }
    return l;
    });

    setLists(updatedLists);
    setTasks([...tasks, newTask]);
    setInputValueTask('');
  } else {
    setInputValueTask('');
  }
  };

  // Function to add a new list
  const addListInput = (e) => {
  e.preventDefault();
  if (inputValueList) {
    const newList = {
    id: v4(),
    title: inputValueList,
    value: [],
    };
    
    setLists([...lists, newList]);
    setInputValueList('');
    closeListInput(e);
  } else {
    setInputValueList('');
    closeListInput(e);
  }
  };

  // Function to handle blur event
  const handleBlur = (e) => {
  const current = e.target;
  const parent = e.target.parentElement.parentElement;
  parent.children[1].style.display = 'flex';
  parent.children[0].style.display = 'none';
  setInputValueTask('');
  setInputValueList('');
  }

  return (
  <>
    {/* Render the component based on the type */}
    {type === "forTask" && (
    <>
      <div className="forTask">
      <div onBlur={handleBlur} className="input_container">
        <form id="taskInputForm" onSubmit={addTaskInput}>
        <input
          className="input" 
          type="text" 
          placeholder="Enter task..." 
          value={inputValueTask}
          autoFocus
          onChange={(e) => setInputValueTask(e.target.value)}
        />                      
        </form>
        <div className="button_bar">
        <h3 onClick={addTaskInput}>New</h3>
        <h3 onClick={closeTaskInput}>Close</h3>
        </div>
      </div>
      <h3 onClick={openTaskInput}>Add a task</h3>
      </div>
    </>
    )}

    {type === "forList" && (
    <>
      <div className="forList">
      <div className="input_container">
        <form id="listInputForm" onSubmit={addListInput}>
        <input
          className="input" 
          type="text" 
          placeholder="Enter task..." 
          value={inputValueList}
          autoFocus
          onChange={(e) => setInputValueList(e.target.value)}
        />    
        </form>                  
        <div className="button_bar">
        <h3 onClick={addListInput}>New</h3>
        <h3 onClick={closeTaskInput}>Close</h3>
        </div>
      </div>
      <h3 onClick={openListInput}>Add a list</h3>
      </div>
    </>
    )}
  </>
  )
}
