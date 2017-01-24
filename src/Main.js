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
    var fromGroup = this.draggedFrom;
    var toGroup = e.currentTarget.parentElement.parentElement.id;
    var draggedItem = this.state[fromGroup].find( (el) => el.id === this.dragId);
    var draggedItemIndex = this.state[fromGroup].indexOf(draggedItem);
    var newFromGroup = this.state[fromGroup].slice(0);
    newFromGroup.splice(draggedItemIndex, 1);
    var overItem = this.state[toGroup].find( (el) => el.id === e.currentTarget.id);
    var overItemIndex = this.state[toGroup].indexOf(overItem);

    if (fromGroup === toGroup) {
      const sortedArr = newFromGroup.slice(0,overItemIndex);
      sortedArr.push(draggedItem);
      sortedArr.push(...(newFromGroup.slice(overItemIndex)));
      this.setState({ [fromGroup] : sortedArr});
    }
    else {
      this.draggedFrom = toGroup;
      const newToGroup = this.state[toGroup].slice(0);
      const sortedArr = newToGroup.slice(0,overItemIndex);
      sortedArr.push(draggedItem);
      sortedArr.push(...(newToGroup.slice(overItemIndex)));
      this.setState({ [fromGroup] : newFromGroup, [toGroup] : sortedArr });
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
