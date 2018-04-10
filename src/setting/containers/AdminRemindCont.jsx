import React, { Component } from "react";
import { connect } from 'react-redux'
import actions from '../actions/AdminRemindAct'
import { fromJS, Record } from 'immutable';
import { Breadcrumb } from '../../base/components/AntdComp';;
import { Tabs, Row, Col, Spin } from '../../base/components/AntdComp';
import AdminUnreadComp from '../components/AdminUnreadComp';
import AdminReadComp from '../components/AdminReadComp';
import {prefixCh} from '../../base/consts/UrlsConfig'
const TabPane = Tabs.TabPane;

class AdminRemindCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    callback = (key) => {      
        this.props.callback(key);
    }
    render() {
        return (
            <div className="inner-content">
                <div className="ew-breadcrumb">
                    <div className="breadcrum-inner">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>管理员提醒</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="inner-content-page">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="未读提醒" key="1" >
                            <AdminUnreadComp {...this.props} initData={this.initData} />
                        </TabPane>
                        <TabPane tab="已读提醒" key="2">
                            <AdminReadComp {...this.props} initData={this.initData} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state.AdminRemindRedu.toJS()
};

const mapDispatchToProps = (dispatch) => ({
    getunreadAdminList: (msgStatus, page, pageSize) => dispatch(actions.getunreadAdminList({ msgStatus, page, pageSize })),
    getreadAdminList: (msgStatus, page, pageSize) => dispatch(actions.getreadAdminList({ msgStatus, page, pageSize })),
    getNewsStatus: (id) => dispatch(actions.getNewsStatus({ id })),
    setScrollUnreadAdmin: (scrollF) => dispatch(actions.setScrollUnreadAdmin({ scrollF })),
    setScrollReadAdmin: (scrollF) => dispatch(actions.setScrollReadAdmin({ scrollF })),
    callback: (key) => dispatch(actions.callback(key)),
    adminUnreadCheckPage:()=>dispatch(actions.adminUnreadCheckPage()),
    adminReadCheckPage:()=>dispatch(actions.adminReadCheckPage()),
})
export default connect(mapStateToProps, mapDispatchToProps)(AdminRemindCont)

