import React, {Component} from "react";
import {connect} from "react-redux";
import {Tabs, Button, Breadcrumb} from '../../base/components/AntdComp';
import {removeTabs} from '../../base/consts/Utils';
import TabsAct from '../actions/TabsAct';

//职位管理
import PositionCont from './PositionCont';
//部门管理
import DepartmentCont from './DepartmentCont';
//员工管理
import MemberManageCont from './MemberManageCont';
//权限容器
import AuthorityCont from './AuthorityCont';
//地址管理
import AddressCont from './AddressCont';
//站点管理
import SiteCont from './SiteCont';
//基础数据
import BaseDataCont from './BaseDataCont';
//编码规则管理
import CodeRuleCont from './CodeRuleCont';

//基础数据
import IndexComp from '../../baseData/comps/IndexComp';
//民族
import MinZuComp from '../../baseData/comps/MinZuComp';
//性别
import XingBieComp from '../../baseData/comps/XingBieComp';
//语言
import YuYanComp from '../../baseData/comps/YuYanComp';
//婚姻
import HunYinComp from '../../baseData/comps/HunYinComp';
//证件
import ZhengJianComp from '../../baseData/comps/ZhengJianComp';
//任职
import RenzhiComp from '../../baseData/comps/RenzhiComp';
//血型
import XueXingComp from '../../baseData/comps/XueXingComp';
//在职
import ZaiZhiComp from '../../baseData/comps/ZaiZhiComp';
//学历
import XueLiComp from '../../baseData/comps/XueLiComp';
//行业
import HangYeComp from '../../baseData/comps/HangYeComp';
//公司规模
import CompanySizeComp from '../../baseData/comps/CompanySizeComp';
//公司类别
import CompanyNatureComp from '../../baseData/comps/CompanyNatureComp';
//公司性质
import CompanyCategoryComp from '../../baseData/comps/CompanyCategoryComp';
//经营类型
import ManagementTypeComp from '../../baseData/comps/ManagementTypeComp';
//国家
import CountryComp from '../../baseData/comps/CountryComp';
//省份
import ProvinceComp from '../../baseData/comps/ProvinceComp';
//城市
import CityComp from '../../baseData/comps/CityComp';
//区县
import CountyComp from '../../baseData/comps/CountyComp';
//库存状态
import InventoryStatusComp from '../../baseData/comps/InventoryStatusComp';
//发票类型
import InvoiceTypeComp from '../../baseData/comps/InvoiceTypeComp';
//支付条款
import ZhifuComp from '../../baseData/comps/ZhifuComp';
//收付款条件
import ShoufukuanComp from '../../baseData/comps/ShoufukuanComp';
//结算方式
import AccountMethodComp from '../../baseData/comps/AccountMethodComp';
//配送方式
import DeliveryMethodComp from '../../baseData/comps/DeliveryMethodComp';
//计价元素
import ValuationComp from '../../baseData/comps/ValuationComp';
//币种
import CurrencyComp from '../../baseData/comps/CurrencyComp';
//业务类型
import BusinessTypeComp from '../../baseData/comps/BusinessTypeComp';
//计量单位
import MeterageComp from '../../baseData/comps/MeterageComp';
const TabPane = Tabs.TabPane;

class TabsCont extends Component {
    constructor(prop) {
        super(prop);
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    remove = (targetKey) => {
        removeTabs(targetKey, this.props);
    }
    getContent = (tab) => {
        switch (tab.key) {
            case "position":
                return <PositionCont/>
            case "department":
                return <DepartmentCont/>
            case "address":
                return <AddressCont/>
            case "site":
                return <SiteCont/>
          /*  case "basedata":
                return <BaseDataCont/>*/
            case "basedata":
                return <IndexComp/>
            case "member":
                return <MemberManageCont/>
            case "authority":
                return <AuthorityCont/>
            case "coderule":
                return <CodeRuleCont/>
            //基础数据项
            case "minzu":
                return <MinZuComp/>
            case "xingbie":
                return <XingBieComp/>
            case "yuyan":
                return <YuYanComp/>
            case "hunyin":
                return <HunYinComp/>
            case "zhengjian":
                return <ZhengJianComp/>
            case "renzhi":
                return <RenzhiComp/>
            case "xuexing":
                return <XueXingComp/>
            case "zaizhi":
                return <ZaiZhiComp/>
            case "xueli":
                return <XueLiComp/>
            case "hangye":
                return <HangYeComp/>
            case "companysize":
                return <CompanySizeComp/>
            case "companynature":
                return <CompanyNatureComp/>
            case "companycategory":
                return <CompanyCategoryComp/>
            case "managementtype":
                return <ManagementTypeComp/>
            case "country":
                return <CountryComp/>
            case "province":
                return <ProvinceComp/>
            case "county":
                return <CountyComp/>
            case "city":
                return <CityComp/>
            case "inventorystatus":
                return <InventoryStatusComp/>
            case "invoicetype":
                return <InvoiceTypeComp/>
            case "zhifu":
                return <ZhifuComp/>
            case "shoufu":
                return <ShoufukuanComp/>
            case "accountmethod":
                return <AccountMethodComp/>
            case "deliverymethod":
                return <DeliveryMethodComp/>
            case "valuation":
                return <ValuationComp/>
            case "currency":
                return <CurrencyComp/>
            case "businesstype":
                return <BusinessTypeComp/>
            case "meterage":
                return <MeterageComp/>

            default:
                return null;
        }
    }
    closeOtherTab=(e)=>{
        this.props.closeOtherTab();
    }
    render() {
        const {tabs, activeKey, tabChange, tabsData} = this.props;
        let _breadcrums = undefined;
        if (activeKey) {
            _breadcrums = tabsData[activeKey].breadcrum;
        }
        return (
            <div>
                <div className="ew-breadcrumb">
                    <div className="breadcrum-inner">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>你所在的位置</Breadcrumb.Item>
                            {
                                _breadcrums != undefined ? _breadcrums.map((item, index) => {
                                    return (<Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
                                }) : null
                            }
                        </Breadcrumb>
                    </div>
                </div>
                <div className="ew-tabs">
                    <Tabs
                        tabBarExtraContent={
                            <div className="close-close-other-tab-btn" onClick={this.closeOtherTab}>关闭其他页签</div>
                        }
                        animated={false}
                        hideAdd
                        onChange={tabChange}
                        activeKey={activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            tabs.map(pane =>
                                <TabPane tab={pane.title} key={pane.key}>
                                    {this.getContent(pane)}
                                </TabPane>
                            )
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.TabsRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    tabChange: (activeKey) => {
        dispatch(TabsAct.TabChange(activeKey));
    },
    tabRemove: (key, activeKey) => {
        dispatch(TabsAct.TabRemove(key, activeKey));
    },
    closeOtherTab: () => {
        dispatch(TabsAct.removeOther());
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(TabsCont);