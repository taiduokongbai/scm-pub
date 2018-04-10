import React,{Component} from "react";
import {Link} from 'react-router';
import { Button,Breadcrumb } from '../../base/components/AntdComp';;
import CompanySetComp from '../components/CompanySetComp';
import { connect } from 'react-redux'
import actions from '../actions/CompanySetAct'
import { fromJS, Record} from 'immutable';
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig'

class CompanySetCont extends Component{
    constructor(props,context){
        super(props,context);
    }

    acctTypeLink=()=>{
        if(this.props.layoutTop.dataSource && this.props.layoutTop.dataSource.acctType === 0){
            return <Breadcrumb.Item><a href={`${prefix}${prefixCh}main.html`}>首页</a></Breadcrumb.Item>
        }
        return <Breadcrumb.Item>首页</Breadcrumb.Item>
    }
    render(){
        return (
            <div className="inner-content">
                <div className="ew-breadcrumb">
                    <div className="breadcrum-inner">
                        <Breadcrumb separator=">">
                            {
                                this.acctTypeLink()
                            }
                            <Breadcrumb.Item>企业设置</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="inner-content-page">
                    <CompanySetComp {...this.props} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {
    //console.log(state.CompanySetRedu.toJS())
    return {
        state: state.CompanySetRedu.toJS(),
        layoutTop:state.LayoutTopRedu.toJS()
    }
};

const mapDispatchToProps = (dispatch) => ({
    getEnterpriseInfo: () => {
		dispatch( actions.getEnterpriseInfo())
	},
    AddPositionVisiable: (companyCode) => {
        dispatch(actions.AddPositionVisiable(true));
        dispatch(actions.PositionDetail({ companyCode}));


    },
})
export default connect( mapStateToProps, mapDispatchToProps )(CompanySetCont)
