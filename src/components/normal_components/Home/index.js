/**
 * Home
 * @author 此处修改作者名
 * @property {object} data 
 * @example <Home data={object}/>
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './index.scss';

//import { vtools } from '@util'; /**公共方法 */

// import { Vlink, Vimg } from '@baseCom';
// import { Vheader } from '@uiCom';
// import { YourPlugin } from '@normalCom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.currRef = React.createRef();
        this.currDiv = React.createRef();
    }
    state = {
        text: `新组件Home,开发后请删除示例文案`
    }
    render() {
        let { text } = this.state;
        return (
            <div className="Home" ref={this.currRef}>
                <div ref={this.currDiv} onClick={()=> console.log(this.currRef.current,this.currDiv.current)}>点我</div>
            </div>
        );
    }
}

export default Home;