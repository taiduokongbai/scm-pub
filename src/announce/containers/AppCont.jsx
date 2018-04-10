import React, { Component } from "react";
import { Layout, Popover, Spin } from '../../base/components/AntdComp';
import LayoutTopComp from '../components/LayoutTopComp'
const {Header, Content, Footer, Sider} = Layout;
let { observable, action, computed, runInAction, toJS } = mobx;
let { observer } = mobxReact;
import { announceDetailStore } from '../data/AnnounceDetailStore';
import { formatNullStr } from "../../base/consts/Utils";
import {prefixPub} from "../../base/consts/UrlsConfig";
@observer
export default class AppCont extends Component {
    constructor(prop) {
        super(prop);
    }
    componentDidMount() {
        announceDetailStore.fetchTableDetails({ id: this.props.match.params.id })
    }
    getcontent = () => {
        return announceDetailStore.detail.fileList && announceDetailStore.detail.fileList.length > 0 ? <div className="announce-enclosure-list">
            {
                announceDetailStore.detail.fileList.slice().map((item, index) => {
                    return <p key={index + ""}><a href={prefixPub+"/common/downloadFile?fileUrl="+item.address+"&"+"fileName="+item.name
}>{item.name}</a></p>
                })
            }
        </div> : null
    }

    render() {
        let detail = announceDetailStore.detail;
        let content = this.getcontent()
        return (
            <div className="ew-layout">
                <Spin spinning={announceDetailStore.loading}>
                    <Layout style={{ height: '100vh', overflow: 'hidden', background: '#fff', }}>
                        <Header className="ew-layout-header" style={{padding:'0px 24px 0px 36px'}}>
                            <LayoutTopComp />
                        </Header>
                        <Layout>
                            <Layout style={{background:'#fff'}}>
                                <Content id="ew-content" className="ew-layout-content" style={{ overflow: 'auto', zIndex: 100, background: '#fff', padding: '0px 28px 0 20px' }}>
                                    <div className="announce-detail">
                                        <div className="announce-title">{formatNullStr(detail.title)}</div>
                                        <div className="announce-send">
                                            <span className="announce-sendTime">发布时间：{formatNullStr(detail.createDate)}</span>
                                            <span className="announce-sendAthour">发布者：{formatNullStr(detail.createByName)}</span>
                                        </div>
                                        <div className="announce-content-display">
                                            <div className="announce-content">
                                                {content == null ? "" : <div className="announce-enclosure">
                                                    <Popover content={content} placement="bottomRight" trigger="click">
                                                        <a><span className="announce-icon-fujian c2mfont c2m-fujian"></span><span className="announce-fujian">附件</span></a>
                                                    </Popover>
                                                </div>}
                                                <div dangerouslySetInnerHTML={{
                                                    __html: detail.content
                                                }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </Spin>
            </div>
        )
    }
}

