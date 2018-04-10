import React, { Component, PropTypes } from "react";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon } from '../../base/components/AntdComp';
import FormModalComp from '../../base/components/FormModalComp';
import AutoSelectComp from '../../base/components/AutoSelectComp';
import TreeSelectComp from '../../base/components/TreeSelectComp';
import AddAddressCont from '../dialogconts/AddAddressCont';
const FormItem = Form.Item;
const Option = Select.Option;

class AddDepartmentComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.param = {
            mgrPm: { "empName": "", "pageSize": "10" },
            deptNamePm: {
                "conditions": [{
                    "field": "status",
                    "value": 1,
                    "operation": 0
                }],
                "relations": "status",
                "treeLevel": 5
            },
            addPm: {
                "conditions": [
                {
                    "field": "status",
                    "value": "1",
                    "operation": 0
                }],
                "relations": "status"
            }
        }
        this.deptPids="";
        this.state = {
            newAddress: null
        };
    }

    componentWillMount() {
        this.props.getSelectData(this.param).then(addrCode => {
            this.setState({ newAddress: addrCode ? addrCode : null });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (this.props.type=='add'&&this.props.codeRule === 0) {
                data.deptNo = '';
            }
            if (!err) {
                this.props.onOk && this.props.onOk(data);
            }
        });
    }

    handleNewAddress = (addressCode) => {
        this.props.getSelectData(this.param);
        this.props.getAddress().then(() => {
            this.setState({ newAddress: addressCode });
        });
    }

    deptManagerSearch = (val) => {
        return this.props.getdeptMgr({ "empName": val });
    }

    getPdetail = (val) => {
        this.props.getPDetail(val, "Pdetail").then(addrCode => {
            this.setState({ newAddress: addrCode });
        });
    }

    getComp = () => {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        // mgrSign=true,
        // mgrName='';
        let { Record, pDeptName, deptMgr, deptMgrName, address, getdeptMgr, loading } = this.props;
        if (address.size == 0) { address = null }
        let findAddress = {
            isMag: "经营地址",
            isRep: "收货地址",
            isSog: "发货地址",
            isBil: "开票地址",
        };

        if(pDeptName.children){
            let loop=data=>data.map(item=>{
                if(item.deptCode==Record.deptCode||item.deptPids.indexOf(Record.deptCode) > -1){
                    item.disabled=true;
                }else{
                    item.disabled=false;
                }
                if (item.children) loop(item.children);
                return item;
            })
            loop(pDeptName.children);
        }
        if (address) {
            address.map((item, index) => {
                if (item.isMag == 1) {
                    item.addType = findAddress.isMag;
                } else if (item.isRep == 1) {
                    item.addType = findAddress.isRep;
                } else if (item.isSog == 1) {
                    item.addType = findAddress.isSog;
                } else if (item.isBil == 1) {
                    item.addType = findAddress.isBil;
                };
                return item;
            })
        };
        return (
            <div className="department-add">
                <Spin spinning={loading}>
                    <Form>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="组织名称"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('deptName', {
                                        initialValue: Record.deptName || "",
                                        rules: [
                                            // { type: "cnOrEn" },
                                            { required: true, message: '名称不能为空',whitespace:true },
                                            { min: 1, max: 50, message: '最多允许50个字符' }],
                                    })(
                                        <Input placeholder="请输入名称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="组织编号"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('deptNo', {
                                        initialValue: this.props.type == 'add' && this.props.codeRule === 0 ? '系统自动生成' : Record.deptNo || "",
                                        rules: [
                                        { type: this.props.codeRule === 0?"":"numOrLetter" },
                                        { required: true, message: '编号不能为空' },
                                        { min: 1, max: 20, message: '最多允许20个字符' }],
                                    })(
                                        <Input placeholder="请输入编号" disabled={this.props.type=='edit'||this.props.codeRule === 0?true:false} />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        {/*<Row>
                            <Col span={12}>
                                <FormItem
                                    label="组织简称"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('deptAlias', {
                                        initialValue: Record.deptAlias || "",
                                        rules: [{ max: 20, message: '最多允许20个字符' }],
                                    })(
                                        <Input placeholder="请输入组织简称" />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="组织全称"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('deptAll', {
                                        initialValue: Record.deptAll || "",
                                        rules: [{ max: 50, message: '最多允许50个字符' }],
                                    })(
                                        <Input placeholder="请输入组织全称" />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>*/}
                        <Row>
                            {/*<Col span={12}>
                                <FormItem
                                    label="英文名称"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('deptEng', {
                                        initialValue: Record.deptEng || "",
                                        rules: [{ type: "english" },
                                        { max: 50, message: '最多允许50个字符' }],
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>*/}
                             <Col span={12}>
                                <FormItem
                                    label="上级组织"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('deptPid', {
                                        initialValue: Record.deptPid || pDeptName.deptCode,
                                        //rules: [{
                                        //    validator: (rule, val, callback) => {
                                        //        if (val == Record.deptCode || Record.deptPids ? Record.deptPids.indexOf(val) < 0 : false) {
                                        //            callback("666");
                                        //        } else {
                                        //            callback();
                                        //        }
                                        //    }
                                        //}],

                                    })(
                                        <TreeSelectComp
                                            treeData={[pDeptName]}
                                            keyName='deptCode'
                                            name='deptName'
                                            onChange={this.getPdetail}
                                            width={221}
                                        />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="负责人"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('deptMgr', {
                                        initialValue: Record.deptMgr || "",
                                        rules: [
                                            {
                                                type: "autoselect",
                                                message: "请从下拉列表中选择一项！",
                                                list: deptMgr,
                                                keyName: "id",
                                            },
                                        ],
                                        onChange: this.handleSelectChange,
                                    })(
                                        <AutoSelectComp
                                            key="select"
                                            width={221}
                                            selectedList={deptMgr}
                                            onSelect={this.props.handleChange}
                                            onSearch={this.deptManagerSearch}
                                            displayName={["empName"]}
                                            keyName={"id"}
                                            format="{0}"
                                        />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="层级"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('deptLevel', {
                                        //rules: [{ required: true, message: 'Please select your gender!' }],
                                        initialValue: (Record.deptLevel || 0).toString(),
                                        onChange: this.handleSelectChange,
                                    })(
                                        <Select>
                                            {
                                                window.ENUM.getEnum("level").map((level, index) => {
                                                    return <Select.Option key={level.catCode.toString()} >{level.catName}</Select.Option>
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="联系电话"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('deptPhone', {
                                        initialValue: Record.deptPhone || "",
                                        rules: [{
                                            validator: (rule, value, callback) => { 
                                                if (/^(0[0-9]{2,3}-?)[0-9]{7,8}$/.test(value) || /^1[34578]\d{9}$/.test(value) || /^\d{7,8}$/.test(value) ||value=='') {
                                                    callback();
                                                } else {
                                                    callback('联系电话 不是一个有效的电话号码');
                                                }
                                            }
                                        }]
                                        // rules: [{ type: "phone" }],
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </Col>
                           
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="是否为库存组织"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('isOpt', {
                                        //rules: [{ required: true, message: 'Please select your gender!' }],
                                        initialValue: (Record.isOpt==0?0:1).toString(),
                                        onChange: this.handleSelectChange,
                                    })(
                                        <Select placeholder="Select a option and change input text above">
                                            {
                                                window.ENUM.getEnum("deptBool").map((deptBool, index) => {
                                                    return <Select.Option key={deptBool.catCode}>{deptBool.catName}</Select.Option>
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="是否为采购组织"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('isPurcharse', {
                                        //rules: [{ required: true, message: 'Please select your gender!' }],
                                        initialValue: (Record.isPurcharse==0?0:1).toString(),
                                        onChange: this.handleSelectChange,
                                    })(
                                        <Select placeholder="Select a option and change input text above">
                                            {
                                                window.ENUM.getEnum("deptBool").map((deptBool, index) => {
                                                    return <Select.Option key={deptBool.catCode}>{deptBool.catName}</Select.Option>
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
                                    label="是否为销售组织"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('isSell', {
                                        //rules: [{ required: true, message: 'Please select your gender!' }],
                                        initialValue: (Record.isSell==0?0:1).toString(),
                                        onChange: this.handleSelectChange,
                                    })(
                                        <Select placeholder="Select a option and change input text above">
                                            {
                                                window.ENUM.getEnum("deptBool").map((deptBool, index) => {
                                                    return <Select.Option key={deptBool.catCode}>{deptBool.catName}</Select.Option>
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="是否为财务组织"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('isFinance', {
                                        //rules: [{ required: true, message: 'Please select your gender!' }],
                                        initialValue: (Record.isFinance==0?0:1).toString(),
                                        onChange: this.handleSelectChange,
                                    })(
                                        <Select placeholder="Select a option and change input text above">
                                            {
                                                window.ENUM.getEnum("deptBool").map((deptBool, index) => {
                                                    return <Select.Option key={deptBool.catCode} >{deptBool.catName}</Select.Option>
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
                                    label="是否为生产组织"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    {this.getFD('isProduct', {
                                        //rules: [{ required: true, message: 'Please select your gender!' }],
                                        initialValue: (Record.isProduct==0?0:1).toString(),
                                        onChange: this.handleSelectChange,
                                    })(
                                        <Select placeholder="Select a option and change input text above">
                                            {
                                                window.ENUM.getEnum("deptBool").map((deptBool, index) => {
                                                    return <Select.Option key={deptBool.catCode} >{deptBool.catName}</Select.Option>
                                                })
                                            }
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={12}></Col>
                        </Row>
                        <Row type="flex" justify="start">
                            <Col span={24}>
                                <FormItem
                                    label="办公地址"
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 20 }}
                                >
                                    {this.getFD('addrCode', {
                                        initialValue: this.state.newAddress || Record.addrCode || "",
                                        //rules: [{ required: true, message: 'Please input your note!' }],
                                    })(
                                        <Select>
                                            {address ? address.map(item => {
                                                return <Select.Option key={item.addressCode} >
                                                    {`【${item.addressName}】 ${item.addressDetl}`}
                                                </Select.Option >
                                            }
                                            ) : null}
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="start">
                            <Col span={4}></Col>
                            <Col span={16}>
                                <Icon type="plus" />
                                <a href="#" onClick={this.props.AddAddressVisiable} >添加新地址</a>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
                <AddAddressCont isFetch handleNewAddress={this.handleNewAddress} />
            </div>
        )
    }
}
AddDepartmentComp.defaultProps = {
    Record: {
        id: "",
        deptName: "",
        deptNo: "",
        deptLevel: 0,
        deptAlias: "",
        deptMgr: "",
        isOpt: 1,
        isPurcharse: 1,
        isSell: 1,
        isFinance: 1,
        isProduct: 1,
        deptAll: "",
        pDeptName: "",
        deptPhone: "",
        addrCode: "",
    },
    selectedList: [
        {
            id: 1,
            name: "AAAA",
        },
        {
            id: 2,
            name: "BBBB",
        },
        {
            id: 3,
            name: "CCCC",
        },
        {
            id: 4,
            name: "DDDD",
        },
    ]
}
AddDepartmentComp.propTypes = {
    Record: PropTypes.object,
    selectedList: PropTypes.array,
}

export default Form.create()(AddDepartmentComp);