import React, { Component } from 'react'
import { Tabs, Row, Col, Spin } from '../../base/components/AntdComp';
import { prefixCh } from '../../base/consts/UrlsConfig'
class AnnouncementComp extends Component {
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
        this.props.getAnnouncementList( this.props.announcementList.page, this.state.pageSize);
    }
    handleWheel = (e) => {
        let clientHeight = this.refs.bodyBox.clientHeight; //可视区域高度
        let scrollTop = this.refs.bodyBox.scrollTop;  //滚动条滚动高度
        let scrollHeight = this.refs.bodyBox.scrollHeight; //滚动内容高度
        if ((clientHeight + scrollTop) == (scrollHeight)) {
            //如果滚动到底部
                if (this.props.announcementList.scrollF) {
                    this.props.setScrollAnnouncement(this.props.announcementList.scrollF);
                    if (!this.props.loading) {
                        this.props.announcementCheckPage();
                    }
                }
        }
    }

    render(){
        let { loading, announcementList } = this.props;
        return(
            <div className='announcement-content'>
                    <div className='announcement-title'>
                        <h3>公告列表</h3>
                    </div>
                    <Spin spinning={loading}>
                        <div className="announcement-scroll" onScroll={this.handleWheel} ref="bodyBox">
                            {
                                announcementList.list.length != 0 ? announcementList.list.map((item, index) => {
                                        return <div className="announcement-list" key={index}>
                                            <Row className="announcement-row">
                                                <Col span={20}><a className="notice-title" target="_blank" href={`${prefixCh}announce.html#/${item.id}`}>{item.title}</a></Col>
                                                <Col span={4} className="createByName">{item.createByName} {item.createDate}</Col>
                                            </Row>
                                        </div>
                                    }) :
                                    <div style={{ textAlign: "center" }}>暂无数据</div>
                            }
                        </div>
                    </Spin>
            </div>
        )
    }
}
export default AnnouncementComp