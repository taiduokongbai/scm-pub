import React, { Component } from "react";
import { Modal, message } from '../../base/components/AntdComp';;
import { connect } from 'react-redux';
import PersonalCenterAct from '../actions/PersonalCenterAct';
import EditImageComp from '../components/EditImageComp';

class EditImageCont extends Component {
    constructor(props, context) {
        super(props, context);

    }
    handleSubmit = (data) => {
        const { handleSubmit, handleCancel,  } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                // handleCancel();
            };
        });
    }
    render() {
        const { visible } = this.props;
        return (
            visible ?
                <EditImageComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

EditImageCont.defaultProps = {
    title: "修改头像",
    okText: '保存',
    width: 600,
    maskClosable: false,
}

const mapStateToProps = (state) => ({
    visible: state.PersonalCenterRedu.get('editImageVisiable'),
    loading: state.PersonalCenterRedu.get('editImageLoading'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(PersonalCenterAct.EditImageVisiable(false)) },
    handleSubmit: (profilePhoto) => { return dispatch(PersonalCenterAct.EditImage({ profilePhoto })) },
    getPersonalInfo: () => dispatch(PersonalCenterAct.getPersonalInfo())
})


export default connect(mapStateToProps, mapDispatchToProps)(EditImageCont);
