import BaseDataStore from './BaseDataStore';
let { observable, action, computed, runInAction, createTransformer, toJS, useStrict } = mobx;
import { message } from '../../base/components/AntdComp';
import {actions} from '../actions/BaseDataAct'
useStrict(true);
class AccountmethodStore  extends BaseDataStore{
    constructor(props, context) {
        super(props, context)
    }
    params={settleCode:'',settleName:'',status:null};
    @observable searchKey = 'settleCode';
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
        actions.updateSettleItem(params).then(json => {
            if (json.status === 2000) {
                accountmethodStore.hideEditModal()
                message.success("数据更新成功");
                accountmethodStore.fetchTableList({page: 1,pageSize: 15})

            }
            this.hideSpin();
        })
    }

    @action
    getDetail(params) {
        accountmethodStore.showEditModal()
        accountmethodStore.showSpin()
        return actions.detailSettleItem(params).then(json => {
            if (json.status === 2000) {
                accountmethodStore.setDetail(json.data);
            }
            accountmethodStore.hideSpin()
        })
    }

    @action
    deleteSettleItem(params) {
        return actions.deleteSettleItem(params).then(json=>{
            if (json.status === 2000) {
                message.success("数据删除成功");
                accountmethodStore.fetchTableList({page: 1,pageSize: 15})

            }
        })
    }
    @action
    isDisableSettleItem(params) {
        return actions.isDisableSettleItem(params).then(json=>{
            if (json.status === 2000) {
                if(params.status===1){
                    message.success("数据启用成功");
                }else {
                    message.success("数据禁用成功");
                }
                accountmethodStore.fetchTableList({page: 1,pageSize: 15})

            }
        })
    }
    @action
    saveModalData = (params) => {
        actions.addSettleItem(params).then(json=>{
            if (json.status === 2000) {
                this.hideModal()
                message.success("数据添加成功");
                accountmethodStore.fetchTableList({page: 1,pageSize: 15})
            }
            this.hideSpin();
        })
    }
    @action
    fetchTableList(params) {
        this.loading = true;
        let pm = { ...this.pages,...params };
        let searchValue=Object.assign({},pm,this.params,{[this.searchKey]:this.searchVal})
        return actions.getSettleList(searchValue).then(this.updateTableList)
    }
    @action
    resetMobx() {
        this.searchKey = 'settleCode';
        this.searchVal = '';
        this.isInput = true;
        this.pages = {
            page: 1,
           pageSize: 15
        };
    }
}
let accountmethodStore = new AccountmethodStore();
export  {accountmethodStore}