import moment from "moment";
import SearchBarStore from '../../base/stores/SearchBarStore';
import TableStore from '../../base/stores/TableStore';
import TreeSelectStore from '../../base/stores/TreeSelectStore'
import { PlatCategoryFetch } from './PlatCategoryUrls';

let { observable, action, computed, runInAction, toJS } = mobx;

//平台类目列表
export class PlatCategoryStore extends TableStore{
    constructor(props, context) {
        super(props, context);
    
    }

    @observable dataSource=[];
    @observable addVisible=false;
    @observable editVisible=false;
    @observable searchPm = {status:3};
    @action
    fetchTableList(params) {
       this.loading = true;
        searchBarStore.setLoading(true);
        let pm = {...searchBarStore.Pm, ...params };
        return PlatCategoryFetch.platCategoryList(pm)
            .then(json => {
                runInAction(() => {
                   this.dataSource=json.data.list;
                   
                })
               searchBarStore.setLoading(false);
               this.loading=false;
                return json
            });
    }

    @action 
    fetchTableDelete(pm) {
        this.loading=true;
        return PlatCategoryFetch.platCategoryDelete(pm).then(json => {
            if (json.status === 2000) {
                runInAction(() => {
                    this.fetchTableList(this.searchPm)
                })
            };
            this.loading=false;
            return json;
        })
    }

    @action 
    fetchTableStatus(pm) {
        this.loading=true;
        return PlatCategoryFetch.platCategoryStatus(pm).then(json => {
            if (json.status === 2000) {
                runInAction(() => {
                    this.fetchTableList(this.searchPm)
                })
            };
            this.loading=false;
            return json;
        })
    }

   
};


export class GetParentListStore extends TreeSelectStore {
    keyName = "categoryCode";
    LabelName = "categoryName";
    @action
    fetchTreeSelectList = (pm = {}) => {
        this.loading = true;
        return PlatCategoryFetch.GetParentList(pm).then(this.updateSelectList);
    }

    @action.bound
    updateSelectList(json) {
        if (json.status === 2000) {
            this.setList(json.data.list);
        };
        this.loading = !this.loading;
        return json;
    }
}

let platCategoryStore = new PlatCategoryStore();
let searchBarStore = new SearchBarStore();
let getParentListStore=new GetParentListStore();

export { platCategoryStore,searchBarStore,getParentListStore };