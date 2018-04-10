import React, { Component } from 'react'
import { Tabs, Row, Col, Spin } from '../../base/components/AntdComp';
import { prefixCh,prefixScm, prefixEc,prefixMsgScm,prefixMsgEc } from '../../base/consts/UrlsConfig'
const TabPane = Tabs.TabPane;

class StaffReadComp extends Component {
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
        // this.props.getreadStaffList('1', this.state.page1, this.state.pageSize);
    }
    setScrollReadStaff = (scrollF) => {
        this.props.setScrollReadStaff(scrollF);
    }
    handleWheel = (e) => {
        let clientHeight = this.refs.bodyBox.clientHeight; //可视区域高度
        let scrollTop = this.refs.bodyBox.scrollTop;  //滚动条滚动高度
        let scrollHeight = this.refs.bodyBox.scrollHeight; //滚动内容高度
        if ((clientHeight + scrollTop) == (scrollHeight)) {
            //如果滚动到底部 
            if (this.props.readStaffList.unreadStaffFlag == 2) {
                let _t = this;
                if (_t.props.readStaffList.scrollF) {
                    _t.setScrollReadStaff(_t.props.readStaffList.scrollF);
                    if (!_t.props.loading) {
                        _t.StaffReadCheckPage();
                        // _t.setState({
                        //     page1: _t.state.page1 + 1
                        // }, () => {
                        //     _t.props.getreadStaffList('1', _t.state.page1, _t.state.pageSize);
                        // });
                    }
                }
            }
        }
    }
    StaffReadCheckPage = () => {
        this.props.StaffReadCheckPage();
    };
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
    };
    jumpLink=(item)=>{
        switch (item.urlCode) {
            case "1":
                return <a className="sendLink" target="_blank" href={`${prefixMsgScm}scm.html?tab=purchaseViewCont&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "2":
                return <a className="sendLink" target="_blank" href={`${prefixMsgScm}scm.html?tab=requirements&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "3":
                return <a className="sendLink" target="_blank" href={`${prefixMsgScm}scm.html?tab=saleOrderDetail&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "4":
                return <a className="sendLink" target="_blank" href={`${prefixMsgScm}scm.html?tab=saleDeliveryNoticeView&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "5":
                return <a className="sendLink" target="_blank" href={`${prefixMsgEc}shop.html?tab=PurchaseDetailsCont&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "6":
                return <a className="sendLink" target="_blank" href={`${prefixMsgEc}shop.html?tab=inquiryResultDetail&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "7":
                return <a className="sendLink" target="_blank" href={`${prefixMsgEc}shop.html?tab=receiveNoticeView&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "8":
                return <a className="sendLink" target="_blank" href={`${prefixMsgEc}shop.html?tab=SalerDetailsCont&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "9":
                return <a className="sendLink" target="_blank" href={`${prefixMsgEc}shop.html?tab=customerInquiry&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "10":
                return <a className="sendLink" target="_blank" href={`${prefixMsgEc}shop.html?tab=quoteDetail&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "11":
                return <a className="sendLink" target="_blank" href={`${prefixMsgEc}shop.html?tab=shipNoticeView&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "12":
                return <a className="sendLink" target="_blank" href={`${prefixMsgScm}scm.html?tab=purchasePriceView&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            case "14":
                return <a className="sendLink" target="_blank" href={`${prefixMsgEc}shop.html?tab=inquiryManage&orderId=`+item.orderId} dangerouslySetInnerHTML={{ __html: item.senderMsg}}></a>
            default:
                return <a className="sendLink" href="javascript:void(0);">{item.senderMsg}</a>
        }
    }
    render() {
        let { loading, readStaffList } = this.props;
        return (
            <div className='companyset-content'>
                <div className="remind-content"  >
                    <div className="remindscroll" onScroll={this.handleWheel} ref="bodyBox">
                        {
                            readStaffList.list.length != 0 ? readStaffList.list.map((item, index) => {
                                return <div className="remindlist" key={index}>
                                    <Row>
                                        <Col span={18}>{this.colorSelect(item.msgFrom)}{this.jumpLink(item)}</Col>
                                        <Col span={5} className="remind-time">{item.senderDate}</Col>
                                        <Col span={1} className="remind-close-mail">
                                            <span className="icon c2mfont c2m-pt-open-mail close-color"></span>
                                        </Col>
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

export default StaffReadComp



