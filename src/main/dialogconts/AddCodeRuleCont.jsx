import React, { Component } from "react";
import { Modal, message } from "../../base/components/AntdComp";
import { connect } from 'react-redux';
import AddCodeRuleComp from '../components/AddCodeRuleComp';
import CodeRuleAct from '../actions/CodeRuleAct'

class AddCodeRuleCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        const { loading, handleSubmit, handleCancel, tablePaging } = this.props;
        if (loading) {
            return;
        }
        handleSubmit(data).then(json => {
            if (json.status == "2000") {
                message.success('保存成功');
                handleCancel();
                tablePaging();
            }
        });
    }
    render() {
        const { addVisible } = this.props;
        return (
            addVisible ?
                <AddCodeRuleComp
                    {...this.props}
                    visible={addVisible}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

AddCodeRuleCont.defaultProps = {
    title: "新建",
    type: 'add',
    width: 422,
    okText: '确定',
    className:'code-rule-modal',
}

const mapStateToProps = (state) => state.CodeRuleRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(CodeRuleAct.changeModule('add',false)) },
    handleSubmit: (pm) => { return dispatch(CodeRuleAct.addCodeRule(pm))},
})


export default connect(mapStateToProps, mapDispatchToProps)(AddCodeRuleCont);
