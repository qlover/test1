import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
 

class Root extends Component {

	render(){

		const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {baseInfo: "def"}));
		console.log('Root->', childrenWithProps)
		return(<div>
{childrenWithProps}
		</div>);
	}
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1,
            currentMI : {'a': 'xxxx'}
        }
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {baseInfo: "def"}));
        console.log('app->', childrenWithProps, this.state)
        return (<div>
            <h1> 我是父亲容器</h1>
            {childrenWithProps}
        </div>)
    }
}
class MySub extends Component {
    constructor(props) {
        super(props)
    }

    render() {
    	 console.log('mysub->', this.state)
        return( <div>
            我是子元素{this.props.baseInfo}
        </div>)
    }
}

ReactDOM.render(
  (<HashRouter>
  	<Root>
  		<Route path="/" component={App} />
        <Route path="/sub" component={MySub} />
  	</Root>
  </HashRouter>),
  document.getElementById('root')
);
