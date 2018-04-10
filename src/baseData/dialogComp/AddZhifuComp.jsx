import React, {Component, PropTypes} from 'react'
import { Spin,Modal,Input,Form} from '../../base/components/AntdComp';
import { zhifuStore } from '../stores/ZhifuStore';
let { observer } = mobxReact;
@observer
class AddZhifuComp extends Component {
    constructor(props, context) {
        super(props, context);

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let pm=Object.assign({},values,{langCode:"",status:"0",subCode:"C012",type:"1"})
                zhifuStore.saveModalData(pm)
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
                    title="新建支付条款"
                    visible={zhifuStore.visible}
                    onOk={this.handleSubmit}
                    onCancel={zhifuStore.hideModal}
                    okText="确认"
                    cancelText="取消"
                > <Spin spinning={zhifuStore.loading}>
                    <div className="base-data-dialog">
                        <Form>
                            <Form.Item
                                {...formItemLayout}
                                label="编码"
                            >
                                {
                                    getFieldDecorator('catCode', {
                                        rules: [
                                            { whitespace:true,required: true,message: '编码必填!' },
                                            { max: 10, message: '编码长度不能超过10字符' },
                                        ]
                                    })(
                                        <Input placeholder="请输入编码"/>
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="名称"
                            >
                                {
                                    getFieldDecorator('catName', {
                                        rules: [
                                            { whitespace:true,required: true,message: '名称必填!' },
                                            { max: 50, message: '名称长度不能超过50字符' },
                                        ]
                                    })(
                                        <Input placeholder="请输入名称"  onBlur={this.trim}/>
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="备注"
                            >
                                {
                                    getFieldDecorator('catDesc', {
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
export default Form.create()(AddZhifuComp);

