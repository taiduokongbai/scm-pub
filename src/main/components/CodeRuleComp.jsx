import React from 'react';
import { Table, Button, Input, Tabs, Breadcrumb, Spin, Popconfirm } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import MTable from '../../base/components/TableComp';
import SearchBarComp from '../../base/components/SearchBarComp';
import OperationsComp from '../../base/components/OperationsComp';

const { TabPane } = Tabs;
let codeIndex = 'manageIndex';

const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    hidden: true,
},{
    title: '业务对象索引',
    dataIndex: 'businessIndex',
    key: 'businessIndex',
    hidden: true,
},{
    title: '业务对象',
    dataIndex: 'businessObject',
    key: 'businessObject',
}, {
    title: '编码规则',
    dataIndex: 'ruleType',
    key: 'ruleType',
    render: (txt) => txt == 0 ? "自动生成" : "手动生成"
},{
    title: '编码规则描述',
    dataIndex: 'ruleTypeDesc',
    key: 'ruleTypeDesc',
}, {
    title: '样式预览',
    dataIndex: 'preview',
    key: 'preview',
}, {
    title: '状态',
    dataIndex: 'businessStatus',
    key: 'businessStatus',
    width:69,
    render: (txt) => window.ENUM.getEnum("codeRuleStatus", txt + '')
}, {
    title: '更新人',
    dataIndex: 'updateByName',
    key: 'updateByName',
    width: 62,
}, {
    title: '更新时间',
    dataIndex: 'updateDate',
    key: 'updateDate',
    width: 132,
},{
    title: '操作',
    dataIndex: 'handle',
    width: 106,
    className: 'handleCenter'
}];
class CodeRule extends React.Component { 
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeKey: '1'
        };
        columns[columns.length - 1].render = (txt, record, index) => {
            let opts = [
                {
                    title: '编辑',
                    titleText: [],
                    icon: '',
                    fun: () => this.editCodeRule(record.id),
                    show: record.businessStatus == 0,
                    default:'--'
                },
                {
                    title: "删除",
                    titleText: ['确认删除该数据吗？', '删除后，该条数据将不可恢复！'],
                    icon: '',
                    show: record.businessStatus == 0,
                    fun: () => this.delCodeRule(record.id),
                    default: '--'
                },
                record.businessStatus == 1 ?
                    {
                        title: "禁用",
                        titleText: ['确定要禁用该数据吗？'],
                        show: true,
                        fun: () => this.isDisableCodeRule(record.id, 2, record.businessIndex),
                    }
                    :
                    {
                        title: "启用",
                        titleText: ['确定要启用该数据吗？'],
                        show: true,
                        fun: () => this.isDisableCodeRule(record.id, 1, record.businessIndex),
                    },
               
            ];
            return <OperationsComp operations={opts} />;
        }
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
                    initialValue:'null',
                    data: {
                        list: window.ENUM.getEnum("codeRuleStatus"),
                        keyName: "catCode",
                        labelName: "catName",
                        style: { width: 200 }
                    }
                },
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
                    Func: () => this.props.OpenModule('add',codeIndex),
                    style: {}
                }
            ]
        }
    }

    componentDidMount() {
        Promise.resolve(this.props.setActiveKey(this.state.activeKey)).then(() => {
            this.props.tablePaging();
        })
    }    

    editCodeRule = (id) => { 
        this.props.OpenModule('edit', codeIndex);
        this.props.editCodeRule(id);
    }

    delCodeRule = (id) => { 
        this.props.delCodeRule(id).then(json => {
            this.props.tablePaging();
        });
    }

    isDisableCodeRule = (id, businessStatus, businessIndex) => { 
        this.props.isDisable(id, businessStatus, businessIndex).then(json => {
            this.props.tablePaging();
        });
    }

    onChange = (activeKey) => {
        let arr = ['manageIndex', 'mainDataIndex', 'businessIndex'];
        this.setState({
            activeKey
        });
        codeIndex = arr[activeKey - 1];
        Promise.resolve(this.props.setActiveKey(activeKey)).then(() => {
            this.props.tablePaging();
        })
        
    }

    render() {
        let { tabLoading, dataSource, onSearch, tablePaging } = this.props;
        return (
            <Tabs className="supplierTabs" type="card" onChange={this.onChange} activeKey={this.state.activeKey}>
                <TabPane tab={<i className='c2mfont c2m-qita' > 管理类</i>} key="1">
                    <SearchBarComp
                        {...this.props}
                        onSearch={onSearch}
                        searchData={this.searchData}
                    />
                    <div className="supplier-body" >
                        <MTable
                            {...this.props}
                            dataSource={dataSource}
                            loading={tabLoading}
                            pageOnChange={tablePaging}
                            cols={columns}
                            rowKey={"id"}
                            />
                    </div>
                </TabPane>
                <TabPane tab={<i className='c2mfont c2m-zhushuju1' > 主数据</i>} key="2">
                    <SearchBarComp
                        {...this.props}
                        onSearch={onSearch}
                        searchData={this.searchData}
                    />
                    <div className="supplier-body">
                        <MTable
                            {...this.props}
                            dataSource={dataSource}
                            loading={tabLoading}
                            pageOnChange={tablePaging}
                            cols={columns}
                            rowKey={"id"}
                        />
                    </div>
                </TabPane>
                <TabPane tab={<i className='c2mfont c2m-yewudanju1' > 业务单据</i>} key="3">
                    <SearchBarComp
                        {...this.props}
                        onSearch={onSearch}
                        searchData={this.searchData}
                    />
                    <div className="supplier-body">
                        <MTable
                            {...this.props}
                            dataSource={dataSource}
                            loading={tabLoading}
                            pageOnChange={tablePaging}
                            cols={columns}
                            rowKey={"id"}
                        />
                    </div>
                </TabPane>
            </Tabs>
        )
    }
}

export default CodeRule;