/**
 * XXXXXX
 * @author 此处修改作者名
 * @property {object} data 
 * @example <XXXXXX data={object}/>
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './index.scss';

//import { vtools } from '@util'; /**公共方法 */

// import { Vlink, Vimg } from '@baseCom';
// import { Vheader } from '@uiCom';
// import { YourPlugin } from '@normalCom';

class XXXXXX extends Component {
    state = {
        text:`新组件XXXXXX,开发后请删除示例文案`
    }
    currRef = React.createRef();
    render() {
        let {text} = this.state;
        return (
            <div className="XXXXXX" ref={console.log(this.currRef.current)}>
                {text}
            </div>
        );
    }
}

export default XXXXXX;