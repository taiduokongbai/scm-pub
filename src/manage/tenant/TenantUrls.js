//租户管理
import { prefix, prefixScm, prefixPub } from '../../base/consts/UrlsConfig';
import {ReqApi} from '../../base/services/ReqApi';
const tenant = 'tenant';

const page  = { page: 1, pageSize: 15 };

const TenantFetch = {
    //租户列表
    tenantList: (pm = {}) => ReqApi.get({
        url:`${prefixPub}/${tenant}/list`,
        pm: Object.assign({},page,pm)
    }),

    //新建租户
    tenantAdd: (pm = {}) => ReqApi.post({
        url:`${prefixPub}/${tenant}/add`,
        pm
    }),
    //租户详情
    tenantDetail: (pm = {}) => ReqApi.get({
        url:`${prefixPub}/${tenant}/detail`,
        pm
    }),
    //租户状态
    tenantStatus: (pm = {}) => ReqApi.post({
        url:`${prefixPub}/${tenant}/isDisable`,
        pm
    }),

    //编辑租户
    tenantEdit: (pm = {}) => ReqApi.post({
        url:`${prefixPub}/${tenant}/update`,
        pm
    }),
   
}
export { TenantFetch };    
