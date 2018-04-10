import React,{Component} from 'react';
import {getCookie} from '../../base/services/ReqApi'
import { Form, Icon, Input, Button, Checkbox ,Row,Col,message, Spin} from '../../base/components/AntdComp';
import CodeBtnComp from '../../base/components/CodeBtnComp';
const FormItem = Form.Item;
import Validate from '../../base/consts/ValidateList'
import { LoginUrls } from '../../base/consts/Urls';
import {prefix,prefix_route,prefixCh,prefixPub} from '../../base/consts/UrlsConfig'
import { win32 } from 'path';

class LoginComp extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            phoneNo:"",
            url:prefixPub+"/login/getImgCaptcha?module=LOGIN",
            //url:"http://172.16.4.215:8080/pub/login/getImgCaptcha?module=LOGIN",
        }
    }
    componentDidMount(){
        let searchURL = window.location.search,tokenId = getCookie("tokenId");  
        searchURL = searchURL.substring(1, searchURL.length);  
        let success = searchURL.split("&")[0].split("=")[1];
        if(success=="true"){
            message.success("修改密码成功，请重新登录")
            setTimeout(function(){
                window.location.href = prefix+prefixCh+"login.html"
            },1000)
        }
        if(tokenId){
            this.props.getLoginInfo();
            this.props.LoginVisiable(true);
        }else{
            this.props.LoginVisiable(false);
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            let tokenId = getCookie("tokenId")
            if(tokenId){
                data = {...data,captcha:data.captcha||"",loginedId:tokenId}                
            }else{
                data = {...data,captcha:data.captcha||"",loginedId:''}
            }
            if (!err) {
                this.props.LoginSubmit(data).then((json)=>{
                    if(json.status==4012){
                        this.setState({url:this.state.url+"&"+new Date().getTime()})
                    }else if(json.status==4017){
                        this.setState({url:this.state.url+"&"+new Date().getTime()})
                    }
                });
                this.setState({phoneNo:data.loginNo})
            }
        });
    }
    handlerChangeImg =()=>{
        this.setState({url:this.state.url+"&"+new Date().getTime()})
    }

    render(){
        let {loginLoading,showPicCode} = this.props;
        let { getFieldDecorator } = this.props.form;
        return (
            <div className="login-wrapper">
                <div className="login-content">
                    <span className="login-title">欢迎登录C2M平台</span>
                    <Form className="login-form">
                        <FormItem>
                           
                            {getFieldDecorator('loginNo', {
                                initialValue: "",
                                rules: [
                                    { type:"string",message:"请输入用户名",required: true},
                                ],
                            })(     
                                <Input type="phone" placeholder="请输入账号" prefix={ <i className="c2mfont c2m-sign-number"></i>} className="acount-phone" autoComplete={true}/>
                                )}
                            
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                initialValue: "",
                                rules: [
                                    { type:"string",message:"请输入密码",required: true},
                                ],
                            })(
                                <Input type="password" prefix={<i className="c2mfont c2m-sign-password"></i>} placeholder="请输入密码" className="acount-phone" onPressEnter={this.handleSubmit}/>
                                )}
                            
                        </FormItem>
                        <div className="login-forget"><span onClick={this.props.ForgetPwdBtn}>忘记密码?</span></div>
                       {showPicCode ? 
                        <FormItem className="get-code">
                            {getFieldDecorator('captcha', {
                                initialValue: "",
                                rules: [
                                    { type:"string",message:"请输入图形验证码",required: true},
                                ],
                            })(
                                <div className="login-vercode">
                                    <Input type="text" size="large" placeholder="请输入字符" className="inpt-code" onPressEnter={this.handleSubmit} prefix={<i className="c2mfont c2m-forgot-test"></i>}/>
                                    <div className="login-vercode-pic"><img src={this.state.url+"&phoneNo="+this.state.phoneNo} onClick={this.handlerChangeImg}/></div> 
                                </div>
                                )}
                            
                        </FormItem> : ''}
                        <FormItem className="reset-button">
                            <Button type="primary" onClick={this.handleSubmit} className="reset-form-button" loading={loginLoading}>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(LoginComp);