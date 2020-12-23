import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem'
import axios from 'axios'
import './style.css'
import { CSSTransition } from 'react-transition-group';

class TodoList extends Component{
	
	//called first
	//in react, the page changes with the change of data
	//when component state or props changes, render function will be called again
	//when parent render is called, child render will be called too
	constructor(props){
		super(props);

		this.state = {
			inputValue: '', 
			list: [],
			show: true,
			show2: true
		}
		//handleInputChange need to bind this to change function scope
		//do assignment here better for performance
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleBtnClick = this.handleBtnClick.bind(this)
		this.handleItemDelete = this.handleItemDelete.bind(this)
		this.handleToggle = this.handleToggle.bind(this)
		this.handleToggle2 = this.handleToggle2.bind(this)

	}
	render(){
		return(
			//Fragment, doesnt need to use a div to 
			//wrap multiple elements when return
			//for component
			<Fragment>
				<div>
					{
						//{} is also JSX syntax, comment inside html need to use it as well
						//onChange, note capitalization, it is react syntax
						//class not recommended, use classname; 'for' as well, use htmlFor
					} 
					<div className={this.state.show ? 'show' : 'hide'}>Hello</div>
					<button onClick={this.handleToggle}>Toggle</button>
					<CSSTransition
						in={this.state.show2}
						timeout={1000}
						classNames='fade'
						onEntered={(el) => {el.style.color='blue'}}
						unmountOnExit
						appear={true}
					>
						<div>hello again</div>
					</CSSTransition>
					<button onClick={this.handleToggle2}>Toggle2</button>

					<label htmlFor='insertArea'>Enter Content</label>
					<input
						id='insertArea'
						className = 'input'
						value = {this.state.inputValue}
						onChange={this.handleInputChange}	
						ref={(input)=>(this.input = input)}
					/>
					<button onClick = {this.handleBtnClick}>
						Submit
					</button>
				</div>
				<ul>
					{this.getTodoItem()}

				</ul>
			</Fragment>
		)
	}

	handleToggle(){
		this.setState(() => ({
			show: this.state.show ? false : true
		}))
	}

	handleToggle2(){
		this.setState(() => ({
			show2: this.state.show2 ? false : true
		}))
	}

	// componentDidMount(){
	// 	axios.get('/api/todolist')
	// 	.then((res)=> {
	// 		this.setState(()=>({
	// 			list: [...res.data]	
	// 		}))
	// 	})
	// 	.catch(()=> {alert('error')})
	// }

	getTodoItem(){
		return this.state.list.map((item,index) => {
			return (
				//comment count as one extra item, can only return one
				//need to wrap them with div
				<div key={item} >
				{
					//dangerouslySetInnerHTML, can open to xss, but
					//allow to input and show html item in this case
					// <li 
					// 	key = {index} 
					// 	onClick = {this.handleItemDelete.bind(this, index)}
					// 	dangerouslySetInnerHTML = {{__html: item}}
					// >
					// </li>
				}
				{
					//parent component passing data and function to child using attributes
					//bind to this so child can call handleItemDelete
				}
					<TodoItem

						content={item} 
						index = {index}
						deleteItem = {this.handleItemDelete}
					/>
				</div>

				
			)
		})	
	}

	handleInputChange(e){
		// cannot change state directly  
		//this.state.inputValue = e.target.value; (this.input.value) 

		//asynchronous, need use a variable
		//setState takes function 
		const value = this.input.value //e.target.value
		this.setState(() => ({
			inputValue: value
		}))
	}
	handleBtnClick(){
		//using preState prevent changing this.state 
		this.setState((prevState) => ({
			list: [...prevState.list, prevState.inputValue],
			inputValue: ''
		}))
	}

	handleItemDelete(index){
		//immutable 
		//need to change on a copy and set state
		//don't change on state directly 
		this.setState((prevState) => {
			const list = [...prevState.list]
			list.splice(index, 1);
			//set list as the copy 
			return {list}
		})
	}

}

export default TodoList;