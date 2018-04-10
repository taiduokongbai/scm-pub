import React, { Component } from "react";
import { Form, Input, Spin, Select, Button, Modal, Col, Row, message, Icon } from '../../base/components/AntdComp';
import { shouldComponentUpdate } from '../../base/consts/Utils';
import EditAddressCont from '../../main/dialogconts/EditAddressCont';
import UploadComp from '../../manage/components/UploadComp';
import Validate from '../../base/consts/ValidateList';
import { prefixCh, prefix_route } from '../../base/consts/UrlsConfig';
import FormModalComp from '../../base/components/FormModalComp';
// import companyLogo from '../../base/images/companyLogo.png';
const FormItem = Form.Item;
const Option = Select.Option;

function handleChange(option, value) {

}
class EditCompanyComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            src: "",
            cropResult: null,
            editAddressData: {},
            addr: false,
            addressDetl: "",
            addressCode: ""
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                Object.assign(data, { telephoneNumber: data.telephoneO && data.telephoneN ? data.telephoneO + '-' + data.telephoneN : "" })
                delete data.telephoneN;
                delete data.telephoneO;
                if (this.state.addr) {
                    data.companyAddr = this.state.editAddressData;
                    data.companyAddr.addressCode = this.state.addressCode;
                }
                if (data.companyIndustry) {
                    let companyAttr = data.companyIndustry;
                    data.companyIndustry = [];
                    for (var i of companyAttr) {
                        data.companyIndustry.push({ "industryCode": i })
                    }

                }

                this.props.onOk && this.props.onOk(data);
            }
        });
    }
    handleCancel = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.props.handleCancel && this.props.handleCancel(e);
        }
    }

    editAddress = (data, moreData, addressCode) => {
        this.setFdv({
            companyAddr: moreData + "" + data.addressDetl,
        });
        this.setState({ addressDetl: moreData + "" + data.addressDetl, editAddressData: data, addressCode: addressCode, addr: true });
    }


    getComp = () => {
        let { getFieldDecorator } = this.props.form;
        let formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        let { state } = this.props;
        if (state.position == undefined) {
            return
        }
        let _companyAddr = state.position.companyAddr ? state.position.companyAddr.countryName + "" + state.position.companyAddr.cityName + "" + state.position.companyAddr.countyName + "" + state.position.companyAddr.addressDetl : "";
        let _companyAddrCode = state.position.companyAddr ? state.position.companyAddr.addressCode : null;
        return (
            <div>
                <Form >
                    <Row className="company-code">
                        <Col span={24}>
                            <FormItem label="公司编码"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 8 }}>
                                {getFieldDecorator('companyCode', {
                                    initialValue: state.position.companyCode,
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <FormItem label="所属租户"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 8 }}>
                                {this.getFD('groupTenantCode', {
                                    initialValue: state.position.groupTenantCode || "",
                                    rules: [

                                        { required: true, message: '所属租户 为必填' },
                                    ]
                                })(
                                    state.position.groupTenantCode ?
                                        <span>{state.position.groupTenantCode + '[' + state.position.tenantName + ']'}</span> : <span>--</span>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="公司名称" {...formItemLayout}>
                                {getFieldDecorator('companyName', {
                                    initialValue: state.position.companyName,
                                    rules: [
                                        { required: true, message: '公司名称 为必填' },
                                        { min: 0, max: 50, message: '最多允许50字符' }
                                    ],
                                })(
                                    <span>{state.position.companyName}</span>

                                    )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="公司简称" {...formItemLayout}>
                                {getFieldDecorator('companyAbbr', {
                                    initialValue: state.position.companyAbbr,
                                    rules: [
                                        { required: false, message: '' },
                                        { min: 0, max: 20, message: '最多允许20字符' }
                                    ],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="公司简介"
                                className="company-desc"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 8 }}>
                                {getFieldDecorator('companyDesc', {
                                    initialValue: state.position.companyDesc,
                                    rules: [{ min: 0, max: 500, message: '最多允许500字符' }],
                                })(
                                    <Input type="textarea" rows={2} />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <FormItem label="统一社会信用代码" {...formItemLayout}>
                                {getFieldDecorator('companyUscc', {
                                    initialValue: state.position.companyUscc,
                                    rules: [
                                        Validate({ type: "socialCredit", label: "请输入", required: true })
                                    ],
                                })(
                                    <span>{state.position.companyUscc}</span>
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="法人代表" {...formItemLayout}>
                                {getFieldDecorator('corporation', {
                                    initialValue: state.position.corporation,
                                })(
                                    <span>{state.position.corporation}</span>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12} className="company-phone">
                            <FormItem label="公司电话"  {...formItemLayout}>
                                {getFieldDecorator('telephoneO', {
                                    initialValue: state.position.telephoneO,//telephoneNumber
                                    rules: [Validate({ type: "telPrefix3|4", message: "座机号错误" })],
                                })(
                                    <Input style={{ width: 80 }} />
                                    )}
                            </FormItem>
                            <FormItem className="company-phoneN"  {...formItemLayout}>
                                {getFieldDecorator('telephoneN', {
                                    initialValue: state.position.telephoneN,
                                    rules: [Validate({ type: "telPrefix7|8", message: "座机号错误" })],
                                })(
                                    <Input style={{ width: 110 }} />
                                    )}
                            </FormItem>

                        </Col>
                        <Col span={12}>
                            <FormItem label="邮编" {...formItemLayout}>
                                {getFieldDecorator('zipCode', {
                                    initialValue: state.position.zipCode,
                                    rules: [Validate({ type: "zip", label: "请输入" })],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>

                        <Col span={24}>
                            <FormItem label="注册地址"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 8 }}>
                                <div style={{ width: 532 }}>
                                    <span>{this.state.addr ? this.state.addressDetl : _companyAddr} </span>

                                    <Button type="default" style={{ border: '1px solid #4c80cf', width: 70, height: 28, color: '#4c80cf' }} onClick={() => this.props.EditAddressVisiable(_companyAddrCode)}><i className="c2mfont c2m-bianji1" style={{ fontSize: 17, margin: '0 4px 0 -4px', verticalAlign: 'middle', color: "#4c80cf", lineHeight: '28px' }}></i>修改</Button>
                                </div>

                                {getFieldDecorator('companyAddr', {
                                    initialValue: state.position.companyAddr,
                                    rules: [{ required: true, message: '注册地址 为必填' }],

                                })(
                                    <Input style={{ display: "none" }} />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', width: 792, height: 0, right: -27, top: 0, borderTop: '1px solid #d8d8d8' }}></div>
                        <Col span={12} style={{ marginTop: 14 }}>
                            <FormItem label="公司性质"
                                {...formItemLayout}>
                                {getFieldDecorator('companyType', {
                                    initialValue: state.position.companyType || '',
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Select >
                                        {
                                            window.ENUM.getEnum("nature").map(nature => {
                                                return <Select.Option value={nature.catCode.toString()} key={nature.catCode}>{nature.catName}</Select.Option>
                                            })
                                        }
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={12} style={{ marginTop: 14 }}>
                            <FormItem label="公司规模"
                                {...formItemLayout}>
                                {getFieldDecorator('companyScale', {
                                    initialValue: state.position.companyScale || '',
                                    rules: [{ required: false, message: '' }],
                                })(
                                    <Select >
                                        {
                                            window.ENUM.getEnum("scale").map(scale => {
                                                return <Select.Option value={scale.catCode.toString()} key={scale.catCode}>{scale.catName}</Select.Option>
                                            })
                                        }
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className="industry-box">
                                <FormItem label="所属行业"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 8 }}>
                                    {getFieldDecorator('companyIndustry', {
                                        initialValue: state.position.companyIndustry == undefined ? [""] : state.position.companyIndustry.map(key => key.industryCode),
                                        rules: [{ required: false, message: '' }],
                                    })(
                                        <Select mode="multiple"
                                            style={{ width: '100%' }}
                                        >
                                            {
                                                window.ENUM.getEnum("industry").map(industry => {
                                                    return <Select.Option value={industry.catCode.toString()} key={industry.catCode}>{industry.catName}</Select.Option>
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </div>
                        </Col>

                    </Row>
                    <Row style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', width: 792, height: 0, right: -27, top: 0, borderTop: '1px solid #d8d8d8' }}></div>
                        <Col span={12} className="company-contacts" style={{ marginTop: 14 }}>
                            <FormItem label="业务联系人" {...formItemLayout}>
                                {getFieldDecorator('contacts', {
                                    initialValue: state.position.contacts,
                                    rules: [
                                        { required: true, message: '姓名 为必填' },
                                        { min: 0, max: 50, message: '最多允许50字符' }
                                    ],
                                })(
                                    <Input style={{ width: 80 }} placeholder="姓名" disabled />
                                    )}
                            </FormItem>
                            <FormItem className="contacts-phone" {...formItemLayout}>
                                <div style={{ width: 400 }}>
                                    {getFieldDecorator('contactsPhone', {
                                        initialValue: state.position.contactsPhone,
                                        rules: [
                                            { type: "string", message: "请输入您的手机号", required: true },
                                            Validate({ type: "phone" }),
                                        ],
                                    })(
                                        <Input style={{ width: 110, height: 32 }} placeholder="手机号码" disabled />
                                        )}
                                    <span style={{ color: "#737373", fontSize: "12px" }}></span>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span={12} >

                        </Col>
                    </Row>
                    {
                        state.position.companyLogo ? <Row>
                            <Col span={24}>
                                <FormItem label="公司logo" className="company-logo"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 8 }}>
                                    {getFieldDecorator('companyLogo', {
                                        initialValue: state.position.companyLogo,
                                    })(
                                        <img src={state.position.companyLogo} style={{ display: 'flex', width:140,height:80,float:'left',margin:'0 10px' }}/>
                                        )}
                                </FormItem>
                            </Col>
                        </Row> : null
                    }
                </Form>
                <EditAddressCont editAddress={this.editAddress} isFetch={false} />
            </div>
        )
    }
}
EditCompanyComp.defaultProps = {
    position: {
        companyAbbr: "",
        companyDesc: "",
        companyUscc: "",
        corporation: "",
        telephoneNumber: "",
        zipCode: "",
        companyAddr: {},
        companyType: "",
        companyScale: "",
        companyIndustry: [],
        contacts: "",
        contactsPhone: "",
        companyLogo: ""
    }
}
export default Form.create()(EditCompanyComp);
