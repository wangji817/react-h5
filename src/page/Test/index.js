/**
 * Test
 * @author 此处修改作者名
 * @property {object} data 
 * @example 
 */
import React, { Component } from 'react';
import './index.scss';
//import { vtools } from '@util'; /**公共方法 */

import { TestCom } from '@normalCom'; /**需手动修改引用对应组件 */

class Test extends Component {
    state = {

    }
    render() {
        const { ...restProps } = this.props;
        return (
            <div className="Test" >
                <TestCom {...restProps} />
            </div>
        );
    }
}

export default Test;