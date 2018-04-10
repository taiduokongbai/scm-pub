import { prefix, prefix_route, prefixCh, prefixPub, prefixMsgPub, prefixEcWeb, prefixEcf } from '../../base/consts/UrlsConfig';
import { ReqApi, setJsonHead, setCookie, getCookie } from '../../base/services/ReqApi';
let { observable, action, computed, runInAction, toJS } = mobx;

export class LoadingStore {
    entryPage = '';
    // 判断用户是否登陆
    isLogin = (_pm = {}) => {
            ReqApi.post({
                url: `${prefixPub}/unityAccount/getWithToken`,
                pm: _pm,
                callBack: true
            }).then(json => {
                // 2000：成功，(4992：未登陆过, 非2000)
                if (json.status === 2000 && json.data) {
                    this.userHasLoginIn(json.data);
                } else {    
                    this.infoCheckOut(_pm)
                }
            })
    }
    // 用户已经登陆
    userHasLoginIn = (data) => {
        let tokenId = getCookie('tokenId');
        if (tokenId) {
            if (data.acctType) {
                ReqApi.post({
                    url: `${prefixPub}/unityAccount/judgeInitCompy`,
                    pm: { companyCode: data.companyCode }
                }).then(json => {
                    if (json.status === 2000) {
                        setTimeout(() => {
                            window.location.href = json.data ? this.compAdminUrl(true, tokenId) : this.compAdminUrl(false);
                        }, 500)
                    }
                })
            } else {
                this.toEntryPage(tokenId);
            }  
        }
    }
    // 校验tokenid  登录跳转
    infoCheckOut = (pm = {}) => { 
        ReqApi.post({
            url: `${prefixPub}/unityAccount/tokenValidate`,
            pm
        }).then(json => {
            /**
             *  status 2000 —— tokenid有效， 5101——未开通， 非2000 —— tokenid无效
             *  acctType 0 —— 员工账号， 1 —— 公司管理员
             *  initCompy 0 —— 未完善公司信息， 1 —— 已完善公司信息
             */
            if (json.status === 2000 && json.data) {
                setCookie("tokenId", json.data.tokenId);
                setJsonHead();
                setTimeout(() => {
                    if (pm.curUrl) {
                        window.location.href = decodeURIComponent(pm.curUrl);
                    } else {
                        if (json.data.acctType) {
                            window.location.href = json.data.initCompy == '1' ? this.compAdminUrl(true, json.data.tokenId) : this.compAdminUrl(false) ;
                        } else {
                            this.toEntryPage(json.data.tokenId);
                        };
                    }
                }, 500);
            } else if (json.status === 5101) {
                setTimeout(() => { window.location.href = `${prefixEcf}/homepage.html` }, 500)
            } else {
                let demoUrl = window.LUX_SW_LOGIN || 'http://10.99.2.237:8088/swcloudAuthorizationServer/login';
                setTimeout(() => { window.location.href = demoUrl + '?redirect_uri=' + (window.LUX_URL || 'http://10.99.2.224') + '/sm/pub/loading.html' }, 500)
            }
        })
    }
    // 企业管理员 跳转地址
    compAdminUrl = (initCompy, tokenId = '') => {
        let url = ''
        if(initCompy){
            url = prefix + prefix_route + `/R/main/index?tab=member&tokenId=` + tokenId;
        } else{
            url = `${prefix}${prefixCh}R/setting/company`;
        }
        return url;
    }
    // 判断 是否进入电商前台
    toEntryPage = (tokenId = '') => {
        let url = '';
        if(this.entryPage && this.entryPage == 'ecf'){
            url = `${prefixEcf}/homepage.html`
        }else {
            url = `${prefix_route}/main.html?tokenId=${tokenId}`
        }
        setTimeout(()=>{
            window.location.href = url;
        }, 500)
    }
}

let loadingStore = new LoadingStore();
export { loadingStore }