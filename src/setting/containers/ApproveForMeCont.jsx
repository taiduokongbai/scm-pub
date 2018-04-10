import React,{Component} from "react";
import { connect } from "react-redux";
import {Form,Button,Input, Select,Tooltip ,Tabs, DatePicker,Timeline,Row,Col,Popconfirm,Spin,Icon,message} from "../../base/components/AntdComp";
import MTable from "../../base/components/TableComp";
import FormComp from "../../base/components/FormComp";
import Sidebar from '../../base/components/SidebarWrapComp';
import ApproveForMeAct from '../actions/ApproveForMeAct';
import ApproveDetailComp from '../components/ApproveDetailComp';
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class ApproveForMeListComp extends Component{
    constructor(props){
        super(props);
        this.state = {
            sideVisible:false,
            wfsId:0,
            applyId:0,
        }
    }
    componentDidMount() {
        this.props.loadTableData();
    }
    handleWheel = (e) => {
        if(this.props.approveScroll){
            let clientHeight = this.refs.bodyBox.clientHeight; //可视区域高度
            let scrollTop = this.refs.bodyBox.scrollTop;  //滚动条滚动高度
            let scrollHeight = this.refs.bodyBox.scrollHeight; //滚动内容高度
            if ((clientHeight + scrollTop) == (scrollHeight)) {
                //如果滚动到底部  
                let {page,pageSize} = this.props.pagination;
                page = page+1;
                this.handleTableChange({ page,pageSize });
            }
        }
    }
    handleTableChange = (pagination) =>{
        let pm = {flag:this.props.approveType};
        pm.page = pagination.page;
        pm.pageSize = pagination.pageSize;
        this.props.loadTableData(pm);
    }
    handleRowClick = (wfsId,applyId) =>{
        this.setState({sideVisible:true,wfsId,applyId})
    }
    closeSidebar = () =>{
        this.setState({sideVisible:false})
    }
    submitOpinion = (data) =>{
        this.props.submitOpinion(data).then(isOk =>{
            if(isOk){
                switch (data.type) {
                    case 1:
                        message.success('审批已通过');
                        break;
                    case 2:
                        message.success('审批已驳回');
                        break;
                    case 3:
                        message.success('已推送给加签人');
                        break;
                }
                this.closeSidebar();
                this.props.loadTableData({flag:this.props.approveType});
            }
        });
    }
    getSidebarComp = () =>{
        const {sideVisible} = this.state;
        return (
            sideVisible?
            <ApproveDetailComp
                {...this.props}
                wfsId={this.state.wfsId}
                applyId={this.state.applyId}
                sidebarLoading={this.props.sidebarLoading}
                closeSidebar={this.closeSidebar}
                loadApproveDetail={this.props.loadApproveDetail}
                submitOpinion={this.submitOpinion}
            />
            :
            null
        )
    }
    render(){
        const {sideVisible} = this.state;
        const {listData,approveType} = this.props;
        return (
            <div className="approve-forme trans" onScroll={this.handleWheel} ref="bodyBox">
            {
                listData.map((item,index)=>{
                    return (
                        <Row key={index} className="approve-forme-row" gutter={16} onClick={()=>this.handleRowClick(item.wfsId,item.applyId)}>
                            <Col span={8}>
                                {item.formName}
                            </Col>
                            <Col span={10}>
                                {item.name}　{approveType == 0?item.createDate:item.updateDate}
                            </Col>
                            <Col span={6} style={{textAlign:"center"}}>
                                编号：{item.orderNo}
                            </Col>
                        </Row>
                    )
                })
            }
            <Sidebar 
                maskClosable={false}
                side_visible={sideVisible}
                className="sidebar-approve"
                onClose={this.closeSidebar}
            >
                {this.getSidebarComp()}
            </Sidebar>
            </div>
        )
    }
}
class ApproveForMeCont extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            activeTab:"0"
        }
    }
    componentDidMount() {
        this.props.loadEmployeesList();
    }
    onTabsChange = (activeTab) =>{
        this.setState({ activeTab })
    }
    loadTableData = (pm) =>{
        this.props.loadApproveForMeList(pm);
    }
    RefreshTabelData = () =>{
        this.loadTableData({flag:this.state.activeTab});
    }
    render(){
        return (
            <div className="approve-page">
                <Tabs 
                    onChange={this.onTabsChange}
                    activeKey={this.state.activeTab}
                    defaultActiveKey="0" 
                    tabBarExtraContent={<Button type="primary" icon="poweroff" loading={this.props.tableLoading} onClick={this.RefreshTabelData}>刷新</Button>}
                    animated={false}
                >
                    <TabPane tab="待我审批" key="0">
                        <Spin tip="Loading..." spinning={this.props.tableLoading}>
                            <ApproveForMeListComp 
                                listData={this.props.approveFormeList}
                                approveScroll={this.props.approveFormeListScroll}
                                approveType={0}
                                loadTableData={(pm={flag:0})=>this.loadTableData(pm)}
                                {...this.props}
                            />
                        </Spin>
                    </TabPane>
                    <TabPane tab="已审批的" key="1">
                        <Spin tip="Loading..." spinning={this.props.tableLoading}>
                            <ApproveForMeListComp
                                listData={this.props.approveDoneList}
                                approveScroll={this.props.approveDoneListScroll}
                                approveType={1}
                                loadTableData={(pm={flag:1})=>this.loadTableData(pm)}
                                {...this.props}
                            />
                        </Spin>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
const mapStateToProps = (state)=>state.ApproveForMeRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    loadApproveForMeList: (pm) =>{
        return dispatch(ApproveForMeAct.loadApproveForMeList(pm));
    },
    loadApproveDetail: (pm) =>{
        return dispatch(ApproveForMeAct.loadApproveDetail(pm));
    },
    loadEmployeesList: (pm) =>{
        return dispatch(ApproveForMeAct.loadEmployeesList(pm));
    },
    submitOpinion: (pm) =>{
        return dispatch(ApproveForMeAct.submitOpinion(pm));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ApproveForMeCont);
