import TableStore from '../stores/TableStore'

let {observable, action, computed, runInAction, createTransformer, toJS, useStrict} = mobx;
import {actions} from '../actions/BaseDataAct'

useStrict(true);

class BaseDataStore extends TableStore {
    constructor(props, context) {
        super(props, context)
    }

    @observable searchKey = 'catCode';
    @observable searchVal = '';
    @observable isInput = true;

    @action
    setSearchKey(key) {
        this.searchKey = key;
        if (key == "status") {
            this.searchVal = null;
        }
        else {
            this.searchVal = '';
        }

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
        return actions.getList(pm).then(this.updateTableCatList)
    }

    @action
    fetchSettleList(params) {
        this.loading = true;
        let pm = {...this.pages, ...params};
        return actions.getSettleList(pm).then(this.updateTableList)
    }

    @action
    fetchDispatchList(params) {
        this.loading = true;
        let pm = {...this.pages, ...params};
        return actions.getDispatchList(pm).then(this.updateTableList)
    }

    @action
    fetchCurrencyhList(params) {
        this.loading = true;
        let pm = {...this.pages, ...params};
        return actions.getCurrencyList(pm).then(this.updateTableList)
    }

    @action.bound
    updateTableCatList(json) {
        if (json.status === 2000) {
            let {catList, total, page, pageSize} = json.data;
            this.dataSource = catList;
            this.pages = {
                page,
                pageSize
            };
            this.paging = {
                total,
                current: page,
                pageSize
            }
        }
        ;
        this.loading = false;
        return json;
    }

    @action.bound
    updateTableList(json) {
        if (json.status === 2000) {
            let {list, total, page, pageSize} = json.data;
            this.dataSource = list;
            this.pages = {
                page,
                pageSize
            };
            this.paging = {
                total,
                current: page,
                pageSize
            }
        }
        ;
        this.loading = false;
        return json;
    }

    @action
    resetMobx() {
        this.searchKey = 'catCode';
        this.searchVal = '';
        this.isInput = true;
        this.pages = {
            page: 1,
            pageSize: 15
        };
    }
}

export default BaseDataStore
