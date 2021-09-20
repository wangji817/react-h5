/**
 * Index
 * @author 此处修改作者名
 * @property {object} data 
 * @example 
 */
import React, { Component } from 'react';
import './index.scss';
//import { vtools } from '@util'; /**公共方法 */

import { Home } from '@normalCom'; /**需手动修改引用对应组件 */

class Index extends Component {
    state = {

    }
    render() {
        const { ...restProps } = this.props;
        return (
            <div className="Index" >
                <Home {...restProps} />
            </div>
        );
    }
}

export default Index;