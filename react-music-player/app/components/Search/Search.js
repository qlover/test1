import React, {Component} from 'react';
import * as localStore from '../../util/localStorage';

export default class extends Component {
	constructor(props) {
        super(props);
        this.state = {
            'loaded': false,
            'value': '',
            'display': false,
            history: localStore.getItem('search_history') ? localStore.getItem('search_history').split(',') : []
        };

	}

	clearTextHandler(e){
		this.setState({'value': '', 'display': false})
	}

	keyUpHandler(e){
		this.setState({display: true});
        e.keyCode === 13 && this.searchHanler();
	}

	changeHandler(e){
		this.setState({
			'value': e.target.value,
			'display': true
		})
	}

    clearHistoryHandler(e, text){
        const historyArr = localStore.getItem('search_history').split(',');
        const index = historyArr.indexOf(text);
        historyArr.splice(index, 1);
        localStore.setItem('search_history', historyArr);
        this.setState({history: historyArr});
    }

	searchHanler(e){
		const searchValue = this.state.value.trim();
        if (searchValue !== '') {
            this.props.history.push({
            	'pathname': '/search/result',
            	'state': {searchValue: searchValue}
            });
            // 并将搜索历史记录在本地存储中
            this.setHistory(searchValue);
        }

	}

    searchHotHandler(val) {
        this.props.history.push({pathname: '/search/result', state: {searchValue: val}});
        this.setHistory(val);
    }

    clearAllHistoryHandler(e){
        localStore.setItem('search_history', '');
        this.setState({history: []});
    }

    setHistory(value){
        this.setState({
            history: this.state.history.push(value)
        });
        const searchHistory = this.state.history;
        let newHistory = [];
        for (let i = 0; i < searchHistory.length; i++) {
            if (newHistory.indexOf(searchHistory[i]) === -1) {
                newHistory.push(searchHistory[i])
            }
        }
        localStore.setItem('search_history', newHistory);
    }

	render(){
		return(
			<div className="container">
                <div className="header">
                    <div className="headerBack" 
                    	onClick={() => window.history.back()}>
                        <i className="icon-keyboard_arrow_left"></i>
                    </div>
                    <div className="searchBar">
                        <div className="searchInput">
                            <i className="icon-search"></i>
                            <input type="text" value={this.state.value}
                            	onKeyUp={ (e) => this.keyUpHandler(e) } 
                            	onChange={ (e) => this.changeHandler(e) } 
                            	className="input input-search" 
                            	placeholder="请输入关键字"/>
                            <i 
                            	onClick={ (e)=>this.clearTextHandler(e) } 
                            	style={{display: this.state.display ? 'block' : 'none'}}>&times;</i>
                        </div>
                    </div>
                    <div className="headerRight" 
                    	onClick={(e)=> this.searchHanler(e) }>搜索</div>
                </div>
                <div className="searchTitle">热门搜索</div>


                <div className="searchTitle">
                    <span>搜索历史</span>
                    <em onClick={(e) => this.clearAllHistoryHandler(e)}>清除历史</em>
                </div>
                <div className="searchHistory">
                    {
                        this.state.history.length > 0 ? this.state.history.map((ele, index) => {
                            return (
                                <p key={index}>
                                    <span onClick={() => this.searchHotHandler(ele)}>{ele}</span>
                                    <em onClick={() => this.clearHistoryHandler(ele)}>&times;</em>
                                </p>
                            )
                        }) : null
                    }
                </div>
            </div>
		);
	}

}