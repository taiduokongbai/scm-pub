import React, {Component, PropTypes} from 'react'
import { Spin,Modal,Input,Form} from '../../base/components/AntdComp';
import { meterageStore } from '../stores/MeterageStore';
let { observer } = mobxReact;
@observer
class EditMeterageComp extends Component {
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let pm=Object.assign({},values,{dimensionality:meterageStore.dimensionality,id:meterageStore.detail.id})
                meterageStore.updateData(pm)
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
                    title="编辑计量单位"
                    visible={meterageStore.editVisible}
                    onOk={this.handleSubmit}
                    onCancel={meterageStore.hideEditModal}
                    okText="确认"
                    cancelText="取消"
                > <Spin spinning={meterageStore.spin}>
                    <div className="base-data-dialog">
                        <Form>
                            <Form.Item
                                {...formItemLayout}
                                label="名称"
                            >
                                {
                                    getFieldDecorator('meaName', {
                                        initialValue: meterageStore.detail.meaName,
                                        rules: [
                                            { whitespace:true,required: true,message: '名称必填!' },
                                            { max: 50, message: '名称长度不能超过50字符' },
                                        ]
                                    })(
                                        <Input placeholder="请输入名称" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="单位符号"
                            >
                                {
                                    getFieldDecorator('symbol', {
                                        initialValue: meterageStore.detail.symbol,
                                        rules: [
                                            { max: 10, message: '单位符号不能超过10字符' },
                                            { whitespace:true, message: '单位符号不能为空格' },
                                        ]
                                    })(
                                        <Input placeholder="请输入单位符号" />
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
export default Form.create()(EditMeterageComp);

