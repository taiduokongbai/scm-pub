import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from '../../base/components/AntdComp';

import { HashRouter, Route, Link } from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LayoutSiderComp extends Component {
    constructor(prop) {
        super(prop);
    }
    handleClick = (e) => {
        this.props.tabs(e.key);
    }
    render() {
        const {mode} = this.props;
        let a = this.props.match.params.key && this.props.match.params.key > 6 ? 1 : this.props.match.params.key
        let selectedKey = a || "1";

        return (
            <Menu
                defaultSelectedKeys={['1']}
                selectedKeys={[selectedKey + ""]}
                defaultOpenKeys={['organi']}
                onClick={this.handleClick}
                mode={mode}>
                {/*<Menu.Item className="menu-root-one" key="3" title="租户管理"><Link to="/3"><i  className="c2mfont c2m-zuhuguanli menu-c2m-font" />租户管理</Link></Menu.Item>
                <Menu.Item className="menu-root-one" key="1" title="公司管理"><Link to="/1"><i  className="c2mfont c2m-gongsiguanli menu-c2m-font" />公司管理</Link></Menu.Item>*/}
                <Menu.Item className="menu-root-one" key="2" title="编码设置"><Link to="/2"><i  className="c2mfont c2m-bianmashezhi menu-c2m-font" />编码设置</Link></Menu.Item>

                <SubMenu key="organiy" title={<span><i  className="c2mfont c2m-gonggaoguanli menu-c2m-font" /><span className="nav-text">公告管理</span></span>}>
                   <Menu.Item key="5" title="公告管理"><Link to="/5">历史公告</Link></Menu.Item>
                   <Menu.Item key="4" title="发布公告"><Link to="/4">发布公告</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="category" title={<span><i  className="c2mfont c2m-pingtaishuju menu-c2m-font" /><span className="nav-text">平台数据</span></span>}>
                   <Menu.Item key="6" title="平台类目"><Link to="/6">平台类目</Link></Menu.Item>
                </SubMenu>


            </Menu>
        )
    }
}

export default LayoutSiderComp;