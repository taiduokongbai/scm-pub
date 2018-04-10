import React, { Component } from "react";
import {  Button, Popconfirm, message, Select, Input } from '../../base/components/AntdComp';
import MTable from '../../base/components/TableComp';
import OperationsComp from '../../base/components/OperationsComp';
import TXT from '../languages';

const T = TXT.POSITION;
const Option = Select.Option;
const Search = Input.Search;

const columns = [
{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    hidden: true, 
}, {
    title: '编码',
    dataIndex: 'siteCode',
    key: 'siteCode',
}, {
    title: '名称',
    dataIndex: 'siteName',
    key: 'siteName',
}, {
    title: '经营组织',
    dataIndex: 'orgName',
    key: 'orgName',
}, {
    title: '仓储管理',
    dataIndex: 'isSog',
    key: 'isSog',
    render: (txt, record, index) => {
        return window.ENUM.getEnum("bool",txt+'')},
}, {
    title: '生产制造',
    dataIndex: 'isPrd',
    key: 'isPrd',
    render: (txt, record, index) => {
        return window.ENUM.getEnum("bool",txt+'')},
}, {
    title: '服务网点',
    dataIndex: 'isDot',
    key: 'isDot',
    render: (txt, record, index) => {
        return window.ENUM.getEnum("bool",txt+'')},
}, {
    title: '详细地址',
    dataIndex: 'addressDetl',
    key: 'addressDetl',
    render: (txt, record, index) => {
        return `${record.countryName}${record.provinceName}${record.cityName}${record.countyName}${record.addressDetl}`
    }
}, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (txt, record, index) => {
        return window.ENUM.getEnum("addressStatus",txt+'')},
}, {
    title: '更新人',
    dataIndex: 'updateByName',
    key: 'updateByName',
}, {
    title: '更新时间',
    dataIndex: 'updateDate',
    key: 'updateDate',
    render: (txt, record, index) => {
        return txt && txt.split(' ')[0];
    }
}, 
{    
    dataIndex: 'handle',
    title: '操作',
    width: 120,
    className:'handleCenter'
}];

class SiteComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[columns.length - 1].render = (txt, record, index) => {
            let opts = [
                {
                    title: '编辑',
                    fun: () => this.onEditSite(record.siteCode),
                    show: record.status == 0 || record.status == 1,
                    default:'--'
                },
                record.status == 1 ? {
                    title: "禁用",
                    titleText: ['确定要禁用该站点吗？'],
                    show: true,
                    fun: () => this.onDisable(record.siteCode, 2),
                    default:'--'
                } : {
                        title: "启用",
                        titleText: ['确定要启用该站点吗？'],
                        show: true,
                        fun: () => this.onDisable(record.siteCode, 1),   
                        default:'--'
                },
                {
                    title: "删除",
                    titleText: ['确定要删除该站点吗？', '删除后，该站点信息将被清除！'],
                    fun: () => this.onDelete(record.siteCode),
                    show: record.status == 0,
                    default:'--'
                },
            ];
            return <OperationsComp operations={opts} />;
        };
    }

    onDisable = (siteCode, status) => {
        let {onClear, SiteDisable} = this.props;
        SiteDisable(siteCode, status).then(json => {
            if (json.status === 2000) {
                if (status == 1) {
                    message.success('启用成功');
                } else {
                     message.success('禁用成功');
                }
                
                onClear();
            }
        })
    }

    onEditSite = (id) => {
        const { siteId, EditSiteVisiable} = this.props;
        if (id != siteId) {
            EditSiteVisiable(id);
        }
    }
    onDelete = (id) => {
        let { onClear, SiteDel } = this.props;
        SiteDel(id).then(json => {
            if (json.status === 2000) {
                message.success("删除成功");
                onClear();
            } else if (json.status === 4355) {
                    // message.warn(T.DELFAIL);
                }
            }
        );
    }    
    onAddSite = () => {
        let {AddressCodeRule, AddSiteVisiable} = this.props;
        AddressCodeRule().then(json => {
            if (json.status === 2000) {
                AddSiteVisiable()
            }
        })
    }
    onSearch = (val) => {
        let { onSearch, SearchVal } = this.props;
        onSearch(SearchVal)
    }
    render() {
        let { AddSiteVisiable, onSearch, SearchVal, status, tabLoading, tablePaging, onSelect, onChange,...props } = this.props;
        status = status + '';
        return (
            <div>
                <div className="site-head">
                    <Select defaultValue='1' value={status} style={{ width: 120 }} onSelect={onSelect} className='site-select'>
                    {
                        window.ENUM.getEnum("addressStatus").map(item => {
                             return <Option value={item.catCode} key={item.catCode}>{item.catName}</Option>
                         })
                    }    
                    </Select>
                    <Input
                        style={{ width: 200 ,height:32}}
                        placeholder= '输入名称/编码搜索 '
                        value={SearchVal}
                        onChange={onChange}
                        onPressEnter={this.onSearch}
                    />
                    {/* <Search
                        style={{ width:200 }}
                        placeholder= '输入名称/编码搜索 '
                        value={ SearchVal }
                        onChange={ onChange }
                        onSearch={ onSearch }
                   />*/}
                    <Button type="primary" onClick={this.onSearch} className="search-site-btn" style={{ width: '75px', marginLeft: '10px',height:'30px',backgroundColor:'#4C80CF' }}><i className='c2mfont c2m-search1' style={{fontSize:'10px',paddingRight:'6px'}}/>查询</Button>
                    <div className="site-btns">
                    <Button type="primary" onClick={this.onAddSite} className="create-site-btn"><i className="c2mfont c2m-jia" style={{fontSize:12,margin:'0 4px 0 -4px'}}></i>新建</Button>
                    {/*<Button type="primary">导出</Button>*/}
                    </div>
                </div>
                <div className="site-body">
                    <MTable
                        {...props}
                        loading={tabLoading}
                        cols={columns}
                        rowKey={"id"}
                        pageOnChange={tablePaging}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.tablePaging(1);
    }
}

export default SiteComp;
