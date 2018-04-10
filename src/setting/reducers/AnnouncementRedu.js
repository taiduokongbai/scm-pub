import { fromJS, Record } from 'immutable'
import { ANNOUNCEMENTREDU } from '../consts/ActTypes'
let initialData = fromJS({
    announcementList: {
        list: [],
        scrollF: true,
        flag: 1,
        page:1
    },
    Loading: false,
});
const AnnouncementRedu = (state = initialData, action) => {
    switch (action.type) {
        case ANNOUNCEMENTREDU:
            return action.state;
        default:
            return state;
    }
}

export default AnnouncementRedu;