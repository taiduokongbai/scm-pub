import { fromJS, Record ,Map} from 'immutable';
import { COMPANYREDU }from '../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    companyLoading: false,
    btnLoading:false,
    add_company_visiable: false,
    edit_company_visiable: false,
    sidebar_visiable: false,
    sidebar_loding:false,
    addressLoading: false,
    add_address_visiable: false,
    edit_address_visiable: false,
    addressDetl:"",
    companyId: null,
    addressId: null,
    dataSource: [],
    paging: {},
    record: {},
    editdata:{},
    address: {
       
    },
    addressCode:{}
}), next_state;

const CompanyRedu = (state = initState, action) => {
    switch (action.type) {
        case COMPANYREDU:
            return action.state;
        default:
            return state;
    }
}

export default CompanyRedu;