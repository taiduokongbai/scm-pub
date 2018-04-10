//平台类目
import { prefix, prefixScm, prefixPub } from '../../base/consts/UrlsConfig';
import {ReqApi} from '../../base/services/ReqApi';
const category = 'goodsCategory';

const page  = { page: 1, pageSize: 10 };

const PlatCategoryFetch = {
    //平台类目列表
    platCategoryList: (pm = {}) => ReqApi.get({
        url:`${prefixPub}/${category}/getList`,
        pm
    }),

    //平台类目新增
    platCategoryAdd: (pm = {}) => ReqApi.post({
        url:`${prefixPub}/${category}/add`,
        pm
    }),

    //平台类目详情
    PlatCategoryDetail: (pm = {}) => ReqApi.get({
        url:`${prefixPub}/${category}/getDetail`,
        pm
    }),
    //平台类目编辑
    platCategoryEdit: (pm = {}) => ReqApi.post({
        url:`${prefixPub}/${category}/update`,
        pm
    }),
    //平台类目删除
    platCategoryDelete: (pm = {}) => ReqApi.post({
        url:`${prefixPub}/${category}/delete`,
        pm
    }),
   //平台类目修改状态
   platCategoryStatus: (pm = {}) => ReqApi.post({
        url:`${prefixPub}/${category}/isDisable`,
        pm
    }),
    //平台类目获取上级类目
   GetParentList: (pm = {}) => ReqApi.post({
        url:`${prefixPub}/${category}/getParentList`,
        pm
    }),
}
export { PlatCategoryFetch };    
