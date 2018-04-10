import { combineReducers } from "redux"
import CompanySetRedu from './CompanySetRedu'
import PersonalCenterRedu from './PersonalCenterRedu'
import AddressRedu from '../../main/reducers/AddressRedu';
import LayoutTopRedu from '../../main/reducers/LayoutTopRedu';
import StaffRemindRedu from './StaffRemindRedu'
import AdminRemindRedu from './AdminRemindRedu';
import ApproveForMeRedu from './ApproveForMeRedu';
import AnnouncementRedu from './AnnouncementRedu'


const rootReducer = combineReducers({
    AddressRedu,
    CompanySetRedu,
    PersonalCenterRedu,
    LayoutTopRedu,
    StaffRemindRedu,
    AdminRemindRedu,
    ApproveForMeRedu,
    AnnouncementRedu
})

export default rootReducer;