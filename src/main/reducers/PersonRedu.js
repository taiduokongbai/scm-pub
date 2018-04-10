import { fromJS, Record ,Map} from 'immutable';
import { PERSONREDU }from '../consts/ActTypes';

let initState = fromJS({
    unreadStaffList: {
        list: [],
        unreadStaffFlag: 1,
        page:1,
        total:'',
    },
    employeesList:[],
    sidebarLoading:false,
    Loading: false,
});

const PersonRedu = (state = initState, action) => {
    switch (action.type) {
        case PERSONREDU:  
            return action.state;    
        default:    
            return state;
    }
}

export default PersonRedu;