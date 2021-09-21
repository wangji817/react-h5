/**
 * Alert
 * @author 此处修改作者名
 * @property {object} data 
 * @example <Alert data={object}/>
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './index.scss';

//import { vtools } from '@util'; /**公共方法 */

// import { YourBasePlugin } from '@baseCom';
// import { YourUiPlugin } from '@uiCom';
// import { YourNormalPlugin } from '@normalCom';

class Alert extends Component {
    state = {
        text:`新组件Alert,开发后请删除示例文案`
    }
    currRef = React.createRef();
    render() {
        let {text} = this.state;
        return (
            <div className="Alert" ref={console.log(this.currRef.current)}>
                {text}
            </div>
        );
    }
}

export default Alert;