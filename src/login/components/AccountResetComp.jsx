import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox ,Row,Col} from '../../base/components/AntdComp';
import CodeBtnComp from '../../base/components/CodeBtnComp';
const FormItem = Form.Item;
import Validate from '../../base/consts/ValidateList'
import { LoginUrls } from '../../base/consts/Urls';
import {prefixPub} from '../../base/consts/UrlsConfig'

class AccountResetComp extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            phoneNo:"",
            url:prefixPub+"/login/getImgCaptcha?module=EMPRESET",
            disabled:true,
        }
    }
    hasErrors=(fieldsError)=> {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    handleSubmitNext=(e)=>{
        e.preventDefault();
        this.setState({Validate:false})
        this.props.form.validateFields((err, data) => {
            data.module = "EMPRESET";
            if (!err) {
                this.props.nextStep(data)
                this.props.getPhoneNo(data)
                this.setState({phoneNo:data.phoneNo})
                this.setState({url:this.state.url+"&"+new Date().getTime()})
            }
        });
    }
    handlerChangeImg =()=>{
        this.setState({url:this.state.url+"&"+new Date().getTime()})
    }
    handlerSendPhoneCode = (callback) => {
        let validateFs = this.props.showPicCode?["phoneNo","imgCaptcha"]:["phoneNo"];
        this.props.form.validateFields(validateFs,{},(err, data) => {
            if(!err){
                err = {};
            }
            data = {phoneNo:data.phoneNo,module:"EMPRESET",imgCaptcha:data.imgCaptcha||""};
            if (!(err["phoneNo"]&&err["phoneNo"].errors.length>0)&&!(err["imgCaptcha"]&&err["imgCaptcha"].errors.length>0)) {
                callback();
                this.props.sendPhoneCodeTo(data)
                this.setState({phoneNo:data.phoneNo})
            }
        });
    }

    render(){
        let {nextStepLoading,nextStepDisabled,showPicCode,getSmsWith,checkPhone} = this.props;
        let { getFieldDecorator,getFieldsError } = this.props.form;
        return (
            <div className="reset-wrapper">
                <div className="reset-box">
                    <div className="reset-text">
                        <span className="reset-title">忘记密码</span>
                        <div className="reset-list">
                            <span className="reset-circle circle-show"></span>
                            <span className="reset-line"></span>
                            <span className="reset-circle"></span>
                        </div>
                        <div className="acount-message">
                            <span className="acount-text">账户验证</span>
                            <span className="acount-text2">密码重置</span>
                        </div>
                        <Form className="reset-form">
                            <FormItem>
                                {getFieldDecorator('phoneNo', {
                                    initialValue: checkPhone.phoneNo,
                                    rules: [
                                        { type:"string",message:"请输入您的手机号",required: true},
                                        Validate({type: "phone"}),
                                    ],
                                })(
                                    <Input prefix={<i className="c2mfont c2m-forgot-phone"></i>} placeholder="请输入您的手机号" className="acount-phone"/>
                                    )}
                                
                            </FormItem>
                            {showPicCode ? 
                            <FormItem className="get-code">
                                {getFieldDecorator('imgCaptcha', {
                                    initialValue: "",
                                    rules: [
                                        { type:"string",message:"请输入图中字符",required: true},
                                        Validate({type: "imgValid"}),
                                    ],
                                })(
                                    <Row gutter={8} style={{marginLeft:"0",marginRight:"0px"}}>
                                        <Col span={12} style={{paddingLeft:"0",paddingRight:"0px"}}>
                                            <Input size="large" placeholder="请输入字符" className="inpt-code" prefix={<i className="c2mfont c2m-forgot-test"></i>}/>
                                        </Col>
                                        <Col span={12} style={{paddingLeft:"32px",paddingRight:"0px"}}>
                                        <img src={this.state.url+"&phoneNo="+this.state.phoneNo} onClick={this.handlerChangeImg} className="img-code"/> </Col>
                                    </Row>
                                    )}
                                
                            </FormItem> : ''}
                            <FormItem className="get-code">
                                {getFieldDecorator('smsCaptcha', {
                                    initialValue:"",
                                    rules:[
                                        Validate({type: "checkCode4",required: true}),
                                    ]
                                })(
                                    <Row gutter={8} style={{marginLeft:"0",marginRight:"0px"}}>
                                        <Col span={12} style={{paddingLeft:"0",paddingRight:"0px"}}>
                                            <Input size="large" placeholder="请输入验证码" className="inpt-code" prefix={<i className="c2mfont c2m-forgot-test"></i>}/>
                                        </Col>
                                        <Col span={12} style={{paddingLeft:"32px",paddingRight:"0px"}}>
                                            <CodeBtnComp {...this.props} sendPhoneCode={this.handlerSendPhoneCode}/>
                                        </Col>
                                    </Row>
                                    )}
                            </FormItem>
                            <FormItem className="reset-button">
                                <Button type="primary" onClick={this.handleSubmitNext} className="reset-form-button" loading={nextStepLoading} disabled={this.hasErrors(getFieldsError())}>下一步</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
AccountResetComp.defaultProps={
    checkPhone:{
        phoneNo:"",
        SMSCaptcha: "",
        imgCaptcha:"",
        module:"EMPRESET",
    },
}
export default Form.create()(AccountResetComp);