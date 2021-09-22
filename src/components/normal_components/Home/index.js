/**
 * Home
 * @author 此处修改作者名
 * @property {object} data 
 * @example <Home data={object}/>
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './index.scss';

// import { vtools } from '@util'; /**公共方法 */
import { getData } from '@api/getHome'; /**api */

import { Toast, List, Button } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import pageList from '../../../../config/pageList.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.currRef = React.createRef();
    }
    state = {
    }
    componentDidMount() {
        getData().then((data) => Toast.info(JSON.stringify(data)));
    }

    render() {
        return (
            <div className="Home" ref={this.currRef}>
                <Button type="primary" onClick={() => { console.log(this.currRef.current) }}>点我</Button>
                <List renderHeader={() => '当前所有页面'}>
                    {
                        pageList.map((item, index) => <Item key={`item${index}`} extra="点击跳转" arrow="horizontal" align="middle" onClick={() => (location.href = item.path)} >{item.title}<Brief>{`当前路由地址为:${item.path}`}</Brief></Item>)
                    }
                </List>
            </div>
        );
    }
}

export default Home;