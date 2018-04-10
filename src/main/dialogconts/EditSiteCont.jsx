import React,{Component} from "react";
import { connect } from 'react-redux';
import { Modal, message } from '../../base/components/AntdComp';
import SiteAct from '../actions/SiteAct';
import AddSiteComp from '../components/AddSiteComp';
import LinkAgeStore from '../../base/stores/LinkAgeStore';

class EditSiteComp extends AddSiteComp {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }

}

class EditSiteCont extends Component{
    constructor(props, context) {
        super(props, context);
        this.linkStore = new LinkAgeStore();
    }
    initData = () =>{
        const {loading, SiteDetail, siteId,handleCancel } = this.props;
        if (!loading && siteId) {
            SiteDetail(siteId).then(json => {
                if (json.status === 4352) {
                    handleCancel(null);
                };
            }).then(() => {
                this.linkStore.initData();
            });
        }
    }

    handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                message.success('编辑成功');
                handleCancel(null);
                tablePaging();
            };
        });
    }
    render() {
        const { edit_site_visiable, siteLoading } = this.props;
        return (
            edit_site_visiable ?
                <EditSiteComp
                    {...this.props}
                    visible={edit_site_visiable}
                    loading={siteLoading}
                    onOk={this.handleSubmit}
                    initData={this.initData}
                    store={this.linkStore}
                /> : null
        );
    }
}

EditSiteCont.defaultProps = {
    title: "编辑站点",
    width: 766,
    type: 'edit'
}

const mapStateToProps = (state) => state.SiteRedu.toJS();
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCancel: (id) => { dispatch(SiteAct.EditSiteVisiable(false,id)) },
    handleSubmit: (data) => { return dispatch(SiteAct.EditSite({ list: [data] })) },
    SiteDetail: (siteCode) => dispatch(SiteAct.SiteDetail({ siteCode })),
    OrgList: (pm) => { dispatch(SiteAct.OrgList(pm)) },
    OrgDetail: (id) => { return dispatch(SiteAct.OrgDetail({ id })) },
    AddressDetail: (addressCode) => { return dispatch(SiteAct.AddressDetail({ addressCode })) },
})


export default connect(mapStateToProps,mapDispatchToProps)(EditSiteCont);
