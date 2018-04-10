import React, { Component } from 'react'
import { Tabs, Row, Col, Spin } from '../../base/components/AntdComp';
const TabPane = Tabs.TabPane;

class AdminUnreadComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page0: 1,
            pageSize: 15,
            pageIndex: 20,
            newData: [],
            flag: 1
        }
    }
    componentDidMount() {
        this.props.getunreadAdminList('0', this.props.unreadAdminList.page, this.state.pageSize);
    }
    setScrollUnreadAdmin = (scrollF) => {
        this.props.setScrollUnreadAdmin(scrollF);
    }
    handleWheel = (e) => {
        let clientHeight = this.refs.bodyBox.clientHeight; //可视区域高度
        let scrollTop = this.refs.bodyBox.scrollTop;  //滚动条滚动高度
        let scrollHeight = this.refs.bodyBox.scrollHeight; //滚动内容高度
        if ((clientHeight + scrollTop) == (scrollHeight)) {
            //如果滚动到底部 
            if (this.props.unreadAdminList.unreadAdminFlag == 1) {
                let _t = this;
                if (_t.props.unreadAdminList.scrollF) {
                    _t.setScrollUnreadAdmin(_t.props.unreadAdminList.scrollF);
                    if (!_t.props.loading) {
                        _t.adminUnreadCheckPage();
                    }
                }
            }
        }
    }
    adminUnreadCheckPage = () => {
        this.props.adminUnreadCheckPage();
    }
    newsCheckStatus = (msgCode, index) => {
        this.setState({
            page0: 1,
        });
        this.props.getNewsStatus(msgCode, index);
    }
    getE = (key, val) => {
        if (val !== undefined && val !== null && val !== "") {
            return window.ENUM.getEnum(key, val)
        }
    };
    colorSelect = (msgFrom) => {
        if (msgFrom == 'WF') {
            return <span className="wffrom">{this.getE("msgFrom", msgFrom)}</span>
        } else if (msgFrom == 'HR') {
            return <span className="hrfrom">{this.getE("msgFrom", msgFrom)}</span>
        } else if (msgFrom == 'SCM') {
            return <span className="scmfrom">{this.getE("msgFrom", msgFrom)}</span>
        } else if (msgFrom == 'EC') {
            return <span className="ecfrom">{this.getE("msgFrom", msgFrom)}</span>
        } else if (msgFrom == 'APS') {
            return <span className="apsfrom">{this.getE("msgFrom", msgFrom)}</span>
        } else if (msgFrom == 'SYS') {
            return <span className="sysfrom">{this.getE("msgFrom", msgFrom)}</span>
        }
    }
    render() {
        let { loading, unreadAdminList } = this.props;
        return (
            <div className='companyset-content'>
                <div className="remind-content"  >
                    <Spin spinning={loading}>
                        <div className="remindscroll" onScroll={this.handleWheel} ref="bodyBox" >
                            {
                                unreadAdminList.list.length != 0 ? unreadAdminList.list.map((item, index) => {
                                    return <div className="remindlist" key={index} onClick={() => this.newsCheckStatus(item.msgCode)}>
                                        <Row>
                                            <Col span={20}><span className="icon c2mfont c2m-pt-close-mail close-color"></span> <span className="paddingLeft5">{item.senderName} </span> 提醒您 <span>{item.senderMsg}</span><a className="sendLink" href={item.senderUrlWeb}>{item.senderUrlName}</a></Col>
                                            <Col span={4}>{item.senderDate}</Col>
                                        </Row>
                                    </div>
                                }) : <div style={{ textAlign: "center" }}>暂无数据</div>
                            }
                        </div>>
                    </Spin>
                </div>
            </div>
        )
    }
}

export default AdminUnreadComp



