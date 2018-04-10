import { Table, Button, Select, Input, Popconfirm, message,Spin } from 'antd';
import React, { Component } from 'react';
import SearchBarComp from '../../base/mobxComps/SearchBarComp';
import Sidebar from '../../base/components/SidebarWrapComp';
import { tenantListStore } from './tenantStore';
import {tenantSideStore} from './TenantSideStore';
import SearchComp from '../../base/components/SearchComp';
import AddTenantComp from './AddTenantComp';
import TenantSideComp from './TenantSideComp';
import EditTenantComp from './EditTenantComp';

let { observable, action, computed, runInAction, toJS } = mobx;
let { observer } = mobxReact;

@observer
export default class TenantComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.searchPm = {status:"0",page:1,pageSize:15};
        this.columns = [
            {
                title: '租户名称',
                dataIndex: 'tenantName',
                key: 'tenantName',
                render:(text,record)=> <a onClick={()=>this.onSideShow(record.id)}>{text}</a>
                
            },
            {
                title: '业务联系人',
                dataIndex: 'contacts',
                key: 'contacts',
                
            },
            {
                title: '业务联系人电话',
                dataIndex: 'contactsPhone',
                key: 'contactsPhone',
            },
            {
                title: '入驻时间',
                dataIndex: 'enterDate',
                key: 'enterDate',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render:(text,record,index)=>window.ENUM.getEnum("tenantStatus", text+""),
            } ];
            
    }
    componentDidMount() {
        tenantListStore.fetchTableList(this.searchPm);
    }

    onChange = (val) => {
        this.searchPm = { ...this.searchPm, status:val, page: 1 };
    }



    onSideShow= (id) => {
       tenantListStore.sidebar_visiable=true;
       tenantSideStore.fetchTenantDetail({id});
    }
   SidebarVisiable= (val) => {
       if(tenantSideStore.sidebar_loding){
            return
        }
        tenantListStore.sidebar_visiable=val;
    }
    onAdd = () => {
        tenantListStore.addVisible=true;
    }
    SearchVal=(e)=>{
        this.searchPm = { ...this.searchPm, tenantName: e.target.value, page: 1 };
       
    }

    OnSearch=()=>{
        tenantListStore.fetchTableList(this.searchPm); 
    }
    onPressEnter=(e)=>{
        tenantListStore.fetchTableList(this.searchPm);
    }
    render() {
         
        return (
            <div>
                <div style={{padding:'20px 0'}}>
                    <Select   style={{ width: 200,height:32,verticalAlign:'top'}} defaultValue="0" onChange={this.onChange}>
                        {
                            window.ENUM.getEnum("tenant").map(tenant => {
                                return <Select.Option value={tenant.catCode} key={tenant.catCode}>{tenant.catName}</Select.Option>
                            })
                        }
                    </Select>
                    <Input style={{width:200,height:30,margin:'0 10px 0 20px'}} placeholder = "输入租户名称搜索" onChange={this.SearchVal} onPressEnter={this.onPressEnter}/>
                       
                    <Button type="primary" onClick={this.OnSearch} style={{background:'#4c80cf',width:73,height:30}}><i className="c2mfont c2m-search1" style={{fontSize:12,margin:'0 4px 0 -4px'}}></i>查询</Button>
                    <Button type="primary"style={{float:'right',backgroundColor:'#4c80cf',width:70,height:30}} onClick={this.onAdd}>
                        <span className="c2mfont c2m-jia" style={{paddingRight:7,fontSize:10}}></span>新建
                    </Button>
                </div>
                <Table
                    {...tenantListStore.Props}
                    rowKey='id'
                    columns={this.columns}
                />
                <Sidebar maskClosable={true}
                         side_visible={tenantListStore.sidebar_visiable}
                         onClose={()=>this.SidebarVisiable(false)}
                         loading={tenantSideStore.sidebar_loding}

                >
                    <Spin spinning={tenantSideStore.sidebar_loding}><TenantSideComp /></Spin>
                </Sidebar>
                <AddTenantComp visible={tenantListStore.addVisible}/>
                <EditTenantComp visible={tenantListStore.editVisible}/>
            </div>
        )
    }
}