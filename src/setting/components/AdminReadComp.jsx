import React, { Component } from 'react'
import { Tabs, Row, Col, Spin } from '../../base/components/AntdComp';
const TabPane = Tabs.TabPane;

class AdminReadComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page1: 1,
            pageSize: 15,
            pageIndex: 20,
            newData: [],
            flag: 1
        }
    }
    componentDidMount() {

    }
    setScrollReadAdmin = (scrollF) => {
        this.props.setScrollReadAdmin(scrollF);
    }
    handleWheel = (e) => {
        let clientHeight = this.refs.bodyBox.clientHeight; //可视区域高度
        let scrollTop = this.refs.bodyBox.scrollTop;  //滚动条滚动高度
        let scrollHeight = this.refs.bodyBox.scrollHeight; //滚动内容高度
        if ((clientHeight + scrollTop) == (scrollHeight)) {
            //如果滚动到底部  
            if (this.props.readAdminList.unreadAdminlag == 2) {
                let _t = this;
                if (_t.props.readAdminList.scrollF) {
                    _t.setScrollReadAdmin(_t.props.readAdminList.scrollF);
                    if (!_t.props.loading) {
                        _t.adminReadCheckPage();
                    }
                }
            }
        }
    }
    adminReadCheckPage = () => {
        this.props.adminReadCheckPage();
    }
    newsCheckStatus = (msgCode) => {
        this.setState({
            page1: 1,
        }, () => {
            this.props.getNewsStatus(msgCode);
        });

    }
    callback = (key) => {
        this.setState({
            page1: 1,
        }, () => {
            this.props.callback(key)
        });
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
        let { loading, readAdminList } = this.props;
        return (
            <div className='companyset-content'>
                <div className="remind-content"  >
                    <div className="remindscroll" onScroll={this.handleWheel} ref="bodyBox">
                        {
                            readAdminList.list.length != 0 ? readAdminList.list.map((item, index) => {
                                return <div className="remindlist" key={index}>
                                    <Row>
                                        <Col span={20}><span className="icon c2mfont c2m-pt-open-mail open-color"></span> <span className="paddingLeft5">{item.senderName} </span> 提醒您 <span>{item.senderMsg}</span><a className="sendLink" href={item.senderUrlWeb}>{item.senderUrlName}</a></Col>
                                        <Col span={4}>{item.senderDate}</Col>
                                    </Row>
                                </div>
                            }) : <div style={{ textAlign: "center" }}>暂无数据</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminReadComp



