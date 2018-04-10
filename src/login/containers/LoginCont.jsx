import React,{Component} from 'react'
import LoginComp from '../components/LoginComp'
import ResetHeaderComp from '../components/ResetHeaderComp'
import FooterComp from '../components/FooterComp'
import CompanyListComp from '../components/CompanyListComp'
import CompanyEmptyComp from '../components/CompanyEmptyComp'
import CompanyDisabledComp from '../components/CompanyDisabledComp'
import ResetPwdCont from './ResetPwdCont'
import { connect } from 'react-redux'
import actions from '../actions/LoginAct'
import {prefix,prefix_route} from '../../base/consts/UrlsConfig'

class LoginCont extends Component{
    constructor(props, context) {
        super(props, context);
    }
    CompanyAdministrator=()=>{
        let length = this.props.dataSource.length;
        if(length==0){
            return <CompanyDisabledComp {...this.props}/>
        }else{
            return window.location.href=prefix+prefix_route+`/R/main/index?tab=member&tokenId=`+this.props.tokenId;
        }
    }
    Employee=()=>{
        let length = this.props.dataSource.length;
        if(length>1){
            return <CompanyListComp {...this.props}/>
        }else if(length==0){
            return <CompanyEmptyComp {...this.props}/>
        }else if(length==1){
            return window.location.href=prefix+prefix_route+`/main.html?tokenId=`+this.props.tokenId;
        }
    }
    SelectCompany=()=>{
        let {acctType} = this.props;
        switch(acctType){
            case 0:
                return <LoginComp {...this.props}/>;
                // return this.Employee();
            case 1:
                return <LoginComp {...this.props}/>;
                // return this.CompanyAdministrator();
            case 2:
                return window.location.href=prefix+prefix_route+`/manage.html?tokenId=`+this.props.tokenId;
            default:
                return <LoginComp {...this.props}/>;
        }
    }
    render(){
        let {loginVisiable,forgetPwdVisiable} = this.props;
        return (
            <div className="login-box">
                <ResetHeaderComp {...this.props}/>
                {forgetPwdVisiable?<ResetPwdCont {...this.props}/>:loginVisiable?this.SelectCompany():<LoginComp {...this.props}/>}
                <FooterComp {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => state.LoginRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    ForgetPwdBtn:() => dispatch(actions.ForgetPwdVisiable(true)),
    backBtn:() => dispatch(actions.Logout()),
    LoginSubmit: (data) => dispatch(actions.LoginSubmit(data)),
    CompanyList: (data) => dispatch(actions.CompanyList(data)),
    getLoginInfo:() => dispatch(actions.getLoginInfo()),
    LoginVisiable:(value) => dispatch(actions.LoginVisiable(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginCont);