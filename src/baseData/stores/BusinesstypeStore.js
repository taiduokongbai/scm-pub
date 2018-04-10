import BaseDataStore from './BaseDataStore';
let { observable, action, computed, runInAction, createTransformer, toJS, useStrict } = mobx;
import { message } from '../../base/components/AntdComp';
import {actions} from '../actions/BaseDataAct'
useStrict(true);
class BusinesstypeStore  extends BaseDataStore{
    constructor(props, context) {
        super(props, context)
    }
    params={busCode:'',busName:'',status:null}
    @observable searchKey = 'busCode';
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
        actions.updateBusinessItem(params).then(json => {
            if (json.status === 2000) {
                businesstypeStore.hideEditModal()
                message.success("数据更新成功");
                businesstypeStore.fetchTableList({page: 1, pageSize: 15})

            }
            this.hideSpin();
        })
    }

    @action
    getDetail(params) {
        businesstypeStore.showEditModal()
        businesstypeStore.showSpin()
        return actions.detailBusinessItem(params).then(json => {
            if (json.status === 2000) {
                businesstypeStore.setDetail(json.data);
            }
            businesstypeStore.hideSpin()
        })
    }
    @action
    saveModalData = (params) => {
        this.showSpin();
        actions.addBusinessItem(params).then(json=>{
            if (json.status === 2000) {
                this.hideModal()
                message.success("数据添加成功");
                businesstypeStore.fetchTableList({page: 1, pageSize: 15})
            }
            this.hideSpin();
        })
    }
    @action
    deleteBusinessItem(params) {
        return actions.deleteBusinessItem(params).then(json=>{
            if (json.status === 2000) {
                message.success("数据删除成功");
                businesstypeStore.fetchTableList({page: 1, pageSize: 15})

            }
        })
    }

    @action
    isDisableBusinessItem(params) {
        return actions.isDisableBusinessItem(params).then(json=>{
            if (json.status === 2000) {
                if(params.status===1){
                    message.success("数据启用成功");
                }else {
                    message.success("数据禁用成功");
                }
                businesstypeStore.fetchTableList({page: 1, pageSize: 15})

            }
        })
    }
    @action
    fetchTableList(params) {
        this.loading = true;
        let pm = { ...this.pages,...params };
        let searchValue=Object.assign({},pm,this.params,{[this.searchKey]:this.searchVal})
        return actions.getBusinessList(searchValue).then(this.updateTableList)
    }
    @action
    resetMobx() {
        this.searchKey = 'busCode';
        this.searchVal = '';
        this.isInput = true;
        this.pages = {
            page: 1,
            pageSize: 15
        };
    }

}
let businesstypeStore = new BusinesstypeStore();
export  {businesstypeStore}
