import BaseDataStore from './BaseDataStore';

let {observable, action, computed, runInAction, createTransformer, toJS, useStrict} = mobx;
import {message} from '../../base/components/AntdComp';
import {actions} from '../actions/BaseDataAct'

useStrict(true);

class DeliverymethodStore extends BaseDataStore {
    constructor(props, context) {
        super(props, context)
    }

    params = {dispatchCode: '', dispatchName: '', status: null}
    @observable searchKey = 'dispatchCode';
    @observable visible = false;
    @observable spin = false;
    @observable editVisible = false;
    @observable detail = {};
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
        actions.updateDispatchItem(params).then(json => {
            if (json.status === 2000) {
                deliverymethodStore.hideEditModal()
                message.success("数据更新成功");
                deliverymethodStore.fetchTableList({page: 1, pageSize: 15})

            }
            this.hideSpin();
        })
    }

    @action
    getDetail(params) {
        deliverymethodStore.showEditModal()
        deliverymethodStore.showSpin()
        return actions.detailDispatchItem(params).then(json => {
            if (json.status === 2000) {
                deliverymethodStore.setDetail(json.data);
            }
            deliverymethodStore.hideSpin()
        })
    }

    @action
    deleteDispatchItem(params) {
        return actions.deleteDispatchItem(params).then(json => {
            if (json.status === 2000) {
                message.success("数据删除成功");
                deliverymethodStore.fetchTableList({page: 1, pageSize: 15})

            }
        })
    }

    @action
    isDisableDispatchItem(params) {
        return actions.isDisableDispatchItem(params).then(json => {
            if (json.status === 2000) {
                if(params.status===1){
                    message.success("数据启用成功");
                }else {
                    message.success("数据禁用成功");
                }
                deliverymethodStore.fetchTableList({page: 1, pageSize: 15})

            }
        })
    }

    @action
    saveModalData = (params) => {
        actions.addDispatchItem(params).then(json => {
            if (json.status === 2000) {
                this.hideModal()
                message.success("数据添加成功");
                deliverymethodStore.fetchTableList({page: 1, pageSize: 15})
            }
            this.hideSpin();
        })
    }

    @action
    fetchTableList(params) {
        this.loading = true;
        let pm = {...this.pages, ...params};
        let searchValue = Object.assign({}, pm, this.params, {[this.searchKey]: this.searchVal})
        return actions.getDispatchList(searchValue).then(this.updateTableList)
    }

    @action
    resetMobx() {
        this.searchKey = 'dispatchCode';
        this.searchVal = '';
        this.isInput = true;
        this.pages = {
            page: 1,
            pageSize: 15
        };
    }
}

let deliverymethodStore = new DeliverymethodStore();
export {deliverymethodStore}