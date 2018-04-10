/**
 * Created by MW on 2017/3/13.
 */
import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import { TREE } from '../consts/ActTypes';
import { PERSONMANAGE} from '../consts/ActTypes'
import PersonMangerAct from '../actions/PersonManegeAct'
import MemberManageAct from '../actions/MemberManageAct'
import { TABSREDU } from '../consts/ActTypes';
let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}
let actions = {
    reqJson:{
        conditions: [
            {
                field: "status",
                value: 1,
                operation: 0
            }
        ],
        relations: "status"
    },
    //去获取左侧树结构
    getDepartments: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.emptyData());
        return ReqApi.post({
            url: Urls.DEPARTMENT_LIST,
            pm:actions.reqJson
        }).then((json) => {
                if (json.status == 2000){
                    dispatch(actions.setData([json.data]));
                    let val = {
                        key: getState()[TREE].get('activeDepartment')?getState()[TREE].get('activeDepartment'):json.data.deptCode,
                        // departNum: json.data.children? json.data.children.length : 0,
                        // deptNum: json.data.deptNum,
                        // departLeader: json.data.deptMgrName,
                        // departName: json.data.deptName
                    }
                    dispatch(MemberManageAct.DepartInfo(val));
                } else {
                    let state = getState()[TREE].set('loading',false);
                    dispatch({type: TREE, state});
                }
        });
    },
    //清空存储的部门code
    emptyDepartment:() => (dispatch, getState) => {
        if(getStateFun(getState).get('tabs').some((tab) => {
                return tab.key == 'member'
            })){
            let state = getState()[TREE].set('activeDepartment','');
            dispatch({type: TREE, state});
        }
    },
    //清空数据
    emptyData: () => (dispatch, getState) => {
        let state = getState()[TREE].set('data',[]).set('loading',true);
        dispatch({type: TREE, state});
    },
    //设置data的值，以及loading
    setData: (val) => (dispatch, getState) => {
        let state = getState()[TREE].set('data', val).set('loading',false);
        dispatch({type: TREE, state});
    },
    onSelect: (info) => (dispatch, getState) => {
        let val = {
            key: info.node.props.deptCode,
            // departNum: info.node.props.children? info.node.props.children.length : 0,
            // deptNum: info.node.props.deptNum,
            // departLeader: info.node.props.deptMgrName,
            // departName: info.node.props.deptName
        };

        let selectDisEmployees = getState()[PERSONMANAGE].get('selectDisEmployees'),
            selectOrgChart = getState()[PERSONMANAGE].get('selectOrgChart');

        let state = getState()[TREE].set('activeDepartment',info.node.props.deptCode)
            .set('selectDisEmployees',!selectDisEmployees).set('selectOrgChart',!selectOrgChart);
        dispatch({type: PERSONMANAGE, state})
        dispatch({type: TREE, state});
        dispatch(PersonMangerAct.disableEmployees(2,2));
        dispatch(MemberManageAct.DepartInfo(val));
    }
}



export default actions