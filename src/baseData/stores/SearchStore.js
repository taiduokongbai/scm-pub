let { observable, action, computed, runInAction, createTransformer, toJS, useStrict } = mobx;
useStrict(true);
class SearchStore {
    constructor(props, context) {
    }
    @observable searchKey='';
    @observable searchVal='';
    @observable isInput=true;
    @action setSearchKey(key) {
        this.searchKey = key;
        this.searchVal = '';

    };
    @action setSearchVal(value) {
        this.searchVal = value;
    };
    @action setInput(value) {
        if(value == 'status'){
            this.isInput = false;
        }else {
            this.isInput = true;
        }
    };
    @computed get Pm() {
        let pm = {};
        pm[this.searchKey] = this.searchVal;
        return pm;
    }
}
let searchStore = new SearchStore();
export  {searchStore}