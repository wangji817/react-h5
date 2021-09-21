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

// import { YourBasePlugin } from '@baseCom';
// import { YourUiPlugin } from '@uiCom';
// import { YourNormalPlugin } from '@normalCom';

class XXXXXX extends Component {
    constructor(props){
        super(props);
    }
    state = {
        text:`新组件XXXXXX,开发后请删除示例文案`
    }
    currRef = React.createRef();
    render() {
        let {text} = this.state;
        return (
            <div className="XXXXXX" ref={this.currRef}>
                {text}
            </div>
        );
    }
}

export default XXXXXX;