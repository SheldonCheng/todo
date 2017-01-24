import React, { Component } from 'react';
import './List.css';

const List = function(props) {
  return (
    <div id={props.id} className="list" onDragOver = {props.dragOverHandler}>
      <div className="list-header">
        <h1>{props.title}</h1>
        <div className="counter"><strong>{props.items.length}</strong> projects</div>
      </div>
      <ul className="list-items">
      { !props.items.length ? <li className="placeholder" onDragOver={props.dragOverItemHandler}>No items</li>: null}
      {props.items.map( (item, i) => <li onDragOver={props.dragOverItemHandler} onDragStart={props.dragStartHandler} key={i} id={item.id} draggable>{item.title}</li> ) }
      </ul>
    </div>
  );
}

export default List;