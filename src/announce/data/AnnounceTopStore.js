import { ReqApi, delJsonHead, delCookie, getCookie } from '../../base/services/ReqApi'
import { Urls, LoginUrls } from '../../base/consts/Urls'
import { message } from '../../base/components/AntdComp';
import { prefix, prefix_route, prefixCh } from '../../base/consts/UrlsConfig'
import { AnnounceFetch } from '../../base/consts/AnnounceUrls';
let { observable, action, computed, runInAction, toJS, useStrict } = mobx;
export class AnnounceTopStore {
    @observable dataSource = []
    @action
    PersonalInfo(pm) {
        // 获取登录 个人信息
       return AnnounceFetch.PersonalInfo(pm).then(json => {
            if (json.status == 2000) {
                if (json.data) {
                    this.dataSource = json.data
                }
            }
            return json;
        })
    }
    // @action
    // //退出系统
    // Logout(pm) {
    //     let tokenId = getCookie("tokenId");
    //     pm.tokenId = tokenId;
    //     AnnounceFetch.Logout(pm).then(json => {
    //         if (json.status == 2000) {
    //             delJsonHead();
    //             window.location.href = prefix + prefixCh + "login.html";
    //         }
    //     })
    // }
}
let announceTopStore = new AnnounceTopStore();
export { announceTopStore }