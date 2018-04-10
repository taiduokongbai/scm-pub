import React, { Component } from "react";
import { Breadcrumb,Select, Input, Button, Table, Popconfirm,message } from '../../base/components/AntdComp.js';
import MTable from '../../base/components/TableComp';
import OperationsComp from '../../base/components/OperationsComp';
import { shouldComponentUpdate } from '../../base/consts/Utils';
const Search = Input.Search;
const Option = Select.Option;

const columns = [
    {
        title: 'addressCode',
        dataIndex: 'addressCode',
        key: 'addressCode',
        hidden: true,
    }, {
        title: '名称',
        dataIndex: 'addressName',
        key: 'addressName',
        // width: 100,
    }, {
        title: '详细地址',
        dataIndex: 'addressDetl',
        key: 'addressDetl',
        // width: 300,
        render: (txt, record, index) => {
            return `${record.countryName}${record.provinceName}${record.cityName}${record.countyName}${record.addressDetl}`
        }
    }, {
        title: '所属组织',
        dataIndex: 'org',
        key: 'org',
        render:  (txt, record, index)=>{ 
            return txt.map(org=>org.deptName).join('，');
        }
    }, {
        title: '注册',
        dataIndex: 'isReg',
        key: 'isReg',
        render: (txt, record, index) => {
             return window.ENUM.getEnum("bool",txt+'')},
    }, {
        title: '经营',
        dataIndex: 'isMag',
        key: 'isMag',
        render: (txt, record, index) => {
             return window.ENUM.getEnum("bool",txt+'')},
    }, {
        title: '收货',
        dataIndex: 'isRep',
        key: 'isRep',
        render: (txt, record, index) => {
             return window.ENUM.getEnum("bool",txt+'')},
    }, {
        title: '发货',
        dataIndex: 'isSog',
        key: 'isSog',
        render: (txt, record, index) => {
             return window.ENUM.getEnum("bool",txt+'')},
    }, {
        title: '开票',
        dataIndex: 'isBil',
        key: 'isBil',
        render: (txt, record, index) => {
             return window.ENUM.getEnum("bool",txt+'')},
    },{
        title:"办公",
        dataIndex:'isOfe',
        key:'isOfe',
        render: (txt, record, index) => {
             return window.ENUM.getEnum("bool",txt+'')},
    },{
        title: '公开',
        dataIndex: 'isVisible',
        key: 'isVisible',
        render: (txt, record, index) => {
             return window.ENUM.getEnum("bool",txt+'')},
    },{
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (txt, record, index) => {
             return window.ENUM.getEnum("addressStatus",txt+'')},
    },{
        title: '更新人',
        dataIndex: 'updateByName',
        key: 'updateByName',
    },{
        title: '更新时间',
        dataIndex: 'updateDate',
        key: 'updateDate',
        render: (txt, record, index) => {
            return txt.split(' ')[0];
    }
    }, {
        dataIndex: 'operation',
        title: '操作',
        width: 120,
        className:'handleCenter'
    }];


class AddressComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[columns.length - 1].render = (txt, record, index) => {
            let opts = [
                {
                    title: '编辑',
                    fun: () => this.onEditAddress(record.addressCode),
                    show: record.status == 0 || record.status == 1,
                    default:'--'
                },
                record.status == 1 ? {
                    title: "禁用",
                    titleText: ['确定要禁用该地址吗？'],
                    show: true,
                    fun: () => this.onDisable(record.addressCode, 2),
                    default:'--'
                } : {
                        title: "启用",
                        titleText: ['确定要启用该地址吗？'],
                        show: true,
                        fun: () => this.onDisable(record.addressCode, 1), default:'--'  
                },
                {
                    title: "删除",
                    titleText: ['确定要删除该地址吗？', '删除后，该地址信息将被清除！'],
                    fun: () => this.onDelete(record.addressCode),
                    show: record.status == 0,
                    default:'--'
                },
            ];
            return <OperationsComp operations={opts} />;
        };
    }
    onEditAddress = (id) => {
        const { addressId, EditAddressVisiable} = this.props;
        if (id != addressId) {
            EditAddressVisiable(id);
        }
    }
     componentDidMount() {
        this.props.tablePaging(1);
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    };
    onDelete = (id) => {
        const { onClear, AddressDel } = this.props;
        AddressDel(id).then(json => {
            if (json.status === 2000) {
                message.success('删除成功');
                onClear();
            };}
        );
    }
    onDisable=(addressCode,status)=>{
        const {onClear,AddressDisable}=this.props;
        AddressDisable(addressCode,status).then(json=>{
            if (json.status === 2000) {
                if (status == 1) {
                    message.success('启用成功')
                } else {
                    message.success('禁用成功')
                }
                onClear();
            }
        })
    }
    onSearch = (val) => {
        let { onSearch, SearchVal } = this.props;
        onSearch(SearchVal)
    }
    render() {
        let { AddAddressVisiable, status, onSearch, SearchVal, tabLoading, tablePaging, onSelect, onChange, dataSource, ...props } = this.props;
        // if (Array.isArray(dataSource)) {
        //     dataSource.forEach((item,index) => {
        //         if (item.isVisible != 1) {
        //             delete dataSource[index]
        //         }
        //     });
        // };
        return (
            <div >
                <div className="address-head">
                    <Select  style={{ width: 120,height:32 }} defaultValue="1" value={status+''}  onSelect={onSelect} className='address-select'>
                    {
                        window.ENUM.getEnum('addressStatus').map(item=>{
                            return <Option value={item.catCode} key={item.catCode}>{item.catName}</Option>
                        })
                    }
                    </Select>  
                    <Input
                        style={{ width: 200 ,height:32}}
                        placeholder= '输入名称/详细地址搜索 '
                        value={SearchVal}
                        onChange={onChange}
                        onPressEnter={this.onSearch}
                    />
                    {/*<Search
                        style={{ width:200 }}
                        placeholder= '输入名称/详细地址搜索 '
                        value={ SearchVal }
                        onChange={ onChange }
                        onSearch={ onSearch }
                    />*/}
                    <Button type="primary" onClick={this.onSearch} style={{ width: '75px', marginLeft: '10px', float:'none',height:'30px',backgroundColor:'#4C80CF'}}><i className='c2mfont c2m-search1' style={{fontSize:'10px',paddingRight:'6px'}}/>查询</Button>
                   {/* <Button type="primary">导出</Button>*/}
                </div>
                <div className="address-body">
                    <MTable
                        {...props}
                        dataSource={dataSource}
                        loading={tabLoading}
                        cols={columns}
                        rowKey={"addressCode"}
                        pageOnChange={tablePaging}
                        pageSizeOptions={['5', '10', '15', '20', '30']}
                    />
                </div>
            </div>
        );
    }
}
export default AddressComp;
