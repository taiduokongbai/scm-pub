import React, {Component, PropTypes} from 'react'
import { Spin,Modal,Input,Form} from '../../base/components/AntdComp';
import { shoufukuanStore } from '../stores/ShoufukuanStore';
let { observer } = mobxReact;
@observer
class EditShoufukuanComp extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let pm=Object.assign({},values,{subCode:"C013"},{id:shoufukuanStore.detail.id})
                shoufukuanStore.updateData(pm)
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
                    title="编辑收付款条件"
                    visible={shoufukuanStore.editVisible}
                    onOk={this.handleSubmit}
                    onCancel={shoufukuanStore.hideEditModal}
                    okText="确认"
                    cancelText="取消"
                > <Spin spinning={shoufukuanStore.spin}>
                    <div className="base-data-dialog">
                        <Form>
                            <Form.Item
                                {...formItemLayout}
                                label="编码"
                            >
                                {
                                    getFieldDecorator('catCode', {
                                        initialValue: shoufukuanStore.detail.catCode,
                                        rules: [
                                            { whitespace:true,required: true,message: '编码必填!' },
                                            { max: 10, message: '编码长度不能超过10字符' },
                                        ]
                                    })(
                                        <Input placeholder="请输入编码"  disabled={true}/>
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="名称"
                            >
                                {
                                    getFieldDecorator('catName', {
                                        initialValue: shoufukuanStore.detail.catName,
                                        rules: [
                                            { whitespace:true,required: true,message: '名称必填!' },
                                            { max: 10, message: '名称长度不能超过10字符' },
                                        ]
                                    })(
                                        <Input placeholder="请输入名称" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="备注"
                            >
                                {
                                    getFieldDecorator('catDesc', {
                                        initialValue: shoufukuanStore.detail.catDesc,
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
export default Form.create()(EditShoufukuanComp);

