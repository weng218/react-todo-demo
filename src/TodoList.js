import React, { Component, Fragment } from 'react';
import './style.css'

class TodoList extends Component{
	
	//called first
	//in react, the page changes with the change of data
	constructor(props){
		super(props);
		this.state = {
			inputValue: '', 
			list: []
		}

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
						//onChange note capitalization, it is react syntax
						//handleInputChange need to bind this to change function scope
						//class not recommended use classname, for as well, use htmlFor
					} 
					<label htmlFor='insertArea'>Enter Content</label>
					<input
						id='insertArea'
						className = 'input'
						value = {this.state.inputValue}
						onChange={this.handleInputChange.bind(this)}	
					/>
					<button onClick = {this.handleBtnClick.bind(this)}>
						Submit
					</button>
				</div>
				<ul>
					{
						this.state.list.map((item,index) => {
							return (
								//dangerouslySetInnerHTML, can open to xss, but
								//allow to input and show html item in this case
								<li 
									key = {index} 
									onClick = {this.handleItemDelete.bind(this, index)}
									dangerouslySetInnerHTML = {{__html: item}}
								>
								</li>
							)
						})
					}
				</ul>
			</Fragment>
		)
	}

	handleInputChange(e){
		// cannot do this 
		//this.state.inputValue = e.target.value;
		this.setState({
			inputValue: e.target.value
		})
	}
	handleBtnClick(){
		this.setState(
		{
			list: [...this.state.list,this.state.inputValue],
			inputValue: ''
		})

	}

	handleItemDelete(index){
		//immutable 
		//need to change on a copy and set state
		//don't change on state directly 
		const list = [...this.state.list];
		list.splice(index, 1);
		this.setState({
			list: list

		})

	}

}

export default TodoList;