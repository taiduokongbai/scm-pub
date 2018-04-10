import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/Urls';
import { IMPORTEMPLOYEEREDU } from '../consts/ActTypes';
import {message } from '../../base/components/AntdComp.js';
import TabsAct from '../actions/TabsAct';

const actions = {
    importViewLoading:(value)=>(dispatch,getState)=>{
        let state = getState()[IMPORTEMPLOYEEREDU].set('importViewLoading', value);
        dispatch({type:IMPORTEMPLOYEEREDU, state});
    },
    Percent:(value)=>(dispatch,getState)=>{
        let state = getState()[IMPORTEMPLOYEEREDU].set('percent', value);
        dispatch({type:IMPORTEMPLOYEEREDU, state});
    },
    AlertVisible:(value)=>(dispatch,getState)=>{
       let state=getState()[IMPORTEMPLOYEEREDU].set('alertVisible',value);
       dispatch({type:IMPORTEMPLOYEEREDU,state});
   },
    ProgressVisible:(value)=>(dispatch,getState)=>{
       let state=getState()[IMPORTEMPLOYEEREDU].set('progressVisible',value);
       dispatch({type:IMPORTEMPLOYEEREDU,state});
   },
    ImportViewVisiable:(value)=>(dispatch,getState)=>{
       let state=getState()[IMPORTEMPLOYEEREDU].set('importViewVisiable',value);
       dispatch({type:IMPORTEMPLOYEEREDU,state});
   },
    GetUpLoadFile: (data) => (dispatch, getState) => {
        let state = getState()[IMPORTEMPLOYEEREDU].set('errorExcelUrl', data.errorExcel);
        dispatch({ type: IMPORTEMPLOYEEREDU, state });
    },
    UpLoadFile: (pm={}) => (dispatch, getState) => {
        dispatch(actions.importViewLoading(true));
        return ReqApi.post({
            url: Urls.IMPORT_EXCEL,
            pm,
            callBack:true
        }).then((json) => {
            if(json.status===2000){
                dispatch(actions.ProgressVisible(true));
                message.success("导入成功");                
            }else if(json.status===4303){
                message.error(json.data.errorMessage); 
            }else if(json.status===4304){
                dispatch(actions.AlertVisible(true));
                dispatch(actions.GetUpLoadFile(json.data));            
            }
            dispatch(actions.importViewLoading(false));
            return json
        });
    },
}

export default actions;