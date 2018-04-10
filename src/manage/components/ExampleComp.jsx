import React, { Component } from 'react'
import { Row, Col, Button, Popconfirm, Icon } from '../../base/components/AntdComp';
import { prefixCh } from '../../base/consts/UrlsConfig'
// import companyLogo from '../../base/images/companyLogo.png';
export default class ExampleCont extends Component {

 constructor(props, context) {
        super(props, context);
    }

    onDelete = (companyCode,status) => {
        const { onClear, CompanyDel,Record } = this.props;
        CompanyDel(companyCode,status).then(json=>{
            if(json.status===2000){
                onClear();
            }
                 
        })
       
    }

    render() {
        let {record,sidebar_loding}=this.props;
        let industry =[],industryList;
        if( record.companyIndustry != undefined) {
            record.companyIndustry.map((keys) => {
                industry.push(keys.industryName);
                industryList=industry.join('/')

            })
        }
        let addressDetl=''
        if(record.companyAddr!=undefined){
           
           addressDetl= record.companyAddr.countryName+""+record.companyAddr.cityName+""+record.companyAddr.countyName+""+record.companyAddr.addressDetl
        }
        
        return (
            sidebar_loding?null:
            <div className="sidebar-con">
                <div className="side-box">
                    <Row className="side-title">
                        <Col span={6}><b>公司详情</b></Col>
                        <Col span={9}></Col>
                        <Col span={9} className="side-button">
                            {record.status=="1"?
                            <Button type="primary" style={{background:'#4c80cf',width:70,height:28}} onClick={()=>this.props.EditCompanyVisiable(record.companyCode)}><i className="c2mfont c2m-bianji1" style={{fontSize:14,margin:'0 4px 0 -4px'}}></i>编辑</Button>
                                :null}
                                <Popconfirm placement="bottomRight" title={
                                        <div>
                                            <h5>确认要{record.status == "1"?'停用':'启用'}该公司吗？</h5>
                                            <p>{record.status == "1"?'停用后，该公司所有人员将不能再登入该公司空间':null}</p>
                                        </div>
                                    }
                                    onConfirm={() => this.onDelete(record.companyCode,record.status==1?2:1)} okText="是" cancelText="否">

                                    <Button type="primary" style={{background:'#4c80cf',width:70,height:28,margin:'0 12px 0 10px'}}><i className={record.status != 1 ?"c2mfont c2m-qiyongcopy":"c2mfont c2m-jinyong2"} style={{fontSize:14,marginRight:4}}></i>{record.status == "1"?'停用':'启用'}</Button>

                                </Popconfirm>

                            <div className="x-icon" onClick={()=>this.props.SidebarVisiable(false)}><a ><Icon type="close" /></a></div>
                        </Col>
                    </Row>
                </div>
                <Row className="company-logo">
                    <Col span={24}>
                            <div><img src={record.companyLogo ? record.companyLogo : prefixCh +'img/companyLogo.png'} /></div>
                    </Col>
                </Row>

                <Row className="company-list">

                    <Col span={24}>
                        <ul>
                            <li>
                                <div>{record.companyName}({record.companyUscc})</div>
                                <ol style={{color:"#9b9b9b"}}>
                                    <li>{sidebar_loding?"":record.companyType?''+window.ENUM.getEnum("nature",record.companyType):""}</li>
                                    <li>{record.companyScale&&record.companyType?<span>&nbsp;|&nbsp;</span>:null}</li>
                                    <li>{sidebar_loding?"":record.companyScale?''+window.ENUM.getEnum("scale",record.companyScale):""}</li>
                                    <li>{industryList&&record.companyScale?<span>&nbsp;|&nbsp;</span>:null}</li>
                                     {record.companyType&&industryList&&!record.companyScale?<li>&nbsp;|&nbsp;</li>:null}
                                    <li>{sidebar_loding?"":industryList}</li>
                                </ol>
                            </li>
                            <li>
                                <span>公司简称:</span>
                                <b>{record.companyAbbr}</b>
                            </li>
                            <li>
                                <span>法人代表:</span>
                                <b>{record.corporation}</b>
                            </li>
                            <li>
                                <span>公司电话:</span>
                                <b>{record.telephoneNumber}</b>
                            </li>
                            <li>
                                <span>注册地址:</span>
                                <b>{addressDetl}</b>
                            </li>
                            <li>
                                <span>邮编:</span>
                                <b>{record.zipCode}</b>
                            </li>
                            <li>
                                <span>公司简介:</span>
                                <b>{record.companyDesc}</b>
                            </li>
                            <li>
                                <span>业务联系人:</span>
                                <b>{record.contacts}</b>
                            </li>
                            <li>
                                <span>业务联系人手机:</span>
                                <b>{record.contactsPhone}</b>
                            </li>
                            <li>
                                <span>公司admin账号:</span>
                                <b>{record.accountNumber}</b>
                            </li>
                            <li>
                                <span>密码:</span>
                                <b className="pwd"><Button type="primary" style={{background:'#4c80cf',width:91,height:28}} onClick={()=>this.props.ResetPassword(record.companyCode)} loading={this.props.btnLoading}>重置密码</Button>　提示：点击后，将重置密码，并将初始密码发送至业务联系人手机</b>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
        )
    }
}