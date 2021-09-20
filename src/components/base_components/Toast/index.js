require('./toast.scss');

/**
 * toast提示
 * @author chenpansong
 * @property {object} data
 * @property {string} data.msg 弹窗提示内容，默认为空
 * @property {boolean} data.show 弹窗是否自动展示，默认false
 * @property {number} data.last 弹窗展示时长，默认3000ms
 * @method show(msg,last) 实例方法，显示toast
 * @example <Toast data={{msg:"提交成功"}} />
 */
import React from 'react';
class Toast extends React.PureComponent {
    constructor(props){
        super(props)
        var data=this.props.data?this.props.data:{};
        this.state = {
            last:data.last||this.defaultlast,
            show:data.show?"show":"",
            msg:data.msg?data.msg:""
        }
        this.defaultlast = 3000;
    }
    /**
    @ method  show | 让toast展示出来
    @ *param {String} | msg | toast提示内容
    @ param {String} | last | toast持续的时间
    **/
    show = (msg, last) => {
        var self=this;
        last=last||this.defaultlast;
        clearInterval(this.timmer);
        self.setState({show:"show",msg:msg,last:last});
        this.hide();
    }
    hide = () => {
        this.timmer=setTimeout(function(){
            this.setState({show:false});
        }.bind(this),this.state.last);
    }
    componentDidMount(){
        this.hide();
    }
    render() {
        return (
            <div key="cmr-toast" className={"cmr-toast "+(this.state.show?"show":"")}>
                {this.state.msg}
            </div>
        );
    }
}

export default Toast;
