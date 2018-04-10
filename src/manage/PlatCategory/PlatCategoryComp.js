import { Table, Button, Select, Checkbox ,Input, Popconfirm, message,Spin } from 'antd';
import React, { Component } from 'react';
import SearchBarComp from '../../base/mobxComps/SearchBarComp';
import Sidebar from '../../base/components/SidebarWrapComp';
import SearchComp from '../../base/components/SearchComp';
import MTable from '../../base/components/TableComp';
import {formatNullStr } from '../../base/consts/Utils';
import AddPlatCategoryComp from "./AddPlatCategoryComp";
import EditPlatCategoryComp from "./EditPlatCategoryComp";
import TooltipComp from '../../base/mobxComps/TooltipComp';
import {platCategoryStore,searchBarStore,getParentListStore} from "./PlatCategoryStore";
import {addPlatCategoryStore} from "./AddPlatCategoryStore";
let { observable, action, computed, runInAction, toJS } = mobx;
let { observer } = mobxReact;

@observer
export default class TenantComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: '类目名称',
                dataIndex: 'categoryName',
                key: 'categoryName',
                render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 200, }}/>,
     
            },
             {
                title: '类目编码',
                dataIndex: 'categoryCode',
                key: 'categoryCode',
                width:200

            },
             {
                title: '层级',
                dataIndex: 'level',
                key: 'level',
                width:150

            },
            {
                title: '描述',
                dataIndex: 'categoryDesc',
                key: 'categoryDesc',
                render: (text, index, record) => <TooltipComp attr={{ text: text, wid: 200, placement: 'top' }} />,
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: 150,
                render: (text, record, index) => window.ENUM.getEnum("codeRuleStatus", text.toString()),
            }, {
                dataIndex: 'handle',
                title: '操作',
                width: 88,
                className:'handle',
                render: (txt, record, index) => 
                    
                    <div style={{textAlign:'center'}} >
                        <span title="编辑" className="operator-color operator" href="javascript:;" onClick={()=>this.onEdit(record.categoryCode)}>
                            <i className="c2mfont c2m-bianji"></i>
                        </span>
                    
                    {
                        record.status == "0" ?
                            <Popconfirm title={
                                <div>
                                    <h5>确定删除该数据吗？</h5>
                                </div>
                            }
                                onConfirm={() => this.onDelete(record.id)}
                            >
                                <span title="删除" className="operator-color operator" href="javascript:;">
                                    <i className="c2mfont c2m-shanchu"></i>
                                </span>
                            </Popconfirm>
                            : <span className="line">{formatNullStr('')}</span>
                    }
                        <Popconfirm title={
                            <div>
                                <h5>确认{record.status==1?'禁用':'启用'}该数据吗？</h5>
                            </div>
                        } onConfirm={() => this.changeStatus(record.id,record.status==0||record.status==2?1:2)} >
                            <span title={record.status==1?'禁用':'启用'} className="operator-color operator" href="javascript:;" style={{marginLeft:10}}>
                                { record.status=="1"?<i className="c2mfont c2m-jinyong"></i>:<i className="c2mfont c2m-qiyong"></i>}
                            </span>
                        </Popconfirm>
                       
                    </div>
                    
                    
                
            }];
            
         this.searchComps = {
            left: {
                select: {
                    style: {},
                    list: [
                        {
                            key: "categoryCode",
                            label: "类目编码",
                            type: "string",
                            defaultValue: ''
                        },
                        {
                            key: "categoryName",
                            label: "类目名称",
                            type: "string",
                            defaultValue: ''
                        }
                    ]
                },
                button: {
                    label: "查询",
                    fn: this.onSearch,
                    className: "",
                    style: {},
                }
            },
            right: [{
                type: "button",
                label: "新建",
                fn: this.onAdd,
                className: "",
                style: {},
            }]
        }
            
    }
changeStatus=(id,status)=>{
    platCategoryStore.fetchTableStatus({id:id,status:status});
}
onAdd=()=>{
    platCategoryStore.addVisible=true;
    getParentListStore.fetchTreeSelectList({status:1})
}
onEdit=(categoryCode)=>{
    platCategoryStore.editVisible=true;
    let editLevel=1;
    addPlatCategoryStore.fetchPlatCategoryDetail({categoryCode:categoryCode},editLevel);
    getParentListStore.fetchTreeSelectList({status:1});
}
onDelete=(id)=>{
   platCategoryStore.fetchTableDelete({id:id}).then(json=>{
       if(json.status===2000){
           message.success('数据删除成功！')
       }else{
           message.error('数据删除失败！')
       }
   })
}
onSearch=()=>{
     platCategoryStore.fetchTableList(platCategoryStore.searchPm);
}
componentDidMount() {
     platCategoryStore.fetchTableList(platCategoryStore.searchPm);
}
// onChange=(page,pageSize)=>{
//     this.searchPm.page=page;
//     platCategoryStore.fetchTableList(this.searchPm);
// }
// onShowSizeChange=(current,pageSize)=>{
//     this.searchPm.pageSize=pageSize;
//     platCategoryStore.fetchTableList(this.searchPm);
// }
deleteNullChildren = (data) => data.map((item, index) => {
    if (item.children && item.children.length < 1) {
        delete item.children;
    }
    if (item.children) this.deleteNullChildren(item.children);
})
checkChange=(e)=>{
    let val= e.target.checked;
    if(val==true){
        platCategoryStore.searchPm.status=3;
        platCategoryStore.fetchTableList(platCategoryStore.searchPm);
    }else{
        delete platCategoryStore.searchPm.status
        platCategoryStore.fetchTableList(platCategoryStore.searchPm);
    }
}
    render() {
         let {dataSource}=platCategoryStore;
         this.deleteNullChildren(dataSource.slice());
        return (
            <div  className="platCategoryComp">
                <SearchBarComp
                    comps={this.searchComps}
                    store={searchBarStore}
                />
                <Checkbox
                   onChange={this.checkChange} 
                   style={{marginBottom:5}}
                   defaultChecked={true}
                /><a style={{color:'#4990e2'}}>隐藏禁用分类</a>
                 <Spin spinning={platCategoryStore.loading}>
                    <Table 
                        dataSource={dataSource.slice() || null} 
                        columns={this.columns}
                        rowKey={"categoryCode"}
                        pagination={false}
                      
                    />
                </Spin>
                <AddPlatCategoryComp visible={platCategoryStore.addVisible}/>
                <EditPlatCategoryComp visible={platCategoryStore.editVisible}/>
                
            </div>
        )
    }
}