import React, { Component } from 'react'
import TreeAct from '../actions/TreeAct'
import { Button, Spin, Pagination, Input, Layout, Table, Popconfirm, Form } from '../../base/components/AntdComp';
import SetOfficesCont from '../dialogconts/SetOfficesCont';

import * as MemberDialogActions from "../actions/MemberAddDialogActions";
import { store } from "../data/StoreConfig";

import MemberAddDialogCont from "../dialogconts/MemberAddDialogCont";
import { getCookie } from '../../base/services/ReqApi';
import { prefixPub } from '../../base/consts/UrlsConfig';
const Search = Input.Search;
const FormItem = Form.Item;
class HeaderToManageComp extends Component {
    constructor(props, context) {
        super(props, context);
    }
    handlerClick = (e) => {
        store.dispatch(MemberDialogActions.show());
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {onSearch} = this.props;
        this.props.form.validateFields((err, data) => {
            if(onSearch){
                onSearch(data.searchVal)
            }
        })
    }

    handlerSubmitCallBack = (e) => {
        let { state } = this.props;
        store.dispatch(TreeAct.getDepartments())
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { state, checkedList, onSearch, SearchVal, MoveDepVisiable, importViewVisiable, SetOfficesVisiable, Tree, ...props } = this.props;
        Tree.activeDepartment = Tree.activeDepartment ? Tree.activeDepartment : '0';
        let url = prefixPub + "/employees/exportExcel?tokenid=" + getCookie("tokenId") + "&deptCode=" + Tree.activeDepartment + "&employeeName=" + state.searchPm.employeeName + "&phone=" + state.searchPm.phone;
        return (
            <div className='tableHeader'>
                <MemberAddDialogCont submitCallBack={this.handlerSubmitCallBack} />
                <div className='head-line-one' style={{ display: state.headerBar_visible[0] }}  >
                    <div className='slideToRight'>
                        <Button type="default" onClick={MoveDepVisiable}><i className='c2mfont c2m-xiugai'></i>修改部门</Button>
                        <Popconfirm placement="bottomRight" title={
                            <div>
                                <h5>当前共选中{state.memberCodeArr.length}名员工，确认要停用吗？</h5>
                                <p>停用后，员工将不能再登入该企业</p>
                            </div>
                        } onConfirm={() => this.props.stopAccount({ empCodes: state.memberCodeArr })}>
                            <Button type="default"><i className='c2mfont c2m-jinyong2'></i>停用</Button>
                        </Popconfirm>
                        <Button type="default" onClick={SetOfficesVisiable}><i className='c2mfont c2m-didian'></i>设置办公地址</Button>
                    </div>
                </div>
                <div className='head-line-two' style={{ display: state.headerBar_visible[1] }}>
                    <div className='head-line-btn'>
                        {/*<Button type="default" onClick={this.handlerClick}><i className='c2mfont c2m-jia'></i>新建员工</Button>
                        <Button type="default" onClick={importViewVisiable}><i className='c2mfont c2m-daoru_nor'></i>导入</Button>*/}
                        <Button type="default" style={{ marginRight: '0px' }}><a href={url}><i className='c2mfont c2m-daochu'></i>导出</a></Button>
                    </div>
                    <div className="head-line-search">
                        <Form>
                            <FormItem>
                                {getFieldDecorator('searchVal', {
                                    initialValue: '',
                                })(
                                    <Input style={{ width: 200 }} onPressEnter={(e)=>this.handleSubmit(e)} placeholder='输入姓名/手机搜索'/>
                                    )}
                            </FormItem>
                            <Button type="default" onClick={(e)=>this.handleSubmit(e)} className='search-btn'><i className='c2mfont c2m-search1'></i>查询</Button>
                        </Form>
                    </div>

                    <div className="depart-info">
                        <span>{state.headerInfo.deptName ? state.headerInfo.deptName : ''}</span>
                        {
                            state.headerInfo.sonDeptNum || state.headerInfo.deptNum ? '(' : ''
                        }
                        <span>
                            {
                                state.headerInfo.sonDeptNum ? state.headerInfo.sonDeptNum + '个部门  ' : ' '
                            }
                        </span>
                        {
                            state.headerInfo.sonDeptNum && state.headerInfo.deptNum ? ', ' : ''
                        }
                        <span>
                            {state.headerInfo.deptNum ? '共 ' + state.headerInfo.deptNum + '人' : ''}
                        </span>
                        {
                            state.headerInfo.sonDeptNum || state.headerInfo.deptNum ? ')' : ''
                        }
                        <span>
                            {
                                state.headerInfo.deptMgr ? ' |  负责人：' + state.headerInfo.deptMgr : ''
                            }
                        </span>
                    </div>
                    <SetOfficesCont />
                </div>
            </div>
        );

    }
}

export default Form.create()(HeaderToManageComp)