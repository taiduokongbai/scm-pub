let { observable, action, computed, runInAction, createTransformer } = mobx;

export default class TableStore {
    @observable
    loading = false;

    @observable.shallow
    selectedRowKeys = [];

    dataSource = [];
    selectedRows = [];
    excepts = [];
    style = {};
    className = "base-table";

    pages = {
        page: 1,
        pageSize: 15
    };

    paging = {
        total: 0,
        current: 1,
        pageSize: 15,
    };
    pageSizeOptions = ['5','10','15', '20', '30', '50'];

    @action.bound
    pageOnChange(page) {
        if (this.loading) return;
        if (typeof page === "number") {
            this.pages = {
                ...this.pages,
                page
            };
            this.paging = {
                ...this.paging,
                current: page
            };
        } else {
            this.pages = {
                ...this.pages,
                ...page
            };
            this.paging = {
                ...this.paging,
                current: page.page,
                pageSize: page.pageSize
            };

        };
        this.loading = true;
        this.fetchTableList();
    };

    fetchTableList() {
        this.loading = false;
    };

    @action.bound
    clear() {
        this.dataSource = [];
    }

    @action.bound
    updateTableList(json) {
        if (json.status === 2000) {
            let { list, total, page, pageSize } = json.data;
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
        };
        this.loading = false;
        return json;
    }

    @action
    onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        if (selectedRows) {
            this.selectedRows = selectedRows;
        }
    }

    constructor() {
        this.transformer = createTransformer((store) => ({
            loading: store.loading,
            style: store.style,
            className: store.className,
            selectedRowKeys: store.selectedRowKeys.slice(),
            dataSource: store.dataSource.slice(),
            selectedRows: store.selectedRowKeys,
            pagination: Object.assign({}, { ...store.paging }, {
                pageSizeOptions: store.pageSizeOptions,
                showSizeChanger: true,
                showTotal: (total) => `总共 ${total} 条记录`,
                onShowSizeChange: (curr, pageSize) => store.pageOnChange({ page: curr, pageSize, }),
                onChange: store.pageOnChange
            })
        }));
    }

    get Props() {
        return this.transformer(this);
    }
}