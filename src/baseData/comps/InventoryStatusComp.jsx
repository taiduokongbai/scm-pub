import React, {Component, PropTypes} from 'react'
import { Table } from '../../base/components/AntdComp';
import { inventorystatusStore } from '../stores/InventorystatusStore';
import { Select,Input,Button } from '../../base/components/AntdComp';
const Option = Select.Option;
let { observer } = mobxReact;
@observer
class InventoryStatusComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title:"编码",
                dataIndex:"invCode",
                key:"invCode"
            },{
                title:"名称",
                dataIndex:"invName",
                key:"invName"
            },{
                title:"备注",
                dataIndex:"invDesc",
                key:"invDesc",
                render: (txt)=>{if(txt===""||txt===null) return '--'; else return txt}
            },{
                title:"状态",
                dataIndex:"status",
                key:"status",
                render: (txt)=>window.ENUM.getEnum("status", txt+'')
            },{
                title:"类别",
                dataIndex:"type",
                key:"type",
                render: (txt)=>window.ENUM.getEnum("baseDataType", txt+'')
            },{
                title:"更新人",
                dataIndex:"updateByName",
                key:"updateByName"
            },{
                title:"更新时间",
                dataIndex:"updateDate",
                key:"updateDate"
            }
        ];
    }

    onChange = (value) => {
        inventorystatusStore.setSearchKey(value)
        inventorystatusStore.setInput(value)
    };
    handleStatusChange = (value) => {
        inventorystatusStore.setSearchVal(value)
    };
    handleInputChange = (event) => {
        inventorystatusStore.setSearchVal(event.target.value)
    };
    query = () => {
        inventorystatusStore.fetchTableList();
    }

    componentDidMount() {
        inventorystatusStore.fetchTableList();
    }
    componentWillUnmount(){
        inventorystatusStore.resetMobx();
    }
    render() {
        return (
            <div>
                <div className='search-content'>
                    <Select style={{width: 180, height: 30}} onChange={this.onChange} defaultValue="invCode">
                        <Option value="invCode">编码</Option>
                        <Option value="invName">名称</Option>
                        <Option value="status">状态</Option>
                    </Select>
                    {inventorystatusStore.isInput ?
                        <Input onPressEnter={this.query} placeholder="请输入关键字查询" style={{width: 180, marginLeft: 20}}
                               value={inventorystatusStore.searchVal} onChange={this.handleInputChange}/> :
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
                    {...inventorystatusStore.Props}
                    rowKey='invCode'
                    columns={this.columns}
                />
            </div>
        )
    }
}
export default InventoryStatusComp;