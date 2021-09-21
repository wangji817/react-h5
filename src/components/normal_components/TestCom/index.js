/**
 * TestCom
 * @author 此处修改作者名
 * @property {object} data 
 * @example <TestCom data={object}/>
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './index.scss';

//import { vtools } from '@util'; /**公共方法 */

// import { Vlink, Vimg } from '@baseCom';
// import { Vheader } from '@uiCom';
// import { YourPlugin } from '@normalCom';

class TestCom extends Component {
    state = {
        text:`新组件TestCom,开发后请删除示例文案`
    }
    currRef = React.createRef();
    render() {
        let {text} = this.state;
        return (
            <div className="TestCom" ref={console.log(this.currRef.current)}>
                {text}
            </div>
        );
    }
}

export default TestCom;