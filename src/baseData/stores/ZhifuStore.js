import BaseDataStore from './BaseDataStore';
let { observable, action, computed, runInAction, createTransformer, toJS, useStrict } = mobx;
import { message } from '../../base/components/AntdComp';
import {actions} from '../actions/BaseDataAct'
useStrict(true);
class ZhifuStore  extends BaseDataStore{
    constructor(props, context) {
        super(props, context)
    }
    params={catCode:'',catName:'',status:null,subCode: "C012"}
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
        actions.updateCategoryItem(params).then(json => {
            if (json.status === 2000) {
                zhifuStore.hideEditModal()
                message.success("数据更新成功");
                zhifuStore.fetchTableList({page: 1, pageSize: 15})

            }
            this.hideSpin();
        })
    }

    @action
    getDetail(params) {
        zhifuStore.showEditModal()
        zhifuStore.showSpin()
        return actions.detailCategoryItem(params).then(json => {
            if (json.status === 2000) {
                zhifuStore.setDetail(json.data);
            }
            zhifuStore.hideSpin()
        })
    }
    @action
    deleteCategoryItem(params) {
        return actions.deleteCategoryItem(params).then(json=>{
            if (json.status === 2000) {
                message.success("数据删除成功");
                zhifuStore.fetchTableList({page: 1, pageSize: 15})

            }
        })
    }
    @action
    isDisableCategoryItem(params) {
        return actions.isDisableCategoryItem(params).then(json=>{
            if (json.status === 2000) {
                if(params.status===1){
                    message.success("数据启用成功");
                }else {
                    message.success("数据禁用成功");
                }
                zhifuStore.fetchTableList({page: 1, pageSize: 15})

            }
        })
    }
    @action
    saveModalData = (params) => {
        this.showSpin();
        actions.addPayItem(params).then(json=>{
            if (json.status === 2000) {
                this.hideModal()
                message.success("数据添加成功");
                zhifuStore.fetchTableList({page: 1, pageSize: 15})
            }
            this.hideSpin();
        })
    }
    @action
    fetchTableList(params) {
        this.loading = true;
        let pm = { ...this.pages,...params };
        let searchValue=Object.assign({},pm,this.params,{[this.searchKey]:this.searchVal})
        return actions.getList(searchValue).then(this.updateTableCatList)
    }
}
let zhifuStore = new ZhifuStore();
export  {zhifuStore}