import React, {
	Component
} from 'react';
import ReactDOM from 'react-dom';
import './main.less';

// 该组件为每一个添加的 Item
class ToDoItem extends Component {
	render() {
		let listItmes = this.props.entries.map((item, ind) => {
			return (<li key={ind}>{item.text}</li>);
		})
		return (<ul className="todolists">{listItmes}</ul>);
	}
}

class ToDoList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			items: []
		}
	}

	addItemHander(e) {
		let itemArray = this.state.items;
		let textInput = this.refs.textInput;
		if (textInput.value == '') {
			console.log('content is empty');
			return;

		} else {
			itemArray.push({
				// 利用 refs 属性获取原生实例的输入文本框
				text: textInput.value,
				// 并为该 item 添加一个 key 的标识符,key
				key: +new Date()
			});

			// 更新状态
			this.setState({
				items: itemArray
			});

			// 清空文本框，并重新得到焦点
			textInput.value = '';
			textInput.focus();
		}

		e.preventDefault();
	}

	render() {
		return (
			<div className="todoListMain">
				<div className="header">
					<form 
						action="" 
						onClick={ (e) => this.addItemHander(e) }>
						<input
							ref="textInput"
							type="text" 
							placeholder="Please enter a task"/>
						<button type="submit">Add</button>
					</form>
				</div>
				<ToDoItem entries={this.state.items} />
			</div>
		);
	}
}

let container = document.querySelector('#container');
ReactDOM.render(
	<ToDoList/>,
	container
)
