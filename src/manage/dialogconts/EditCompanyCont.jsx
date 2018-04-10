import React,{Component} from "react";
import { Modal, message,Spin } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import CompanyAct from '../actions/CompanyAct';
import AddressAct from '../../main/actions/AddressAct';
import EditCompanyComp from '../components/EditCompanyComp';

class AddCompanyCont extends Component{
    constructor(props, context) {
        super(props, context);

    }
    initData = () =>{
        let { getCompanyDetail, companyId ,TenantList} = this.props;
        if (companyId) {
            getCompanyDetail(companyId).then(json=>{
                TenantList({groupTenantCode:json.data.groupTenantCode,tenantName:json.data.groupTenantCode,status:1,page:1,pageSize:10})
            })
        }
    }

    handleSubmit = (data) => {
        let { loading, handleSubmit, handleCancel, tablePaging, onClear } = this.props;
        data.companyAddr.isReg = 1;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                // handleCancel();
                tablePaging();
            } ;
        });
    }

    render() {
        let { visible } = this.props;
        return (
            visible ?
                <EditCompanyComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    initData={this.initData}
                />: null
        );
    }
}

AddCompanyCont.defaultProps = {
    title: "编辑公司",
    width:832
}

const mapStateToProps = (state) => ({
    visible: state.CompanyRedu.get('edit_company_visiable'),
    loading: state.CompanyRedu.get('companyLoading'),
    position: state.CompanyRedu.get('position'),
    companyId: state.CompanyRedu.get('companyId'),
    tenant:state.CompanyRedu.get('tenant')
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCancel: () => { dispatch(CompanyAct.EditCompanyVisiable(false)) },
    handleSubmit: (data) => { return dispatch(CompanyAct.EditCompany(data)) },
    getCompanyDetail: (companyCode) => { return dispatch(CompanyAct.CompanyDetail({ companyCode })) },
    EditCompanyAddress: (value,addressCode,tenantCode) => { dispatch(AddressAct.EditCompanyAddress(value,addressCode,tenantCode)) },
    TenantList: (pm) => {return dispatch(CompanyAct.TenantList(pm)) },
})


export default connect(mapStateToProps,mapDispatchToProps)(AddCompanyCont);
