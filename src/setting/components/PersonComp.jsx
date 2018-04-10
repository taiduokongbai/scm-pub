import React, { Component } from 'react';
import  { Row ,Col } from '../../base/components/AntdComp'

import  { Carousel } from '../../base/components/AntdComp';

class PersonPageComp extends Component {


    render() {
        return (
            <div className="person">
                <div className="banner">
                    <Carousel autoplay>
                        <div className="banner-one"></div>
                        <div className="banner-two"></div>
                        <div className="banner-three"></div>
                        <div className="banner-four"></div>
                    </Carousel>
                </div>
                <div className="main">
                    <Row>
                        <Col span={12}>
                            <div className="leftmain">
                                <div className="leftmaintop">
                                    <div className="leftmaintop-margin">
                                        <Row>
                                            <Col span={12}>
                                                <span className="spanone">待办审批</span>
                                                <span className="spantwo">(共4条)</span>
                                            </Col>
                                            <Col span={12}><span className="col-one">更多>></span></Col>
                                        </Row>
                                        <Row>
                                            <Col span={6}><span>1. 请假申请</span></Col>
                                            <Col span={6}></Col>
                                            <Col span={6}></Col>
                                            <Col span={6}>
                                                <span className="spansix">曹操</span>
                                                <span className="spansix">2016/12/30</span>
                                                <span className="spansix">07 : 30</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={6}><span className="spanfive">1. 请假申请</span></Col>
                                            <Col span={6}></Col>
                                            <Col span={6}></Col>
                                            <Col span={6}>
                                                <span className="spansix">曹操</span>
                                                <span className="spansix">2016/12/30</span>
                                                <span className="spansix">07 : 30</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={6}><span className="spanfive">1. 请假申请</span></Col>
                                            <Col span={6}></Col>
                                            <Col span={6}></Col>
                                            <Col span={6}>
                                                <span className="spansix">曹操</span>
                                                <span className="spansix">2016/12/30</span>
                                                <span className="spansix">07 : 30</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className="leftmainbottom">
                                    <div className="leftmaintop-margin">
                                        <Row>
                                            <Col span={24}>
                                                <span className="spanone">待处理订单</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={7}></Col>
                                            <Col span={8}>
                                                <span className="">待处理采购订单</span><span className="spantwo">100</span>
                                            </Col>
                                            <Col span={17}></Col>
                                            <Col span={8}>
                                                <span>待处理销售订单</span><span className="spantwo">100</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>


                        </Col>
                        <Col span={12}>
                            <div className="rightmain">
                                <div className="leftmaintop-margin">
                                    <Row>
                                        <Col span={12}>
                                            <span className="spanone">未读提醒</span>
                                            <span className="spantwo">(共4条)</span>
                                        </Col>
                                        <Col span={12}><span className="col-one">更多>></span></Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <span className="spansix">张飞 提醒您<br />麻烦尽快处理我的申请 申请调休</span>
                                        </Col>
                                        <Col span={6}></Col>
                                        <Col span={6}></Col>
                                        <Col span={6}>
                                            <span className="listname">电商</span><br />
                                            <span className="spansix">2016/12/30</span>
                                            <span className="spansix">07 : 30</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <span className="spansix">张飞 提醒您<br />麻烦尽快处理我的申请 申请调休</span>
                                        </Col>
                                        <Col span={6}></Col>
                                        <Col span={6}></Col>
                                        <Col span={6}>
                                            <span className="listname">电商</span><br />
                                            <span className="spansix">2016/12/30</span>
                                            <span className="spansix">07 : 30</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <span className="spansix">张飞 提醒您<br />麻烦尽快处理我的申请 申请调休</span>
                                        </Col>
                                        <Col span={6}></Col>
                                        <Col span={6}></Col>
                                        <Col span={6}>
                                            <span className="listname">电商</span><br />
                                            <span className="spansix">2016/12/30</span>
                                            <span className="spansix">07 : 30</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>
                                            <span className="spansix">张飞 提醒您<br />麻烦尽快处理我的申请 申请调休</span>
                                        </Col>
                                        <Col span={6}></Col>
                                        <Col span={6}></Col>
                                        <Col span={6}>
                                            <span className="listname">电商</span><br />
                                            <span className="spansix">2016/12/30</span>
                                            <span className="spansix">07 : 30</span>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default PersonPageComp;