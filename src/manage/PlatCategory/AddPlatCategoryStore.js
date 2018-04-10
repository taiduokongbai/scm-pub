import moment from "moment";
import { PlatCategoryFetch } from './PlatCategoryUrls';
let { observable, action, computed, runInAction, toJS } = mobx;
import TableStore from '../../base/stores/TableStore'; 
import { platCategoryStore } from './PlatCategoryStore';
//import {tenantSideStore} from './TenantSideStore';

export class PlatCategoryBaseStore {
    @observable loading = false;
    initDetail = {
        categoryName: "",
        categoryCode: "",
        categoryPcode:"",
        level: "",
       
    };
    @observable level;
    @observable categoryPcode="";
    @observable detail = { ...this.initDetail };

    @computed get getDetail() {
        return this.detail;
    }
    @action resetDetail() {
        this.detail = { ...this.initDetail };
    }


}

export class AddPlatCategoryStore extends PlatCategoryBaseStore {
    constructor() {
        super();
       
    }
    //新增租户
    @action fetchPlatCategoryAdd(pm) {
        this.loading = true;
        return PlatCategoryFetch.platCategoryAdd(pm).then(json => {
            if (json.status === 2000) {
                runInAction(() => {
                    this.resetDetail();
                    platCategoryStore.addVisible=false;
                })
            };
            runInAction(() => {
                this.loading = false;
                
            })
            return json;
        })
    }

    //编辑平台类目
    @action fetchPlatCategoryEdit(pm) {
        this.loading = true;
        return PlatCategoryFetch.platCategoryEdit(pm).then(json => {
            if (json.status === 2000) {
                runInAction(() => {
                    platCategoryStore.editVisible=false;
                    this.resetDetail();
                })
            };
            runInAction(() => {
                this.loading = false;
            })
            return json;
        })
    }

//获取平台类目详情
    @action fetchPlatCategoryDetail(pm,editLevel) {
        this.loading = true;
        //this.resetDetail();
        return PlatCategoryFetch.PlatCategoryDetail(pm).then(json => {
            if (json.status === 2000) {
                runInAction(() => {
                    if(editLevel){
                        this.detail=json.data;
                    }
                   
                   
                })
            };
            runInAction(() => {
                this.loading = false;
            })
            return json;
        })
    }
}



const addPlatCategoryStore = new AddPlatCategoryStore();


export {addPlatCategoryStore};