/**
 * Created by MW on 2017/3/24.
 */
/**
 * Created by MW on 2017/3/24.
 */
import React, { Component, PropTypes } from "react";
import {
    Form,
    Select,
    Input,
    Tabs,
    DatePicker,
    Row,
    Col,
    TreeSelect,
    AutoComplete
} from '../../base/components/AntdComp';
import moment from 'moment';
import AddAddressCont from '../dialogconts/AddAddressCont';
import FormModalComp from '../../base/components/FormModalComp';
import AddressAct from '../actions/AddressAct';
import { store } from '../data/StoreConfig';
import Validate from '../../base/consts/ValidateList';
import AutoSelectComp from "../../base/components/AutoSelectComp";

const Option = Select.Option;
const {TabPane} = Tabs;
const FormItem = Form.Item;

const TreeNode = TreeSelect.TreeNode;

const dateFormat = 'YYYY-MM-DD';

const BaseFormItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};

const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 },
};


class MemberAddDialogComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeKey: "1",
            value: '',
            focusPhone: false,
        }

    }

    handleOnChange = (activeKey) => {
        this.setState({ activeKey });
    }


    drawMapTreeTreeNode = (data) => data.map((item) => {
        if (item.children && item.children.length > 0) {

            return (
                <TreeNode {...item} key={item.id + item.deptCode} value={item.deptCode} title={item.deptName}>
                    {
                        this.drawMapTreeTreeNode(item.children)
                    }
                </TreeNode>
            );
        }
        return (
            <TreeNode key={item.id} title={item.deptName} value={item.deptCode}></TreeNode>
        );

    })


    handleOnChangeTree = (value) => {
        this.setState({ value });
    }

    handleOkToAddress = (addressCode) => {
        this.props.actions && this.props.actions.getAddressEnum && this.props.actions.getAddressEnum().then((success) => {
            if (success) {
                this.props.form.setFieldsValue({
                    addressCode
                });
            }
        });

    }
    handleClickAddress = (e) => {
        store.dispatch(AddressAct.AddAddressVisiable(true));
    }

    componentWillUnmount = () => {
        // this.handlePhoneFocusOrBlur(false);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                //固定电话telNo telStart telEnd
                data.telNo = data.telStart + "-" + data.telEnd;
                data.entryDate = (data.entryDate && data.entryDate.format("YYYY-MM-DD HH:mm:ss")) || '';
                data.empName = data.empName && data.empName.trimLeft().trimRight() || "";

                /*     if(this.props.codeRuleIsAuto != 1){
                         data.empNo = this.props.dataSource.empNo || null;
                     }*/

                if (!err) {
                    this.props.onOk && this.props.onOk(data);
                } else {

                    let {
                        empName,
                        phone,
                        telStart,
                        telEnd,
                        email,
                    } = err;
                    if (empName || phone || telStart || telEnd || email) {
                        this.setState({
                            activeKey: "1",
                        });
                    } else {
                        this.setState({
                            activeKey: "2",
                        });
                    }
                }
            });
        }
    }


    /*  getAddressVal = () => {
          let props = this.props;
          if (this.state.newAddress) {
              return this.state.newAddress;
          }
          if (props.dataSource && props.dataSource.officeAddress && props.dataSource.officeAddress.length > 0) {
              return props.dataSource.officeAddress[0].addressCode;
          }
          return null;
      }*/


    getEmpNo = () => {
        let data = this.props.dataSource || {};

        /*   if (this.props.codeRuleIsAuto === 1) {*/
        if (true) {
            return (
                <FormItem
                    label="工号"
                    hasFeedback
                    {...formItemLayout}
                >
                    {this.getFD('empNo', {
                        initialValue: data.empNo || '',
                        rules: [
                            {
                                validator: (rule, val, callback) => {
                                    if (val.length > 20) {
                                        callback("最多允许20字符");
                                    } else if (!/^[\w/-]{0,20}$/.test(val)) {
                                        callback("格式错误");
                                    } else {
                                        callback()
                                    }
                                }
                            },
                        ]
                    })(
                        <Input />
                        )}
                </FormItem>
            )
        }

        //编码规则(0自动生成1手动生成)
        /*return (
            <FormItem
                label="工号"
                {...formItemLayout}
            >
                <Input disabled={true} value={data.empNo || ''} />
            </FormItem>
        )*/
        /*   return (
               <FormItem
                   label="工号"
                   hasFeedback
                   {...formItemLayout}
               >
                   {this.getFD('empNo', {
                       initialValue: data.empNo || '',
                   })(
                       <Input disabled={true}/>
                   )}
               </FormItem>
           )*/
    }

    validatorIdentityNo = (rule, val, callback) => {
        let identityTypeCode = this.props.form.getFieldValue("identityTypeCode");
        if (identityTypeCode === "101") {
            let {message, pattern, type} = Validate({ type: "idcard" });
            if (!(pattern.test(val) || val.length <= 0)) {
                callback(message);
            } else {
                callback();
            }
        } else {
            let {message, pattern, type} = Validate({ type: "numOrLetter" });
            if (!(pattern.test(val) || val.length <= 0)) {
                callback(message);
            } else if (val.length > 20) {
                callback("最大20个字符");
            } else {
                callback();
            }
        }
    }

    // handlePhoneFocusOrBlur = (bool) => {
    //     this.setState(
    //         {
    //             focusPhone: bool,
    //         }
    //     )
    // }
    getComp = () => {
        let data = this.props.dataSource || {};

        return this.props.visible ? (
            <form>
                <Tabs
                    hideAdd
                    onChange={this.handleOnChange}
                    activeKey={this.state.activeKey}
                    type="card"
                    onEdit={this.onEdit}
                >
                    <TabPane tab={"基础资料"} key="1">
                        {
                            this.getFD('empCode', {
                                initialValue: data.empCode || null,
                            })(<Input type="hidden" />)
                        }
                        {
                            this.getFD('status', {
                                initialValue: data.status || null,
                            })(<Input type="hidden" />)
                        }


                        <Row>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                >
                                    {this.getFD('empName', {
                                        initialValue: data.empName || '',
                                        rules: [
                                            {
                                                /*validator: (rule, val, callback) => {
                                                    if (val.length > 50) {
                                                        callback("最多允许50字符");
                                                    } else {
                                                        callback()
                                                    }
                                                }*/
                                            },
                                            {
                                                /*required: true,
                                                whitespace:true,
                                                message: '姓名不能为空',*/
                                            }
                                        ]
                                    })(
                                        <Input disabled/>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12} className="label-width-right">
                                <FormItem
                                    {...formItemLayout}
                                    label="组织"
                                    hasFeedback
                                >
                                    {
                                        this.getFD('deptCode', {
                                            initialValue: (data.dept && data.dept[0]) ? data.dept[0].deptCode : '',
                                        })(
                                            <TreeSelect

                                                onChange={this.handleOnChangeTree}
                                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                treeDefaultExpandAll
                                            >
                                                {
                                                    this.drawMapTreeTreeNode(this.props.deptEnum)
                                                }
                                            </TreeSelect>
                                            )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="手机"
                                >
                                    {this.getFD('phone', {
                                        initialValue: (data.phone && data.phone + '') || '',
                                        /*rules: [
                                            { type: "phone", required: true, message: '请输入正确的手机号' },
                                        ]*/
                                    })(
                                        <Input disabled/>
                                        )}
                                </FormItem>
                            </Col>
                            {/*<Col span={7}>
                                <div className="form-item-label-phone">
                                    <label>
                                        {
                                            this.state.focusPhone ? "*作为员工登录账户使用" : ""
                                        }
                                    </label>
                                </div>
                            </Col>*/}
                            <Col span={12} className="label-width-right">
                                <FormItem
                                    {...formItemLayout}
                                    label="职位"
                                    hasFeedback
                                >
                                    {
                                        this.getFD('positionCode', {
                                            initialValue: (data.position && data.position[0]) ? data.position[0].positionCode : '',
                                            rules: [
                                                {
                                                    message: '请从下拉列表中选择一项',
                                                    type: "autoselect",
                                                    list: this.props.positionEnum,
                                                    keyName: "positionCode",
                                                }
                                            ],
                                        })(
                                            <AutoSelectComp
                                                className="input"
                                                dropdownClassName="new-sales-store-search-dropdown"
                                                selectedList={this.props.positionEnum}
                                                onSearch={(val) => this.props.actions.getPositionListEnum(val)}
                                                optionLabelProp="displayName"
                                                getOptionProps={(item) => {
                                                    return {
                                                        displayName: item.positionName
                                                    }
                                                }}
                                                labelName="positionName"
                                                keyName={"positionCode"}
                                                format={(item) => <div>
                                                    {/*      <div className="option-code">{item.positionCode}</div>*/}
                                                    <div className="option-name">{item.positionName}</div>
                                                </div>}
                                            />
                                            )
                                    }
                                </FormItem>
                            </Col>
                        </Row>


                        <Row>
                            <Col span={7} className="fixed-telephone">
                                <FormItem
                                    labelCol={{ span: 12 }}
                                    wrapperCol={{ span: 12 }}
                                    label="固定电话"
                                    hasFeedback
                                >
                                    {
                                        this.getFD('telStart', {
                                            initialValue: (data.telNo && data.telNo.split("-")[0]) || '',
                                            rules: [
                                                {
                                                    validator: (rule, val, callback) => {
                                                        if (val.length > 0 && (!(/^\d+$/.test(val)))) {
                                                            callback('必须输入整数');
                                                        }
                                                        else {
                                                            callback()
                                                        }
                                                    },
                                                },
                                                { max: 4, message: '区号最长4位' }
                                            ]
                                        })(
                                            <Input />
                                            )
                                    }
                                </FormItem>
                            </Col>

                            <Col span={5}>
                                <FormItem
                                    className="label-no-after"

                                    labelCol={{
                                        span: 3
                                    }}
                                    wrapperCol={{ span: 20 }}
                                    label=" "
                                    hasFeedback
                                >
                                    {
                                        this.getFD('telEnd', {
                                            rules: [
                                                {
                                                    validator: (rule, val, callback) => {
                                                        if (val.length > 0 && (!/^\d+$/.test(val))) {
                                                            callback('必须输入整数');
                                                        }
                                                        else {
                                                            callback()
                                                        }
                                                    },
                                                },
                                                { max: 8, message: '座机最长8位' }
                                            ],
                                            initialValue: (data.telNo && data.telNo.split("-")[1]) || '',
                                        })(
                                            <Input />
                                            )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="邮箱"
                                    {...formItemLayout}
                                >
                                    {
                                        this.getFD('email', {
                                            initialValue: data.email || '',
                                            /*rules: [
                                                { type: "email", message: "请填写正确的邮箱" },
                                                {
                                                    validator: (rule, val, callback) => {
                                                        if (val.length > 50) {
                                                            callback("最多允许50字符");
                                                        } else {
                                                            callback();
                                                        }
                                                    }
                                                }
                                            ]*/
                                        }
                                        )(
                                            <Input disabled/>
                                            )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} className="work-office">
                                <FormItem
                                    {...BaseFormItemLayout}
                                    label="办公地址"
                                    hasFeedback
                                >
                                    {
                                        this.getFD('addressCode', {
                                            initialValue: (data.officeAddress && data.officeAddress[0]) ? data.officeAddress[0].addressCode : ''
                                        }
                                        )(
                                            <Select placeholder="请选择">
                                                {
                                                    this.props.addressEnum.map(function (item, index) {
                                                        return (
                                                            <Option value={item.addressCode + ""}
                                                                key={item.addressCode + index + ""}>
                                                                {`【${item.addressName}】 ${item.addressDetl}`}
                                                            </Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            )
                                    }


                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={3} className="add-new-address">
                                <AddAddressCont isFetch handleNewAddress={this.handleOkToAddress}
                                    businessValue={
                                        ['isOfe']
                                    }
                                />
                            </Col>
                            <Col span={14}>
                                <a href="#" onClick={this.handleClickAddress}><i className="c2mfont c2m-plus" style={{fontSize:'9px',marginRight:'3px'}}></i>添加新地址</a>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab={"详细资料"} key="2">
                        <Row>
                            <Col span={12}>
                                {
                                    this.getEmpNo()
                                }
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    className="dl-entry-data"
                                    label="入职时间"
                                    hasFeedback
                                    {...formItemLayout}
                                >{this.getFD('entryDate', {
                                    initialValue: data.entryDate ? moment(data.entryDate, dateFormat) : undefined,
                                })(
                                    <DatePicker
                                        style={{
                                            display: "block"
                                        }}
                                        format={dateFormat} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}> <FormItem
                                label="证件类型"
                                hasFeedback
                                {...formItemLayout}
                            >
                                {this.getFD('identityTypeCode', {
                                    initialValue: (data.identityType && data.identityType[0]) ? data.identityType[0].identityCode : '',
                                })(
                                    <Select size="large" onChange={(val) => {
                                        this.props.form.resetFields(["identityNo"]);
                                    }}>
                                        {
                                            window.ENUM.credentials.map(function (item, index) {
                                                return <Option value={item.catCode + ""}
                                                    key={item.catCode + ""}>{item.catName}</Option>;
                                            })
                                        }
                                    </Select>
                                    )}
                            </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="证件号码"
                                    hasFeedback
                                    {...formItemLayout}
                                >{this.getFD('identityNo', {
                                    initialValue: data.identityNo || '',
                                    rules: [
                                        {
                                            validator: this.validatorIdentityNo
                                        }
                                    ]
                                })(
                                    <Input />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}> <FormItem
                                label="性别"
                                hasFeedback
                                {...formItemLayout}
                            >
                                {this.getFD('genderCode', {
                                    initialValue: ((data.gender && data.gender[0]) ? data.gender[0].genderCode : '') || '',
                                })(
                                    <Select size="large">
                                        {
                                            window.ENUM.sex.map(function (item, index) {
                                                return <Option value={item.catCode + ""}
                                                    key={item.catCode + ""}>{item.catName}</Option>;
                                            })
                                        }
                                    </Select>
                                    )}
                            </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="婚姻状态"
                                    hasFeedback
                                    {...formItemLayout}
                                >{this.getFD('maritalStatusCode', {
                                    initialValue: ((data.maritalStatus && data.maritalStatus[0]) ? data.maritalStatus[0].maritalStatusCode : '') || '',
                                })(
                                    <Select size="large">
                                        {
                                            window.ENUM.marry.map(function (item, index) {
                                                return <Option value={item.catCode + ""}
                                                    key={item.catCode + ""}>{item.catName}</Option>;
                                            })
                                        }
                                    </Select>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="国家"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('nationalityCode', {
                                        initialValue: ((data.nationality && data.nationality[0]) ? data.nationality[0].nationalityCode : '') || '',
                                    })(
                                        <Select size="large">
                                            {
                                                this.props.countryEnum.map(function (item, index) {
                                                    return <Option value={item.countryCode + ""}
                                                        key={item.countryCode + index + ""}>{item.countryName}</Option>;
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="民族"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('ethnicityCode', {
                                        initialValue: ((data.ethnicity && data.ethnicity[0]) ? data.ethnicity[0].ethnicityCode : '') || '',
                                    })(
                                        <Select size="large">
                                            {
                                                window.ENUM.nationality.map(function (item, index) {
                                                    return <Option value={item.catCode + ""}
                                                        key={item.catCode + ""}>{item.catName}</Option>;
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="籍贯"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('nativePlace', {
                                        initialValue: data.nativePlace || '',
                                        rules: [
                                            {
                                                validator: (rule, val, callback) => {
                                                    if (val.length > 20) {
                                                        callback("最多允许20字符");
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            }
                                        ]
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="家庭住址"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('homeAddr', {
                                        initialValue: data.homeAddr || '',
                                        rules: [
                                            {
                                                validator: (rule, val, callback) => {
                                                    if (val.length > 100) {
                                                        callback("最多允许100字符");
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            }
                                        ]
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="紧急联系人"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('emergencyContact', {
                                        initialValue: data.emergencyContact || '',
                                        rules: [
                                            {
                                                validator: (rule, val, callback) => {
                                                    if (val.length > 50) {
                                                        callback("最多允许50字符");
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            }
                                        ]
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="紧急联系人电话"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {this.getFD('emergencyPhone', {
                                        initialValue: data.emergencyPhone || '',
                                        rules: [
                                            { type: 'phone', label: '' }
                                        ]
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>

                    </TabPane>
                </Tabs>
            </form>
        ) : '';
    }
}

MemberAddDialogComp.defaultProps = {
    className: 'member-addDialog-comp'
}
MemberAddDialogComp.propTypes = {
    position: PropTypes.object,
}
export default Form.create()(MemberAddDialogComp);
