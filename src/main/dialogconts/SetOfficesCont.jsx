import React,{Component} from "react";
import { connect } from 'react-redux';
import SetOfficesAct from '../actions/SetOfficesAct';
import SetOfficesComp from '../components/SetOfficesComp';
import MemberManageAct from '../actions/MemberManageAct';
import TreeAct from '../actions/TreeAct'

class SetOfficesCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    handleSubmit = (data) => {
        const { handleSubmit, handleCancel ,getMemberInfoList ,departinfo, getDepartments} = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                // getMemberInfoList({ deptCode: departinfo.key, employeeName: '', phone: '',page: 1,pageSize:10});
                getDepartments();
            };
        });
    }
    render(){
        const{visible}=this.props;
        return(
            visible?
            <SetOfficesComp
                {...this.props}
                onOk={this.handleSubmit}
                className='set-offices-modal'
            />:null
        )
    }
}

SetOfficesCont.defaultProps={
    title:"设置办公地址",
    width: '500px'
}

const mapStateToProps = (state) => ({
    visible: state.SetOfficesRedu.get('set_offices_visible'),
    loading: state.SetOfficesRedu.get('setOfficesLoading'),
    officesAddress: state.SetOfficesRedu.get('officesAddress'),
    memberCodeArr: state.MemberManageRedu.get('memberCodeArr'),
    departinfo: state.MemberManageRedu.get('departinfo'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(SetOfficesAct.SetOfficesVisiable(false)) },
    handleSubmit: (data) => { return dispatch(SetOfficesAct.SetOffices(data)) },  
    getSelectSOData:()=>{ dispatch(SetOfficesAct.getSelectSOData())},
    getMemberInfoList:(pm)=>{dispatch(MemberManageAct.getMemberInfoList(pm))},
    getDepartments:() => {dispatch(TreeAct.getDepartments())}
})

export default connect(mapStateToProps,mapDispatchToProps)(SetOfficesCont);