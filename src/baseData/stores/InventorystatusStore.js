import BaseDataStore from './BaseDataStore';
let { observable, action, computed, runInAction, createTransformer, toJS, useStrict } = mobx;
import {actions} from '../actions/BaseDataAct'
useStrict(true);
class InventorystatusStore  extends BaseDataStore{
    constructor(props, context) {
        super(props, context)
    }
    params={invCode:'',invName:'',status:null}
    @observable searchKey = 'invCode';
    @observable searchVal = '';
    @observable isInput = true;
    @action
    fetchTableList(params) {
        this.loading = true;
        let pm = { ...this.pages,...params };
        let searchValue=Object.assign({},pm,this.params,{[this.searchKey]:this.searchVal})
        return actions.getInventoryList(searchValue).then(this.updateTableList)
    }
    @action
    resetMobx() {
        this.searchKey = 'invCode';
        this.searchVal = '';
        this.isInput = true;
        this.pages = {
            page: 1,
            pageSize: 15
        };
    }
}
let inventorystatusStore = new InventorystatusStore();
export  {inventorystatusStore}