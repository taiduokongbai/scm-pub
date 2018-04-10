
import { fromJS, Record } from 'immutable'
import { STAFFREMINDREDU } from '../consts/ActTypes'

let initialData = fromJS({
    unreadStaffList: {
        list: [],
        scrollF: true,
        unreadStaffFlag: 1,
        page:1
    },
    readStaffList: {
        list: [],
        scrollF: true,
        unreadStaffFlag: 2,
        page:1
    },
    Loading: false,
});

const StaffRemindRedu = (state = initialData, action) => {
    switch (action.type) {
        case STAFFREMINDREDU:
            return action.state;
        default:
            return state;
    }
}

export default StaffRemindRedu;