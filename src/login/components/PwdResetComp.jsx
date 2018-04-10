import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox ,message} from '../../base/components/AntdComp';
import Validate from '../../base/consts/ValidateList'
const FormItem = Form.Item;
class PwdResetComp extends Component{
    constructor(props,context){
        super(props,context);
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            data.phoneNo = this.props.phoneNo;
            if (!err&&data.newPassword===data.surePassword) {
                data={phoneNo:data.phoneNo,newPassword:data.newPassword}
                this.props.submitPwd(data)
            }else if(data.newPassword!=data.surePassword){
                message.error("两次密码输入不一致")
            }
        });
    }
    render(){
        let {submitLoading,resetPsw} = this.props;
        let { getFieldDecorator } = this.props.form;
        return (
            <div className="reset-wrapper">
                <div className="reset-box">
                    <div className="reset-text">
                        <span className="reset-title">忘记密码</span>
                        <div className="reset-list">
                            <span className="reset-circle"></span>
                            <span className="reset-line"></span>
                            <span className="reset-circle circle-show"></span>
                        </div>
                        <div className="acount-message">
                            <span className="acount-text">账户验证</span>
                            <span className="acount-text2">密码重置</span>
                        </div>
                        <Form onSubmit={this.handleSubmit} className="reset-form">
                            <FormItem>
                                {getFieldDecorator('newPassword', {
                                    initialValue: resetPsw.newPassword,
                                    rules: [
                                        {message: "请输入密码",required:true},
                                        { min:6,max:16,message:"允许字符长度6-16个字符"},
                                        Validate({type: "pswempty"}),
                                    ],
                                })(
                                    <Input  placeholder="请输入密码" className="acount-phone" type="password" prefix={<i className="c2mfont c2m-sign-password"></i>}/>
                                    )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('surePassword',{
                                    rules: [
                                        { required: true,type:"string",message:"请再次输入密码"},
                                    ],
                                })(
                                    <Input placeholder="请确认密码" className="acount-phone" type="password" prefix={<i className="c2mfont c2m-sign-password"></i>}/>
                                    )}
                                
                            </FormItem>
                            <FormItem className="reset-button">
                                <Button type="primary" htmlType="submit" className="reset-form-button" loading={submitLoading}>提交</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

PwdResetComp.defaultProps={

}
export default Form.create()(PwdResetComp);