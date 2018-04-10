import React, { Component, PropTypes } from "react";
import MemberManageAct from '../actions/MemberManageAct'
import Sidebar from '../../base/components/SidebarWrapComp';
import MTable from '../../base/components/TableComp';
import { Button, Spin, Pagination, Input, Popconfirm } from '../../base/components/AntdComp'
import TreeAct from '../actions/TreeAct'
import * as MemberEditDialogActions from "../actions/MemberEditDialogActions";
import MemberEditDialogCont from "../dialogconts/MemberEditDialogCont";
import { store } from "../data/StoreConfig";
import TooltipComp from "../../base/components/TooltipComp";
class MemberInfoComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchVal: '',
            side_visible: false,
            record: {},
            selectedRowKeys: [],
            random: 0
        }
        this.columns = [{
            title: 'empCode',
            dataIndex: 'empCode',
            key: 'empCode',
            hidden: true,
        }, {
            title: '姓名',
            dataIndex: 'empName',
            key: 'empName',
            render: (txt, record, index) => <a onClick={() => this.onOpenSidebar(record)} className='column-1'>{record.empName}</a>
        }, {
            title: '手机',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '组织',
            dataIndex: 'deptName',
            key: 'deptName',
        }, {
            title: '职位',
            dataIndex: 'positionName',
            key: 'positionName',
        }, {
            title: '办公地址',
            dataIndex: 'addressName',
            key: 'addressName',
        }];
    }

    onOpenSidebar = (record) => {
        let random = Math.floor(Math.random() * 6);
        this.setState({ random })
        this.props.getDetailsInfo(record.empCode);
        this.props.onOpenSidebar(true);
    }

    onCloseSidebar = () => {
        this.props.onOpenSidebar(false);
    }

    onHeaderChange = (val) => {
        this.props.headerChange(val.length);
        this.props.checkedList(val);
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        let memberCode = [];
        selectedRows.map((val, index) => {
            return memberCode.push(val.empCode);
        })
        this.onHeaderChange(memberCode);
    }
    handleEditMemberClick = (e) => {
        let id = this.props.state.infoDetials.empCode;
        store.dispatch(MemberEditDialogActions.show(id));
    }
    handleSubmitCallBack = (e) => {
        let { state } = this.props;
        store.dispatch(MemberManageAct.getDetailsInfo(state.infoDetials.empCode));
        // store.dispatch(MemberManageAct.getMemberInfoList({ deptCode: state.departinfo.key, employeeName: '', phone: '', page: 1, pageSize: 15 }));
        store.dispatch(TreeAct.getDepartments())
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.state.dataSource != this.props.state.dataSource) {
            this.setState({
                selectedRowKeys: []
            })
        }
    }


    render() {
        let { state, side_visible, tablePaging, ...props } = this.props;
        let { searchVal, record, selectedRowKeys } = this.state;
        let dept = state.infoDetials.dept || [],
            maritalStatus = state.infoDetials.maritalStatus || [],
            office = state.infoDetials.officeAddress || [],
            position = state.infoDetials.position || [],
            identityType = state.infoDetials.identityType || [],
            gender = state.infoDetials.gender || [],
            nationality = state.infoDetials.nationality || [],
            ethnicity = state.infoDetials.ethnicity || [];
        let rowSelection = {
            onChange: this.onSelectChange,
        }
        let pagination = {
            showSizeChanger: true,
            current: state.paging.page,
            pageSize: state.paging.pageSize,
            total: state.paging.total
        }
        let columns = this.columns,
            empName = state.infoDetials.empName,
            bgColor = ['#21B8C6', '#F6A623', '#4990E2', '#F68585', '#85B2F6', '#AA76AB'];
        return (
            <div>
                <div>
                    <MemberEditDialogCont submitCallBack={(e) => this.handleSubmitCallBack(e)} />
                    <MTable
                        rowSelection={rowSelection}
                        selRows={this.state.selectedRowKeys}
                        cols={columns}
                        paging={pagination}
                        dataSource={state.dataSource}
                        pageOnChange={tablePaging}
                        loading={state.tableLoading}
                        rowKey={"empCode"}
                        {...props}
                    />
                </div>
                <Sidebar maskClosable={true} side_visible={side_visible} onClose={this.onCloseSidebar} className='memeber-detail-sidebar'>
                    <Spin spinning={state.side_Loading}>
                        <div className='empDetailSidebar'>
                            <div className='menu-wrap-header'>
                                <Button type='default' onClick={this.handleEditMemberClick}><i className='c2mfont c2m-bianji1'></i>编辑</Button>
                                {/*<Button type='default'><i className='c2mfont c2m-dayin'></i>打印</Button>*/}
                                <Popconfirm placement="bottomRight" title={
                                    <div>
                                        <h5>确认要停用该员工吗？</h5>
                                        <p>停用后，员工将不能再登入该企业</p>
                                    </div>
                                } onConfirm={() => this.props.stopAccount({ empCodes: [state.infoDetials.empCode] })}>
                                    <Button type="default"><i className='c2mfont c2m-jinyong2'></i>停用</Button>
                                </Popconfirm>
                                <div className="closeSidebar" onClick={this.onCloseSidebar}>X</div>
                            </div>
                            <div className="menu-wrap-header-border"></div>
                            <div className='menu-wrap-body'>
                                <div className='empTitleImg'>
                                    {state.infoDetials.profilePhoto ? <img src={state.infoDetials.profilePhoto} alt={state.infoDetials.empName} title={state.infoDetials.empName} /> : <div className="details-profilePhoto" style={{ backgroundColor: bgColor[this.state.random] }}>{empName && empName.length > 2 ? empName.slice(empName.length - 2, empName.length) : empName}</div>}
                                    <TooltipComp attr={{ text: state.infoDetials.empName, wid: 350, placement: 'top' }} />
                                </div>
                                <p className="infoTitle">基础信息</p>
                                <p className='line'></p>
                                <div className='infoLists'>
                                    <div><span>组织：</span>  {typeof dept[0] == 'undefined' ? '' : <TooltipComp attr={{ text: dept[0].deptValue, wid: '67%', placement: 'top' }} />}  </div>
                                    <div><span>职位：</span>  {typeof position[0] == 'undefined' ? '' : <TooltipComp attr={{ text: position[0].positionValue, wid: '67%', placement: 'top' }} />}</div>
                                    <p><span>手机：</span>  {state.infoDetials.phone || ''}  </p>
                                    <p><span>固定电话：</span>  {state.infoDetials.telNo || ''}  </p>
                                    <p><span>邮箱：</span>  {state.infoDetials.email || ''}  </p>
                                    <div><span>办公地址：</span>{(typeof office[0] == 'undefined') ? '' : <TooltipComp attr={{ text: office[0].addressValue, wid: '67%', placement: 'top' }} />}</div>
                                </div>
                                <p className="infoTitle">详细信息</p>
                                <p className='line'></p>
                                <div className='infoLists'>
                                    {state.infoDetials.entryDate ? <p><span>入职时间：</span>  {state.infoDetials.entryDate.substr(0,11)}  </p> : ""}
                                    {(maritalStatus[0] && maritalStatus[0].maritalStatusValue) ? <p><span>婚姻状态：</span>  {maritalStatus[0].maritalStatusValue}  </p> : ""}
                                    {(identityType[0] && identityType[0].identityValue) ? <p><span>证件类型：</span>  {identityType[0].identityValue}  </p> : ""}
                                    {state.infoDetials.identityNo ? <p><span>证件号码：</span>  {state.infoDetials.identityNo}  </p> : ""}
                                    {state.infoDetials.homeAddr ? <div><span>家庭住址：</span>  {<TooltipComp attr={{ text: state.infoDetials.homeAddr, wid: '67%', placement: 'top' }} />}  </div> : ""}
                                    {state.infoDetials.empNo ? <p><span>工号：</span>{state.infoDetials.empNo}</p> : ""}
                                    {(gender[0] && gender[0].genderValue) ? <p><span>性别：</span>{gender[0].genderValue}</p> : ""}
                                    {(nationality[0] && nationality[0].nationalityValue) ? <p><span>国家：</span>{nationality[0].nationalityValue}</p> : ""}
                                    {(ethnicity[0] && ethnicity[0].ethnicityValue) ? <p><span>民族：</span>{ethnicity[0].ethnicityValue}</p> : ""}
                                    {state.infoDetials.nativePlace ? <div><span>籍贯：</span>{<TooltipComp attr={{ text: state.infoDetials.nativePlace, wid: '67%', placement: 'top' }} />}</div> : ""}
                                    {state.infoDetials.emergencyContact ? <div><span>紧急联系人：</span>{<TooltipComp attr={{ text: state.infoDetials.emergencyContact, wid: '67%', placement: 'top' }} />}</div> : ""}
                                    {state.infoDetials.emergencyPhone ? <p><span>紧急联系人电话：</span>{state.infoDetials.emergencyPhone}</p> : ""}
                                </div>
                            </div>
                        </div>
                    </Spin>
                </Sidebar>

            </div>
        );

    }
}

MemberInfoComp.defaultProps = {
    searchPm: {
        deptCode: "",
        employeeName: "",
        phone: "",
        page: 1,
        pageSize: 15
    }
}
MemberInfoComp.propTypes = {
    searchPm: PropTypes.object,
}

export default MemberInfoComp