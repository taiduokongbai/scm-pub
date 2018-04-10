import { combineReducers } from "redux"
import CompanyRedu from './CompanyRedu'
import AddressRedu from '../../main/reducers/AddressRedu';
import TerraceRuleRedu from './TerraceRuleRedu';
import LayoutTopRedu from './LayoutTopRedu';

const rootReducer = combineReducers({
    CompanyRedu,
    AddressRedu,
    TerraceRuleRedu,
    LayoutTopRedu
})

export default rootReducer;