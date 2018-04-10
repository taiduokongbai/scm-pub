import React,{Component} from 'react';
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig'

class FooterComp extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
    return (
        <div className="main-footer">
            <div className="footer-inner">
                <div className="container">
                    <div className="left-col">
                        <ul className="footer-nav">
                            <li>关于曼威</li>
                            <li>联系我们</li>
                            <li>合作伙伴</li>
                            <li>加入我们</li>
                            <li>客服中心</li>
                            <li>帮助中心</li>
                            <li>法律申明</li>
                            <li>知识产权</li>
                        </ul>
                        <div className="footer-description">
                            <span>曼威网版权所有沪ICP证010058号增值电信业务经营许可证</span>
                        </div>
                        <div>
                            <img src={prefix_route+"/img/footer-icon.png"}/>
                        </div>
                    </div>
                    <div className="right-col">
                        <p className="lead">服务热线：400-123-1235</p>
                        <p className="lead">企业QQ：88888888</p>
                        <p className="lead">客服邮箱：service@mainiway.com</p>
                    </div>
                </div>
            </div>
    </div>
    );
    }
}

export default FooterComp;