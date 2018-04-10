import React, { Component } from 'react';
import moment from "moment";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon, Radio, Checkbox } from '../../base/components/AntdComp';
import FormModalComp from '../../base/components/FormModalComp';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class AddCodeRuleComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.type = this.props.type;
        this.prefix = '';
        this.initialValue = '';
        this.dateFormat = '';
        this.manualRuleType = false;
        this.automaticRuleType = false;
        this.state = {
            checkBoxShow: false,
            checked: false,
            prefix: '',
            businessIndex: "",
            preview: '00001'
        }
    }

    componentDidMount() {
        let { detail } = this.props;
        if (this.type == "edit") {
            this.disabledRuleType(detail.businessIndex);
        }
    }

    componentWillReceiveProps(nextProps) {
        let { type, detail } = nextProps;
        if (type == 'edit' && nextProps.detail.businessIndex != this.props.detail.businessIndex) {
            this.disabledRuleType(detail.businessIndex, detail.materialClassCode);
        }
        // if (type == 'edit') {
        //     this.disabledRuleType(detail.businessIndex);
        // }
    }

    getPrefix = (e) => {
        this.setFdv({
            preview: e.target.value + this.getDate(this.getFdv('dateFormat')) + this.getFdv('initialValue')
        });
    }
    onSerialDigitChange = (value) => {
        let initialValue = "0".repeat(value-1)+"1";
        this.setFdv({
            initialValue,
            preview: this.getFdv('prefix') + this.getDate(this.getFdv('dateFormat')) + initialValue
        });
    }
    getInitialValue = (e) => {
        this.setFdv({
            preview: this.getFdv('prefix') + this.getDate(this.getFdv('dateFormat')) + e.target.value
        });
    }

    getDateFormat = (value, option) => {
        this.setFdv({
            preview: this.getFdv('prefix') + this.getDate(value) + this.getFdv('initialValue')
        });
    }

    getDate = (value) => {
        let WW = moment().weeks() + 1,
            dateFormat;
        if (value) {
            value == 'YYWW' ? dateFormat = moment().format(`YY`) + WW : dateFormat = moment().format(`${value}`);
        } else {
            dateFormat = '';
        }
        return dateFormat;
    }

    disabledRuleType = (value,classCode) => {
        this.setState({
            checkBoxShow: false,
            checked: false,
            prefix: '',
            businessIndex: ""
        })
        let enabledRuleType = [4, 5, 8, 9, 13];
        if (enabledRuleType.includes(Number(value))) {
            this.manualRuleType = false;
            this.automaticRuleType = false;
            [8, 9, 13].includes(Number(value)) ? this.setFdv({ ruleType: '1' }) : null;
        } else if ([6, 11, 41, 42].includes(Number(value))) {
            this.manualRuleType = false;
            this.automaticRuleType = true;
            this.setFdv({
                ruleType: '1'
            });
        } else if (value == 10) {
            this.manualRuleType = false;
            this.automaticRuleType = false;
            this.setFdv({ ruleType: '0' });
            this.setState({
                checkBoxShow: true,
                checked: classCode!=1,
                businessIndex: 10
            })
            this.type == "add" ? this.checkboxOnchange() : null;
        } else {
            this.manualRuleType = true;
            this.automaticRuleType = false;
            this.setFdv({
                ruleType: '0'
            });
        }
    }

    checkboxOnchange = () => {
        this.setState({
            checked: !this.state.checked
        });
        if (!this.state.checked) {
            this.setFdv({
                prefix: "物料分类编码",
                preview: "物料分类编码" + this.getDate(this.getFdv('dateFormat')) + this.getFdv('initialValue')
            });
        } else {
            this.setFdv({
                prefix: "",
                preview: this.getDate(this.getFdv('dateFormat')) + this.getFdv('initialValue')
            });
        }
    }

    ruleTypeOnChange = (e) => {
        if (e.target.value == 0 && this.state.businessIndex == 10) {
            this.setState({
                prefix: "物料分类编码",
                preview: "物料分类编码00001"
            })
        } else {
            this.setState({
                prefix: "",
                preview: "00001"
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.props.detail ? data.id = this.props.detail.id : null;
                data.businessIndex = Number(data.businessIndex);
                data.ruleType = Number(data.ruleType);
                // data.serialDigit = Number(data.serialDigit);
                data.businessType = Number(this.props.businessType);
                data.materialClassCode = this.state.checked ? 0 : 1;
                this.props.onOk && this.props.onOk(data);
            }
        });
    }

    getComp = () => {
        let { modulLoading, detail, codeIndex } = this.props;
        return (
            <div>
                <Spin spinning={modulLoading}>
                    <Form>
                        <Row>
                            <Col span={24}>
                                {this.type == 'add' ? <FormItem
                                    label="业务对象"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('businessIndex', {
                                        initialValue: detail.businessIndex ? detail.businessIndex + '' : detail.businessIndex,
                                        rules: [
                                            // { type: "cnOrEn" },
                                            { required: true, message: '业务对象不能为空' },
                                        ],
                                    })(
                                        <Select onChange={this.disabledRuleType} disabled={this.type == 'edit' ? true : false}>
                                            {
                                                window.ENUM.getEnum(`${codeIndex}`).map((codeIndex, index) => {
                                                    return <Select.Option key={codeIndex.catCode.toString()} >{codeIndex.catName}</Select.Option>
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem> : <FormItem
                                    label="业务对象"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                        {this.getFD('businessIndex', {
                                            initialValue: detail.businessIndex ? detail.businessIndex + '' : detail.businessIndex,
                                            rules: [
                                                // { type: "cnOrEn" },
                                                { required: true, message: '业务对象不能为空' },
                                            ],
                                        })(
                                            <span>{detail.businessObject}</span>
                                            )}
                                    </FormItem>}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="编码规则"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('ruleType', {
                                        initialValue: detail.ruleType ? detail.ruleType + '' : '0',
                                        rules: [
                                            {/*{ type: "numOrLetter" },
                                            { required: true, message: '编号不能为空' },
                                            { min: 1, max: 20, message: '最多允许20个字符' }*/}
                                        ],
                                    })(
                                        <RadioGroup onChange={this.ruleTypeOnChange}>
                                            <Radio value={'0'} disabled={this.automaticRuleType}>自动生成</Radio>
                                            <Radio value={'1'} disabled={this.manualRuleType}>手动生成</Radio>
                                        </RadioGroup>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        {this.getFdv('ruleType') == '1' ? null :
                            <div>
                                <Row>
                                    <Col span={24}>
                                        <FormItem
                                            label="前缀标识"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: this.state.businessIndex == 10 ? 12 : 16 }}
                                        >
                                            {this.getFD('prefix', {
                                                initialValue: detail.prefix || this.state.prefix,
                                                rules: this.state.businessIndex != 10 || !this.state.checked ?
                                                    [
                                                        { type: 'prefix', label: '前缀标识', message: '只允许为数字,字母,"-"和"_"' },
                                                        { max: 3, message: '最大允许输入3个字符长度！' }
                                                    ] : null,
                                                onChange: this.getPrefix
                                            })(
                                                <Input disabled={this.state.checked} />
                                                )}
                                        </FormItem>
                                        {
                                            this.state.checkBoxShow ? <Checkbox className='check' checked={this.state.checked} onChange={this.checkboxOnchange}>物料分类编码</Checkbox> : null
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <FormItem
                                            label="日期格式"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 16 }}
                                        >
                                            {this.getFD('dateFormat', {
                                                initialValue: detail.dateFormat || "",
                                                rules: [
                                                    {/*{ max: 50, message: '最多允许50个字符' }*/ }
                                                ],

                                            })(
                                                <Select onSelect={this.getDateFormat} >
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
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 16 }}
                                        >
                                            {this.getFD('serialDigit', {
                                                initialValue: detail.serialDigit ? detail.serialDigit + '' : "5",
                                                rules: [
                                                    {/*{ type: "english" },
                                                { max: 50, message: '最多允许50个字符' }*/}
                                                ],
                                                onChange: this.onSerialDigitChange,
                                            })(
                                                <Select onSelect={() => { this.setFdv({ initialValue: this.getFdv('initialValue') }) }}>
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
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 16 }}
                                        >
                                            {this.getFD('initialValue', {
                                                initialValue: detail.initialValue || '00001',
                                                rules: [
                                                    { required: true, message: '起始值不能为空' },
                                                    { pattern: /^[0-9]+$/, message: '只能输入0~9的数字' },
                                                    { len: Number(this.getFdv("serialDigit")), message: '起始值位数要与流水号位数保持一致！' },
                                                ],
                                                onChange: this.getInitialValue,
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <FormItem
                                            label="样式预览"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 16 }}
                                        >
                                            {this.getFD('preview', {
                                                //rules: [{ required: true, message: 'Please select your gender!' }],
                                                initialValue: detail.preview || this.state.preview,
                                                onChange: this.handleSelectChange,
                                            })(
                                                <Input readOnly style={{ borderWidth: '0px', color: '#86CD70' }} />
                                                )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        }
                    </Form>
                </Spin>
            </div>
        )
    }
}
export default Form.create()(AddCodeRuleComp);