import React, { Component } from "react";
import { connect } from 'react-redux'
import actions from '../actions/StaffRemindAct'
import { Breadcrumb } from '../../base/components/AntdComp';
import { Tabs, Row, Col, Spin } from '../../base/components/AntdComp';
import StaffUnreadComp from '../components/StaffUnreadComp';
import StaffReadComp from '../components/StaffReadComp';
import {prefixCh} from '../../base/consts/UrlsConfig'
const TabPane = Tabs.TabPane;

class StaffRemindCont extends Component {
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
                            <Breadcrumb.Item><a href={`${prefixCh}main.html`}>首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item>员工提醒</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="inner-content-page">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="未读提醒" key="1" >
                            <StaffUnreadComp {...this.props} initData={this.initData} />
                        </TabPane>
                        <TabPane tab="已读提醒" key="2">
                            <StaffReadComp {...this.props} initData={this.initData} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state.StaffRemindRedu.toJS()
};

const mapDispatchToProps = (dispatch) => ({
    getunreadStaffList: (msgStatus, page, pageSize) => dispatch(actions.getunreadStaffList({ msgStatus, page, pageSize })),
    getreadStaffList: (msgStatus, page, pageSize) => dispatch(actions.getreadStaffList({ msgStatus, page, pageSize })),
    getNewsStatus: (id, index) => dispatch(actions.getNewsStatus({id, index})),
    setScrollUnreadStaff: (scrollF) => dispatch(actions.setScrollUnreadStaff({ scrollF })),
    setScrollReadStaff: (scrollF) => dispatch(actions.setScrollReadStaff({ scrollF })),
    callback: (key) => dispatch(actions.callback(key)),
    StaffUnreadCheckPage:()=>dispatch(actions.StaffUnreadCheckPage()),
    StaffReadCheckPage:()=>dispatch(actions.StaffReadCheckPage()),
})
export default connect(mapStateToProps, mapDispatchToProps)(StaffRemindCont)

