import React, { Component } from "react";
import { Modal, message } from "../../base/components/AntdComp";
import { connect } from 'react-redux';
import AddTerraceRuleComp from '../components/AddTerraceRuleComp';
import TerraceRuleAct from '../actions/TerraceRuleAct'

class AddTerraceRuleCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        const {  handleSubmit, handleCancel, tablePaging } = this.props;
        
        handleSubmit(data);
    }
    render() {
        const { visible } = this.props;
        return (
            visible ?
                <AddTerraceRuleComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

AddTerraceRuleCont.defaultProps = {
    title: "新建",
    width: 422,
    type: "add",
    okText:"保存"
}

const mapStateToProps = (state) => ({
    visible:state.TerraceRuleRedu.get('add_visible'),
    //loading:state.TerraceRuleRedu.get('loading'),
}) 
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(TerraceRuleAct.OpenAddTerraceRule(false)) },
    handleSubmit: (data) => { return dispatch(TerraceRuleAct.AddTerraceRuleData(data)) },

})


export default connect(mapStateToProps, mapDispatchToProps)(AddTerraceRuleCont);
