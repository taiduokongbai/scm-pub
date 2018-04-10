import { ReqApi } from '../../base/services/ReqApi'
import Urls from '../consts/OaUrls';
import { APPROVEFORMEREDU } from '../consts/ActTypes';
const getStateFun = (getState) => getState()[APPROVEFORMEREDU]
const actions = {
    TabLoading: (value) => (dispatch, getState) => {
        let state = getStateFun(getState).set('tableLoading', value);
        dispatch({ type: APPROVEFORMEREDU, state });
    },
    SetSidebarLoading: (value) => (dispatch, getState) => {
        let state = getStateFun(getState).set('sidebarLoading', value);
        dispatch({ type: APPROVEFORMEREDU, state });
    },
    SetApproveList: (data,listName) => (dispatch, getState) => {
        let state = getStateFun(getState);
        let { total, page, pageSize,list } = data;
        if(page == 1){
            state = state.set(listName,list);
        }else if(page > 1){
            let newdata = state.get(listName).concat(list);
            state = state.set(listName,newdata);
        }
        state = state.set("pagination", { total, page, pageSize });
        if(Math.ceil(total/pageSize) == page){
            state = state.set(listName+"Scroll",false);
        }else{
            state = state.set(listName+"Scroll",true);
        }
        dispatch({ type: APPROVEFORMEREDU, state });
    },
    SetEmployeesList: (data) => (dispatch, getState) => {
        let state = getStateFun(getState);
        // let { total, page, pageSize,list } = data;
        state = state.set("employeesList",data);
        dispatch({ type: APPROVEFORMEREDU, state });
    },
    approveInvalid: (pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: Urls.WF_FINISH_INVALID,
            pm
        }).then((json) => {
            return json.status===2000;
        });
    },
    loadApproveDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SetSidebarLoading(true));
        return ReqApi.get({
            url: Urls.WF_FINISH_INFO,
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
            _url = Urls.WF_APPROVAL_AGREE;
        }else if(pm.type == 2){
            _url = Urls.WF_APPROVAL_REJECT;
        }else if(pm.type == 3){
            _url = Urls.WF_APPROVAL_SIGN;
        }
        return ReqApi.post({
            url: _url,
            pm
        }).then((json) => {
            dispatch(actions.SetSidebarLoading(false));
            return json.status===2000;
        });
    },
    loadApproveForMeList: (pm = {flag:0}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        pm.page = pm.page || 1;
        pm.pageSize = pm.pageSize || 15;
        return ReqApi.get({
            url: Urls.WF_APPROVAL_LIST,
            pm
        }).then((json) => {
            dispatch(actions.TabLoading(false));
            if(json.status===2000){
                if(pm.flag == 0)
                    dispatch(actions.SetApproveList(json.data,"approveFormeList"));
                else
                    dispatch(actions.SetApproveList(json.data,"approveDoneList"));
            }
        });
    },
    loadEmployeesList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.WF_EMPLOYEES_LIST,
            pm
        }).then((json) => {
            if(json.status===2000){
                let _data = JSON.parse(json.data);
                dispatch(actions.SetEmployeesList(_data));
            }
        });
    },
}

export default actions;