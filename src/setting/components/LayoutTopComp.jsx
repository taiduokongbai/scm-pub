
import React,{Component} from "react";
import {Icon,Menu,Dropdown} from '../../base/components/AntdComp';;
import {Link} from 'react-router';
var {PropTypes} = React;
import {prefix,prefix_route} from '../../base/consts/UrlsConfig'

class LayoutTop extends Component{
    constructor(prop){
        super(prop);
    }
    componentWillMount(){
        this.props.initData();
    }
    getMenu=()=>{
        return (
            <Menu>
                <Menu.Item key="menu_1"><a href={prefix+`${prefix_route}/setting.html`}>个人中心</a></Menu.Item>
                <Menu.Item key="menu_2"><a href={prefix+`${prefix_route}/R/setting/company`}>企业设置</a></Menu.Item>
            </Menu>
        )
    }
    render(){
        const loginUser = {name:"张三",companyName:"上海曼威信息技术（上海）有限公司"};
        return (
            <div className='header-toolbar'>
                <div className='header-toolbar-logo'>
                    <div className="header-toolbar-logo-text">
                        <i className="anticon anticon-global"></i> <span>{loginUser.companyName}</span>
                    </div>
                    <div className="header-nav">
                        <a>工作</a>
                    </div>
                </div>
                <div className='header-toolbar-right'>
                    <div className="help">
                        <i className="anticon anticon-question-circle"></i> <a>帮助</a>
                    </div>
                    <Dropdown overlay={this.getMenu()}>
                        <a className='user'>
                            <span className='img'><img src="" width="30" height="30" /></span>
                            <span>{loginUser.name} <Icon type="down" /></span>
                        </a>
                    </Dropdown>
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