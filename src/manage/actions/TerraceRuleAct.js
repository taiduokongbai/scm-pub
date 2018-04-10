import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import CodeRuleUrls from '../../base/consts/CodeRuleUrls';
import {TERRACERULEREDU} from '../consts/ActTypes';
import { fromJS, Record,Map} from 'immutable';
import { message } from '../../base/components/AntdComp';
const page = { 'businessType':4,'page': 1, 'pageSize': 10 };
const actions = {

    Loading: (name,value) => (dispatch, getState) => {
        let state = getState()[TERRACERULEREDU].set(name, value);
        dispatch({ type: TERRACERULEREDU, state });
    },

//列表
    TerraceRuleList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading('list_loading',true));
        return ReqApi.get({
            url: CodeRuleUrls.CODERULE_GETLIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let { list, total, page, pageSize } = json.data;
                let state = getState()[TERRACERULEREDU].setIn(['list', 'dataSource'], list)
                    .setIn(['list', 'paging'], { total, current: page, pageSize });
                dispatch({ type: TERRACERULEREDU, state });
            }
            dispatch(actions.Loading('list_loading',false));
            return json;
        });
    },

//删除
    TerraceRuleDelete: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading('list_loading',true));
        return ReqApi.post({
            url: CodeRuleUrls.CODERULE_DELETE,
            pm
        }).then((json) => {
            if (json.status == 2000) {
               dispatch(actions.TerraceRuleList(page));
            }
            dispatch(actions.Loading('list_loading',false));
            return json;
        });
    },

//改变状态
    TerraceRuleStatus: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading('list_loading',true));
        return ReqApi.post({
            url: CodeRuleUrls.CODERULE_ISDISABLE,
            pm
        }).then((json) => {
            if (json.status == 2000) {
               dispatch(actions.TerraceRuleList(page));
            }
            dispatch(actions.Loading('list_loading',false));
            return json;
        });
    },  

//visible的状态
    OpenAddTerraceRule: (isTrue) => (dispatch, getState) => {
        let state = getState()[TERRACERULEREDU].set('add_visible',isTrue);
        dispatch({ type: TERRACERULEREDU, state });
    },

    OpenEditTerraceRule: (isTrue) => (dispatch, getState) => {
        let state = getState()[TERRACERULEREDU].set('edit_visible',isTrue);
        dispatch({ type: TERRACERULEREDU, state });
    },

//新增
    AddTerraceRuleData: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading('detail_loading',true));
        return ReqApi.post({
            url: CodeRuleUrls.CODERULE_ADD,
            pm
        }).then((json) => {
            if(json.status==2000){
                message.success('新增成功');
                dispatch(actions.TerraceRuleList(page));
                dispatch(actions.OpenAddTerraceRule(false));
            }
            dispatch(actions.Loading('detail_loading',false));
            
            return json;
        });
    }, 

//编辑
    EditTerraceRuleData: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading('detail_loading',true));
        return ReqApi.post({
            url: CodeRuleUrls.CODERULE_UPDATE,
            pm
        }).then((json) => {
            if(json.status==2000){
                message.success('编辑成功');
                dispatch(actions.TerraceRuleList(page));
                dispatch(actions.OpenEditTerraceRule(false));
            }
            dispatch(actions.Loading('detail_loading',false));
            
            return json;
        });
    }, 

//获取详情
    TerraceRuleDetail:(pm = {}) => (dispatch, getState) => {
         dispatch(actions.Loading('detail_loading',true));
         return ReqApi.get({
            url: CodeRuleUrls.CODERULE_GETDETAIL,
            pm
        }).then((json) => {
            if(json.status==2000){
                let state = getState()[TERRACERULEREDU].setIn(['edit','terraceRuleList'], json.data);
                dispatch({ type: TERRACERULEREDU, state });
            }
            dispatch(actions.Loading('detail_loading',false));
            return json;

        });
    },  
}

export default actions;