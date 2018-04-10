import React, { Component } from 'react'
import { Spin, Button } from '../../base/components/AntdComp';
import EditCompanyCont from '../dialogconts/EditCompanyCont';
import { prefix, prefix_route, prefixCh, prefixEcf } from '../../base/consts/UrlsConfig'
class CompanySetComp extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.getEnterpriseInfo();
    }

    render() {
        let { state, AddPositionVisiable, ...props } = this.props;
        let info = state.enterpriseInfo;
        let industry = '', addr = info.companyAddr || "";
        if (info.companyIndustry != undefined) {
            info.companyIndustry.map((item) => {
                industry += item.industryName + " / ";
            })
        } else {
            industry = '';
        }
        industry = industry.substr(0, industry.length - 2);
        return (
            <div className='companyset-box'>
                {
                    state.loading ? null : (state.judgeInitCompy == "1" ? null : <div className='initCompyMsg'>请完善企业信息，以便更好的进行业务开展 !</div>)
                }
                <Spin spinning={state.loading}>
                    <div>
                        <div className='companyset-content'>
                            <h3 className="companyset-name">{info.companyName || ''} {'(' + (info.companyCode || '') + ' )'}</h3>
                            <div className="companyset-info">
                                {typeof window.ENUM.getEnum("nature", info.companyType) == 'string' ? window.ENUM.getEnum("nature", info.companyType) : ''}
                                {typeof window.ENUM.getEnum("scale", info.companyScale) == 'string' ? ' | ' + window.ENUM.getEnum("scale", info.companyScale) : ''}
                                {industry ? ' | ' + industry : ''}
                            </div>
                            <p className="companyset-logo"><img src={info.companyLogo || prefix + prefixCh + "img/companyLogo.png"} alt="" title={info.companyName || ''} /></p>
                            <div className="companyset-con">
                                <div className="companyset-con-box">
                                    <p><span className="company-tit">公司简称:</span><span className="company-text">{info.companyAbbr || ''}</span></p>
                                    <p><span className="company-tit">法人代表:</span><span className="company-text">{info.corporation || ''}</span></p>
                                    <p><span className="company-tit">公司电话:</span><span className="company-text">{info.telephoneNumber || ''}</span></p>
                                    <p><span className="company-tit">注册地址:</span><span className="company-text">{(addr.addressDetl || '')}</span></p>
                                    <p><span className="company-tit">邮编:</span><span className="company-text">{info.zipCode || ''}</span></p>
                                    <p><span className="company-tit">公司简介:</span><span className="company-text">{info.companyDesc || ''}</span></p>
                                    <p><span className="company-tit">所属租户:</span><span className="company-text">{info.tenantName || ''}</span></p>
                                    <p className="companyset-contact"><span className="company-tit">业务联系人:</span><span className="company-text">{info.contacts || ''}</span></p>
                                    <p className="companyset-contact"><span className="company-tit">业务联系人手机:</span><span className="company-text">{info.contactsPhone || ''}</span></p>
                                </div>
                            </div>
                            {info.acctType != 0 ?
                                <div className="company-set-button"><Button type="primary" onClick={() => AddPositionVisiable(info.companyCode)}><i className="c2mfont c2m-shezhi" style={{ fontSize: '9px', marginRight: '10px' }}></i>设置</Button></div>
                                : null}
                            <EditCompanyCont {...this.props} />
                        </div>
                    </div>
                </Spin>
            </div>
        )

    }
}

export default CompanySetComp



