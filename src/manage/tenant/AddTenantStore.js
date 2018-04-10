import moment from "moment";
import { TenantFetch } from './TenantUrls';
let { observable, action, computed, runInAction, toJS } = mobx;
import TableStore from '../../base/stores/TableStore'; 
import { tenantListStore } from './tenantStore';
import {tenantSideStore} from './TenantSideStore';

export class TenantBaseStore {
    @observable loading = false;
    initDetail = {
        tenantName: "",
        tenantDesc: "",
        tenantAbbr: "",
        contactsPhone: "",
        contacts: "",
    };
    @observable detail = { ...this.initDetail };

    @computed get getDetail() {
        return this.detail;
    }
    @action resetDetail() {
        this.detail = { ...this.initDetail };
    }


}

export class TenantAddStore extends TenantBaseStore {
    constructor() {
        super();
       
    }
    //新增租户
    @action fetchTenantAdd(pm) {
        this.loading = true;
        return TenantFetch.tenantAdd(pm).then(json => {
            if (json.status === 2000) {
                runInAction(() => {
                    this.resetDetail();
                    tenantListStore.addVisible=false;
                })
            };
            runInAction(() => {
                this.loading = false;
                
            })
            return json;
        })
    }

    //编辑租户
    @action fetchTenantEdit(pm) {
        this.loading = true;
        return TenantFetch.tenantEdit(pm).then(json => {
            if (json.status === 2000) {
                runInAction(() => {
                    tenantListStore.editVisible=false;
                    tenantSideStore.fetchTenantDetail({id:pm.id});
                    this.resetDetail();
                })
            };
            runInAction(() => {
                this.loading = false;
            })
            return json;
        })
    }

//获取租户详情
    @action fetchTenantDetail(pm) {
        this.loading = true;
        this.resetDetail();
        return TenantFetch.tenantDetail(pm).then(json => {
            if (json.status === 2000) {
                runInAction(() => {
                   this.detail=json.data;
                   
                })
            };
            runInAction(() => {
                this.loading = false;
            })
            return json;
        })
    }
}



const tenantAddStore = new TenantAddStore();


export {
   tenantAddStore

};