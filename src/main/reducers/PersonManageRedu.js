import { fromJS, Record ,Map} from 'immutable';
import { PERSONMANAGE } from '../consts/ActTypes'

let initState = fromJS({
    changetable: 2,
    side_visible:false,
    selectDisEmployees:false,
    selectOrgChart:true
});

let PersonManageRedu = (state = initState, action) => {
    switch (action.type) {
        case PERSONMANAGE:
            return action.state;
        default:
            return state;
    }
}

export default PersonManageRedu
