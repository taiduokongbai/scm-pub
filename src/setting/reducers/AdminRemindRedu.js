
import { fromJS, Record } from 'immutable'
import { ADMINREMINDREDU } from '../consts/ActTypes'

let initialData = fromJS({
    unreadAdminList: {
        list: [],
        scrollF: true,
        unreadAdminFlag: 1,
        page:1
    },
    readAdminList: {
        list: [],
        scrollF: true,
        unreadAdminlag: 2,
        page:1
    },
    Loading: false,
});

const AdminRemindRedu = (state = initialData, action) => {
    switch (action.type) {
        case ADMINREMINDREDU:
            return action.state;
        default:
            return state;
    }
}

export default AdminRemindRedu;