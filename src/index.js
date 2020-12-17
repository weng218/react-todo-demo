//need react import for JSX
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';

//TodoList is a component 
//Render a React element into the DOM in the supplied container 'root'
//JSX syntax using TodoList as custom tag, Note: need to capitalize first letter, 
ReactDOM.render(<TodoList />, document.getElementById('root'));
