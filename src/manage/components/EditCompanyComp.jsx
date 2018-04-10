import React, { Component } from "react";
import AddCompanyComp from './AddCompanyComp';

class EditCompanyComp extends AddCompanyComp {
    constructor(props, context) {
        super(props, context);
    }   

    componentDidMount() {
        this.props.initData && this.props.initData();
    }
    
}

export default EditCompanyComp;
