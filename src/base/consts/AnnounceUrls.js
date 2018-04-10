import { ReqApi } from '../../base/services/ReqApi';
import { prefixPub } from './UrlsConfig';
const page = { page: 1, pageSize: 15 };
const AnnounceFetch = {
    AnnounceMentList: (pm = {}) =>
        ReqApi.get({
            url: `${prefixPub}/announcement/getList`, //获取公告列表列表(带分页)
            pm: Object.assign({}, page, pm)
        }),
    AnnounceMentDelete: (pm) =>
        ReqApi.post({
            url: `${prefixPub}/announcement/delete`, //公告列表删除
            pm
        }),
    AnnounceDetails: (pm) =>
        ReqApi.get({
            url: `${prefixPub}/announcement/getDetail`, //公告列表明细
            pm
        }),
    AnnounceUpdate: (pm) =>
        ReqApi.post({
            url: `${prefixPub}/announcement/update`, //编辑公告数据回填
            pm
        }),
    AnnounceAdd: (pm = {}) =>
        ReqApi.post({
            url: `${prefixPub}/announcement/add`, // 新建发布公告
            pm
        }),
    PersonalInfo: (pm = {}) =>
        ReqApi.get({
            url: `${prefixPub}/employees/getWithToken`, // 发布公告详情获取登录个人信息
            pm
        }),
    Logout: (pm = {}) =>
        ReqApi.get({
            url: `${prefixPub}/${login}/logout`, // 登录退出
            pm
        }),
}
export { AnnounceFetch }