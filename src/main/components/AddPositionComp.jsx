import React, { Component, PropTypes } from "react";
import { Form, Input, Spin, Button, Modal } from '../../base/components/AntdComp.js';
import FormModalComp from '../../base/components/FormModalComp';
import TXT from '../languages';
const T = TXT.POSITION;
const FormItem = Form.Item;

class AddPositionComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);

    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                if (this.props.type=='add'&&this.props.positionCodeRule === 0) {
                    data.positionNo = '';
                }
                if (!err) {
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }    
    }
    
    getComp = () => {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { position, type, positionCodeRule } = this.props;
        return (
            <div className="position-add">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label={T.NAME}
                        hasFeedback
                    >
                        {this.getFD('positionName', {
                            initialValue: position.positionName,
                            rules: [
                                { required: true, message: T.NAMEHELP ,whitespace:true},
                                { max: 50, message:"职位最多允许50字符"}
                            ],
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={T.CODE}
                        hasFeedback
                    >
                        {this.getFD('positionNo', {
                            initialValue: position.positionNo ? position.positionNo+'':(type=='add'&&positionCodeRule===0?'系统自动生成':''),
                            rules: [
                                { required: true, message: "职位编码不能为空" },
                                { type: positionCodeRule===0?"":"numOrLetter" },
                                { max: 20, message: "最多允许20字符" }
                            ],
                        })(
                            <Input disabled={type=='edit'||positionCodeRule===0?true:false}/>
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={T.DESC}
                        hasFeedback
                    >
                        {this.getFD('positionDesc', {
                            initialValue: position.positionDesc,
                            rules: [
                                { max: 500, message: "最多允许500字符" }
                            ],
                        })(
                            <Input type="textarea" style={{width:'300px',height:50,resize:'none'}}/>
                            )}
                    </FormItem>
                </Form> 
            </div>
        )
    }
}
AddPositionComp.defaultProps = {
    position: {
        positionCode: "",
        positionName: "",
        positionNo: "",
        positionDesc: "",
    },
}
AddPositionComp.propTypes = {
    position: PropTypes.object,
}

export default Form.create()(AddPositionComp);


