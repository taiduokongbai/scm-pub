import { fromJS, Record,Map} from 'immutable';
import {CODERULEREDU} from '../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    addVisible: false,
    editVisible: false,
    codeIndex:'',
    dataSource: [],
    codeRuleId:'',
    modulLoading: false,
    add: {},
    eidt: {},
    detail: {},
});

const CodeRuleRedu = (state =initState, action) => {
    switch (action.type) {
        case CODERULEREDU:
            return action.state;
        default:
            return state;
    }
}

export default CodeRuleRedu;