import React from "react";
import {connect} from "react-redux";
import AuthoritySideComp from "../components/AuthoritySideComp";
import AuthorityAct from "../actions/AuthorityAct";
import SelectorAct from '../actions/SelectorAct';

class AuthoritySideCont extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            operable:false
        }
    }
    onTreeCheck = (keys, info) => {
        let poses = info.checkedNodesPositions.map(p => p.pos);
        this.props.setTreeChecked(keys, poses);
    }
    updataAuthority = (data)=>{
        let { treeChecked, poses } = this.props;
        data.resources = treeChecked;
        data.poses = poses;
        this.props.updataAuthority(data);
    }
    showSelDialog = ()=>{
        this.props.setSelVisible(true);
    }
    refreshMenber = (page)=>{
        let searchPm = {
            page:this.props.menPaging.page,
            pageSize:this.props.menPaging.pageSize,
            roleCode:this.props.menSearch.roleCode,
            empName:""
        };
        if(typeof page === "number"){
            searchPm = {...searchPm , page}
        }else if(typeof page === "string"){
            searchPm = {...searchPm , empName:page}
        }else{
            searchPm = {...searchPm , ...page}
        }
        this.props.getMenberList(searchPm);
    }
    deleteMenbers = ()=>{
        this.setState({operable:false});
        this.props.deleteMenbers();
    }
    render(){
        let rowSelection = {
            onChange: (selectedRowKeys) => {
                if(selectedRowKeys.length > 0){
                    this.setState({operable:true});
                }else{
                    this.setState({operable:false});
                }
                this.props.setSelectedRows(selectedRowKeys);
            }
        };
        let props = {
            treeChecked: this.props.treeChecked,
            selRows:this.props.selRows,
            onTreeCheck:this.onTreeCheck,
            rowSelection:rowSelection,
            operable:this.state.operable,
            deleteAuthority:this.props.deleteAuthority,
            updataAuthority:this.updataAuthority,
            authTreeData:this.props.authTreeData,
            authDetail:this.props.authDetail,
            menData:this.props.menData,
            showSelDialog:this.showSelDialog,
            paging:this.props.menPaging,
            refreshMenber:this.refreshMenber,
            loading:this.props.men_table_loading,
            deleteMenbers:this.deleteMenbers,
            closeSidebar:()=>this.props.setSideVisible(false),
            side_loading:this.props.sidebar_loading
        };
        return (
            <div>
                <AuthoritySideComp {...props}/>
            </div>
        );
    }
}
let mapStateToProps = (state)=>state.AuthorityRedu.toJS();
let mapDispatchToProps = (dispatch)=>({
    setTreeChecked:(keys,poses)=>dispatch(AuthorityAct.setTreeChecked(keys,poses)),
    setSelectedRows:(keys)=>dispatch(AuthorityAct.setSelectedRows(keys)),
    deleteAuthority:()=>dispatch(AuthorityAct.deleteAuthority()),
    updataAuthority:(data)=>dispatch(AuthorityAct.updataAuthority(data)),
    setSelVisible:(bool)=> dispatch(SelectorAct.visibleDialog(bool)),
    setSideVisible:(bool)=>dispatch(AuthorityAct.setSideVisible(bool)),
    getMenberList:(page)=>dispatch(AuthorityAct.getMenberList(page)),
    deleteMenbers:()=>dispatch(AuthorityAct.deleteMenbers()),
    cleanResourceParents:()=>dispatch(AuthorityAct.cleanResourceParents()),

});
export default connect(mapStateToProps,mapDispatchToProps)(AuthoritySideCont);