import React,{Component} from "react";
import {Button,Breadcrumb, Icon} from '../../base/components/AntdComp';;
import PersonalCenterComp from '../components/PersonalCenterComp';
import { connect } from 'react-redux'
import actions from '../actions/PersonalCenterAct'
import { fromJS, Record } from 'immutable';
import BindPhoneCont from '../dialogconts/BindPhoneCont'
import BindPhoneNextStepCont from '../dialogconts/BindPhoneNextStepCont'
import ChangePswSubmitCont from '../dialogconts/ChangePswSubmitCont'
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig'

class PersonalCenterCont extends Component{
    constructor(props,context){
        super(props,context);
    }


    acctTypeLink=()=>{
        if(this.props.state.personalInfo && this.props.state.personalInfo.acctType === 0){
            return <Breadcrumb.Item><a href={`${prefix}${prefixCh}main.html`}>首页</a></Breadcrumb.Item>
        }
        return <Breadcrumb.Item>首页</Breadcrumb.Item>
    }
    render(){
        return (
            <div className="inner-content">
                <div className="ew-breadcrumb">
                    <div className="breadcrum-inner">
                        <Breadcrumb separator=">">

                            {
                              this.acctTypeLink()
                            }

                            <Breadcrumb.Item>个人中心</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="inner-content-page">
                    <PersonalCenterComp {...this.props}/>
                </div>
                <BindPhoneCont {...this.props}/>
                <BindPhoneNextStepCont {...this.props}/>
                <ChangePswSubmitCont {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        state: state.PersonalCenterRedu.toJS()
    }
};

const mapDispatchToProps = (dispatch) => ({
    onClick: () => {
        dispatch(actions.EditImageVisiable(true))
    },
    bindPhoneVisiable:() => {dispatch( actions.bindPhoneVisiable(true))},
    bindPhoneNextstepVisiable:() => {dispatch( actions.bindPhoneNextstepVisiable(true))},
    changePswSubmitVisiable:() => {dispatch( actions.changePswSubmitVisiable(true))},
    getPersonalInfo: () => {dispatch( actions.getPersonalInfo())},
   
})
export default connect( mapStateToProps, mapDispatchToProps )(PersonalCenterCont)
