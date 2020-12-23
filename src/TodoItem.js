import React, { Component } from 'react';
import PropTypes from 'prop-types'

class TodoItem extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);

	}

	shouldComponentUpdate(nextProps, nextState){
		if(nextProps.content !== this.props.content){
			return true;
		}else{
			return false;
		}
		// return false;
	}

	render(){
		const { content,test } = this.props
		return (
			<div
				onClick = {this.handleClick}
			>
				{test} - {content}
			</div>)

	}
	handleClick(){
		//Destructuring assignment
		const { deleteItem, index } = this.props
		deleteItem(index)
	}
}

//oneOfType means or 
TodoItem.propTypes = {
	test: PropTypes.string.isRequired,
	content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	deleteItem: PropTypes.func,
	index: PropTypes.number
}

TodoItem.defaultProps = {
	test: 'Hello'
}

export default TodoItem;