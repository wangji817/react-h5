/**
 * CatchError
 * @author 此处修改作者名
 * @property {object} data 
 * @example <CatchError data={object}/>
 */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './index.scss';

//import { vtools } from '@util'; /**公共方法 */

// import { YourBasePlugin } from '@baseCom';
// import { YourUiPlugin } from '@uiCom';
// import { YourNormalPlugin } from '@normalCom';

class CatchError extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        error: null,
        info: null,
    }
    componentDidCatch(error, info) {
        this.setState({
            error,
            info,
        });
    }
    render() {
        let { error = null, info = null } = this.state;
        if (error) {
            return (
                <div className="CatchError">
                    <h1>error：{error.toString()}</h1>
                    <h2>错误出现的位置是：{info.componentStack}</h2>
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}

export default CatchError;