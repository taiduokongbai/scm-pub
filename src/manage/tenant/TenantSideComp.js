import React, { Component } from 'react'
import { Row, Col, Button, Popconfirm, Icon,Table } from '../../base/components/AntdComp';
import { prefixCh } from '../../base/consts/UrlsConfig'
import { tenantListStore } from './tenantStore';
import {tenantSideStore} from './TenantSideStore';
import {tenantAddStore} from './AddTenantStore';
import { formatNullStr } from '../../base/consts/Utils';
export default class TenantSideComp extends Component {

 constructor(props, context) {
        super(props, context);
        this.columns= [
            {
                title: '公司名称',
                dataIndex: 'companyName',
                key: 'companyName',
            },
            {
                title: '法人',
                dataIndex: 'corporation',
                key: 'corporation',
                
            },{
                title: '业务联系人',
                dataIndex: 'contacts',
                key: 'contacts',
            },
            {
                title: '联系人电话',
                dataIndex: 'contactsPhone',
                key: 'contactsPhone',
            }];
    }


    SidebarVisiable= (val) => {
       if(tenantSideStore.sidebar_loding){
            return
        }
        tenantListStore.sidebar_visiable=val;
    }

    ChangeStatus= (id,status) => {
      tenantSideStore.fetchTenantStatus({id,status}).then(json=>{
          if(json.status===2000){
            tenantSideStore.fetchTenantDetail({id})
            tenantListStore.fetchTableList({status:"0",page:1,pageSize:15});
          }
          
      })
    }
   editTenant= (id) => {
      tenantListStore.editVisible=true;
      tenantAddStore.fetchTenantDetail({id});
    }

    render() {
       let {sidebar_loding}=tenantListStore;
        let {detail}=tenantSideStore;
        return (
            sidebar_loding?null:
            <div className="sidebar-con">
               <div className="side-box">
                    <Row className="side-title">
                        <Col span={6}><b>租户详情</b></Col>
                        <Col span={9}></Col>
                        <Col span={9} className="side-button">
                            {detail.status=="1"?
                            <Button type="primary" onClick={()=>this.editTenant(detail.id)} style={{backgroundColor:'#4c80cf',width:70,height:28}}><i className="c2mfont c2m-bianji1" style={{fontSize:14,marginRight:4}}></i>编辑</Button>
                                :null}
                                <Popconfirm placement="bottomRight" title={
                                        <div>
                                            <h5>确认要{detail.status == "1"?'停用':'启用'}该租户吗？</h5>
                                            {detail.status == "1"?
                                            <p>停用后，该租户下所有企业将变更为停用状态。请慎重操作</p>:
                                            <p>启用后，不影响当前租户下的公司状态，如需要变更公司状态，<br/>请启用该租户后，到入驻企业管理页面中进行启用操作</p>}
                                        </div>
                                    }
                                    onConfirm={() => this.ChangeStatus(detail.id,detail.status==1?2:1)} okText="是" cancelText="否">

                                    <Button type="primary" style={{backgroundColor:'#4c80cf',width:70,height:28,margin:'0 12px 0 10px'}}><i className={detail.status != 1 ?"c2mfont c2m-qiyongcopy":"c2mfont c2m-jinyong2"} style={{fontSize:14,marginRight:4}}></i>{detail.status == "1"?'停用':'启用'}</Button>

                                </Popconfirm>

                            <div className="x-icon" onClick={()=>this.SidebarVisiable(false)}><a ><Icon type="close" /></a></div>
                        </Col>
                    </Row>
                </div>
                <Row className="company-margin">
                    <Col span={24}></Col>
                </Row>
                <Row style={{margin:'20px 0 21px 16px',fontSize:14,color:"#4a4a4a",fontWeight:"bold"}}>
                    <Col span={24}>
                            <div>{detail.tenantName}</div>
                    </Col>
                </Row>

                <Row className="company-list tenantbase-list">
                    <Col span={24}>
                        <ul>
                            <li>
                                <span>租户简称:</span>
                                <b>{formatNullStr(detail.tenantAbbr)}</b>
                            </li>
                            <li>
                                <span>租户简介:</span>
                                <b>{formatNullStr(detail.tenantDesc)}</b>
                            </li>
                            <li>
                                <span>业务联系人:</span>
                                <b>{formatNullStr(detail.contacts)}</b>
                            </li>
                            <li>
                                <span>业务联系人手机:</span>
                                <b>{formatNullStr(detail.contactsPhone)}</b>
                            </li>
                            <li>
                                <span>创建人:</span>
                                <b>{formatNullStr(detail.createByName)}</b>
                            </li>
                            <li>
                                <span>入驻时间:</span>
                                <b>{formatNullStr(detail.enterDate)}</b>
                            </li>
                           
                        </ul>
                    </Col>
                </Row>
                <div style={{margin:'22px 0 17px 16px' ,color:"#4a4a4a"}}>旗下公司列表</div>

                <div style={{margin:'0 16px'}}>
                    <Table dataSource={detail.list.slice() || null} columns={this.columns}
                        rowKey={"id"}
                        pagination={{
                            total: detail.list ? detail.list.length : 0,
                            showTotal: (total) => `总共 ${total} 条记录`,
                            pageSizeOptions: ['10', '15', '20', '50'],
                            showSizeChanger: true,
                        }}
                    />
                </div>
               
            
            
            </div>
        )
    }
}