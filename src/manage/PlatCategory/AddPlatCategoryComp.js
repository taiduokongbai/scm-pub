import React, { Component } from "react";
import { Form, Input, Spin,Select, Button, Modal ,Col,Row,message,TreeSelect,Icon} from '../../base/components/AntdComp';
import FormModalComp from '../../base/components/FormModalComp';
import Validate from '../../base/consts/ValidateList';
import TreeSelectComp from '../../base/components/TreeSelectComp';
import {addPlatCategoryStore} from './AddPlatCategoryStore';
import {platCategoryStore,getParentListStore}from './PlatCategoryStore';
const FormItem = Form.Item;
const Option = Select.Option;
let { observer } = mobxReact;
@observer
class AddPlatCategoryComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.editLevel=false;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                
                if(this.props.title=='新建类目'){
                    if(!data.categoryPcode){
                        data.level=1;
                        
                    }else{
                        data.level=addPlatCategoryStore.level+1;
                        data.categoryPcode=addPlatCategoryStore.categoryPcode;
                    }
                    delete data.id;
                    addPlatCategoryStore.fetchPlatCategoryAdd(data)
                    .then(json=>{
                        if(json.status===2000){
                            platCategoryStore.fetchTableList(platCategoryStore.searchPm)
                            this.props.form.resetFields();
                        }
                    })
                }else{
                    if(this.editLevel){
                        data.level=addPlatCategoryStore.level+1;
                        data.categoryPcode=addPlatCategoryStore.categoryPcode;
                    }
                    addPlatCategoryStore.fetchPlatCategoryEdit(data)
                    .then(json=>{
                        if(json.status===2000){
                            platCategoryStore.fetchTableList(platCategoryStore.searchPm)
                            this.props.form.resetFields();
                        }
                        
                    })
                }
            }
        });
    }
    handleCancel = (e) => {
        e.preventDefault();
        if(this.props.title=='新建类目'){
             this.props.form.resetFields();
            platCategoryStore.addVisible=false;
        }else{
            this.props.form.resetFields();
            platCategoryStore.editVisible=false;
             
        }
    }
    parentChange=(value)=>{
       this.editLevel=true;
       if(value){
            addPlatCategoryStore.fetchPlatCategoryDetail({categoryCode:value}).then(json=>{
                addPlatCategoryStore.level=json.data.level;
                addPlatCategoryStore.categoryPcode=json.data.categoryCode;
            })
       }else{
            addPlatCategoryStore.level=0;
            addPlatCategoryStore.categoryPcode="";
       }
       
    }

    getComp = () => {
        let { getFieldDecorator } = this.props.form;
        let formItemLayout = {
            labelCol: { span:5 },
            wrapperCol: { span: 16 },
        };
       let {detail}=addPlatCategoryStore;

       if(this.props.title=='新建类目'){
           detail={
                categoryName: "",
                categoryCode: "",
                superiorCode:"",
                remarks: "",
           }
       }
        return (
            <div className="addTenant-con">
               <Spin spinning={addPlatCategoryStore.loading}>
                    <Form >
                        <Row style={{display:'none'}}>
                            <Col span={24}>
                                <FormItem label="层级" 
                                {...formItemLayout}>
                                    {getFieldDecorator('level', {
                                        initialValue:detail.level,
                                       
                                    })(
                                        <Input style={{width:200}} />

                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style={{display:'none'}}>
                            <Col span={24}>
                                <FormItem label="id" 
                                {...formItemLayout}>
                                    {getFieldDecorator('id', {
                                        initialValue:detail.id,
                                       
                                    })(
                                        <Input style={{width:200}} />

                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={24}>
                                <FormItem label="类目编码" 
                                {...formItemLayout}>
                                    {getFieldDecorator('categoryCode', {
                                        initialValue:detail.categoryCode,
                                        rules: [
                                                Validate({type:"numOrLetterOrOther",label:"",required:true}),
                                                 {min:0,max:20,message:'最多允许20字符'}
                                            ],
                                    })(
                                        <Input style={{width:200}} placeholder="请输入类目编码" disabled={this.props.title=='编辑类目'?true:false}/>

                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem label="类目名称" 
                                {...formItemLayout}>
                                    {getFieldDecorator('categoryName', {
                                        initialValue:detail.categoryName,
                                        rules: [
                                                
                                                 Validate({type:"numOrCnEn",label:"",required:true}),
                                                 {min:0,max:50,message:'最多允许50字符'}
                                                
                                            ],
                                    })(
                                        <Input style={{width:200}}/>

                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={24}>
                                <FormItem label="上级类目" 
                                {...formItemLayout}
                                >
                                    {getFieldDecorator('categoryPcode', {
                                        initialValue:detail.categoryPcode,
                                        
                                    })(
                                        <TreeSelect
                                            {...getParentListStore}
                                            treeData={getParentListStore.treeData.slice() || []}
                                            onChange={this.parentChange}
                                            style={{width:200}}
                                            allowClear={true}
                                            disabled={detail.status==0||this.props.title=='新建类目'?false:true}
                                        />

                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={24} >
                                <FormItem label="描述" 
                                 labelCol= {{span:5}}
                                 wrapperCol= {{ span: 18 }}
                                >
                                    {getFieldDecorator('categoryDesc', {
                                        initialValue:detail.categoryDesc,
                                        rules: [
                                                 {min:0,max:200,message:'最多允许200字符'} 
                                            ],
                                        
                                    })(
                                        <Input type='textarea' style={{ height: '80px', }} />

                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </div>
        )
    }
    
}
AddPlatCategoryComp.defaultProps = {
    title: "新建类目",
    width:490,
    loading:false
}
export default Form.create()(AddPlatCategoryComp);
