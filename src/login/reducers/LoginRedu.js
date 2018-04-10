import { fromJS, Record ,Map} from 'immutable';
import { LOGINREDU }from '../consts/ActTypes';

let initState = fromJS({
    showPicCode:false,
    acctType:0,
    loginLoading:false,
    loginVisiable:false,
    dataSource:[],
    forgetPwdVisiable:false,
    spinning:false,
    tokenId:"",
});

const LoginRedu = (state = initState, action) => {
    switch (action.type) {
        case LOGINREDU:
            return action.state;    
        default:    
            return state;
    }
}

export default LoginRedu;


