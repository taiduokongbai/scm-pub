import moment from "moment";
import { TenantFetch } from './TenantUrls';
let { observable, action, computed, runInAction, toJS } = mobx;
import TableStore from '../../base/stores/TableStore'; 


export class TenantSideStore {
    @observable sidebar_loding = false;
     initDetail = {
        tenantName: "",
        tenantDesc: "",
        tenantAbbr: "",
        contactsPhone: "",
        contacts: "",
        groupTenantCode: "",
        creatByName: "",
        enterDate:  "",
        status: "",
        list:[]
    };
    @observable detail = { ...this.initDetail };

    @computed get getDetail() {
        return this.detail;
    }
     @action resetDetail() {
        this.detail = { ...this.initDetail };
    }
    @action fetchTenantDetail(pm) {
        this.sidebar_loding = true;
        this.resetDetail();
        return TenantFetch.tenantDetail(pm).then(json => {
            if (json.status === 2000) {
                runInAction(() => {
                   this.detail=json.data;
                   
                })
            };
            runInAction(() => {
                this.sidebar_loding = false;
            })
            return json;
        })
    }

     @action fetchTenantStatus(pm) {
        this.sidebar_loding = true;
        return TenantFetch.tenantStatus(pm).then(json => {
            if (json.status === 2000) {
                runInAction(() => {
                  
                })
            };
            runInAction(() => {
                this.sidebar_loding = false;
            })
            return json;
        })
    }
}



const tenantSideStore = new TenantSideStore();


export {
   tenantSideStore

};