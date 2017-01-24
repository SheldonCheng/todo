import React, { Component } from 'react';
import './TaskForm.css';
const TaskForm = function( { input, handleSubmit, handleChange}) {
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="add-task">Add project</label><input id="add-task" placeholder="Add a task..." type="text" value={input} onChange={handleChange} />
      </form>
     );
}

export default TaskForm;