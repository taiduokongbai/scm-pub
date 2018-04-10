import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox ,Row,Col} from '../../base/components/AntdComp';
import CodeBtnComp from '../../base/components/CodeBtnComp';
const FormItem = Form.Item;
import Validate from '../../base/consts/Validate'
import {prefix,prefix_route} from '../../base/consts/UrlsConfig'

class CompanyEmptyComp extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            time:3,
        }
    }
    tick=()=>{
        if(this.state.time >0){
            this.setState({time: this.state.time - 1});
        }else{
            this.props.backBtn();
            clearInterval(this.interval);
        }
    }
    componentWillMount=()=>{
        this.setState({
            time: 3
        });
        clearInterval(this.interval);
    }
    componentDidMount=()=>{
        this.interval = setInterval(this.tick, 1000);
    }
    componentWillUnmount=()=>{
        clearInterval(this.interval);
    }
    
    render(){
        let {dataSource} = this.props;
        return (
            <div className="login-wrapper">
                <div className="login-content">
                    <h1 className="company-empty-title"><Icon type="exclamation-circle" />您当前还未加入任何企业哦</h1>
                    <p className="company-empty-text">请联系企业管理员添加你的员工信息，再尝试登录。</p>
                    <img src={prefix_route+"/img/weideng.png"} className="company-img"/>
                    <div className="company-back" onClick={this.props.backBtn}>&lt;&lt;{this.state.time}秒返回上一步</div>
                </div>
            </div>
        );
    }
}

export default CompanyEmptyComp;