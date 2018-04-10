let { observable, action, computed, runInAction, createTransformer, toJS, useStrict } = mobx;
import {actions} from '../actions/BaseDataAct'
import {zhifuStore} from '../stores/ZhifuStore'
useStrict(true);
class AddDataStore {
    constructor(props, context) {

    }
    @observable visible = false;
    @observable loading = false;

    @action
    showModal = () => {
        this.visible=true;
    }
    @action
    hideModal = () => {
        this.visible=false;
    }
    @action
    saveModalData = (params) => {
        actions.addPayItem(params).then(zhifuStore.fetchTableList)
    }
}
let addDataStore = new AddDataStore();
export  {addDataStore}