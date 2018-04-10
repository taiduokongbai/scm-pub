import React, { Component } from 'react';
import { Row, Col ,Spin} from '../../base/components/AntdComp'
import ApproveWaitComp from '../components/ApproveWaitComp'
import actions from '../actions/PersonAct'
import { connect } from 'react-redux'
import { prefixCh,prefixScm, prefixEc,prefixMsgScm,prefixMsgEc } from '../../base/consts/UrlsConfig'

//消息
var goEasyMessage = new GoEasy({
    appkey: 'BC-6237eda0104849b1ab35757b4df201e2'
});
var goEasyApprove = new GoEasy({
    appkey: 'BC-36f47e79da914fe0a9717f93c102db70'
});
//BC-7338c9d31b5c40188b3ac09955b5e96e 代办
class PersonPageComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page0: 1,
            pageSize: 6,
            pageIndex: 20,
            approveList: [],
            approveTotal: 0,
            newData: [],
            flag: 1,
            pendingSalesOrder: 0,
            pendingPurchaseOrder: 0,
            noticeId:'',//首页公告id
            noticeTitle:'',
            noticeDate:'',
            hideNotice:true,
            loading:false,
            pendingPurchaseBill:0,//待发布询价单
            pendingQuoteBill:0,//报价待处理
            pendingConfirmOrder:0,//待确认订单
            pendingRequote:0,//等待重新报价
        }
    }
    componentDidMount() {
        this.setState({loading: true})
        //未读消息
        this.props.getUnreadStaffList({msgStatus:0, page:1, pageSize:4} );
        let getNoticeList =actions.getNoticeList().then((json)=>{
            if(json.status === 2000){
                if(json.data.list.length>0){
                    this.setState({
                        noticeId:json.data.list[0].id,
                        noticeTitle:json.data.list[0].title,
                        noticeDate:json.data.list[0].createDate,
                    })
                }else {
                    this.setState({ hideNotice:false})
                }

            }
        });
        Promise.all([getNoticeList]).then(values => {
            this.setState({loading: false})
        });
        //加载审批待办数据
        this.loadApproveData();
        //待处理订单
         this.props.getOrderStatistics().then(json => {
             if (json.status == 2000) {
               let pendingPurchaseBill = json.data.pendingPurchaseBill;
               let pendingQuoteBill = json.data.pendingQuoteBill;
               let pendingConfirmOrder = json.data.pendingConfirmOrder;
               let pendingRequote = json.data.pendingRequote;

                 pendingPurchaseBill = pendingPurchaseBill > 99 ? "99+" : pendingPurchaseBill;
                 pendingQuoteBill = pendingQuoteBill > 99 ? "99+" : pendingQuoteBill;
                 pendingConfirmOrder = pendingConfirmOrder > 99 ? "99+" : pendingConfirmOrder;
                 pendingRequote = pendingRequote > 99 ? "99+" : pendingRequote;
                    this.setState({
                        pendingPurchaseBill: pendingPurchaseBill,
                        pendingQuoteBill: pendingQuoteBill,
                        pendingConfirmOrder: pendingConfirmOrder,
                        pendingRequote: pendingRequote
                    });
             }
         });
        let _this = this;
        goEasyApprove.subscribe({
            channel: 'backlog_channel',
            onMessage: function (message) {
                if (message.content == 'true') {
                    _this.loadApproveData();
                }
            }
        });
        goEasyMessage.subscribe({
            channel: 'message_channel',
            onMessage: function (message) {
                if (message.content == 'true') {
                    _this.props.getUnreadStaffList({msgStatus:0, page:1, pageSize:4} );
                }
            }
        });
    }

    readOrder=(id)=>{
        actions.readOrder({id:id}).then((json)=>{
              if(json.status === 2000){
                  this.props.getUnreadStaffList({msgStatus:0, page:1, pageSize:4} );
              }
        })
    }
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
    loadApproveData = () =>{
         //获取我的审批代办
         this.props.getApproveList().then(json => {
            if (json.status == 2000) {
                let _total = json.data.total;
                if (_total > 0) {
                    _total = _total > 99 ? "99+" : _total;
                    this.setState({
                        approveList: json.data.list,
                        approveTotal: _total
                    });
                }
            }
        });
    }
    render() {
        let { loading, unreadStaffList,loadApproveDetail,loadEmployeesList,submitOpinion,employeesList,sidebarLoading } = this.props;
        const { approveList, approveTotal,pendingPurchaseBill, pendingQuoteBill, pendingConfirmOrder,pendingRequote,noticeId,noticeTitle,noticeDate } = this.state;



        return (
            <Spin spinning={this.state.loading}>
            <div className="person">
                <div className="banner"></div>
                {this.state.hideNotice?<div className="system-notice"><i className="c2mfont c2m-ec-notice blue-gonggao" style={{paddingRight:7}}></i>系统公告：<a target="_blank" className="notice-title" href={`${prefixCh}announce.html#/${noticeId}`}>{noticeTitle}</a><span style={{paddingLeft:20}}>{noticeDate}</span><a style={{paddingLeft:20}} href={`${prefixCh}R/setting/announcement`}>更多>></a></div>:null}
                <div className="main">
                    <div className="leftmain">
                        <div className="leftmaintop">
                            <Row>
                                <Col span={12}>
                                    <span className="spanone">我的待办</span>
                                    <span className="spantwo">(共{approveTotal}条)</span>
                                </Col>
                                <Col span={13}><a href={`${prefixCh}R/setting/approve`}>更多>></a></Col>
                            </Row>
                            {
                                approveList.length > 0 ?
                                <ApproveWaitComp 
                                    approveList={approveList}
                                    loadApproveData={this.loadApproveData}
                                    loadApproveDetail={loadApproveDetail}
                                    loadEmployeesList={loadEmployeesList}
                                    submitOpinion={submitOpinion}
                                    employeesList={employeesList}
                                    sidebarLoading={sidebarLoading}
                                />
                                : <div className="nonedai"></div>
                            }
                        </div>
                        <div className="leftmainbottom">
                            <Row>
                                <Col span={22}>
                                    <span className="spanone">采购业务</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={7}></Col>
                                <Col span={8}>
                                    <span>待发布询价单</span><span ><a className="spantwo" target="_blank" href={`${prefixMsgEc}shop.html?tab=inquiryManage#`}>{pendingPurchaseBill}</a></span>
                                </Col>
                                <Col span={17}></Col>
                                <Col span={8}>
                                    <span>报价待处理</span><span ><a className="spantwo" target="_blank" href={`${prefixMsgEc}shop.html?tab=inquiryManage#`}>{pendingQuoteBill}</a></span>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="rightmain">
                        <div className="rightmaintop">
                        <Row>
                            <Col span={12}>
                                <span className="spanone">未读提醒</span>
                                <span className="spantwo">(共{unreadStaffList.total}条)</span>
                            </Col>
                            <Col span={13}><a href={`${prefixCh}R/setting/remind`}>更多>></a></Col>
                        </Row>
                        {
                            unreadStaffList.list.length > 0 ? unreadStaffList.list.map((item, index) => {
                                return <div className="remindlist" key={index}>
                                    <Row>
                                        <Col span={18} onClick={() => this.readOrder(item.id)}>{this.colorSelect(item.msgFrom)}{this.jumpLink(item)}</Col>
                                        <Col span={6} className="remind-time">{item.senderDate}</Col>
                                    </Row>
                                </div>
                            }) : <div className="unremind"></div>
                        }
                    </div>
                        <div className="rightmainbottom">
                            <Row>
                                <Col span={22}>
                                    <span className="spanone">销售业务</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={7}></Col>
                                <Col span={8}>
                                    <span>待确认订单</span><span ><a className="spantwo" target="_blank" href={`${prefixMsgEc}shop.html?tab=saleOrder#`}>{pendingConfirmOrder}</a></span>
                                </Col>
                                <Col span={17}></Col>
                                <Col span={8}>
                                    <span>等待重新报价</span><span ><a className="spantwo" target="_blank" href={`${prefixMsgEc}shop.html?tab=quoteManage#`}>{pendingRequote}</a></span>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            </Spin>
        );
    }
}
const mapStateToProps = (state) => {
    return state.PersonRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    getApproveList: () => {
        return dispatch(actions.loadApproveForMeList());
    },
    loadApproveDetail: (pm) =>{
        return dispatch(actions.loadApproveDetail(pm));
    },
    submitOpinion: (pm) =>{
        return dispatch(actions.submitOpinion(pm));
    },
    loadEmployeesList: (pm) =>{
        return dispatch(actions.loadEmployeesList(pm));
    },
    getUnreadStaffList: (pm) => {
        dispatch(actions.getUnreadStaffList(pm))
    },
    getOrderStatistics: () => {
        return dispatch(actions.getOrderStatistics())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonPageComp);
