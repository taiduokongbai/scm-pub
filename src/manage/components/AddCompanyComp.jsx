import React, { Component } from "react";
import { Form, Input, Spin,Select, Button, Modal ,Col,Row,message,Icon} from '../../base/components/AntdComp';
import {shouldComponentUpdate} from '../../base/consts/Utils';
import AddAddressCont from '../../main/dialogconts/AddAddressCont';
import EditAddressCont from '../../main/dialogconts/EditAddressCont';
import Validate from '../../base/consts/ValidateList';
import UploadComp from './UploadComp';
import { prefixCh } from '../../base/consts/UrlsConfig'
import FormModalComp from '../../base/components/FormModalComp';
import AutoSelectComp from '../../base/components/AutoSelectComp';
// import companyLogo from '../../base/images/companyLogo.png';
const FormItem = Form.Item;
const Option = Select.Option;

class AddCompanyComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cropResult: null,
            addAddressData:{},
            editAddressData:{},
            addr:false,
            addressDetl:"",
            addressCode:"",
            defaultLogo:false,
            
        };

    }
    componentDidMount() {
        this.props.TenantList({status:1,page:1,pageSize:10})
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                Object.assign(data,{telephoneNumber:data.telephoneO&&data.telephoneN?data.telephoneO+'-'+data.telephoneN:""})
                if(data.companyCode==undefined){
                    delete data.companyCode;
                }
                
                delete data.telephoneN;
                delete data.telephoneO;
                
            if(this.props.title=='新建公司'){
                data.companyAddr=this.state.addAddressData;
            }else{
                if(this.state.addr){
                    data.companyAddr=this.state.editAddressData;
                    data.tenantCode=this.props.position.tenantCode;
                     data.companyAddr.addressCode=this.state.addressCode;
                }else{
                     data.companyAddr=this.props.position.companyAddr;
                }
                 
                }
            
               
               if(data.companyIndustry){
                   let companyAttr=data.companyIndustry;
                   data.companyIndustry=[];
                   for(var i of companyAttr){
                        data.companyIndustry.push({"industryCode":i})
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

    onAddress = (data,moreData) => {
        this.setFdv({
            companyAddr: moreData+""+data.addressDetl,
        });
        this.setState({addressDetl:moreData+""+data.addressDetl,addAddressData:data,addr:true});
    }
    editAddress= (data,moreData,addressCode) => {
        //console.log(data);
        this.setFdv({
            companyAddr: moreData+""+data.addressDetl,
        });
        this.setState({addressDetl:moreData+""+data.addressDetl,editAddressData:data,addressCode:addressCode,addr:true});
    }

    tenantListSearch= (val) => {
       this.props.TenantList({tenantName:val,groupTenantCode:val,status:1,page:1,pageSize:10})
    }
    getComp = () => {
        let { getFieldDecorator } = this.props.form;
        let formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        let { position,add_company_visiable,edit_company_visiable ,tenant} = this.props;
        // let addressDetl='';
        // if(position.companyAddr!=undefined){
        //     this.state={editAddressData:position.companyAddr}
        //     addressDetl=position.companyAddr.addressDetl;
        // }
        return (
            <div id="select-content">
                
                
                <Form >
                    <Row className="company-code">
                        <Col span={24}>
                            <FormItem label="公司编码" 
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 8}}>
                                {getFieldDecorator('companyCode', {
                                    initialValue:position.companyCode,
                                })(
                                    <Input  />

                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            <FormItem label="所属租户" 
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 8}}>
                                {this.getFD('groupTenantCode', {
                                    initialValue:tenant&&tenant.length==1?tenant[0].groupTenantCode:""||"",
                                    rules:[
                                        
                                        {required: true, message: '所属租户 为必填' },
                                        {
                                            type: "autoselect",
                                            message: "请从下拉列表中选择一项！",
                                            list: tenant,
                                            keyName: "groupTenantCode",
                                        }
                                    ]
                                })(
                                    
                                    <AutoSelectComp
                                        selectedList={tenant}
                                        //onSelect={this.tenantListSelect}
                                        onSearch={this.tenantListSearch}
                                        displayName={["groupTenantCode", "tenantName"]}
                                        keyName={"groupTenantCode"}
                                        
                                    />

                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="公司名称" {...formItemLayout}>
                                {getFieldDecorator('companyName', {
                                    initialValue:position.companyName,
                                    rules: [
                                            {required: true, message: '公司名称 为必填',whitespace:true },
                                            {min:0,max:50,message:'最多允许50字符'}
                                        ],
                                })(
                                   <Input  placeholder="请输入企业名称"/>

                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="公司简称" {...formItemLayout}>
                                {getFieldDecorator('companyAbbr', {
                                    initialValue:position.companyAbbr,
                                    rules: [
                                        { required: false, message: '' },
                                        {min:0,max:20,message:'最多允许20字符'}
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
                            wrapperCol={{ span: 8}}>
                                {getFieldDecorator('companyDesc', {
                                    initialValue:position.companyDesc,
                                    rules: [{min:0,max:500,message:'最多允许500字符'}],
                                })(
                                    <Input type="textarea" rows={2} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <FormItem label="统一社会信用代码" {...formItemLayout} style={{textIndent:'-6px'}}>
                                {getFieldDecorator('companyUscc', {
                                    initialValue:position.companyUscc,
                                    rules: [
                                        Validate({type:"socialCredit",label:"请输入",required:true})
                                    ],
                                })(
                                    <Input placeholder="请输入"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="法人代表" {...formItemLayout}>
                                {getFieldDecorator('corporation', {
                                    initialValue:position.corporation,
                                    rules: [
                                            { required: true, message: '法人代表 为必填' },
                                            {min:1,max:50,message:'最多允许50字符'}
                                        ],
                                })(
                                    <Input placeholder="请输入姓名"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}  className="company-phone">
                            <FormItem label="公司电话"  {...formItemLayout}>
                                {getFieldDecorator('telephoneO', {
                                    initialValue:position.telephoneO,//telephoneNumber
                                    rules: [Validate({type:"telPrefix3|4",message:"座机号错误"})],
                                })(
                                    <Input style={{width:80}} />
                                )}
                            </FormItem>
                            <FormItem className="company-phoneN"  {...formItemLayout}>
                                {getFieldDecorator('telephoneN', {
                                    initialValue:position.telephoneN,
                                     rules: [Validate({type:"telPrefix7|8",message:"座机号错误"})],
                                })(
                                    <Input style={{width:110}}/>
                                )}
                            </FormItem>
                            
                        </Col>
                        <Col span={12}>
                            <FormItem label="邮编" {...formItemLayout}>
                                {getFieldDecorator('zipCode', {
                                    initialValue:position.zipCode,
                                    rules: [Validate({type:"zip",label:"请输入"})],
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
                            wrapperCol={{ span: 8}}>
                            <div style={{width:532}}>
                                {this.props.title=='新建公司'?
                                    <span>{this.state.addressDetl?this.state.addressDetl:""} </span>:
                                    <span>{this.state.addressDetl?this.state.addressDetl:position.companyAddr.countryName+""+position.companyAddr.cityName+""+position.companyAddr.countyName+""+position.companyAddr.addressDetl} </span>
                                }
                                {this.props.title=='新建公司'?
                                    <Button type="default" style={{border:'1px solid #4c80cf',width:70,height:28,color:'#4c80cf'}} onClick={()=>this.props.AddAddressVisiable()}><i className="c2mfont c2m-jia" style={{fontSize:14,margin:'0 4px 0 -4px',color:"#4c80cf"}}></i>添加</Button>:
                                    <Button type="default"style={{border:'1px solid #4c80cf',width:70,height:28,color:'#4c80cf'}} onClick={()=>this.props.EditCompanyAddress(true,position.companyAddr.addressCode,position.tenantCode)}><i className="c2mfont c2m-bianji1" style={{fontSize:17,margin:'0 4px 0 -4px',verticalAlign:'middle',color:"#4c80cf",lineHeight:'28px'}}></i>修改</Button>
                                }
                            </div>
                               {getFieldDecorator('companyAddr', {
                                   initialValue:''||position.companyAddr.addressDetl,
                                    rules: [{ required:true, message: '注册地址 为必填' }],
                                })(
                                   <Input style={{display:"none"}}/>
                                )}
                            </FormItem>
                        </Col>

                    </Row>
                    
                    <Row style={{position:'relative'}}>
                        <div style={{position: 'absolute',width: 792,height: 0,right: -27,top: 0,borderTop: '1px solid #d8d8d8'}}></div>
                        <Col span={12} style={{marginTop:14}}>
                            <FormItem label="公司性质" 
                            {...formItemLayout}>
                                {getFieldDecorator('companyType', {
                                    initialValue:position.companyType||'',
                                    //initialValue:window.ENUM.getEnum("nature",0)[0].catCode.toString(),
                                    rules: [{ required: false, message: 'Please input the companynature of collection!' }],
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
                        <Col span={12}>
                            <FormItem label="公司规模" 
                           {...formItemLayout} style={{marginTop:14}}>
                                {getFieldDecorator('companyScale', {
                                    initialValue:position.companyScale|| '',
                                rules: [{ required: false, message: 'Please input the companysize of collection!' }],
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
                                wrapperCol={{ span: 8}}>
                                    {getFieldDecorator('companyIndustry', {
                                        initialValue:position.companyIndustry==undefined?[""]:position.companyIndustry.map(key=>key.industryCode),
                                        rules: [{ required: false, message: 'Please input the companyIndustry of collection!' }],
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
                    <Row style={{position:'relative'}}>
                        <div style={{position: 'absolute',width: 792,height: 0,right: -27,top:0,borderTop: '1px solid #d8d8d8'}}></div>
                        <Col span={12} className="company-contacts" style={{marginTop:14}}>
                            <FormItem label="业务联系人" {...formItemLayout}>
                                {getFieldDecorator('contacts', {
                                    initialValue:position.contacts,
                                    rules: [
                                        { required: true, message: '姓名 为必填' },
                                        {min:0,max:50,message:'最多允许50字符'}
                                    ],
                                })(
                                    <Input style={{width:80}} placeholder="姓名"/>
                                )}
                            </FormItem>
                            <FormItem className="contacts-phone" {...formItemLayout}>
                                <div style={{ width: 400 }}>
                                    {getFieldDecorator('contactsPhone', {
                                        initialValue:position.contactsPhone,
                                        rules: [
                                            { type:"string",message:"请输入您的手机号",required: true},
                                            Validate({type: "phone"}),
                                        ],
                                    })(
                                        <Input style={{width:110,height:32}} placeholder="手机号码"/> 
                                    )}
                                    <span style={{ color: "#9b9b9b", fontSize: "12px" }}>　提示：用于接收该企业管理员的账户密码信息</span>    
                                </div>
                            </FormItem>
                        </Col>
                        <Col span={12} >
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="公司logo" className="company-logo" 
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 8}}>
                                {getFieldDecorator('companyLogo', {
                                    initialValue: position.companyLogo,
                                })(
                                    <UploadComp src={prefixCh + 'img/companyLogo.png'}/>
                                )}
                            </FormItem>
                        </Col>

                    </Row>

                </Form>
                <AddAddressCont onOK={this.onAddress} isFetch={false}/>
                <EditAddressCont editAddress={this.editAddress} isFetch={false}/>
            </div>
        )
    }
    /*render() {
        const { visible, title, loading ,width} = this.props;
        return (
            <Modal title={title} visible={visible}
                onCancel={this.handleCancel}
                width={width}
                footer={[
                    <Button key="submit" type="primary" size="large"
                        loading={loading} onClick={this.handleSubmit}>
                        保存
                    </Button>,
                ]}
            >
                <Spin spinning={loading}>
                    {
                        this.drawForm()
                    }
                </Spin>
            </Modal>

        );

    }*/
}
AddCompanyComp.defaultProps = {
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
export default Form.create()(AddCompanyComp);
