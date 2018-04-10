import { ReqApi, ReqApiPhoto } from '../../base/services/ReqApi'
import { Urls,LoginUrls } from '../../base/consts/Urls'
import { PERSONALCENTERREDU } from '../consts/ActTypes'
import { message } from '../../base/components/AntdComp';
import LayoutTopAct from '../../main/actions/LayoutTopAct';

const actions = {
    // 被选中数量
    GetPersonalInfoDetails: (data) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('personalInfo', data);
        dispatch( {type: PERSONALCENTERREDU, state})
    },
    bindPhoneVisiable: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('bind_phone_visiable', value);
        dispatch( {type: PERSONALCENTERREDU, state} )
    },
    bindPhoneNextstepVisiable: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('bind_phone_nextstep_visiable', value);
        dispatch( {type: PERSONALCENTERREDU, state} )
    },
    changePswSubmitVisiable: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('change_psw_submit_visiable', value);
        dispatch( {type: PERSONALCENTERREDU, state} )
    },
    bindPhoneLoading: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('bind_phone_loading', value);
        dispatch({ type: PERSONALCENTERREDU, state })
    },
    ChangePswLoading: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('change_psw_loading', value);
        dispatch({ type: PERSONALCENTERREDU, state })
    },
    side_Loading: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('side_Loading', value);
        dispatch( {type: PERSONALCENTERREDU, state} )
    },
    getPersonalInfo: (pm={}) => (dispatch, getState) => {
        // 获取登录 个人信息
        dispatch(actions.side_Loading(true))
        ReqApi.get({
            url: Urls.GET_PERSONAL_INFO,
            pm
        }).then(json => {
            if(json.status == 2000){
                if (json.data) {
                    dispatch(actions.GetPersonalInfoDetails(json.data));
                    dispatch(LayoutTopAct.GetPersonalInfo(json.data));
                }
            }
            dispatch(actions.side_Loading(false))
        })
    },
    ShowPicCode: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('showPicCode', value);
        dispatch({ type: PERSONALCENTERREDU, state });
    },
    //发送短信验证码
    sendPhoneCode: (pm={}) => (dispatch, getState) => {
        ReqApi.get({
            url: LoginUrls.LOGIN_GET_SMSWITH,
            pm,
        }).then((json) => {
             if(json.status===2000){
                message.success('获取短信验证码成功')
            }else if(json.status===4121){
                message.error('手机号不存在')
            }else if(json.status===4100){
                dispatch(actions.ShowPicCode(true));
            }else{
                console.log("未知错误")
            }
        })
    },
    //修改手机
    bindPhoneSubmit: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.bindPhoneLoading(true));
        return ReqApi.post({
            url: LoginUrls.LOGIN_BIND_PHONE,
            pm
        }).then(json => {
            dispatch(actions.bindPhoneLoading(false));
            return json;
        })
    },
    //验证原密码
    BindPhoneNextStep: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.bindPhoneLoading(true));
        return ReqApi.post({
            url: LoginUrls.LOGIN_CHECK_PSW,
            pm
        }).then(json => {
            dispatch(actions.bindPhoneLoading(false));
            return json;
        })
    },
    //修改密码
    changePswSubmit: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.ChangePswLoading(true));
        return ReqApi.post({
            url: LoginUrls.LOGIN_RESET_PSWWITH,
            pm
        }).then(json => {
            dispatch(actions.ChangePswLoading(false));
            return json;
        })
    },
    EditImageVisiable: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('editImageVisiable', value);
        dispatch({ type: PERSONALCENTERREDU, state })
    },
    EditImage: (pm = {}) => (dispatch, getState) => {
        return ReqApiPhoto.post({
            url: Urls.EDIT_PROFILE_PHOTO,
            pm
        }).then(json => {
            return json;
        })
    },
}

export default actions