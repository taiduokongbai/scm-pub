import {ReqApi} from '../../base/services/ReqApi'
import {Urls} from '../../base/consts/Urls'
import OaUrls from '../../setting/consts/OaUrls'
import {PERSONREDU} from '../consts/ActTypes'

const actions = {
    Loading: (value) => (dispatch, getState) => {
        let state = getState()[PERSONREDU].set('loading', value);
        dispatch({type: PERSONREDU, state})
    },
    SetSidebarLoading: (value) => (dispatch, getState) => {
        let state = getState()[PERSONREDU].set('sidebarLoading', value);
        dispatch({ type: PERSONREDU, state });
    },
    SetEmployeesList: (data) => (dispatch, getState) => {
        let state = getState()[PERSONREDU].set("employeesList",data);
        dispatch({ type: PERSONREDU, state });
    },
    //我的待办
    loadApproveForMeList: (pm = {flag: 0}) => (dispatch, getState) => {
        return ReqApi.get({
            url: OaUrls.WF_APPROVAL_LIST,
            pm
        }).then((json) => {
            return json;
        });
    },
    loadApproveDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SetSidebarLoading(true));
        return ReqApi.get({
            url: OaUrls.WF_FINISH_INFO,
            pm
        }).then((json) => {
            dispatch(actions.SetSidebarLoading(false));
            if(json.status===2000){
                return json.data;
            }
        });
    },
    submitOpinion: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SetSidebarLoading(true));
        let _url;
        if(pm.type == 1){
            _url = OaUrls.WF_APPROVAL_AGREE;
        }else if(pm.type == 2){
            _url = OaUrls.WF_APPROVAL_REJECT;
        }else if(pm.type == 3){
            _url = OaUrls.WF_APPROVAL_SIGN;
        }
        return ReqApi.post({
            url: _url,
            pm
        }).then((json) => {
            dispatch(actions.SetSidebarLoading(false));
            return json.status===2000;
        });
    },
    loadEmployeesList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: OaUrls.WF_EMPLOYEES_LIST,
            pm
        }).then((json) => {
            if(json.status===2000){
                let _data = JSON.parse(json.data);
                dispatch(actions.SetEmployeesList(_data));
            }
        });
    },
    //待处理订单
    getOrderStatistics: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: OaUrls.GET_ORDERSTATISTICS,
            pm
        }).then((json) => {
            return json;
        })
    },
    getUnreadStaffList: (pm = {}) => (dispatch, getState) => {
        //  dispatch(actions.Loading(true));
        return ReqApi.get({
            url: Urls.GET_ALL_LIST,
            pm
        }).then(json => {
            if (json.status == 2000) {
                dispatch(actions.GetPersonList(json.data));
            }
            //   dispatch(actions.Loading(false));
            return json;
        });
    },
    GetPersonList: (data) => (dispatch, getState) => {
        let {list, total, page, pageSize} = data;
        let state = getState()[PERSONREDU].setIn(["unreadStaffList", "list"], list).setIn(["unreadStaffList", "total"], total);
        dispatch({type: PERSONREDU, state});
    },
    getNoticeList: (pm = {page: 1, pageSize: 1}) => {
        return ReqApi.get({
            url: Urls.GET_NOTICE_LIST,
            pm
        }).then(json => {
            return json;
        });
    },
    readOrder: (pm = {}) => {
        return ReqApi.post({
            url: Urls.GET_NEWS_STATUS,
            pm
        }).then(json => {
            return json;
        });
    },
}

export default actions