import React,{Component} from 'react';
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig'

class ResetHeaderComp extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
    return (
        <div className="reset-header">
            <div className="header-content">
                <h1 className="header-logo"><i className='c2mfont c2m-zhaozhizao' style={{fontSize:40,color:"#006db7"}}></i></h1>
                <ul className="header-list">
                    <li className="header-item"><a href="#" >首页</a></li>
                    <li className="header-item"><a href="#" >产品</a></li>
                    <li className="header-item"><a href="#" >服务</a></li>
                    <li className="header-item"><a href="#" >帮助中心&nbsp;|&nbsp;下载</a></li>
                </ul>
                <a href={prefix+prefixCh+"login.html"} className="header-login">登&nbsp;&nbsp;录</a>
            </div>
      </div>
    );
    }
}

export default ResetHeaderComp;