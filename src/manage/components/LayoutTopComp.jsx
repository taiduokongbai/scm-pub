import React,{Component} from "react";
import {Icon,Menu,Button} from '../../base/components/AntdComp';
import {Link} from "react-router";
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig';
import actions from '../actions/LayoutTopAct';
import { connect } from 'react-redux';
var {PropTypes} = React;

class LayoutTop extends Component{
    constructor(prop){
        super(prop);
    }
    componentWillMount(){
    }
    render(){
        return (
            <div className='header-toolbar'style={{padding:0}}>
                <div className='header-toolbar-logo'>
                    <div className="header-toolbar-logo-text">
                        <Menu mode="horizontal" className="header-logo-box">
                            <Menu.Item key="logo" style={{padding:0}}>
                                <h1 className="header-logo"><i className="c2mfont c2m-gongsi"></i>&nbsp;&nbsp;&nbsp;赛往后台</h1>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className='header-toolbar-right'>
                    <a href="###" onClick={this.props.Logout}>退出 &nbsp;<i className="c2mfont c2m-tuichu" ></i></a>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => state.LayoutTopRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    Logout: () => { dispatch(actions.Logout())}
})
export default connect(mapStateToProps, mapDispatchToProps)(LayoutTop);