import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox ,Row,Col} from '../../base/components/AntdComp';
import CodeBtnComp from '../../base/components/CodeBtnComp';
const FormItem = Form.Item;
import Validate from '../../base/consts/Validate'
import {prefix,prefix_route} from '../../base/consts/UrlsConfig'

class CompanyDisabledComp extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {dataSource} = this.props;
        return (
            <div className="login-wrapper">
                <div className="login-content">
                    <h1 className="company-empty-title"><Icon type="exclamation-circle" />您所在的企业空间已被禁用</h1>
                    <p className="company-empty-text">如有疑问，请联系上海曼威网络科技有限公司</p>
                    <p className="company-empty-text">官方客服0558-2321124</p>
                    <img src={prefix_route+"/img/jinyong.png"} className="company-img"/>
                    <div className="company-back" onClick={this.props.backBtn}>&lt;&lt;返回上一步</div>
                </div>
            </div>
        );
    }
}

export default CompanyDisabledComp;