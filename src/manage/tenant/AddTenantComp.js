import React, { Component } from "react";
import { Form, Input, Spin,Select, Button, Modal ,Col,Row,message,Icon} from '../../base/components/AntdComp';
import FormModalComp from '../../base/components/FormModalComp';
import Validate from '../../base/consts/ValidateList';
import { tenantListStore } from './tenantStore';
import {tenantAddStore} from './AddTenantStore'
import {tenantSideStore} from './tenantSideStore';
const FormItem = Form.Item;
const Option = Select.Option;
let { observer } = mobxReact;
@observer
class AddTenantComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                if(this.props.title=='新建租户'){
                    delete data.id;
                    tenantAddStore.fetchTenantAdd(data)
                    .then(json=>{
                        if(json.status===2000){
                            tenantListStore.fetchTableList({status:"0",page: 1,pageSize: 15})
                            this.props.form.resetFields();
                        }
                    })
                }else{
                    tenantAddStore.fetchTenantEdit(data)
                    .then(json=>{
                        if(json.status===2000){
                            tenantListStore.fetchTableList({status:"0",page: 1,pageSize: 15})
                            this.props.form.resetFields();
                        }
                        
                    })
                }
            }
        });
    }
    handleCancel = (e) => {
        e.preventDefault();
        if(this.props.title=='新建租户'){
             this.props.form.resetFields();
            tenantListStore.addVisible=false;
        }else{
            this.props.form.resetFields();
            tenantListStore.editVisible=false;
             
        }
    }


    getComp = () => {
        let { getFieldDecorator } = this.props.form;
        let formItemLayout = {
            labelCol: { span:7 },
            wrapperCol: { span: 16 },
        };
        let {detail}=tenantAddStore;
       if(this.props.title=='新建租户'){
           detail={
                tenantName: "",
                tenantDesc: "",
                tenantAbbr: "",
                contactsPhone: "",
                contacts: "",
           }
       }
        return (
            <div className="addTenant-con">
                <div style={{height:1,borderTop:'1px solid #e7e8ea',position:'absolute',top:106,left:-22,width:654}}></div>
                <Spin spinning={tenantAddStore.loading}>
                    <Form >
                        <Row style={{display:'none'}}>
                            <Col span={12}>
                                <FormItem label="id" 
                                {...formItemLayout}>
                                    {getFieldDecorator('id', {
                                        initialValue:detail.id||"",
                                    })(
                                        <Input/>

                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={12}>
                                <FormItem label="租户名称" 
                                {...formItemLayout}>
                                    {getFieldDecorator('tenantName', {
                                        initialValue:detail.tenantName||"",
                                        rules: [
                                                {required: true, message: '租户名称 为必填',whitespace:true },
                                                {min:1,max:25,message:'最多允许25字符'}
                                            ],
                                    })(
                                        <Input  style={{width:180}} placeholder=" 请输入租户名称"/>

                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="租户简称" 
                                {...formItemLayout}>
                                    {getFieldDecorator('tenantAbbr', {
                                        initialValue:detail.tenantAbbr,
                                        rules: [
                                                {min:0,max:10,message:'最多允许10字符'}
                                            ],
                                    })(
                                        <Input style={{width:180}}/>

                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={12}>
                                <FormItem label="租户简介" 
                                {...formItemLayout}
                                className="tenantDesc"
                                >
                                    {getFieldDecorator('tenantDesc', {
                                        initialValue:detail.tenantDesc,
                                        rules: [
                                                {min:0,max:250,message:'最多允许250字符'}
                                            ],
                                    })(
                                    <Input type='textarea' style={{ height: '50px',borderRadius:'4px'}} />

                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'12'}}>
                            <Col span={12} className="company-contacts">
                                <FormItem label="业务联系人" {...formItemLayout}>
                                    {getFieldDecorator('contacts', {
                                        initialValue:detail.contacts,
                                        rules: [
                                            {required: true, message: '业务联系人 为必填' },
                                            {min:0,max:25,message:'最多允许25字符'}
                                        ],
                                    })(
                                        <Input style={{width:180}} placeholder="姓名"/>
                                    )}
                                </FormItem>
                                <FormItem  
                                labelCol={{ span: 1 }}
                                 wrapperCol={{ span: 8}}
                                 style={{position:'absolute',top:0,left:278}}
                                >
                                    
                                        {getFieldDecorator('contactsPhone', {
                                            initialValue:detail.contactsPhone,
                                            rules: [
                                                {required: true, message: '手机号码 为必填' },
                                                Validate({type: "phone"}),
                                            ],
                                        })(
                                            <Input style={{width:180,height:32}} placeholder="手机号码"/> 
                                        )}
                                    
                                    
                                </FormItem>
                            </Col>
                            <Col span={12} >
                                
                            </Col>
                            <div style={{marginTop:-5,textIndent:87,width:380}}>
                                <span style={{ color: "#9b9b9b", fontSize: "12px" }}> 用于接收该租户管理员的账户密码信息</span>    
                            </div>
                            
                        </Row>
                    
                    </Form>
                </Spin>
            </div>
        )
    }
    
}
AddTenantComp.defaultProps = {
    title: "新建租户",
    width:694,
    loading:false
}
export default Form.create()(AddTenantComp);
