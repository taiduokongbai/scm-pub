import React,{Component} from "react";
import { Modal, message } from '../../base/components/AntdComp';;
import { connect } from 'react-redux';
import actions from '../actions/PersonalCenterAct';
import BindPhoneNextStepComp from '../components/BindPhoneNextStepComp';

class BindPhoneNextStepCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    handleSubmit = (data) => {
        let { BindPhoneNextStep, handleCancel,bindPhoneVisiable } = this.props;
        
        BindPhoneNextStep(data).then(json => {
            if (json.status === 2000) {
                message.success("验证密码成功")
                handleCancel();
                bindPhoneVisiable();
            }else{
                console.log("未知错误")
            }
        });
    }
    
    render() {
        let { visible } = this.props;
        return (
            visible ?
                <BindPhoneNextStepComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    className='bind-phone-next-step'
                /> : null
        );
    }
}


const mapStateToProps = (state) => ({
    visible: state.PersonalCenterRedu.get('bind_phone_nextstep_visiable'),
    loading: state.PersonalCenterRedu.get('bind_phone_loading'),
})
const mapDispatchToProps = (dispatch) => ({
     handleCancel: () => { dispatch(actions.bindPhoneNextstepVisiable(false)) },
     bindPhoneVisiable: () => { dispatch(actions.bindPhoneVisiable(true)) },
     BindPhoneNextStep: (data) => dispatch(actions.BindPhoneNextStep(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(BindPhoneNextStepCont);
