import React, { Component } from "react";
import { Modal, message } from "../../base/components/AntdComp";
import { connect } from 'react-redux';
import CodeRuleAct from '../actions/CodeRuleAct';
import EditCodeRuleComp from '../components/EditCodeRuleComp';

class EditCodeRuleCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.param = { mgrPm: { "empName": "", "pageSize": "10" }, deptNamePm: { "conditions": [] }, addPm: { "isReg": "0", "isMag": "1", "isRep": "1", "isSog": "1", "isBil": "1", "isOfe": "0", "isVisible": "1" } }

    }
    // initData = () => {
    //     const { geteditdata, departmentId, handleCancel } = this.props;
    //     if (departmentId) {
    //         getEditdata(departmentId).then(json => {
    //             if (json.status === 2000) {
    //                 this.param = {
    //                     ...this.param,
    //                     mgrPm: {
    //                         ...this.param.mgrPm,
    //                         empName: this.props.Record.deptMgr
    //                     },
    //                 }
    //                 getSelectData(this.param);
    //             }
    //         });
    //     }
    // }

    handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging, codeRuleId } = this.props;
        if (data.id == codeRuleId) { 
            handleSubmit(data).then(json => {
                if (json.status == "2000") {
                    message.success('保存成功');
                    handleCancel();
                    tablePaging();
                } else {
                };
            });
        } 
    }

    render() {
        const { editVisible } = this.props;
        return (
            editVisible ?
                <EditCodeRuleComp
                    {...this.props}
                    visible={editVisible}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

EditCodeRuleCont.defaultProps = {
    title: "编辑",
    type:'edit',
    width: 422,
    okText: '确定',
    className: 'code-rule-modal',
}

const mapStateToProps = (state) => state.CodeRuleRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(CodeRuleAct.changeModule('edit',false)) },
    handleSubmit: (pm) => { return dispatch(CodeRuleAct.updateCodeRule(pm)) },
})


export default connect(mapStateToProps, mapDispatchToProps)(EditCodeRuleCont);
