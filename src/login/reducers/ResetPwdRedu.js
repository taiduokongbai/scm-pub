import { fromJS, Record ,Map} from 'immutable';
import { RESETPWDREDU }from '../consts/ActTypes';

let initState = fromJS({
    nextStepLoading: false,
    submitLoading: false,
    submitVisible:false,
    showPicCode:false,
    nextStepVisible:true,
    nextStepDisabled:false,
    checkPhone:{
        phoneNo:null,
        SMSCaptcha: null,
        imgCaptcha:"",
        module:"login_psw",
    },
    resetPsw:{
        phoneNo:null,
        newPassword:null,
    }
});

const ResetPwdRedu = (state = initState, action) => {
    
    switch (action.type) {
        case RESETPWDREDU:
            return action.state;    
        default:    
            return state;
    }
}

export default ResetPwdRedu;


