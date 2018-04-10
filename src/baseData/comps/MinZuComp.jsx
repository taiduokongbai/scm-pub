import React, {Component, PropTypes} from 'react'
import {Table} from '../../base/components/AntdComp';
import {minzuStore} from '../stores/MinzuStore';
import { Select,Input,Button } from '../../base/components/AntdComp';
const Option = Select.Option;
let { observable, action, computed, runInAction, createTransformer, toJS, useStrict } = mobx;
let {observer} = mobxReact;

@observer
class MinZuComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: "编码",
                dataIndex: "catCode",
                key: "catCode"
            }, {
                title: "名称",
                dataIndex: "catName",
                key: "catName"
            }, {
                title: "备注",
                dataIndex: "catDesc",
                key: "catDesc",
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
    onChange = (value) => {
        minzuStore.setSearchKey(value)
        minzuStore.setInput(value)
    };
    handleStatusChange = (value) => {
        minzuStore.setSearchVal(value)
    };
    handleInputChange = (event) => {
        minzuStore.setSearchVal(event.target.value)
    };
    query = () => {
        minzuStore.fetchTableList(Object.assign({},{[minzuStore.searchKey]:minzuStore.searchVal},{subCode: "C001"}));
    }

    componentDidMount() {
        minzuStore.fetchTableList({subCode: "C001"});
    }
    componentWillUnmount(){
        minzuStore.resetMobx();
    }
    render() {
        return (
            <div>
                <div className='search-content'>
                    <Select style={{width: 180, height: 30}} onChange={this.onChange} defaultValue="catCode">
                        <Option value="catCode">编码</Option>
                        <Option value="catName">名称</Option>
                        <Option value="status">状态</Option>
                    </Select>
                    {minzuStore.isInput ?
                        <Input onPressEnter={this.query} placeholder="请输入关键字查询" style={{width: 180, marginLeft: 20}}
                               value={minzuStore.searchVal} onChange={this.handleInputChange}/> :
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
                    {...minzuStore.Props}
                    rowKey='catCode'
                    columns={this.columns}
                />
            </div>
        )
    }
}

export default MinZuComp;