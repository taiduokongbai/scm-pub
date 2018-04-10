import React, { Component, PropTypes } from "react";
import {Form} from '../../base/components/AntdComp';
import {OARow,OAColumn,OAControlComp,OAReadControlComp} from '../components/OAControlComp'
const FormItem = Form.Item;

class OAFormItemComp extends Component {
    constructor(props,context) {
        super(props,context);
    }
    render() {
        let {data,form} = this.props,{getFieldDecorator} = form;
        return (
            <div>
             {
                data.map((item, index) => {
                    return (
                        <div className="oa-preview" key={index}>
                            <div className="oa-row-title"><span>{item.title}</span></div>
                            <OARow>{
                                item.children.map((col, i) => {
                                    return (
                                        <OAColumn {...col} key={i}>
                                        {
                                            col.children.map((comp, k) => {
                                                return (<FormItem
                                                    key={k}
                                                    labelCol= {{ span: col.span == "24"?4:6 }}
                                                    wrapperCol= {{ span: col.span == "24"?20:16 }}
                                                    label={comp.label}
                                                >
                                                    {getFieldDecorator(comp.key, {
                                                        initialValue: comp.initialValue,
                                                        rules: [{
                                                            required: comp.required,
                                                            message: comp.errorMessage
                                                        }],
                                                    })(
                                                        <OAControlComp {...comp} />
                                                    )}
                                                </FormItem>)
                                            })
                                        }        
                                        </OAColumn>
                                    )
                                })
                            }
                            </OARow>
                        </div>
                    )
                })
            }
            </div>
        )
    }
}
class OAReadItemComp extends Component {
    constructor(props,context) {
        super(props,context);
    }
    render() {
        let {data,form} = this.props,{getFieldDecorator} = form;
        return (
            <div>
             {
                data.map((item, index) => {
                    return (
                        <div className="oa-preview oa-preview-read" key={index}>
                            <div className="oa-row-title"><span>{item.title}</span></div>
                            <OARow>{
                                item.children.map((col, i) => {
                                    return (
                                        <OAColumn {...col} key={i}>
                                        {
                                            col.children.map((comp, k) => {
                                                return (
                                                    <FormItem
                                                        key={k}
                                                        labelCol= {{ span: col.span == "24"?4:8 }}
                                                        wrapperCol= {{ span: col.span == "24"?20:14 }}
                                                        label={comp.label}
                                                    >
                                                    {getFieldDecorator(comp.key, {
                                                    })(
                                                        <OAReadControlComp {...comp} />
                                                    )}
                                                    </FormItem>
                                                )
                                            })
                                        }        
                                        </OAColumn>
                                    )
                                })
                            }
                            </OARow>
                        </div>
                    )
                })
            }
            </div>
        )
    }
}
export {OAFormItemComp,OAReadItemComp}
