import React, { Component } from 'react';

const List = function(props) {
  return (
    <div id={props.id} className="list" onDragOver = {props.dragOverHandler}>
      <h1>{props.title}</h1>
      <div>{props.items.length} projects</div>
      <ul>
      { !props.items.length ? <li onDragOver={props.dragOverItemHandler}>Drag item here!</li>: null}
      {props.items.map( (item, i) => <li onDragOver={props.dragOverItemHandler} onDragStart={props.dragStartHandler} key={i} id={item.id} draggable>{item.title}</li> ) }
      
      </ul>
    </div>
  );
}

export default List;