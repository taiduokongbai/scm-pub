import { ReqApi,delJsonHead,delCookie ,getCookie} from '../../base/services/ReqApi'
import {LoginUrls} from '../../base/consts/Urls'
import { LAYOUTTOPREDU } from '../consts/ActTypes'
import { message } from '../../base/components/AntdComp';
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig'
import CompanyAct from './CompanyAct';
const actions = {
    //退出系统
    Logout:(pm={}) => (dispatch, getState) => {
        dispatch(CompanyAct.TabLoading(true));
        let tokenId = getCookie("tokenId");
        pm.tokenId = tokenId;
        ReqApi.get({
            url: LoginUrls.LOGIN_LOGOUT,
            pm
        }).then(json => {
            if(json.status == 2000){
                delJsonHead();
                window.location.href=prefix+prefixCh+"login.html";
            }
            dispatch(CompanyAct.TabLoading(false));
        })
    },
}

export default actions;