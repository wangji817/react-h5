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

import { Toast } from 'antd-mobile';

class Home extends Component {
    constructor(props) {
        super(props);
        this.currRef = React.createRef();
        this.currDiv = React.createRef();
    }
    state = {
        text: `新组件Home,开发后请删除示例文案`
    }
    componentDidMount() {
        getData().then((data) => Toast.info(JSON.stringify(data)));
    }

    render() {
        let { text } = this.state;
        return (
            <div className="Home" ref={this.currRef}>
                <div ref={this.currDiv} onClick={() => { console.log(this.currRef.current, this.currDiv.current) }}>点我</div>
            </div>
        );
    }
}

export default Home;