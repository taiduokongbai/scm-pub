import React, {Component, PropTypes} from 'react'
import {Table, Popconfirm} from '../../base/components/AntdComp';
import {valuationStore} from '../stores/ValuationStore';
import {Select, Input, Button} from '../../base/components/AntdComp';
import AddValuationComp from '../dialogComp/AddValuationComp';
import EditValuationComp from '../dialogComp/EditValuationComp';

const Option = Select.Option;
let {observer} = mobxReact;

@observer
class ValuationComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: "编码",
                dataIndex: "priceCode",
                key: "priceCode"
            }, {
                title: "名称",
                dataIndex: "priceName",
                key: "priceName"
            }, {
                title: "备注",
                dataIndex: "priceDesc",
                key: "priceDesc",
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
            }
        ];
    }

    handleDelete = (e, record, index) => {
        valuationStore.deletePriceItem({id: record.id})
    }
    handleEdit = (e, record, index) => {
        valuationStore.getDetail({id: record.id})
    }
    handlerIsDisable = (id, status) => {
        valuationStore.isDisablePriceItem({id: id, status: status})
    }
    onChange = (value) => {
        valuationStore.setSearchKey(value)
        valuationStore.setInput(value)
    };
    handleStatusChange = (value) => {
        valuationStore.setSearchVal(value)
    };
    handleInputChange = (event) => {
        valuationStore.setSearchVal(event.target.value)
    };
    query = () => {
        valuationStore.fetchTableList();
    }


    componentDidMount() {
        valuationStore.fetchTableList();
    }

    componentWillUnmount() {
        valuationStore.resetMobx();
    }

    render() {
        return (
            <div className="baseData-content">
                <div className='search-content'>
                    <Select style={{width: 180, height: 30}} onChange={this.onChange} defaultValue="catCode">
                        <Option value="catCode">编码</Option>
                        <Option value="catName">名称</Option>
                        <Option value="status">状态</Option>
                    </Select>
                    {valuationStore.isInput ?
                        <Input onPressEnter={this.query} placeholder="请输入关键字查询" style={{width: 180, marginLeft: 20}}
                               value={valuationStore.searchVal} onChange={this.handleInputChange}/> :
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

                </div>
                <Table
                    {...valuationStore.Props}
                    rowKey='priceCode'
                    columns={this.columns}
                />
                {valuationStore.visible ? <AddValuationComp/> : null}
                {valuationStore.editVisible ? <EditValuationComp/> : null}
            </div>
        )
    }
}

export default ValuationComp;