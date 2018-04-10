import BaseDataStore from './BaseDataStore';

let {observable, action, computed, runInAction, createTransformer, toJS, useStrict} = mobx;
import {actions} from '../actions/BaseDataAct'

useStrict(true);

class CountryStore extends BaseDataStore {
    constructor(props, context) {
        super(props, context)
    }

    params = {countryCode: '', countryName: '', status: null}
    @observable searchKey = 'countryCode';
    @observable searchVal = '';
    @observable isInput = true;

    @action
    setSearchKey(key) {
        this.searchKey = key;
        this.searchVal = '';

    };

    @action
    setSearchVal(value) {
        if (value == '-1') {
            this.searchVal = null;
        } else {
            this.searchVal = value;
        }
    };

    @action
    setInput(value) {
        if (value == 'status') {
            this.isInput = false;
        } else {
            this.isInput = true;
        }
    };

    @action
    fetchTableList(params) {
        this.loading = true;
        let pm = {...this.pages, ...params};
        let searchValue = Object.assign({}, pm, this.params, {[this.searchKey]: this.searchVal})
        return actions.getCountryList(searchValue).then(this.updateTableList)
    }
}

let countryStore = new CountryStore();
export {countryStore}