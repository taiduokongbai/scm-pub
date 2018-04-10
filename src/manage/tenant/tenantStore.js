import moment from "moment";
import SearchBarStore from '../../base/stores/SearchBarStore';
import TableStore from '../../base/stores/TableStore';
import { TenantFetch } from './TenantUrls';

let { observable, action, computed, runInAction, toJS } = mobx;

//租户列表
export class TenantListStore extends TableStore{
    constructor(props, context) {
        super(props, context);
        this.fetchTableList = this.fetchTableList;
    }
    
    @observable addVisible=false;
    @observable editVisible=false; 
    @observable sidebar_visiable=false;
    pageSizeOptions=['10','15','20','30','50'];
    @action
    fetchTableList(params) {
        this.loading = true;
        searchBarStore.setLoading(true);
        let pm = {...this.pages,...params };
        return TenantFetch.tenantList(pm)
            .then(this.updateTableList)
            .then(json => {
                searchBarStore.setLoading(false);
                return json
            });
    }
};

let tenantListStore = new TenantListStore();
let searchBarStore = new SearchBarStore();

export { tenantListStore, searchBarStore };