import React, {Component, PropTypes} from 'react'
import {Table, Popconfirm} from '../../base/components/AntdComp';
import {deliverymethodStore} from '../stores/DeliverymethodStore';
import {Select, Input, Button} from '../../base/components/AntdComp';
import AddDeliveryMethodComp from '../dialogComp/AddDeliveryMethodComp';
import EditDeliveryMethodComp from '../dialogComp/EditDeliveryMethodComp';

const Option = Select.Option;
let {observer} = mobxReact;

@observer
class DeliveryMethodComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: "编码",
                dataIndex: "dispatchCode",
                key: "dispatchCode"
            }, {
                title: "名称",
                dataIndex: "dispatchName",
                key: "dispatchName"
            }, {
                title: "备注",
                dataIndex: "dispatchDesc",
                key: "dispatchDesc",
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
        deliverymethodStore.deleteDispatchItem({id: record.id})
    }
    handleEdit = (e, record, index) => {
        deliverymethodStore.getDetail({id: record.id})
    }
    handlerIsDisable = (id, status) => {
        deliverymethodStore.isDisableDispatchItem({id: id, status: status})
    }
    onChange = (value) => {
        deliverymethodStore.setSearchKey(value)
        deliverymethodStore.setInput(value)
    };
    handleStatusChange = (value) => {
        deliverymethodStore.setSearchVal(value)
    };
    handleInputChange = (event) => {
        deliverymethodStore.setSearchVal(event.target.value)
    };
    query = () => {
        deliverymethodStore.fetchTableList();
    }
    add = () => {
        deliverymethodStore.showModal();
    }

    componentDidMount() {
        deliverymethodStore.fetchTableList();
    }

    componentWillUnmount() {
        deliverymethodStore.resetMobx();
    }

    edit = (code) => {
        deliverymethodStore.showModal();
    }

    render() {
        return (
            <div className="baseData-content">
                <div className='search-content'>
                    <Select style={{width: 180, height: 30}} onChange={this.onChange} defaultValue="dispatchCode">
                        <Option value="dispatchCode">编码</Option>
                        <Option value="dispatchName">名称</Option>
                        <Option value="status">状态</Option>
                    </Select>
                    {deliverymethodStore.isInput ?
                        <Input onPressEnter={this.query} placeholder="请输入关键字查询" style={{width: 180, marginLeft: 20}}
                               value={deliverymethodStore.searchVal} onChange={this.handleInputChange}/> :
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
                    {...deliverymethodStore.Props}
                    rowKey='dispatchCode'
                    columns={this.columns}
                />
                {deliverymethodStore.visible ? <AddDeliveryMethodComp/> : null}
                {deliverymethodStore.editVisible ? <EditDeliveryMethodComp/> : null}
            </div>
        )
    }
}

export default DeliveryMethodComp;