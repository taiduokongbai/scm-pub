import React, { Component } from "react";
import { Modal, message, Spin } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import CompanySetAct from '../actions/CompanySetAct';
import AddressAct from '../../main/actions/AddressAct';
import EditCompanyComp from '../components/EditCompanyComp';
class EditCompanyCont extends Component {
    constructor(props, context) {
        super(props, context);

    }
    handleSubmit = (data) => {
        let { handleSubmit, handleCancel } = this.props;
        data.companyAddr.isReg = 1;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                message.success('编辑公司成功!');
                handleCancel();
            }
        });
    }
    render() {
        let { visible } = this.props;

        return (
            visible ?
                <EditCompanyComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

EditCompanyCont.defaultProps = {
    title: "编辑公司",
    width: 832,
}

const mapStateToProps = (state) => ({
    visible: state.CompanySetRedu.get('edit_company_visiable'),
    loading: state.CompanySetRedu.get('positionLoading'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(CompanySetAct.AddPositionVisiable(false)) },
    handleSubmit: (data) => { return dispatch(CompanySetAct.EditPosition(data)) },
    EditAddressVisiable: (id) => { dispatch(AddressAct.EditAddressVisiable(true, id)); },
})


export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyCont);
