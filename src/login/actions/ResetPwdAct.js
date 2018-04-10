import { ReqApi,ReqApiNoToken } from '../../base/services/ReqApi'
import { LoginUrls } from '../../base/consts/Urls';
import { RESETPWDREDU,LOGINREDU } from '../consts/ActTypes';
import { message } from '../../base/components/AntdComp';
import LoginAct from './LoginAct'
let actions = {
    nextPhoneStep: (value) => (dispatch, getState) => {
        let state = getState()[RESETPWDREDU].set('nextStepLoading', value);
        dispatch({ type: RESETPWDREDU, state });
    },
    nextPhoneVisible: (value) => (dispatch, getState) => {
        let state = getState()[RESETPWDREDU].set('nextStepVisible', value);
        dispatch({ type: RESETPWDREDU, state });
    },
    nextStepDisabled: (value) => (dispatch, getState) => {
        let state = getState()[RESETPWDREDU].set('nextStepDisabled', value);
        dispatch({ type: RESETPWDREDU, state });
    },
    ShowPicCode: (value) => (dispatch, getState) => {
        let state = getState()[RESETPWDREDU].set('showPicCode', value);
        dispatch({ type: RESETPWDREDU, state });
    },
    enterOnSubmit: (value) => (dispatch, getState) => {
        let state = getState()[RESETPWDREDU].set('submitLoading', value);
        dispatch({ type: RESETPWDREDU, state });
    },
    //发送手机验证码
    sendPhoneCodeTo: (pm={})=>(dispatch,getState)=>{
      ReqApiNoToken.get({
            url: LoginUrls.LOGIN_GET_SMSWITH,
            pm,
        }).then((json) => {
             if(json.status===2000){
                message.success('获取短信验证码成功')
            }else if(json.status===4100){
                dispatch(actions.ShowPicCode(true));
            }else{
                console.log("未知错误")
            }
        })
    },
    //验证手机验证码
     nextStep: (pm={}) => (dispatch, getState) => {
        dispatch(actions.nextPhoneStep(true));
        ReqApi.post({
            url: LoginUrls.LOGIN_CHECK_PHONE,
            pm,
        }).then((json) => {
            if(json.status===2000){
                dispatch(actions.nextPhoneVisible(false));
            }else if(json.status===4005){
                dispatch(actions.ShowPicCode(true));
            }else{
                console.log("未知错误")
            }
            dispatch(actions.nextPhoneStep(false));
        });
    },
    //提交密码
    submitPwd: (pm={})=>(dispatch,getState)=>{      
        dispatch(actions.enterOnSubmit(true));
        ReqApiNoToken.post({
            url: LoginUrls.LOGIN_RESET_PSW,
            pm,
        }).then((json)=>{
           if(json.status && json.status===2000){
               dispatch(actions.enterOnSubmit(false));
               message.success('修改成功，请重新登录',1.5,dispatch(LoginAct.ForgetPwdVisiable(false)));
               dispatch(actions.nextPhoneVisible(true));
            }else{
                console.log("未知错误")
            }
        });
    },
    
}
export default actions;