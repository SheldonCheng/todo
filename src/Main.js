import React, { Component } from 'react';
import List from './List'
import TaskForm from './TaskForm'
import './Main.css';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      inputString: '',
      todo : [{ id: "task-0", title: 'first'}, { id: "task-1", title: '2nd'}, { id: "task-2", title: 'Third'}],
      progress: [ { id: 'task-a', title: 'a' }, { id: 'task-b', title: 'b'} ],
      done: []
    }
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragOverItem = this.onDragOverItem.bind(this);
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

  
  onDragOver(e) {
    e.preventDefault();
  }
  
  onDragOverItem(e){
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
      <div onDragOver={this.onDragOver}>
        <TaskForm input={this.state.inputString} handleChange={this.onChange} handleSubmit={this.onSubmit}>
        </TaskForm>
        <div>{projectsCount} projects</div>
        <List id="todo" items={this.state.todo} title="To do" dragStartHandler={this.onDragStart} dragOverItemHandler={this.onDragOverItem} dragOverHandler={this.onDragOver}></List>
        <List id="progress" items={this.state.progress} title="In Progress" dragStartHandler={this.onDragStart} dragOverItemHandler={this.onDragOverItem} dragOverHandler={this.onDragOver}></List>
        <List id="done" items={this.state.done} title="Done" dragStartHandler={this.onDragStart} dragOverItemHandler={this.onDragOverItem} dragOverHandler={this.onDragOver}></List>
      </div>
    )
  }
}

export default Main;
