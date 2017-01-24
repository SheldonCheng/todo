import React, { Component } from 'react';
import List from './List'
import TaskForm from './TaskForm'
import './Main.css';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      inputString: '',
      todo : [],
      progress: [],
      done: []
    }
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOntoItem = this.onDragOntoItem.bind(this);
  }
  
  onChange(e) {
    this.setState({inputString: e.target.value});
  }
  
  onSubmit(e) {
    e.preventDefault();
    let timestamp = (new Date()).getTime();
    const newTask = {
      id: 'task-'+timestamp,
      title : this.state.inputString
    }
    const updatedTasks = this.state.todo.concat(newTask);
    this.setState( { todo: updatedTasks, inputString : ''});

  }
  
  onDragStart(e) {
    this.dragId = e.target.id;
    this.draggedFrom = e.target.parentElement.parentElement.id;
    e.dataTransfer.setData("text/html", e.currentTarget);
  }
  
  onDragOntoItem(e){
    e.preventDefault();
    var fromGroupId = this.draggedFrom;
    var toGroupId = e.currentTarget.parentElement.parentElement.id;
    var draggedItem = this.state[fromGroupId].find( (el) => el.id === this.dragId);
    var draggedItemIndex = this.state[fromGroupId].indexOf(draggedItem);
    var overItem = this.state[toGroupId].find( (el) => el.id === e.currentTarget.id);
    var overItemIndex = this.state[toGroupId].indexOf(overItem);

    var newFromGroupArr = this.state[fromGroupId].slice(0);
    newFromGroupArr.splice(draggedItemIndex, 1); // Remove dragged item from its array
    var newToGroupArr = fromGroupId === toGroupId ? newFromGroupArr.slice(0) : this.state[toGroupId].slice(0); // if within same group, create newToGroupArr from existing spliced array, otherwise clone toGroup 
    // start building resultant group
    var finalGroupArr = newToGroupArr.slice(0,overItemIndex);
    finalGroupArr.push(draggedItem);
    finalGroupArr.push(...(newToGroupArr.slice(overItemIndex)));    

    if (fromGroupId === toGroupId) {
      this.setState({ [fromGroupId] : finalGroupArr});
    }
    else {
      this.draggedFrom = toGroupId;
      this.setState({ [fromGroupId] : newFromGroupArr, [toGroupId] : finalGroupArr });
    }

  }
  
  render() {
    var projectsCount = (this.state.todo.concat(this.state.progress).concat(this.state.done)).length;
    return (
      <div>
        <div className="header">
          <TaskForm input={this.state.inputString} handleChange={this.onChange} handleSubmit={this.onSubmit}>
          </TaskForm>
          <div className="header-counter">
            <span>TOTAL</span>
            <div className="counter"><strong>{projectsCount}</strong> projects</div>
          </div>
        </div>

        <div className="lists">
        { [this.state.todo, this.state.progress, this.state.done].map( (item, i) => {
          const type = i === 0 ? 'todo' : i === 1 ? 'progress' : 'done';
          const title = i === 0 ? 'To do' : i === 1 ? 'In Progress' : 'Done';
          return (
            <List key={i} id={type} items={item} title={title} dragStartHandler={this.onDragStart} dragOntoItemHandler={this.onDragOntoItem} ></List>
          )
        }) }
        </div>
      </div>
    )
  }
}

export default Main;
