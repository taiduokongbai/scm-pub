import { fromJS, Record,List } from "immutable";
import { APPROVEFORMEREDU } from "../consts/ActTypes";

let initState = fromJS({
    pagination:{},
    approveFormeList:[],
    approveFormeListScroll:true,
    approveDoneList:[],
    approveDoneListScroll:true,
    employeesList:[],
    sidebarLoading:false,
    tableLoading:false,
});

const FlowRedu = (state = initState, action) => {
    switch (action.type) {
        case APPROVEFORMEREDU:
            return action.state;
        default:
            return state;
    }
}
export default FlowRedu;