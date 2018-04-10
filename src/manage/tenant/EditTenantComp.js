import React, { Component, PropTypes } from "react";
import moment from "moment";
import {Form} from 'antd';
import AddTenantComp from './AddTenantComp';
let { observer } = mobxReact;

@observer
class EditTenantComp extends AddTenantComp {
    constructor(props, context) {
        super(props, context);
    }

}

EditTenantComp.defaultProps = {
    title: "编辑租户",
    width:694,
    loading:false
}
export default Form.create()(EditTenantComp);
