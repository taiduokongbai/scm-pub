import BaseDataStore from './BaseDataStore';
import {message} from '../../base/components/AntdComp';

let {observable, action, computed, runInAction, createTransformer, toJS, useStrict} = mobx;
import {actions} from '../actions/BaseDataAct'

useStrict(true);

class MeterageStore extends BaseDataStore {
    constructor(props, context) {
        super(props, context)
    }

    @observable dimensionality = 1;
    @observable visible = false;
    @observable span = false;
    @observable editVisible = false;
    @observable spin = false;
    @observable detail={};

    @action
    setDetail = (value) => {
        this.detail = value;
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
    showEditModal = () => {
        this.editVisible = true;
    }
    @action
    hideEditModal = () => {
        this.editVisible = false;
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
    saveModalData = (params) => {
        this.showSpin();
        actions.addMeasureItem(params).then(json => {
            if (json.status === 2000) {
                this.hideModal()
                message.success("数据添加成功");
                meterageStore.fetchTableList({page: 1, pageSize: 15})

            }
            this.hideSpin();
        })
    }
    @action
    updateData = (params) => {
        this.showSpin();
        actions.updateMeasureItem(params).then(json => {
            if (json.status === 2000) {
                meterageStore.hideEditModal()
                message.success("数据更新成功");
                meterageStore.fetchTableList({page: 1, pageSize: 15})

            }
            this.hideSpin();
        })
    }
    @action
    setDimensionality(value) {
        this.dimensionality = value;
        this.fetchTableList()
    }

    @action
    fetchTableList(params) {
        this.loading = true;
        let pm = {...this.pages, ...params};
        let searchValue = Object.assign({}, pm, {dimensionality: this.dimensionality})
        return actions.getMeasureList(searchValue).then(this.updateTableList)
    }

    @action
    deleteMeasureItem(params) {
        return actions.deleteMeasureItem(params).then(json => {
            if (json.status === 2000) {
                message.success("数据删除成功");
                meterageStore.fetchTableList({page: 1, pageSize: 15})

            }
        })
    }

    @action
    isDisableMeasureItem(params) {
        return actions.isDisableMeasureItem(params).then(json => {
            if (json.status === 2000) {
                if(params.status===1){
                    message.success("数据启用成功");
                }else {
                    message.success("数据禁用成功");
                }

                meterageStore.fetchTableList({page: 1, pageSize: 15})

            }
        })
    }

    @action
    getDetail(params) {
        meterageStore.showEditModal()
        meterageStore.showSpin()
        return actions.measureItemDetail(params).then(json => {
            if (json.status === 2000) {
                meterageStore.setDetail(json.data);
            }
            meterageStore.hideSpin()
        })
    }
    @action
    resetMobx() {
        this.dimensionality = 1;
        this.pages = {
            page: 1,
            pageSize: 15
        };
    }
}

let meterageStore = new MeterageStore();
export {meterageStore}
