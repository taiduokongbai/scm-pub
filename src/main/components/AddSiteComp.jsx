import React, { Component,PropTypes } from "react";
import { Form,Input, Button,Checkbox, Select} from '../../base/components/AntdComp';
import FormModalComp from '../../base/components/FormModalComp';
import AutoSelectComp from '../../base/components/AutoSelectComp';
import MapComp from '../../base/components/MapComp';
import LinkAgeComp from '../../base/mobxComps/LinkAgeComp';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class AddSiteComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            address: '',
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.props.loading) {
            this.validateFds((err, data) => {
                let newData = {};
                const sitePlain = ['isSog', 'isPrd', 'isDot'];
                newData = { ...data.linkage };
                newData.coordinate = JSON.stringify(data.map);
                let address = data.linkage.address != undefined ? data.linkage.address : '';
                newData.addressDetl =  data.addressDetl;
                newData.siteName = data.siteName.replace(/(^\s+)|(\s+$)/g,"");
                if (this.props.type=='add'&&this.props.addressCodeRule === 0) {
                    newData.siteCode = '';
                } else {
                    newData.siteCode = data.siteCode;
                }
                newData.orgCode = data.orgCode;
                newData.status = this.props.detail.status || 0;
                newData.tenantCode = '';
                newData.langCode = '';
                newData.remarks = '';
                delete newData.address;
                for (var i = 0; i < sitePlain.length; i++){
                    if (data.business && data.business.includes(sitePlain[i])) {
                        newData[sitePlain[i]] = 1;
                    } else {
                        newData[sitePlain[i]] = 0;
                    }
                
                }
                if (!err) {
                    this.props.onOk && this.props.onOk(newData);
                }
            });
        }
    }
    onPress = (e) => {
        let address = this.getFdv('linkage') && this.getFdv('linkage').address || '';
        let addressDetl = this.getFdv("addressDetl");
        this.setState({ address: address + addressDetl });
    }
    orgDetail = (val) => {
        this.props.OrgDetail(val.id).then(json => {
            if (json.status === 2000) {
                if (json.data) {
                    this.props.AddressDetail(json.data.addrCode).then(json => {
                        if (json.status === 2000) { 
                            if (json.data.list.length>0) {
                                let { addressDetl, countryCode, provinceCode, cityCode, countyCode, coordinate } = json.data.list[0];
                                if (coordinate == '') {
                                    coordinate = JSON.stringify({
                                        "lng": null,
                                        "lat": null,
                                    })
                                }
                                this.setFdv({
                                    linkage: { countryCode, provinceCode, cityCode, countyCode },
                                    addressDetl: addressDetl,
                                    map: JSON.parse(coordinate)
                                });
                                this.props.store.initData();
                            } else {
                                this.setFdv({
                                    linkage: { countryCode: "CN", provinceCode: "", cityCode: "", countyCode: "" },
                                    addressDetl: "",
                                    map: {
                                        lng: null,//116.404,
                                        lat: null,//39.915,
                                    }
                                })
                            }
                        }
                    })
                }
            } 
        });
    }
    orgSearch = (val) => {
        this.setFdv({
            linkage: { countryCode: "CN", provinceCode: "", cityCode: "", countyCode: "" },
            addressDetl: "",
            map: {
                lng: null,//116.404,
                lat: null,//39.915,
            }
        })
        return this.props.OrgList({orgCode:val,orgName:val,page:1,pageSize:10});
    }
    componentWillMount() {
        if (this.props.type == 'add') {
            this.props.OrgList({page:1,pageSize:10});
        }
    }
    getComp = () => {
        let { detail, orgList, addressCodeRule } = this.props;
        let { countryCode, provinceCode, cityCode, countyCode } = detail;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12}, 
        };
        const tailFormItemLayout = {
            wrapperCol: {span: 14,offset: 3}
        };
        const plainOptions = [
            { label: '仓储管理', value: 'isSog' },
            { label: '生产制造', value: 'isPrd' },
            { label: '服务网点', value: 'isDot' },
        ];
        return (
            <Form className="address-form">
                <FormItem {...formItemLayout} label="编码" hasFeedback >
                    {this.getFD('siteCode', {
                        initialValue: addressCodeRule===0&&this.props.type=='add'?'系统自动生成':detail.siteCode,
                        rules: [
                            { whitespace: true, required: true, message: '编码 为必填' },
                            { max: 20, message: '编码长度不能超过20' },
                        ],
                    })(
                        <Input placeholder="请输入编码" disabled={this.props.type=='edit'||addressCodeRule===0?true:false}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="名称" hasFeedback >
                    {this.getFD('siteName', {
                        initialValue: detail.siteName,
                        rules: [
                            { whitespace: true, required: true, message: '名称 为必填' },
                            { max: 50, message: '名称长度不能超过50' },
                        ],
                    })(
                        <Input placeholder="请输入名称" />
                    )}
                </FormItem>
                <FormItem
                    label="经营组织"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {this.getFD('orgCode', {
                        initialValue: detail.orgCode||'',
                        rules: [
                            {
                                type: "autoselect",
                                message: "请从下拉列表中选择一项！",
                                list: orgList,
                                keyName: "orgCode",
                            },
                            { required: true, message: '经营组织 为必填' },
                        ],
                    })(
                        <AutoSelectComp
                            width={322}
                            selectedList={orgList}
                            onSelect={this.orgDetail}
                            onSearch={this.orgSearch}
                            displayName={["orgName"]}
                            keyName={"orgCode"}
                            format="{0}"
                        />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="业务用途">
                    {this.getFD('business', {
                        initialValue: detail.siteUse
                    })(
                        <CheckboxGroup options={plainOptions} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="所在地区" className="select-ganged">
                    {this.getFD('linkage', {
                        initialValue: {
                            countryCode,
                            provinceCode,
                            cityCode,
                            countyCode,
                        },
                        rules: [{
                            required: true,
                            validator: (rule, value, callback) => {
                                if (value.countryCode == '') {
                                    callback('所在地区 为必填')
                                }else if (value.countryCode == 'CN' && value.provinceCode != '710000' && value.provinceCode != '810000' && value.provinceCode != '820000') {
                                    if (value.provinceCode == '' || value.cityCode == '' || value.countyCode == '') {
                                        callback('所在地区 为必填')
                                    } else {
                                        callback()
                                    }
                                }else {
                                    callback();
                                }
                            }
                        }],
                        onChange: (value) => {
                            this.setFdv({ 'map': this.getFdv('map') });
                        },
                    })(<LinkAgeComp store={this.props.store}/>)}
                </FormItem>

                <FormItem
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 18 }}
                    label="详细地址">
                    {this.getFD('addressDetl', {
                        initialValue: detail.addressDetl||'',
                        rules: [
                            { required: true, message: '详细地址 为必填' },
                            { max: 200, message: '详细地址长度不能超过200' },
                        ]
                    })(
                        <Input placeholder="详细地址" onPressEnter={this.onPress} style={{ width: '66.667%' }} />
                    )}<Button type='ghost' onClick={this.onPress} style={{ fontSize: '12px',border: 0,color:'#4c80cf' }}>检索地图</Button>
                </FormItem>

                <FormItem className="map" wrapperCol={{ span: 24 }} >
                    {this.getFD('map', {
                        initialValue: JSON.parse(detail.coordinate),
                        rules: this.getFdv("linkage").countryCode == 'CN' ? [
                            {
                                required: true,
                                validator: (rule, val, callback) => {
                                    if (val.lng && val.lat) {
                                        callback();
                                    } else {
                                        callback("未检测到符合条件的地址");
                                    }
                                }
                            }
                        ] : []
                    })(<MapComp search={this.state.address} />)}
                </FormItem>
            </Form>
        )
    }
}
AddSiteComp.defaultProps = {
    detail: {
        siteCode: "",
        siteName: "",
        orgCode: "",
        isSog: 0,
        isPrd: 0,
        isDot: 0,
        status: 0,
        countryCode: "CN",
        provinceCode: "",
        cityCode: "",
        countyCode: "",
        orgList:[],
        coordinate: JSON.stringify({
            "lng": null,//116.404,
            "lat": null,//39.915,
        })
    }
}
AddSiteComp.propTypes={
    position:PropTypes.object,
}
export default Form.create()(AddSiteComp);
