import React from 'react';
import { Button } from "../../base/components/AntdComp";
import MTable from "../../base/components/TableComp";

class AuthorityComp extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: "权限角色",
            key: "roleName",
            dataIndex: "roleName",
            width: 300,
            render:(txt, record, index)=>{
                return <a>{txt}</a>
            }
        }, {
            title: "描述",
            key: "description",
            dataIndex: "description",
            width: 300,
        }, {
            title: "授权人数",
            key: "resourceNumber",
            dataIndex: "resourceNumber",
            width: 300,
        }, {
            title: "授权人",
            key: "empNames",
            dataIndex: "empNames",
            width: 300,
            render: (txt, record, index) => {
                return <div style={{width: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',}}>{txt?txt.join(','):''}</div>
            },
        }];
    }
    componentDidMount() {
        this.props.refreshAuthority({ page: 1, pageSize: 15 });
        this.props.getAuthorityTree();
        this.props.getMenberTree();
    }
    showSidebar = (record, index) => {
        this.props.getAuthorityDetail(record.roleCode);
        this.props.setSideVisible(true);
    }
    showAddDialog = () => {
        this.props.setAddVisible(true);
    }
    render() {
        return (
            <div className="authority-content">
                <div className="authority-operation-bar">
                    <div>共有{this.props.authPaging.total}个用户权限</div>
                    <Button onClick={this.showAddDialog} className="default-btn" ><i className="c2mfont c2m-jia" style={{paddingRight:7,fontSize:10}}></i><span>新建角色</span></Button>
                </div>
                <div>
                    <MTable
                        onRowClick={this.showSidebar}
                        dataSource={this.props.authData}
                        cols={this.columns}
                        rowKey="roleCode"
                        loading={this.props.table_loading}
                        paging={this.props.authPaging}
                        pageOnChange={this.props.refreshAuthority}

                    />
                </div>
            </div>
        )
    }
}
export default AuthorityComp;