import React, {Component, PropTypes} from 'react'
import { Spin,Modal,Input,Form} from '../../base/components/AntdComp';
import { deliverymethodStore } from '../stores/DeliverymethodStore';
let { observer } = mobxReact;
@observer
class AddDeliveryMethodComp extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let pm=Object.assign({},values,{status:"0"})
                deliverymethodStore.saveModalData(pm)
            }
        });
    }
    render() {
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
        };
        return (
            <div>
                <Modal
                    title="新建配送方式"
                    visible={deliverymethodStore.visible}
                    onOk={this.handleSubmit}
                    onCancel={deliverymethodStore.hideModal}
                    okText="确认"
                    cancelText="取消"
                > <Spin spinning={deliverymethodStore.spin}>
                    <div className="base-data-dialog">
                        <Form>
                            <Form.Item
                                {...formItemLayout}
                                label="编码"
                            >
                                {
                                    getFieldDecorator('dispatchCode', {
                                        rules: [
                                            { whitespace:true,required: true,message: '编码必填!' },
                                            { max: 10, message: '编码长度不能超过10字符' },
                                        ]
                                    })(
                                        <Input placeholder="请输入编码" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="名称"
                            >
                                {
                                    getFieldDecorator('dispatchName', {
                                        rules: [
                                            { whitespace:true,required: true,message: '名称必填!' },
                                            { max: 50, message: '名称长度不能超过50字符' },
                                        ]
                                    })(
                                        <Input placeholder="请输入编码" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="备注"
                            >
                                {
                                    getFieldDecorator('dispatchDesc', {
                                        rules: [
                                            { max: 200, message: '备注长度不能超过200字符' },
                                        ]
                                    })(
                                        <Input type="textarea" />
                                    )
                                }
                            </Form.Item>
                        </Form>
                    </div>
                </Spin></Modal>

            </div>
        )
    }
}
export default Form.create()(AddDeliveryMethodComp);

