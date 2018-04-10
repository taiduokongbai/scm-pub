import React, { Component } from "react";
import AddTerraceRuleComp from './AddTerraceRuleComp';

class EditTerraceRuleComp extends AddTerraceRuleComp {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

export default EditTerraceRuleComp;
