import React, { Component } from 'react';
import FormModalComp from '../../base/components/FormModalComp';
import CodeBtnComp from '../../base/components/CodeBtnComp';
import { Layout ,Form, Input, Spin, Button, Modal,Col,Row} from '../../base/components/AntdComp';
const {Content } = Layout;
const FormItem = Form.Item;
import {prefixPub} from '../../base/consts/UrlsConfig'

class BindPhoneComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state={
            phoneNo:"",
            url:prefixPub+"/login/getImgCaptcha?module=EMPRESET",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.props.loading){
            this.validateFds((err, data) => {
                data.module = "EMPRESET";
                if (!err) {
                    this.setState({phoneNo:data.phoneNo})
                    this.setState({url:this.state.url+"&"+new Date().getTime()})
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }
    }
    handlerSendPhoneCode = (callback) => {
        this.props.form.validateFields((err, data) => {
            data = {phoneNo:data.phoneNo,module:"EMPRESET",imgCaptcha:data.imgCaptcha||""}
            if (!(err["phoneNo"]&&err["phoneNo"].errors.length>0)&&!(err["imgCaptcha"]&&err["imgCaptcha"].errors.length>0)) {
                callback()
                this.props.sendPhoneCodeTo(data)
                this.setState({phoneNo:data.phoneNo})
            }
        });
    }
    handlerChangeImg =()=>{
        this.setState({url:this.state.url+"&"+new Date().getTime()})
    }
    getComp = () => {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        let { bindPhone,showPicCode } = this.props;
        return (
            <Form className="bind-phone">
                <FormItem label="新手机号:" {...formItemLayout}>
                    {this.getFD('phoneNo', {
                        initialValue: bindPhone.phoneNo,
                        rules: [
                            {type: "phone",label: "",required:true},
                        ],
                    })(
                        <Row gutter={8}>
                            <Col span={18}>
                                <Input size="large"  placeholder="请输入新手机号" className="phone"/>
                            </Col>
                            <Col span={6}>
                            <CodeBtnComp {...this.props} sendPhoneCode={this.handlerSendPhoneCode}/>
                            </Col>
                        </Row>
                        )}
                    
                </FormItem>
                {showPicCode ? 
                    <FormItem label="图形验证码:" {...formItemLayout}>
                        {this.getFD('imgCaptcha', {
                            initialValue: "",
                            rules: [
                                {type: "imgValid",required:true},
                            ],
                        })(
                            <Row gutter={8} style={{margin:0,height: 32}}>
                                <Col span={18}>
                                    <Input placeholder="请输入图中字符" size="large" className="phone"/>
                                </Col>
                                <Col span={6}>
                                    <div><img src={this.state.url+"&phoneNo="+this.state.phoneNo} onClick={this.handlerChangeImg}/></div>
                                </Col>
                            </Row>
                            )}
                        
                    </FormItem> : ''}
                <FormItem label="验证码:" {...formItemLayout} >
                    {this.getFD('smsCaptcha', {
                        initialValue: bindPhone.smsCaptcha,
                        rules: [
                            {type: "checkCode4",required:true},
                        ],
                    })(
                        <Row gutter={8} style={{margin:0}}>
                            <Col span={18}>
                                <Input  placeholder="请输入验证码"/>
                            </Col>
                        </Row>
                         
                        )}
                </FormItem>
            </Form>
        )
    }
}
BindPhoneComp.defaultProps={
    title: '绑定手机',
    okText: '提交',
    width: 461,
    maskClosable: true,
    bindPhone:{
        phoneNo:"",
        smsCaptcha:"",
        module:"EMPRESET"
    }
}
export default Form.create()(BindPhoneComp);

