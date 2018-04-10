import React, {Component, PropTypes} from 'react'
import { Spin,Modal,Input,Form,Checkbox} from '../../base/components/AntdComp';
import { currencyStore } from '../stores/CurrencyStore';
let { observer } = mobxReact;
@observer
class EditCurrencyComp extends Component {
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let pm={};
                if(values.standardCoin){
                    pm=Object.assign({},values,{standardCoin:"1"},{id:currencyStore.detail.id})
                }else{
                    pm=Object.assign({},values,{standardCoin:"0"},{id:currencyStore.detail.id})
                }
                currencyStore.updateData(pm)
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
                    title="编辑币种"
                    visible={currencyStore.editVisible}
                    onOk={this.handleSubmit}
                    onCancel={currencyStore.hideEditModal}
                    okText="确认"
                    cancelText="取消"
                > <Spin spinning={currencyStore.spin}>
                    <div className="base-data-dialog">
                        <Form>
                            <Form.Item
                                {...formItemLayout}
                                label="编码"
                            >
                                {
                                    getFieldDecorator('curCode', {
                                        initialValue: currencyStore.detail.curCode,
                                        rules: [
                                            { whitespace:true,required: true,message: '编码必填!' },
                                            { max: 10, message: '编码长度不能超过10字符' }
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
                                    getFieldDecorator('curName', {
                                        initialValue: currencyStore.detail.curName,
                                        rules: [
                                            { whitespace:true,required: true,message: '名称必填!' },
                                            { max: 50, message: '名称长度不能超过50字符' }
                                        ]
                                    })(
                                        <Input placeholder="请输入名称" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="货币符号"
                            >
                                {
                                    getFieldDecorator('symbol', {
                                        initialValue: currencyStore.detail.symbol,
                                        rules: [
                                            { whitespace:true,required: true,message: '货币符号必填!' },
                                            { max: 10, message: '货币符号不能超过10字符' },
                                        ]
                                    })(
                                        <Input placeholder="请输入货币符号" />
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="本位币"
                            >
                                {
                                    getFieldDecorator('standardCoin', {
                                        valuePropName: 'checked',
                                        initialValue: currencyStore.detail.standardCoin=="1" ? true:false,
                                    })(
                                        <Checkbox></Checkbox>
                                    )
                                }
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                label="备注"
                            >
                                {
                                    getFieldDecorator('curDesc', {
                                        initialValue: currencyStore.detail.curDesc,
                                        rules: [
                                            { max: 200, message: '备注不能超过200字符' },
                                        ]
                                    })(
                                        <Input type="textarea"/>
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
export default Form.create()(EditCurrencyComp);

