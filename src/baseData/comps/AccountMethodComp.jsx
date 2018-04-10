import React, {Component, PropTypes} from 'react'
import {Table, Popconfirm} from '../../base/components/AntdComp';
import {accountmethodStore} from '../stores/AccountmethodStore';
import {Select, Input, Button} from '../../base/components/AntdComp';
import AddAccountMethodComp from '../dialogComp/AddAccountMethodComp';
import EditAccountMethodComp from '../dialogComp/EditAccountMethodComp';

const Option = Select.Option;
let {observer} = mobxReact;

@observer
class AccountMethodComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: "编码",
                dataIndex: "settleCode",
                key: "settleCode"
            }, {
                title: "名称",
                dataIndex: "settleName",
                key: "settleName"
            }, {
                title: "备注",
                dataIndex: "settleDesc",
                key: "settleDesc",
                render: (txt)=>{if(txt===""||txt===null) return '--'; else return txt}
            }, {
                title: "状态",
                dataIndex: "status",
                key: "status",
                render: (txt) => window.ENUM.getEnum("status", txt + '')
            }, {
                title: "类别",
                dataIndex: "type",
                key: "type",
                render: (txt) => window.ENUM.getEnum("baseDataType", txt + '')
            }, {
                title: "更新人",
                dataIndex: "updateByName",
                key: "updateByName"
            }, {
                title: "更新时间",
                dataIndex: "updateDate",
                key: "updateDate"
            }, {
                title: "操作",
                width: 94,
                fixed: 'right',
                className: 'operate',
                render: (text, record, index) => {
                    if (record.type == 2) {
                        return this.renderTableButton(text, record, index)
                    }
                    else {
                        return this.renderNotOperate()
                    }
                }
            }
        ];
    }

    renderNotOperate = () => {
        return (
            <span>
                <span className="three-line"><span className="one-line">--</span><span
                    className="one-line">--</span><span className="one-line">--</span></span>
            </span>
        )
    }
    renderTableButton = (text, record, index) => {
        return (
            <span>
                <a onClick={(e) => this.handleEdit(e, record, index)} title="编辑">
                    <i className="c2mfont c2m-bianji columns-distribute"></i>
                </a>
                   <span className="ant-divider" style={{width: 0}}/>
                {
                    this.renderStatusByDisable(record)
                }
                <span className="ant-divider" style={{width: 0}}/>
                {record.status == 0 ?
                    <Popconfirm title="确定删除吗?" onConfirm={(e) => this.handleDelete(e, record, index)} okText="确定"
                                cancelText="取消">
                        <a href="#" title="删除"><i className="c2mfont c2m-shanchu columns-distribute"></i></a>
                    </Popconfirm> : <span className="double-line">--</span>}
            </span>)
    }
    renderStatusByDisable = (record) => {
        switch (record.status) {
            case 0:
                return (
                    <Popconfirm title="确定启用吗?" onConfirm={() => this.handlerIsDisable(record.id, 1)} okText="确定"
                                cancelText="取消">
                        <a href="#" title="启用">
                            <i className="c2mfont c2m-qiyong columns-distribute"></i>
                        </a>
                    </Popconfirm>
                );
            case 1:
                return (
                    <Popconfirm title="确定禁用吗?" onConfirm={() => this.handlerIsDisable(record.id, 2)} okText="确定"
                                cancelText="取消">
                        <a href="#" title="禁用">
                            <i className="c2mfont c2m-jinyong columns-distribute"></i>
                        </a>
                    </Popconfirm>
                );
            case 2:
                return (
                    <Popconfirm title="确定启用吗?" onConfirm={() => this.handlerIsDisable(record.id, 1)} okText="确定"
                                cancelText="取消">
                        <a href="#" title="启用">
                            <i className="c2mfont c2m-qiyong columns-distribute"></i>
                        </a>
                    </Popconfirm>
                );
        }
    }
    handleDelete = (e, record, index) => {
        accountmethodStore.deleteSettleItem({id: record.id})
    }
    handleEdit = (e, record, index) => {
        accountmethodStore.getDetail({id: record.id})
    }
    handlerIsDisable = (id, status) => {
        accountmethodStore.isDisableSettleItem({id: id, status: status})
    }
    onChange = (value) => {
        accountmethodStore.setSearchKey(value)
        accountmethodStore.setInput(value)
    };
    handleStatusChange = (value) => {
        accountmethodStore.setSearchVal(value)
    };
    handleInputChange = (event) => {
        accountmethodStore.setSearchVal(event.target.value)
    };
    query = () => {
        accountmethodStore.fetchTableList();
    }
    add = () => {
        accountmethodStore.showModal();
    }

    componentDidMount() {
        accountmethodStore.fetchTableList();
    }

    componentWillUnmount() {
        accountmethodStore.resetMobx();
    }

    render() {
        return (
            <div className="baseData-content">
                <div className='search-content'>
                    <Select style={{width: 180, height: 30}} onChange={this.onChange} defaultValue="settleCode">
                        <Option value="settleCode">编码</Option>
                        <Option value="settleName">名称</Option>
                        <Option value="status">状态</Option>
                    </Select>
                    {accountmethodStore.isInput ?
                        <Input onPressEnter={this.query} placeholder="请输入关键字查询" style={{width: 180, marginLeft: 20}}
                               value={accountmethodStore.searchVal} onChange={this.handleInputChange}/> :
                        <Select style={{width: 180, height: 30, marginLeft: 20}} onChange={this.handleStatusChange}
                                defaultValue="-1">
                            <Option value="-1">全部</Option>
                            <Option value="0">已保存</Option>
                            <Option value="1">已启用</Option>
                            <Option value="2">已禁用</Option>
                        </Select>}
                    <Button className="default-btn" style={{marginLeft: 20}} onClick={this.query}><i
                        className="c2mfont c2m-search1"
                        style={{paddingRight: 7, fontSize: 10}}></i><span>查询</span></Button>
                    <Button className="default-btn add-btn" onClick={this.add}><i
                        className="c2mfont c2m-jia"
                        style={{paddingRight: 7, fontSize: 10}}></i><span>新建</span></Button>
                </div>
                <Table
                    {...accountmethodStore.Props}
                    rowKey='settleCode'
                    columns={this.columns}
                />
                {accountmethodStore.visible ? <AddAccountMethodComp/> : null}
                {accountmethodStore.editVisible ? <EditAccountMethodComp/> : null}
            </div>
        )
    }
}

export default AccountMethodComp;