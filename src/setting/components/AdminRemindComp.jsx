import React, { Component } from 'react'
import { Tabs, Row, Col, Spin } from '../../base/components/AntdComp';
const TabPane = Tabs.TabPane;

class AdminRemindComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page0: 1,
            page1: 1,
            pageSize: 15,
            pageIndex: 20,
            newData: [],
            flag: 1
        }
    }
    componentDidMount() {
        this.props.getunreadAdminList('0', this.state.page0, this.state.pageSize);
        this.props.getreadAdminList('1', this.state.page1, this.state.pageSize);
    }
    setScrollUnreadAdmin = (scrollF) => {
        this.props.setScrollUnreadAdmin(scrollF);
    }
    setScrollReadAdmin = (scrollF) => {
        this.props.setScrollReadAdmin(scrollF);
    }
    handleWheel = (e) => {
        let clientHeight = this.refs.bodyBox.clientHeight; //可视区域高度
        let scrollTop = this.refs.bodyBox.scrollTop;  //滚动条滚动高度
        let scrollHeight = this.refs.bodyBox.scrollHeight; //滚动内容高度
        let { unreadAdminList, readAdminList } = this.props;
        if ((clientHeight + scrollTop) == (scrollHeight)) {
            //如果滚动到底部 
            if (this.state.flag == 1) {
                let _t = this;
                if (_t.props.unreadAdminList.scrollF) {                    
                    _t.setScrollUnreadAdmin(_t.props.unreadAdminList.scrollF);
                    if (!_t.props.loading) {
                        _t.setState({
                            page0: _t.state.page0 + 1
                        }, () => {
                            _t.props.getunreadAdminList('0', _t.state.page0, _t.state.pageSize);
                        });
                    }
                }
            } else {
                let _t = this;
                if (_t.props.readAdminList.scrollF) {
                    _t.setScrollReadAdmin(_t.props.readAdminList.scrollF);
                    if (!_t.props.loading) {
                        _t.setState({
                            page1: _t.state.page1 + 1
                        }, () => {
                            _t.props.getreadAdminList('1', _t.state.page1, _t.state.pageSize);
                        });
                    }
                }
            }
        }
    }
    // addNewData = () => {
    //     let { unreadAdminList, readAdminList } = this.props;
    //     console.log(this.props.unreadAdminList);
    //     this.setState({ page: this.state.page + 1 });     
    //     let newData1 = [...this.state.newData, ...unreadAdminList.list.slice(this.state.page * 20, (this.state.page + 1) * 20)];
    //     if (this.state.page > Math.ceil(unreadAdminList.list.length / this.state.pageIndex)) {
    //         return;
    //     }
    //     console.info(this.state.newData)
    //     this.setState({ newData: newData1 })

    // }
    newsCheckStatus = (id) => {
        this.props.getNewsStatus(id);
    }
    callback = (key) => {
        if (key == 1) {
            this.setState({ flag: 1 });
        } else {
            this.setState({ flag: 2 });
        }
    }
    render() {
        let { loading, unreadAdminList, readAdminList } = this.props;
        // console.log(this.props);
        return (
            <div className='companyset-content'>
                <div className="remind-content" >
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="未读提醒" key="1">
                            <Spin spinning={loading}>
                                <div className="remindscroll" onScroll={this.handleWheel} ref="bodyBox" >
                                    {
                                        unreadAdminList.list != undefined ? unreadAdminList.list.map((item, index) => {
                                            return <div className="remindlist" key={index} onClick={() => this.newsCheckStatus(item.id)}>
                                                <Row>
                                                    <Col span={22}><span className="anticon anticon-mail"></span> <span className="paddingLeft5">{item.senderName} </span> <span>{item.senderMsg}</span></Col>
                                                    <Col span={2}>{item.senderDate}</Col>
                                                </Row>
                                            </div>
                                        }) : null
                                    }
                                </div>
                            </Spin>
                        </TabPane>
                        <TabPane tab="已读提醒" key="2">
                            <div className="remindscroll" onScroll={this.handleWheel} ref="bodyBox">
                                {
                                    readAdminList.list != undefined ? readAdminList.list.map((item, index) => {
                                        return <div className="remindlist" key={index}>
                                            <Row>
                                                <Col span={22}><span className="anticon anticon-mail"></span> <span className="paddingLeft5">{item.senderName} </span> <span>{item.senderMsg}</span></Col>
                                                <Col span={2}>{item.senderDate}</Col>
                                            </Row>
                                        </div>
                                    }) : null
                                }
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default AdminRemindComp



