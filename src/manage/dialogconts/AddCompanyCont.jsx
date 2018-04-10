import React,{Component} from "react";
import { Modal, message,Spin } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import CompanyAct from '../actions/CompanyAct';
import AddressAct from '../../main/actions/AddressAct';
import AddCompanyComp from '../components/AddCompanyComp';

class AddCompanyCont extends Component{
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        let { loading, handleSubmit, handleCancel, tablePaging } = this.props;
        data.companyAddr.isReg = 1;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                tablePaging();
            };
        });
    }
    render() {
        let { visible } = this.props;
        return (
            visible ?
                <AddCompanyComp
                    {...this.props}
                    onOk={this.handleSubmit}
                />: null
        );
    }
}

AddCompanyCont.defaultProps = {
    title: "新建公司",
    width:832,
}

const mapStateToProps = (state) => ({
    visible: state.CompanyRedu.get('add_company_visiable'),
    loading: state.CompanyRedu.get('companyLoading'),
    tenant:state.CompanyRedu.get('tenant'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(CompanyAct.AddCompanyVisiable(false)) },
    handleSubmit: (data) => { return dispatch(CompanyAct.AddCompany(data)) },
    AddAddressVisiable: () => { dispatch(AddressAct.AddAddressVisiable(true)); },
    TenantList: (pm) => {return dispatch(CompanyAct.TenantList(pm)) },
})


export default connect(mapStateToProps,mapDispatchToProps)(AddCompanyCont);
