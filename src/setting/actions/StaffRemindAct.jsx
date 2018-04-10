import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/Urls'
import { STAFFREMINDREDU } from '../consts/ActTypes'
const actions = {
    Loading: (value) => (dispatch, getState) => {
        let state = getState()[STAFFREMINDREDU].set('loading', value);
        dispatch({ type: STAFFREMINDREDU, state })
    },
    getunreadStaffList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true));
        return ReqApi.get({
            url: Urls.GET_ALL_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                if (json.data.list.length >= 0 && json.data.list.length < 15) {
                    if (pm.page == 1) {
                        let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', "list"]).setIn(['unreadStaffList', "list"], json.data.list).setIn(['unreadStaffList', 'scrollF'], false);
                        dispatch({ type: STAFFREMINDREDU, state });
                    } else {
                        let newdata = getState()[STAFFREMINDREDU].getIn(['unreadStaffList', "list"]).concat(json.data.list);
                        let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', "list"], newdata).setIn(['unreadStaffList', 'scrollF'], false);
                        dispatch({ type: STAFFREMINDREDU, state });
                    }
                } else if (json.data.list.length == 15) {
                    if ((json.data.total / 15) == pm.page) {
                        // let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', 'scrollF'], false);
                        if (pm.page == 1) {
                            let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', "list"]).setIn(['unreadStaffList', "list"], json.data.list).setIn(['unreadStaffList', 'scrollF'], false);
                            dispatch({ type: STAFFREMINDREDU, state });
                        } else {
                            let newdata = getState()[STAFFREMINDREDU].getIn(['unreadStaffList', "list"]).concat(json.data.list);
                            let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', "list"], newdata).setIn(['unreadStaffList', 'scrollF'], false);
                            dispatch({ type: STAFFREMINDREDU, state });
                        }
                    } else {
                        if (pm.page == 1) {
                            let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', "list"]).setIn(['unreadStaffList', "list"], json.data.list);
                            dispatch({ type: STAFFREMINDREDU, state });
                        } else {
                            let newdata = getState()[STAFFREMINDREDU].getIn(['unreadStaffList', "list"]).concat(json.data.list);
                            let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', "list"], newdata).setIn(['unreadStaffList', 'scrollF'], true);
                            dispatch({ type: STAFFREMINDREDU, state });
                        }
                    }
                }
            }
            dispatch(actions.Loading(false));
            return json;
        })
    },
    getreadStaffList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true));
        return ReqApi.get({
            url: Urls.GET_ALL_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                // if (pm.page == 1) {
                //     let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', "list"], json.data.list);
                //     dispatch({ type: STAFFREMINDREDU, state });
                // } else {
                if (json.data.list.length > 0 && json.data.list.length < 15) {
                    if (pm.page == 1) {
                        let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', "list"]).setIn(['readStaffList', "list"], json.data.list).setIn(['readStaffList', 'scrollF'], false);
                        dispatch({ type: STAFFREMINDREDU, state });
                    } else {
                        let newdata = getState()[STAFFREMINDREDU].getIn(['readStaffList', "list"]).concat(json.data.list);
                        let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', "list"], newdata).setIn(['readStaffList', 'scrollF'], false);
                        dispatch({ type: STAFFREMINDREDU, state });
                    }
                } else if (json.data.list.length != 0) {

                    if ((json.data.total / 15) == pm.page) {
                        // let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', 'scrollF'], false);
                        if (pm.page == 1) {
                            let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', "list"]).setIn(['readStaffList', "list"], json.data.list).setIn(['readStaffList', 'scrollF'], false);
                            dispatch({ type: STAFFREMINDREDU, state });
                        } else {
                            let newdata = getState()[STAFFREMINDREDU].getIn(['readStaffList', "list"]).concat(json.data.list);
                            let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', "list"], newdata).setIn(['readStaffList', 'scrollF'], false);
                            dispatch({ type: STAFFREMINDREDU, state });
                        }
                    } else {
                        if (pm.page == 1) {
                            let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', "list"]).setIn(['readStaffList', "list"], json.data.list);
                            dispatch({ type: STAFFREMINDREDU, state });
                        } else {
                            let newdata = getState()[STAFFREMINDREDU].getIn(['readStaffList', "list"]).concat(json.data.list);
                            let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', "list"], newdata).setIn(['readStaffList', 'scrollF'], true);
                            dispatch({ type: STAFFREMINDREDU, state });
                        }

                    }
                    // }
                }
            }
            dispatch(actions.Loading(false));
            return json;
        })
    },
    getNewsStatus: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true));
        return ReqApi.post({
            url: Urls.GET_NEWS_STATUS,
            pm
        }).then(json => {
            if (json.status === 2000) {
               let unreadnewdata = getState()[STAFFREMINDREDU].getIn(['unreadStaffList', "list"]);
                let x = unreadnewdata;
                let temp;
                for (var i = x.length - 1; i >= 0; i--) {
                    if (pm.id == x[i].id) {
                        temp = x.splice(i, 1);
                        break;
                    }
                }
                let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', "list"], [].concat(x));
                dispatch({ type: STAFFREMINDREDU, state });
                dispatch(actions.Loading(false));
               /* dispatch(actions.getreadStaffList({msgStatus:0,page:1,pageSize:15}));*/
            }
            dispatch(actions.Loading(false));
            return json;
        })
    },
    callback: (key) => (dispatch, getState) => {
        if (key == 1) {
            let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', 'scrollF'], true).setIn(['unreadStaffList', 'page'], 1);
            dispatch({ type: STAFFREMINDREDU, state });
            dispatch(actions.getunreadStaffList({ msgStatus: '0', page: 1, pageSize: 15 }))
        } else if (key == 2) {
            let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', 'scrollF'], true).setIn(['readStaffList', 'page'], 1);
            dispatch({ type: STAFFREMINDREDU, state })
            dispatch(actions.getreadStaffList({ msgStatus: '1', page: 1, pageSize: 15 }))
        }
    },
    StaffUnreadCheckPage: () => (dispatch, getState) => {
        let page = getState()[STAFFREMINDREDU].getIn(['unreadStaffList', 'page']);
        let newpage = page + 1;
        let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', 'page'], newpage);
        dispatch({ type: STAFFREMINDREDU, state })
        dispatch(actions.getunreadStaffList({ msgStatus: '0', page: newpage, pageSize: 15 }))
    },
    StaffReadCheckPage: () => (dispatch, getState) => {
        let page = getState()[STAFFREMINDREDU].getIn(['readStaffList', 'page']);
        let newpage = page + 1;
        let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', 'page'], newpage);
        dispatch({ type: STAFFREMINDREDU, state })
        dispatch(actions.getreadStaffList({ msgStatus: '1', page: newpage, pageSize: 15 }))
    },
    setScrollUnreadStaff: (scrollF) => (dispatch, getState) => {
        let state = getState()[STAFFREMINDREDU].setIn(['unreadStaffList', 'scrollF'], false);
        dispatch({ type: STAFFREMINDREDU, state })
    },
    setScrollReadStaff: (scrollF) => (dispatch, getState) => {
        let state = getState()[STAFFREMINDREDU].setIn(['readStaffList', 'scrollF'], false);
        dispatch({ type: STAFFREMINDREDU, state })
    }
}

export default actions