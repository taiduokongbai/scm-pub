import React,{Component} from "react";
import { Modal, message } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import SiteAct from '../actions/SiteAct';
import AddSiteComp from '../components/AddSiteComp';
import LinkAgeStore from '../../base/stores/LinkAgeStore';

class AddSiteCont extends Component{
    constructor(props, context) {
        super(props, context);
        this.linkStore = new LinkAgeStore();
    }
    handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                message.success("新建成功");
                handleCancel();
                tablePaging();
            }
        });
    }
    render() {
        const { visible } = this.props;
        return (
            visible ?
                <AddSiteComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    store={this.linkStore}
                /> : null
        );
    }
}

AddSiteCont.defaultProps = {
    title: "新建站点",
    width: 766,
    type: 'add'
}

const mapStateToProps = (state) => ({
    visible: state.SiteRedu.get('add_site_visiable'),
    loading: state.SiteRedu.get('siteLoading'),
    orgList: state.SiteRedu.get('orgList'),
    addressCodeRule: state.SiteRedu.get('addressCodeRule'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(SiteAct.AddSiteVisiable(false)) },
    handleSubmit: (data) => { return dispatch(SiteAct.AddSite({ list: [data] })) },
    OrgList: (pm) => { return dispatch(SiteAct.OrgList(pm)) },
    OrgDetail: (id) => { return dispatch(SiteAct.OrgDetail({ id })) },
    AddressDetail: (addressCode) => { return dispatch(SiteAct.AddressDetail({ addressCode })) },
})


export default connect(mapStateToProps,mapDispatchToProps)(AddSiteCont);