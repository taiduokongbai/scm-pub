import React, { Component } from 'react';
import moment from "moment";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon, Radio } from '../../base/components/AntdComp';
import FormModalComp from '../../base/components/FormModalComp';
import AutoSelectComp from '../../base/components/AutoSelectComp';
const FormItem = Form.Item;
const Option = Select.Option;

class AddTerraceRuleComp extends FormModalComp { 
    constructor(props, context) { 
        super(props, context);
        this.prefix = '';
        this.initialValue = '';
        this.dateFormat = '';

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.validateFds((err, data) => {
            if (!err) {
                data.businessType=4;
                data.businessIndex=Number(data.businessIndex);
                //data.serialDigit=parseInt(data.serialDigit);
                if(this.props.type=='add'){
                    delete data.id;
                }
                
                this.props.handleSubmit && this.props.handleSubmit(data);
            }
        });
    }
    prefixChange=(e)=>{
        this.setFdv({
            preview: e.target.value + this.getDate(this.getFdv('dateFormat')) + this.getFdv('initialValue')
        });
    }

    dateFormatChange = (value, option) => { 
        this.setFdv({
            preview: this.getFdv('prefix') + this.getDate(value) + this.getFdv('initialValue')
        });

    }

    getDate = (value) => { 
        let WW = moment().weeks() + 1,
            dateValue;
        if (value) {
            value == 'YYWW' ? dateValue = moment().format(`YY`) + WW : dateValue = moment().format(`${value}`);
        } else {
            dateValue = '';
        }
        return dateValue;
    }

    initChange=(e)=>{
        this.setFdv({
            preview: this.getFdv('prefix') + this.getDate(this.getFdv('dateFormat')) + e.target.value
        });

    }
    onSerialDigitChange = (value) => {
        let initialValue = "0".repeat(value-1)+"1";
        this.setFdv({
            initialValue,
            preview: this.getFdv('prefix') + this.getDate(this.getFdv('dateFormat')) + initialValue
        });
    }
    getComp = () => {
        let { getFieldDecorator } = this.props.form;
        let formItemLayout = {
            labelCol: { span:6 },
            wrapperCol: { span: 16 },
        };

        let {detail_loading}=this.props;
        let {terraceRuleList}=this.props[this.props.type];
        if(terraceRuleList.businessIndex){
            terraceRuleList.businessIndex=terraceRuleList.businessIndex+"";
        }
        return (
            <div  className="terraceRule_row">
                <Spin spinning={detail_loading}>
                    <Form>
                        <Row style={{display:'none'}}>
                            <FormItem>
                                {this.getFD('id', {
                                    initialValue: terraceRuleList.id?terraceRuleList.id:"",
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="业务对象"
                                    {...formItemLayout}
                                >
                                    {this.getFD('businessIndex', {
                                        initialValue: terraceRuleList?terraceRuleList.businessIndex:"",
                                        rules: [
                                            { required: true, message: '业务对象不能为空' }],
                                    })(
                                        this.props.type=='add'?
                                        <Select>
                                            {
                                            window.ENUM.getEnum("terraceCodeIndex").map((codeIndex, index) => {
                                                return <Select.Option key={codeIndex.catCode.toString()} >{codeIndex.catName}</Select.Option>
                                                })
                                            }
                                        </Select>:
                                        <div>{terraceRuleList.businessObject}</div>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="编码规则"
                                    {...formItemLayout}
                                >
                                    {this.getFD('ruleType', {
                                        initialValue: 0,
                                    })(
                                        <div className="Rep-checkbox">
                                            <Radio defaultChecked>自动生成</Radio>
                                            <Radio disabled>手动生成</Radio>
                                        </div>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="前缀标识"
                                    {...formItemLayout}
                                >
                                    {this.getFD('prefix', {
                                        initialValue: terraceRuleList.prefix || "",
                                        rules: [
                                            { type: 'prefix', label: '前缀标识' ,message: '只允许为数字,字母,"-"和"_"'},
                                            { max: 3, message: '最大允许输入3个字符长度！' }
                                        ],
                                        
                                    })(
                                        <Input  onChange={this.prefixChange}/>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="日期格式"
                                    {...formItemLayout}
                                >
                                    {this.getFD('dateFormat', {
                                        initialValue: terraceRuleList.dateFormat ||"",
                                    })(
                                        <Select onSelect={this.dateFormatChange} >
                                            <Option value="YYYYMMDD" >YYYYMMDD</Option>
                                            <Option value="YYMMDD" >YYMMDD</Option>
                                            <Option value="YYYYMM" >YYYYMM</Option>
                                            <Option value="YYMM" >YYMM</Option>
                                            <Option value="YYWW" >YYWW</Option>
                                            <Option value="" >-------</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="流水号"
                                    {...formItemLayout}
                                >
                                    {this.getFD('serialDigit', {
                                        initialValue: terraceRuleList.serialDigit?terraceRuleList.serialDigit:"5",
                                        onChange: this.onSerialDigitChange,
                                    })(
                                        <Select onSelect={() => { this.setFdv({ initialValue: this.getFdv('initialValue')}) }}>
                                            <Option value="9" >9</Option>
                                            <Option value="8" >8</Option>
                                            <Option value="7" >7</Option>
                                            <Option value="6" >6</Option>
                                            <Option value="5" >5</Option>
                                            <Option value="4" >4</Option>
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="起始值"
                                    {...formItemLayout}
                                >
                                    {this.getFD('initialValue', {
                                        initialValue: terraceRuleList.initialValue?terraceRuleList.initialValue:"00001",
                                        rules: [
                                            { required: true, message: '起始值不能为空' },
                                            { pattern: /^[0-9]+$/, message: '只能输入0~9的数字' },
                                            { len: Number(this.getFdv("serialDigit")), message: '起始值位数要与流水号位数保持一致！' },
                                        ],
                                        onChange: this.initChange,

                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row className="preview_style">
                            <Col span={24} >
                                <FormItem
                                    label="样式预览"
                                    {...formItemLayout}
                                >
                                    {this.getFD('preview', {
                                        initialValue:terraceRuleList.preview || '00001',
                                    })(
                                       <Input  style={{border:'none',color: '#86CD70'}} readOnly/>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Spin >
            </div>
        );
    }

   
}
export default Form.create()(AddTerraceRuleComp);