import { fromJS, Record,Map} from 'immutable';
import {TERRACERULEREDU} from '../consts/ActTypes';

let initState = fromJS({

    edit_visible:false,
    add_visible:false,   
    detail_loading:false,
    list_loading: false,
    list: {
        dataSource: [],
    },
    add:{
        terraceRuleList: {},
    },
    edit:{
        terraceRuleList: {},
    }

});

const TerraceRuleRedu = (state =initState, action) => {
    switch (action.type) {
        case TERRACERULEREDU:
            return action.state;
        default:
            return state;
    }
}

export default TerraceRuleRedu;