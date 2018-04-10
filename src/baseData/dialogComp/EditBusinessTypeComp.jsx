import React, {Component, PropTypes} from 'react'
import { Spin,Modal,Input,Form,Select} from '../../base/components/AntdComp';
import { businesstypeStore } from '../stores/BusinesstypeStore';
let { observer } = mobxReact;
const Option = Select.Option;
@observer
class AddBusinessTypeComp extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentDidMount() {
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let pm=Object.assign({},values,{id:businesstypeStore.detail.id})
                businesstypeStore.updateData(pm)
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
                    title="编辑业务类型"
                    visible={businesstypeStore.editVisible}
                    onOk={this.handleSubmit}
                    onCancel={businesstypeStore.hideEditModal}
                    okText="确认"
                    cancelText="取消"
                > <Spin spinning={businesstypeStore.spin}>
                    <div className="base-data-dialog">
                        <Form>
                            <Form.Item
                                {...formItemLayout}
                                label="编码"
                            >
                                {
                                    getFieldDecorator('busCode', {
                                        initialValue: businesstypeStore.detail.busCode,
                                        rules: [
                                            { whitespace:true,required: true,message: '编码必填!' },
                                            { max: 10, message: '编码长度不能超过10字符' },
                                        ]
                                    })(
                                        <Input placeholder="请输入编码" disabled={true}/>
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="名称"
                            >
                                {
                                    getFieldDecorator('busName', {
                                        initialValue: businesstypeStore.detail.busName,
                                        rules: [
                                            { whitespace:true,required: true,message: '名称必填!' },
                                            { max: 50, message: '编码长度不能超过50字符' },
                                        ]
                                    })(
                                        <Input placeholder="请输入名称" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="业务单据类型"
                            >
                                {
                                    getFieldDecorator('billType', {
                                        initialValue: businesstypeStore.detail.billType,
                                    })(
                                        <Select  style={{ width: 200 }}>
                                            <Option value="0">其他入库单</Option>
                                            <Option value="1">其他出库单</Option>
                                            <Option value="2">盘点任务单</Option>
                                            <Option value="3">直接调拨单</Option>
                                        </Select>
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="备注"
                            >
                                {
                                    getFieldDecorator('busDesc', {
                                        initialValue: businesstypeStore.detail.busDesc,
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
export default Form.create()(AddBusinessTypeComp);

