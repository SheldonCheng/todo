import React, { Component } from 'react';

const TaskForm = function(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <input placeholder="Add a task..." type="text" value={props.input} onChange={props.handleChange} />
      </form>
     );
}

export default TaskForm;