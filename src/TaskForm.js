import React, { Component } from 'react';
import './TaskForm.css';
const TaskForm = function(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="add-task">Add project</label><input id="add-task" placeholder="Add a task..." type="text" value={props.input} onChange={props.handleChange} />
      </form>
     );
}

export default TaskForm;