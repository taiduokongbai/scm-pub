import { fromJS, Record,List } from "immutable";
import { TABSREDU } from "../consts/ActTypes";

let initState = fromJS({
    activeKey:"",
    openKeys:[],
    tabs:[],
    tabsData: {},
    menusData: [],
});

const TabsRedu = (state = initState, action) => {
    switch (action.type) {
        case TABSREDU:
            return action.state;
        default:
            return state;
    }
}
export default TabsRedu;

let tabsData = {
    "position": { title: "职位", pkey: ["organi"], breadcrum: ["组织架构", "职位"] },
    "department": { title: "部门", pkey: ["organi"], breadcrum: ["组织架构", "部门"] },
    "member": { title: "员工管理", pkey: [""], breadcrum: ["员工管理"] },
    "authority": { title: "权限", pkey: [""], breadcrum: ["权限管理"] },
    "address": { title: "地址管理", pkey: ["system"], breadcrum: ["系统管理", "地址管理"] },
    "site": { title: "站点", pkey: ["system"], breadcrum: ["系统管理", "站点管理"] },
    "basedata": { title: "基础数据", pkey: ["system"], breadcrum: ["系统管理", "基础数据"] },
    "coderule": { title: "编码规则", pkey: ["system"], breadcrum: ["系统管理", "编码规则"] },
    "terracerule": { title: "曼威后台编码管理", pkey: ["system"], breadcrum: ["系统管理", "曼威后台编码管理"] },

    //基础数据项
    "minzu": { title: "民族", pkey: ["basedata"], breadcrum: ["基础数据", "民族"] },
    "xingbie": { title: "性别", pkey: ["basedata"], breadcrum: ["基础数据", "性别"] },
    "yuyan": { title: "语言", pkey: ["basedata"], breadcrum: ["基础数据", "语言"] },
    "hunyin": { title: "婚姻", pkey: ["basedata"], breadcrum: ["基础数据", "婚姻"] },
    "zhengjian": { title: "证件类型", pkey: ["basedata"], breadcrum: ["基础数据", "证件类型"] },
    "renzhi": { title: "任职类型", pkey: ["basedata"], breadcrum: ["基础数据", "任职类型"] },
    "xuexing": { title: "血型", pkey: ["basedata"], breadcrum: ["基础数据", "血型"] },
    "zaizhi": { title: "在职状态", pkey: ["basedata"], breadcrum: ["基础数据", "在职状态"] },
    "xueli": { title: "学历", pkey: ["basedata"], breadcrum: ["基础数据", "学历"] },
    "hangye": { title: "行业", pkey: ["basedata"], breadcrum: ["基础数据", "行业"] },
    "companysize": { title: "公司规模", pkey: ["basedata"], breadcrum: ["基础数据", "公司规模"] },
    "companynature": { title: "公司类别", pkey: ["basedata"], breadcrum: ["基础数据", "公司类别"] },
    "companycategory": { title: "公司性质", pkey: ["basedata"], breadcrum: ["基础数据", "公司性质"] },
    "managementtype": { title: "经营类型", pkey: ["basedata"], breadcrum: ["基础数据", "经营类型"] },
    "country": { title: "国家", pkey: ["basedata"], breadcrum: ["基础数据", "国家"] },
    "province": { title: "省份", pkey: ["basedata"], breadcrum: ["基础数据", "省份"] },
    "city": { title: "城市", pkey: ["basedata"], breadcrum: ["基础数据", "城市"] },
    "county": { title: "区县", pkey: ["basedata"], breadcrum: ["基础数据", "区县"] },
    "inventorystatus": { title: "库存状态", pkey: ["basedata"], breadcrum: ["基础数据", "库存状态"] },
    "invoicetype": { title: "发票类型", pkey: ["basedata"], breadcrum: ["基础数据", "发票类型"] },
    "zhifu": { title: "支付条款", pkey: ["basedata"], breadcrum: ["基础数据", "支付条款"] },
    "shoufu": { title: "收付款条件", pkey: ["basedata"], breadcrum: ["基础数据", "收付款条件"] },
    "accountmethod": { title: "结算方式", pkey: ["basedata"], breadcrum: ["基础数据", "结算方式"] },
    "deliverymethod": { title: "配送方式", pkey: ["basedata"], breadcrum: ["基础数据", "配送方式"] },
    "valuation": { title: "计价元素", pkey: ["basedata"], breadcrum: ["基础数据", "计价元素"] },
    "currency": { title: "币种", pkey: ["basedata"], breadcrum: ["基础数据", "币种"] },
    "businesstype": { title: "业务类型", pkey: ["basedata"], breadcrum: ["基础数据", "业务类型"] },
    "meterage": { title: "计量单位", pkey: ["basedata"], breadcrum: ["基础数据", "计量单位"] },
};
export { tabsData };
