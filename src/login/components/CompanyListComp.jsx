import React,{Component} from 'react';
import {Spin} from '../../base/components/AntdComp';

class CompanyListComp extends Component{
    constructor(props,context){
        super(props,context);
    }
    CompanyListBtn=(companyCode)=>{
        let data={companyCode:companyCode}
        this.props.CompanyList(data)
    }
render(){
        let {dataSource,spinning} = this.props;
        return (
            <div className="login-wrapper">
                <div className="login-content">
                    <h1 className="login-title">欢迎登录C2M平台</h1>
                    <Spin spinning={spinning} tip="loading...">
                    <ul className="company-list">
                        {dataSource.map((data,index)=>{
                            return (
                                <li className="company-item" key={data.companyCode} onClick={()=>this.CompanyListBtn(data.companyCode)}><span className="c2mfont c2m-enter" ></span>{data.companyName}</li>
                            )
                        })}
                    </ul>
                    </Spin>
                    <div className="company-back" onClick={this.props.backBtn}>&lt;&lt;返回上一步</div>
                </div>
            </div>
        );
    }
}

export default CompanyListComp;