import React, { Component } from "react";
import { Modal, message } from "../../base/components/AntdComp";
import { connect } from 'react-redux';
import TerraceRuleAct from '../actions/TerraceRuleAct';
import EditTerraceRuleComp from '../components/EditTerraceRuleComp';

class EditTerraceRuleCont extends Component {
    constructor(props, context) {
        super(props, context);
       

    }
    handleSubmit = (data) => {
        const {handleSubmit, handleCancel, tablePaging } = this.props;
        data.businessType=4;
        data.businessIndex=Number(data.businessIndex);
        //data.serialDigit=parseInt(data.serialDigit);
        handleSubmit(data);
    }
    render() {
        const { visible } = this.props;
        return (
            visible ?
                <EditTerraceRuleComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

EditTerraceRuleCont.defaultProps = {
    title: "编辑",
    width: 422,
    type:'edit',
    okText:"保存"
}

const mapStateToProps = (state) =>({
    visible:state.TerraceRuleRedu.get('edit_visible'),
    //loading:state.TerraceRuleRedu.get('loading'),
}) 
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCancel: () => { dispatch(TerraceRuleAct.OpenEditTerraceRule(false)) },
    handleSubmit: (data) => { return dispatch(TerraceRuleAct.EditTerraceRuleData(data)) },
})


export default connect(mapStateToProps, mapDispatchToProps)(EditTerraceRuleCont);
