import { ReqApi ,setJsonHead,setCookie,getCookie} from '../../base/services/ReqApi'
import { LoginUrls,Urls } from '../../base/consts/Urls';
import { LOGINREDU } from '../consts/ActTypes';
import { message } from '../../base/components/AntdComp';
import { prefix, prefix_route } from '../../base/consts/UrlsConfig';
import {delJsonHead} from '../../base/services/ReqApi';

let actions = {
    LoginLoading: (value) => (dispatch, getState) => {
        let state = getState()[LOGINREDU].set('loginLoading', value);
        dispatch({ type: LOGINREDU, state });
    },
    Spinning: (value) => (dispatch, getState) => {
        let state = getState()[LOGINREDU].set('spinning', value);
        dispatch({ type: LOGINREDU, state });
    },
    LoginVisiable: (value) => (dispatch, getState) => {
        let state = getState()[LOGINREDU].set('loginVisiable', value);
        dispatch({ type: LOGINREDU, state });
    },
    ForgetPwdVisiable: (value) => (dispatch, getState) => {
        let state = getState()[LOGINREDU].set('forgetPwdVisiable', value);
        dispatch({ type: LOGINREDU, state });
    },
    ShowPicCode: (value) => (dispatch, getState) => {
        let state = getState()[LOGINREDU].set('showPicCode', value);
        dispatch({ type: LOGINREDU, state });
    },
    GetLoginList: (data) => (dispatch, getState) => {
        let {list,acctType,tokenId} = data;
        let state = getState()[LOGINREDU].set('dataSource', list).set('acctType', acctType).set("tokenId",tokenId);
        dispatch({ type: LOGINREDU, state });
    },
    GetIsLoginList: (data) => (dispatch, getState) => {
        let tokenId = getCookie("tokenId");
        let {list,acctType} = data;
        let state = getState()[LOGINREDU].set('dataSource', list).set('acctType', acctType).set("tokenId",tokenId);
        dispatch({ type: LOGINREDU, state });
    },
    //登录
    LoginSubmit: (pm={})=>(dispatch,getState)=>{
        dispatch(actions.LoginLoading(true));
      return ReqApi.post({
            url: LoginUrls.LOGIN_SELECT_COMPANY,
            pm,
        }).then((json) => {
            setTimeout(()=>{
                dispatch(actions.LoginLoading(false));
            },3500)
            
            switch(json.status){
                case 2000:
                    setCookie("tokenId",json.data.tokenId),
                    setJsonHead(),
                    dispatch(actions.LoginVisiable(true)),
                    dispatch(actions.GetLoginList(json.data)),
                    dispatch(actions.ShowPicCode(false));
                    break;
                case 4010:
                    dispatch(actions.ShowPicCode(false));
                    break;
                case 4011:
                    dispatch(actions.ShowPicCode(true));
                    break;
                case 4012:
                    dispatch(actions.ShowPicCode(true));
                    break;
                case 4017:
                    dispatch(actions.ShowPicCode(true));
                    break;
                default:
                    console.log("未知错误")
                    break;
            }
            return json; 
        })
    },

    CompanyList: (pm={})=>(dispatch,getState)=>{
        let tokenId = getState()[LOGINREDU].get('tokenId')
        dispatch(actions.Spinning(true));
      ReqApi.post({
            url: LoginUrls.LOGIN_ENTER,
            pm,
        }).then((json) => {
            if(json.status==2000){
                dispatch(actions.Spinning(false));
                window.location.href=prefix+prefix_route+`/main.html?tokenId=`+tokenId
            }
        })
    },
    
    //获取登录人信息
    getLoginInfo: (pm={})=>(dispatch,getState)=>{
        ReqApi.get({
              url: Urls.GET_PERSONAL_INFO,
              pm,
          }).then((json) => {
               if(json.status===2000){
                //   dispatch(actions.getAcctType(json.data.acctType));
                  dispatch(actions.GetIsLoginList(json.data))
              }else{
                  console.log("未知错误")
              }
          })
      },

      //退出系统
    Logout:(pm={}) => (dispatch, getState) => {
        ReqApi.get({
            url: LoginUrls.LOGIN_LOGOUT,
            pm
        }).then(json => {
            if(json.status == 2000){
                delJsonHead();
                dispatch(actions.LoginVisiable(false))
            }
        })
    },
}
export default actions;