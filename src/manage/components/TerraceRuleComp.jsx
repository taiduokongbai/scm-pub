//采购发票
import React, { Component } from "react";
import { Button, Popconfirm, message, Select } from '../../base/components/AntdComp';
import MTable from '../../base/components/TableComp';
import SearchBarComp from '../../base/components/SearchBarComp';
import {formatNullStr } from '../../base/consts/Utils';

const Option = Select.Option;

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        hidden:'true'
    },
    {
        title: '业务对象',
        dataIndex: 'businessObject',
        key: 'businessObject',
    },
     {
        title: 'businessIndex',
        dataIndex: 'businessIndex',
        key: 'businessIndex',
        hidden:'true'
    },
    {
        title: '编码规则描述',
        dataIndex: 'ruleTypeDesc',
        key: 'ruleTypeDesc',
       
    },
    {
        title: '样式预览',
        dataIndex: 'preview',
        key: 'preview',
       
    },
    {
        title: '状态',
        dataIndex: 'businessStatus',
        key: 'businessStatus',
        render: (txt) => window.ENUM.getEnum("codeRuleStatus", txt + ''),
        width:69
       
    }, {
        title: '更新人',
        dataIndex: 'updateByName',
        key: 'updateByName',
        width:62
    }, {
        title: '更新时间',
        dataIndex: 'updateDate',
        key: 'updateDate',
        width:132
    }, {
        dataIndex: 'handle',
        title: '操作',
        width:106
    }];


class TerraceRuleComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[columns.length - 1].render = (txt, record, index) =>
            <div>
                {record.businessStatus == 0 ?
                    <span title="编辑" className="operator-color operator" href="javascript:;" onClick={() => this.handleEdit(record.id)}>
                        <i className="c2mfont c2m-bianji"></i>
                    </span>
                    :<span className="line">{formatNullStr('')}</span>
                }
               
                {
                    record.businessStatus == 0 ?
                        <Popconfirm title={
                            <div>
                                <h5>确认删除该数据吗？</h5>
                            </div>
                        } onConfirm={() => this.handleDelete(record.id)} >
                            <span title="删除" className="operator-color operator" href="javascript:;">
                                <i className="c2mfont c2m-shanchu"></i>
                            </span>
                        </Popconfirm>
                        : <span className="line">{formatNullStr('')}</span>
                }

                <Popconfirm title={
                    <div>
                        <h5>确认{record.businessStatus==1?'禁用':'启用'}该数据吗？</h5>
                    </div>
                } onConfirm={() => this.handleStatus(record.businessIndex,record.id,record.businessStatus==0||record.businessStatus==2?1:2)} >
                    <span title={record.businessStatus==1?'禁用':'启用'} className="operator-color operator" href="javascript:;" style={{marginLeft:10}}>
                        { record.businessStatus=="1"?<i className="c2mfont  c2m-jinyong"></i>:<i className="c2mfont c2m-qiyong"></i>}
                    </span>
                </Popconfirm>
                

                    
            </div>
        this.searchData = {
            left: [
                {
                    key: "businessObject",
                    val: "业务对象",
                    type: "string"
                },
                {
                    key: "businessStatus",
                    val: "状态",
                    type: "select",
                    data: {
                        list: window.ENUM.getEnum("codeRuleStatus"),
                        keyName: "catCode",
                        labelName: "catName",
                    }
                }
            ],
            center: [
                {
                    title: "查询",
                    Func: null,
                    style: {},
                    type: "button"
                }
            ],
            right: [
                {
                    title: "新建",
                    Func: this.handleAdd,
                    style: {}
                }
            ]
        }
    }


    handleShow = (orderCode) => {
      
    };
    handleAdd = () => {
        let { OpenAddTerraceRule } = this.props;
        OpenAddTerraceRule();
       
        
    }

    handleEdit = (id) => {
        let { OpenEditTerraceRule ,TerraceRuleDetail} = this.props;
        OpenEditTerraceRule();
        TerraceRuleDetail({id:id});
        //PurchaseInvoiceDetail(orderCode);
       
    }

    handleDelete = (id) => {
        this.props.TerraceRuleDelete({id:id});
    }

    handleStatus= (index,id,businessStatus) => {
        this.props.TerraceRuleStatus({businessIndex:index,id:id,businessStatus:businessStatus});
    }

    render() {
        let { list, onSearch, tablePaging, list_loading} = this.props;
        return (
            <div>
                <SearchBarComp
                    onSearch={onSearch}
                    searchData={this.searchData}
                />
                <div style={{marginRight:10}}>
                    <MTable
                        {...list}
                        cols={columns}
                        rowKey={"id"}
                        pageOnChange={tablePaging}
                        loading={list_loading}
                    />
                </div>
            </div>

        )
    }

    componentDidMount() {
        this.props.tablePaging(1);
    }
}

export default TerraceRuleComp;
