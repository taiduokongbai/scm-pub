import React, { Component } from "react";
import { Form, Input, Spin,Select, Modal } from '../../base/components/AntdComp';
import FormModalComp from '../../base/components/FormModalComp';
import AddPlatCategoryComp from './AddPlatCategoryComp';
const FormItem = Form.Item;
const Option = Select.Option;
let { observer } = mobxReact;
@observer
class EditPlatCategoryComp extends AddPlatCategoryComp {
    constructor(props, context) {
        super(props, context);
        
    }
                     
}
EditPlatCategoryComp.defaultProps = {
    title: "编辑类目",
    width:490,
    loading:false
}
export default Form.create()(EditPlatCategoryComp);
