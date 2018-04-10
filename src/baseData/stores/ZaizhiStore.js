import BaseDataStore from './BaseDataStore';
let { observable, action, computed, runInAction, createTransformer, toJS, useStrict } = mobx;
import {actions} from '../actions/BaseDataAct'
useStrict(true);
class ZaizhiStore  extends BaseDataStore{
    constructor(props, context) {
        super(props, context)
    }
    params={catCode:'',catName:'',status:null,subCode: "C008"}

    @action
    fetchTableList(params) {
        this.loading = true;
        let pm = { ...this.pages,...params };
        let searchValue=Object.assign({},pm,this.params,{[this.searchKey]:this.searchVal})
        return actions.getList(searchValue).then(this.updateTableCatList)
    }
}
let zaizhiStore = new ZaizhiStore();
export  {zaizhiStore}