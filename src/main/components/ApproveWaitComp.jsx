import React,{Component} from "react";
import {Row,Col,message} from "../../base/components/AntdComp";
import ApproveDetailComp from '../../setting/components/ApproveDetailComp'
import Sidebar from '../../base/components/SidebarWrapComp';
class ApproveWaitComp extends Component{
    constructor(props){
        super(props);
        this.state = {
            sideVisible:false,
            wfsId:0,
            applyId:0,
        }
    }
    componentDidMount() {
        this.props.loadEmployeesList();
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
                this.props.loadApproveData();
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
                approveType={0}
                closeSidebar={this.closeSidebar}
                loadApproveDetail={this.props.loadApproveDetail}
                submitOpinion={this.submitOpinion}
            />
            :
            null
        )
    }
    render(){
        const {approveList} = this.props;
        let {sideVisible} = this.state;
        return (
            <div>
                {
                    approveList.map((item, index) => {
                        if (index < 4) {
                            return (
                                <Row key={index}>
                                    <Col span={5}>
                                        <span className="spanfive">{++index}. 
                                            <a href="#" onClick={()=>this.handleRowClick(item.wfsId,item.applyId)}>{item.formName}</a>
                                        </span>
                                    </Col>
                                    <Col span={6}>
                                        <span className="spansix">{item.name}</span>
                                        <span className="spansix">{item.createDate}</span>
                                    </Col>
                                </Row>
                            )
                        } else {
                            return null;
                        }
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
export default ApproveWaitComp;