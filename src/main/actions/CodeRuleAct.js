import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import CodeRuleUrls from '../../base/consts/CodeRuleUrls';
import {CODERULEREDU} from '../consts/ActTypes';
import { fromJS, Record, Map } from 'immutable';
import * as AT from '../consts/ActTypes';

const actions = {

    CodeRuleLoading: (tabLoading) => (dispatch, getState) => {
        let state = getState()[AT.CODERULEREDU].setIn(['tabLoading'], tabLoading);
        dispatch({ type: AT.CODERULEREDU, state })
    },

    modulLoading: (tag) => (dispatch, getState) => {
        let state = getState()[AT.CODERULEREDU].setIn(['modulLoading'], tag);
        dispatch({ type: AT.CODERULEREDU, state })
    },

    setActiveKey: (activeKey) => (dispatch, getState) => {
        let state = getState()[AT.CODERULEREDU].setIn(['businessType'], activeKey);
        dispatch({ type: AT.CODERULEREDU, state });
    },

    CodeRuleList: (pm = {}) => (dispatch, getState) => { 
        dispatch(actions.CodeRuleLoading(true));
        return ReqApi.get({
            url: Urls.CODERULE_GETLIST,
            pm
        }).then(json => {
            if (json.status == '2000') {
                dispatch(actions.initTable(json.data));
                dispatch(actions.CodeRuleLoading(false));
                return json;
            }
            dispatch(actions.CodeRuleLoading(false));
        })
    },

    initTable: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[AT.CODERULEREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: AT.CODERULEREDU, state })
    },

    changeModule: (type, visible, codeIndex) => (dispatch, getState) => {
        if (type == 'add') {
            let state = getState()[AT.CODERULEREDU].set('detail', {})
            dispatch({ type: AT.CODERULEREDU, state })
        }
        let state = getState()[AT.CODERULEREDU].set(`${type}Visible`, visible)
            .set('codeIndex', codeIndex)
        dispatch({ type: AT.CODERULEREDU, state })
    },

    addCodeRule: (pm = {}) => (dispatch, getState) => { 
        dispatch(actions.modulLoading(true));
        return ReqApi.post({
            url: Urls.CODERULE_ADD,
            pm
        }).then(json => { 
            dispatch(actions.modulLoading(false));
            return json;
        })
    },
    editCodeRule: (pm = {}) => (dispatch, getState) => { 
        dispatch(actions.modulLoading(true));
        ReqApi.get({
            url: Urls.CODERULE_GETDETAIL,
            pm
        }).then(json => { 
            if (json.status == "2000") {
                let state = getState()[AT.CODERULEREDU].set('detail', json.data)
                    .set('codeRuleId', json.data.id);
                dispatch({ type: AT.CODERULEREDU, state });
                dispatch(actions.modulLoading(false));
            }
        })
    },
    updateCodeRule: (pm = {}) => (dispatch, getState) => { 
        dispatch(actions.modulLoading(true));
        return ReqApi.post({
            url: Urls.CODERULE_UPDATE,
            pm
        }).then(json => { 
            dispatch(actions.modulLoading(false));
            return json;
        })
    },
    delCodeRule: (pm = {}) => (dispatch, getState) => { 
        return ReqApi.post({
            url: Urls.CODERULE_DELETE,
            pm
        }).then(json => { 
            if (json.status == "2000") { 
                return json;
            }
        })
    },
    isDisable: (pm = {}) => (dispatch, getState) => { 
        return ReqApi.post({
            url: Urls.CODERULE_ISDISABLE,
            pm
        }).then(json => { 
            if (json.status == "2000") { 
                return json;
            }
        })
    }
    
   
}

export default actions