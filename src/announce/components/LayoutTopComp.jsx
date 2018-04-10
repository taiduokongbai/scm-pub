import React,{Component} from "react";
import {Icon,Menu,Button} from '../../base/components/AntdComp';
import {Link} from "react-router";
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig'
var {PropTypes} = React;
let { observable, action, computed, runInAction, toJS } = mobx;
let { observer } = mobxReact;
import { announceTopStore } from '../data/AnnounceTopStore';
@observer
class LayoutTop extends Component{
    constructor(prop){
        super(prop);
    }
    componentDidMount(){
       announceTopStore.PersonalInfo()
    }
    render(){
        return (
            <div className='header-toolbar' style={{padding:0}}>
                <div className='header-toolbar-logo'>
                    <div className="header-toolbar-logo-text">
                        <Menu mode="horizontal" className="header-logo-box">
                            <Menu.Item key="logo" style={{padding:0}}>
                               <h1 className="header-logo"><i className="c2mfont c2m-gongsi"></i>&nbsp;&nbsp;&nbsp;{announceTopStore.dataSource.companyName}</h1>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                {/*<div className='header-toolbar-right'>
                    <a href={`${prefix}${prefixCh}login.html`}>退出 &nbsp;<i className="c2mfont c2m-tuichu" ></i></a>
                </div>*/}
            </div>
        )
    }
}
export default LayoutTop