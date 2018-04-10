import React,{Component} from "react";
import { Modal, message } from "../../base/components/AntdComp";
import { connect } from 'react-redux';
import actions from '../actions/PersonalCenterAct';
import BindPhoneComp from '../components/BindPhoneComp';

class BindPhoneCont extends Component{
    constructor(props, context) {
        super(props, context); 
    }
    handleSubmit = (data) => {
        let { handleSubmit, handleCancel,getPersonalInfo } = this.props;
        handleSubmit(data).then(json => {
            if(json.status===2000){
                message.success("绑定成功")
                handleCancel();
                getPersonalInfo();
            }
        });
    }
    
    render() {
        let { visible } = this.props;
        return (
            visible ?
                <BindPhoneComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    className='bind-phone-modal'
                /> : null
        );
    }
}


const mapStateToProps = (state) => ({
    visible: state.PersonalCenterRedu.get('bind_phone_visiable'),
    loading: state.PersonalCenterRedu.get('bind_phone_loading'),
    showPicCode:state.PersonalCenterRedu.get('showPicCode'),
})
const mapDispatchToProps = (dispatch) => ({
     getPersonalInfo: () => {dispatch( actions.getPersonalInfo())},
     sendPhoneCodeTo: (data) => { dispatch(actions.sendPhoneCode(data)) },
     handleCancel: () => { dispatch(actions.bindPhoneVisiable(false)) },
     handleSubmit: (data) => dispatch(actions.bindPhoneSubmit(data)),
})


export default connect(mapStateToProps,mapDispatchToProps)(BindPhoneCont);
