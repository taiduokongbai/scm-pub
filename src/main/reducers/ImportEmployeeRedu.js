import { fromJS} from 'immutable';
import { IMPORTEMPLOYEEREDU }from '../consts/ActTypes';

let initState = fromJS({
    tabLoading:false,
    dataSource: [],
    paging:{},
    record: {},
    message:"",
    importViewLoading:false,
    importViewVisiable:false,
    progressVisible:false,
    percent:0,
    errorExcelUrl:"",
    alertVisible:false,
});

const ImportEmployeeRedu = (state = initState, action) => {
    switch (action.type) {
        case IMPORTEMPLOYEEREDU:  
            return action.state;    
        default:    
            return state;
    }
}

export default ImportEmployeeRedu;