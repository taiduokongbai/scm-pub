/**
 *  统一登录 loading过渡页面    
 */
import React, { Component } from 'react';
import { prefix, prefix_route, prefixCh, prefixPub, prefixMsgPub, prefixEcWeb, prefixEcf } from '../../base/consts/UrlsConfig';
import { Spin } from '../../base/components/AntdComp';
import { ReqApi, setJsonHead, setCookie, getCookie } from '../../base/services/ReqApi';
import { loadingStore } from "../store/LoadingStore";
let { observable, action, computed, runInAction, toJS } = mobx;
let { observer } = mobxReact;

@observer
class LoadingComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = loadingStore;
    }
    componentDidMount() {
        let url = window.location.href;
        let params = window.location.search.replace(/\?/,'').split('&');
        let _pm = {},flag = true;
        if (params[0].length>0) {   // url有参数
            params.map(item => {
                let key = item.split('=')[0];
                if(key == 'access_token'){
                    _pm.token = item.substr(key.length+1) || '123';
                }
                if(key == 'tenantId'){
                    _pm.companyId = item.substr(key.length+1)
                }
                if(key == 'curUrl'){
                    _pm.curUrl = item.substr(key.length+1);
                }
                //是否跳转到电商前台
                this.store.entryPage = (key == 'to' && item.substr(key.length+1) == 'ecf') ?  'ecf' : '';
            })
           if(_pm.token && _pm.companyId){
                this.store.isLogin(_pm);
           }else window.location.href = `${prefixEcf}/homepage.html`;
        }else{   // url 没有参数, 电商首页
            window.location.href = `${prefixEcf}/homepage.html`;
        }        
    }
    
    render() {
        return (
            <div className='loadingPage'>
                <Spin spinning={true} tip="正在进入系统，请稍等..." size="large">
                </Spin>
            </div>
        )
    }
}

export default LoadingComp;