import React,{Component} from "react";
import { Modal, message } from '../../base/components/AntdComp';;
import { connect } from 'react-redux';
import actions from '../actions/PersonalCenterAct';
import ChangePswSubmitComp from '../components/ChangePswSubmitComp';
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig'

class ChangePswSubmitCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    handleSubmit = (data) => {
        let { handleSubmit, handleCancel,getPersonalInfo } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                //message.success('密码修改成功,请重新登录')
                window.location.href = prefix+prefixCh+"login.html?success=true";                    
            }else{
                console.log("未知错误")
            }
        });
    }
    
    render() {
        let { visible } = this.props;
        return (
            visible ?
                <ChangePswSubmitComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    className='change-psw-submit'
                /> : null
        );
    }
}

// BindPhoneCont.defaultProps = {
//     title: T.ADD,
// }


const mapStateToProps = (state) => ({
    visible: state.PersonalCenterRedu.get('change_psw_submit_visiable'),
    loading: state.PersonalCenterRedu.get('change_psw_loading'),
})
const mapDispatchToProps = (dispatch) => ({
    getPersonalInfo: () => {dispatch( actions.getPersonalInfo())},
     handleCancel: () => { dispatch(actions.changePswSubmitVisiable(false)) },
     handleSubmit: (data) => dispatch(actions.changePswSubmit(data)),
})


export default connect(mapStateToProps,mapDispatchToProps)(ChangePswSubmitCont);
