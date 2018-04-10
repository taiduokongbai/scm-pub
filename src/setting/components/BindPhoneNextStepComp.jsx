import React, { Component, propTypes } from 'react';
import FormModalComp from '../../base/components/FormModalComp';
import CodeBtnComp from '../../base/components/CodeBtnComp';
import { Layout, Form, Input, Spin, Button, Modal, Col, Row } from '../../base/components/AntdComp';
const FormItem = Form.Item;

class BindPhoneNextStepComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                data.module = "EMPRESET";
                if (!err) {
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }
    }
    getComp = () => {
        let formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 16 },
        };
        const { pswOld } = this.props;
        return (
            <Form className="bind-phone">
                <FormItem label="登录密码:" {...formItemLayout} style={{ margin: "16px 0 30px 0" }}>
                    {this.getFD('password', {
                        initialValue: pswOld.password,
                        rules: [
                            { message: "请输入登录密码", required: true },
                        ],
                    })(
                        <Input placeholder="请输入登录密码" type="password" />
                        )}

                </FormItem>
            </Form>
        )
    }
}

BindPhoneNextStepComp.defaultProps = {
    pswOld: {
        password: "",
    },
    title: '验证登录密码',
    okText: '下一步',
    width: 389,
    maskClosable: true,
}

export default Form.create()(BindPhoneNextStepComp);

