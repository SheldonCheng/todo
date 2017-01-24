import React, { Component } from 'react';
import './List.css';

const List = function( {id, title, items, dragOntoItemHandler, dragStartHandler}) {
  return (
    <div id={id} className="list">
      <div className="list-header">
        <h1>{title}</h1>
        <div className="counter"><strong>{items.length}</strong> projects</div>
      </div>
      <ul className="list-items">
      { !items.length ?
        <li className="placeholder" onDragEnter={dragOntoItemHandler}>No items</li> : 
        items.map( (item, i) => <li onDragEnter={dragOntoItemHandler} onDragStart={dragStartHandler} key={i} id={item.id} draggable>{item.title}</li> )
      }
      </ul>
    </div>
  );
}

export default List;