let { observable, action, computed, runInAction, createTransformer } = mobx;

export default class BaseDataDialogStore {
    @observable
    spin = false;
    @observable
    visible = false;

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

    constructor() {
        this.transformer = createTransformer((store) => ({
            spin: store.spin,
            visible: store.visible,
        }));
    }

    get Props() {
        return this.transformer(this);
    }
}