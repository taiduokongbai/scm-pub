import React from 'react';
import { Form, Input } from "../../base/components/AntdComp";
import FormModalComp from "../../base/components/FormModalComp";
class AddAuthorityComp extends FormModalComp {
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.validateFds((err, data) => {
            if (!err) {
                this.props.handleSubmit && this.props.handleSubmit(data);
            }
        });
    }
    getComp = () => {
        let { getFieldDecorator } = this.props.form;
        let formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        }
        return (
            <div>
                <Form>
                    <Form.Item
                        {...formItemLayout}
                        label="角色名称"
                    >
                        {
                            getFieldDecorator("roleName", {
                                rules: [
                                    {type: "string", message: "角色名称为必填", required: true},
                                    { max: 50, message: '角色名称长度不能超过50字符！' ,required: true},
                                    { whitespace: true,  message:"角色名称不能为空字符！"}
                                    ],
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="描述"
                    >
                        {
                            getFieldDecorator("description", {
                                rules: [{ max: 200, message: '描述长度不能超过200字符！' }],
                            })(<Input />)
                        }
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default Form.create()(AddAuthorityComp);