import {ReqApi} from '../../base/services/ReqApi'

const prefix = window.LUX_URL || 'http://localhost:9099'; //服务器
const prefixPub = prefix + '/pub'; //服务器
const basic = 'basic';
const BaseDataUrls = {
    getList: `${prefixPub}/${basic}/subject/getList`,
    //库存状态列表
    getInventoryList  :`${prefixPub}/${basic}/inventory/getList`,
    //收付款
    addCategoryItem: `${prefixPub}/${basic}/category/add`,
    deleteCategoryItem: `${prefixPub}/${basic}/category/delete`,
    isDisableCategoryItem: `${prefixPub}/${basic}/category/isDisable`,
    updateCategoryItem: `${prefixPub}/${basic}/category/update`,
    detailCategoryItem: `${prefixPub}/${basic}/category/getDetail`,
    //结算方式
    getSettleList: `${prefixPub}/${basic}/settle/getList`,
    addSettleItem: `${prefixPub}/${basic}/settle/add`,
    deleteSettleItem: `${prefixPub}/${basic}/settle/delete`,
    updateSettleItem: `${prefixPub}/${basic}/settle/update`,
    detailSettleItem: `${prefixPub}/${basic}/settle/getDetail`,
    isDisableSettleItem: `${prefixPub}/${basic}/settle/isDisable`,
    //配送
    getDispatchList: `${prefixPub}/${basic}/dispatch/getList`,
    addDispatchItem: `${prefixPub}/${basic}/dispatch/add`,
    deleteDispatchItem: `${prefixPub}/${basic}/dispatch/delete`,
    isDisableDispatchItem: `${prefixPub}/${basic}/dispatch/isDisable`,
    detailDispatchItem: `${prefixPub}/${basic}/dispatch/getDetail`,
    updateDispatchItem: `${prefixPub}/${basic}/dispatch/update`,
    //币种
    getCurrencyList: `${prefixPub}/${basic}/currency/getList`,
    addCurrencyItem: `${prefixPub}/${basic}/currency/add`,
    deleteCurrencyItem: `${prefixPub}/${basic}/currency/delete`,
    updateCurrencyItem: `${prefixPub}/${basic}/currency/update`,
    detailCurrencyItem: `${prefixPub}/${basic}/currency/getDetail`,
    isDisableCurrencyItem: `${prefixPub}/${basic}/currency/isDisable`,

    getCountryList: `${prefixPub}/${basic}/country/getList`,
    //
    addPayItem: `${prefixPub}/${basic}/category/add`,
    //计价元素
    addPriceItem: `${prefixPub}/${basic}/price/add`,
    detailPriceItem: `${prefixPub}/${basic}/price/getDetail`,
    priceList: `${prefixPub}/${basic}/price/getList`,
    updatePriceItem: `${prefixPub}/${basic}/price/update`,
    isDisablePriceItem: `${prefixPub}/${basic}/price/isDisable`,
    deletePriceItem: `${prefixPub}/${basic}/price/delete`,
    //计量单位
    getMeasureList: `${prefixPub}/${basic}/measure/getList`,
    addMeasureItem: `${prefixPub}/${basic}/measure/add`,
    getMeasureByCode: `${prefixPub}/${basic}/measure/getDetail`,
    updateMeasureItem: `${prefixPub}/${basic}/measure/update`,
    isDisableMeasureItem: `${prefixPub}/${basic}/measure/isDisable`,
    deleteMeasureItem: `${prefixPub}/${basic}/measure/delete`,
    //业务类型
    getBusinessList: `${prefixPub}/${basic}/business/getList`,
    addBusinessItem: `${prefixPub}/${basic}/business/add`,
    deleteBusinessItem: `${prefixPub}/${basic}/business/delete`,
    isDisableBusinessItem: `${prefixPub}/${basic}/business/isDisable`,
    detailBusinessItem: `${prefixPub}/${basic}/business/getDetail`,
    updateBusinessItem: `${prefixPub}/${basic}/business/update`,
    //省份
    getProvinceList: `${prefixPub}/${basic}/province/getList`,
    //城市
    getCityList: `${prefixPub}/${basic}/city/getList`,
    //区县
    getCountyList: `${prefixPub}/${basic}/county/getList`,
}
const actions = {

    getList: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.getList,
        pm: Object.assign({}, pm)
    }),
    //库存状态列表
    getInventoryList: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.getInventoryList,
        pm: Object.assign({}, pm)
    }),

    //收付款
    addCategoryItem:(pm = {}) => ReqApi.post({
    url: BaseDataUrls.addCategoryItem,
    pm: Object.assign({}, pm)
   }),

    deleteCategoryItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.deleteCategoryItem,
        pm: Object.assign({}, pm)
    }),

    isDisableCategoryItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.isDisableCategoryItem,
        pm: Object.assign({}, pm)
    }),
    updateCategoryItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.updateCategoryItem,
        pm: Object.assign({}, pm)
    }),
    detailCategoryItem: (pm = {}) => ReqApi.get({
        url: BaseDataUrls.detailCategoryItem,
        pm: Object.assign({}, pm)
    }),
    //结算
    getSettleList: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.getSettleList,
        pm: Object.assign({}, pm)
    }),
    addSettleItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.addSettleItem,
        pm: Object.assign({}, pm)
    }),
    deleteSettleItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.deleteSettleItem,
        pm: Object.assign({}, pm)
    }),
    isDisableSettleItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.isDisableSettleItem,
        pm: Object.assign({}, pm)
    }),
    updateSettleItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.updateSettleItem,
        pm: Object.assign({}, pm)
    }),
    detailSettleItem: (pm = {}) => ReqApi.get({
        url: BaseDataUrls.detailSettleItem,
        pm: Object.assign({}, pm)
    }),
    //配送
    getDispatchList: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.getDispatchList,
        pm: Object.assign({}, pm)
    }),
    addDispatchItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.addDispatchItem,
        pm: Object.assign({}, pm)
    }),
    deleteDispatchItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.deleteDispatchItem,
        pm: Object.assign({}, pm)
    }),
    isDisableDispatchItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.isDisableDispatchItem,
        pm: Object.assign({}, pm)
    }),
    detailDispatchItem: (pm = {}) => ReqApi.get({
        url: BaseDataUrls.detailDispatchItem,
        pm: Object.assign({}, pm)
    }),
    updateDispatchItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.updateDispatchItem,
        pm: Object.assign({}, pm)
    }),
    //国家
    getCountryList: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.getCountryList,
        pm: Object.assign({}, pm)
    }),
    //币种
    getCurrencyList: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.getCurrencyList,
        pm: Object.assign({}, pm)
    }),
    addCurrencyItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.addCurrencyItem,
        pm: Object.assign({}, pm)
    }),
    deleteCurrencyItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.deleteCurrencyItem,
        pm: Object.assign({}, pm)
    }),
    isDisableCurrencyItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.isDisableCurrencyItem,
        pm: Object.assign({}, pm)
    }),
    updateCurrencyItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.updateCurrencyItem,
        pm: Object.assign({}, pm)
    }),
    detailCurrencyItem: (pm = {}) => ReqApi.get({
        url: BaseDataUrls.detailCurrencyItem,
        pm: Object.assign({}, pm)
    }),
    //添加支付条款
    addPayItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.addPayItem,
        pm: Object.assign({}, pm)
    }),

    //计价元素
    getPriceList: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.priceList,
        pm: Object.assign({}, pm)
    }),
    detailPriceItem: (pm = {}) => ReqApi.get({
        url: BaseDataUrls.detailPriceItem,
        pm: Object.assign({}, pm)
    }),
    addPriceItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.addPriceItem,
        pm: Object.assign({}, pm)
    }),
    updatePriceItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.updatePriceItem,
        pm: Object.assign({}, pm)
    }),
    isDisablePriceItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.isDisablePriceItem,
        pm: Object.assign({}, pm)
    }),
    deletePriceItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.deletePriceItem,
        pm: Object.assign({}, pm)
    }),
    //计量单位
    getMeasureList: (pm = {}) => ReqApi.get({
        url: BaseDataUrls.getMeasureList,
        pm: Object.assign({}, pm)
    }),
    addMeasureItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.addMeasureItem,
        pm: Object.assign({}, pm)
    }),
    updateMeasureItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.updateMeasureItem,
        pm: Object.assign({}, pm)
    }),
    measureItemDetail: (pm = {}) => ReqApi.get({
        url: BaseDataUrls.getMeasureByCode,
        pm: Object.assign({}, pm)
    }),
    isDisableMeasureItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.isDisableMeasureItem,
        pm: Object.assign({}, pm)
    }),
    deleteMeasureItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.deleteMeasureItem,
        pm: Object.assign({}, pm)
    }),

    //业务类型
    getBusinessList:(pm = {}) => ReqApi.post({
    url: BaseDataUrls.getBusinessList,
    pm: Object.assign({}, pm)
}),
    addBusinessItem:(pm = {}) => ReqApi.post({
        url: BaseDataUrls.addBusinessItem,
        pm: Object.assign({}, pm)
    }),
    deleteBusinessItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.deleteBusinessItem,
        pm: Object.assign({}, pm)
    }),
    isDisableBusinessItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.isDisableBusinessItem,
        pm: Object.assign({}, pm)
    }),
    detailBusinessItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.detailBusinessItem,
        pm: Object.assign({}, pm)
    }),
    updateBusinessItem: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.updateBusinessItem,
        pm: Object.assign({}, pm)
    }),
    //省份
    getProvinceList: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.getProvinceList,
        pm: Object.assign({}, pm)
    }),
    //城市
    getCityList: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.getCityList,
        pm: Object.assign({}, pm)
    }),
    //区县
    getCountyList: (pm = {}) => ReqApi.post({
        url: BaseDataUrls.getCountyList,
        pm: Object.assign({}, pm)
    }),
}
export {BaseDataUrls, actions}
