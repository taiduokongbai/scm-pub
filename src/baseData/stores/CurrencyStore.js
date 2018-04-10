import BaseDataStore from './BaseDataStore';
let { observable, action, computed, runInAction, createTransformer, toJS, useStrict } = mobx;
import { message } from '../../base/components/AntdComp';
import {actions} from '../actions/BaseDataAct'
useStrict(true);
class CurrencyStore  extends BaseDataStore{
    constructor(props, context) {
        super(props, context)
    }
    params={curCode:'',curName:'',status:null}
    @observable searchKey = 'curCode';
    @observable dimensionality = 0;
    @observable visible = false;
    @observable spin = false;
    @observable editVisible = false;
    @observable detail={};
    @action
    setDetail = (value) => {
        this.detail = value;
    }
    @action
    showEditModal = () => {
        this.editVisible = true;
    }
    @action
    hideEditModal = () => {
        this.editVisible = false;
    }
    @action
    showModal = () => {
        this.visible = true;
    }
    @action
    hideModal = () => {
        this.visible = false;
    }
    @action
    showSpin = () => {
        this.spin = true;
    }
    @action
    hideSpin = () => {
        this.spin = false;
    }

    @action
    updateData = (params) => {
        this.showSpin();
        actions.updateCurrencyItem(params).then(json => {
            if (json.status === 2000) {
                currencyStore.hideEditModal()
                message.success("数据更新成功");
                currencyStore.fetchTableList({page: 1, pageSize: 15})

            }
            this.hideSpin();
        })
    }

    @action
    getDetail(params) {
        currencyStore.showEditModal()
        currencyStore.showSpin()
        return actions.detailCurrencyItem(params).then(json => {
            if (json.status === 2000) {
                currencyStore.setDetail(json.data);
            }
            currencyStore.hideSpin()
        })
    }
    @action
    deleteCurrencyItem(params) {
        return actions.deleteCurrencyItem(params).then(json=>{
            if (json.status === 2000) {
                message.success("数据删除成功");
                currencyStore.fetchTableList({page: 1, pageSize: 15})

            }
        })
    }
    @action
    isDisableCurrencyItem(params) {
        return actions.isDisableCurrencyItem(params).then(json=>{
            if (json.status === 2000) {
                if(params.status===1){
                    message.success("数据启用成功");
                }else {
                    message.success("数据禁用成功");
                }
                currencyStore.fetchTableList({page: 1, pageSize: 15})

            }
        })
    }
    @action
    saveModalData = (params) => {
        this.showSpin();
        actions.addCurrencyItem(params).then(json=>{
            if (json.status === 2000) {
                this.hideModal()
                message.success("数据添加成功");
                currencyStore.fetchTableList({page: 1, pageSize: 15})
            }
            this.hideSpin();
        })
    }

    @action
    fetchTableList(params) {
        this.loading = true;
        let pm = { ...this.pages,...params };
        let searchValue=Object.assign({},pm,this.params,{[this.searchKey]:this.searchVal})
        return actions.getCurrencyList(searchValue).then(this.updateTableList)
    }
    @action
    resetMobx() {
        this.searchKey = 'curCode';
        this.searchVal = '';
        this.isInput = true;
        this.pages = {
            page: 1,
            pageSize: 15
        };
    }
}

let currencyStore = new CurrencyStore();
export  {currencyStore}