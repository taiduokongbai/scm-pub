import React,{Component} from "react";
import {Icon,Menu,Button} from '../../base/components/AntdComp';
import {Link} from "react-router";
var {PropTypes} = React;

class LayoutTop extends Component{
    constructor(prop){
        super(prop);
    }
    componentWillMount(){
        this.props.initData();
    }
    getMenu=()=>{
        return (
            <Menu onClick={(item)=>{
                if(item.key == "menu_0"){
                    this.props.companyEditClick();
                }else if(item.key == "menu_1"){
                    this.props.logOutClick();
                }
            }}>
                <Menu.Item key="menu_0">企业设置</Menu.Item>
                <Menu.Item key="menu_1">退出登录</Menu.Item>
            </Menu>
        )
    }
    render(){
        const loginUser = {name:"张三",companyName:"江西曼威网络科技有限公司"};
        return (
            <div className='header-toolbar'>
                <div className='header-toolbar-logo'>
                    <div className="header-toolbar-logo-text">
                        <Menu mode="horizontal">
                            <Menu.Item key="logo">
                                <i className="anticon anticon-ie"></i>
                            </Menu.Item>
                            <Menu.Item key="mail">
                                <a href="#" target="_blank" rel="noopener noreferrer">首页</a>
                            </Menu.Item>
                            <Menu.Item key="app" disabled>
                                <a href="#" target="_blank" rel="noopener noreferrer">产品</a>
                            </Menu.Item>
                            <Menu.Item key="alipay">
                                <a href="#" target="_blank" rel="noopener noreferrer">服务</a>
                            </Menu.Item>
                            <Menu.Item key="help">
                                <a href="#" target="_blank" rel="noopener noreferrer">帮助中心/下载</a>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className='header-toolbar-right'>
                    <Link to={`/login.html`} className="ant-btn">登录</Link>
                </div>
            </div>
        )
    }
}
LayoutTop.defaultProps = {
    initData:()=>{} 
}
LayoutTop.propTypes = {
    initData: React.PropTypes.func,
}

export default LayoutTop