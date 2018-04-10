import React, { Component } from "react";
import AddCodeRuleComp from './AddCodeRuleComp';

class EditCodeRuleComp extends AddCodeRuleComp {
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

export default EditCodeRuleComp;
