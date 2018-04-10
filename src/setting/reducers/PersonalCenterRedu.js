import { fromJS, Record  } from 'immutable'
import { PERSONALCENTERREDU } from '../consts/ActTypes'

let initialData = fromJS({
    personalInfo: {},
    bind_phone_visiable:false,
    bind_phone_loading:false,
    bind_phone_nextstep_visiable:false,
    change_psw_loading:false,
    change_psw_submit_visiable:false,
    pswOld:{
        password:null,
    },
    pswNew:{
        password:null,
        newPassword:null,
    },
    bindPhone:{
        phoneNo:null,
        SMSCaptcha:null,
        module:""
    },
    side_Loading: false,
    showPicCode:false,
});

const PersonalCenterRedu = ( state = initialData, action) => {
    switch (action.type) {
        case PERSONALCENTERREDU: 
            return action.state;
        default:
            return state;
    }
}

export default PersonalCenterRedu