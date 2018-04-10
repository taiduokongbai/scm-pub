import { combineReducers } from "redux"
import ResetPwdRedu from './ResetPwdRedu'
import LoginRedu from './LoginRedu'

const rootReducer = combineReducers({
	ResetPwdRedu,
	LoginRedu,
})

export default rootReducer;