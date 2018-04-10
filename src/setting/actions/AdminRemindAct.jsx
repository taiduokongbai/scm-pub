import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/Urls'
import { ADMINREMINDREDU } from '../consts/ActTypes'
import { fromJS, Record, Map } from 'immutable';

const actions = {
    Loading: (value) => (dispatch, getState) => {
        let state = getState()[ADMINREMINDREDU].set('loading', value);
        dispatch({ type: ADMINREMINDREDU, state })
    },
    getunreadAdminList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true));
        return ReqApi.get({
            url: Urls.GET_ALL_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                if (json.data.list.length > 0 && json.data.list.length < 15) {
                    if (pm.page == 1) {
                        let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', "list"]).setIn(['unreadAdminList', "list"], json.data.list).setIn(['unreadAdminList', 'scrollF'], false);
                        dispatch({ type: ADMINREMINDREDU, state });
                    } else {
                        let newdata = getState()[ADMINREMINDREDU].getIn(['unreadAdminList', "list"]).concat(json.data.list);
                        let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', "list"], newdata).setIn(['unreadAdminList', 'scrollF'], false);
                        dispatch({ type: ADMINREMINDREDU, state });
                    }

                } else if (json.data.list.length == 15) {
                    if ((json.data.total / 15) == pm.page) {
                        // let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', 'scrollF'], false);
                        if (pm.page == 1) {
                            let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', "list"]).setIn(['unreadAdminList', "list"], json.data.list).setIn(['unreadAdminList', 'scrollF'], false);
                            dispatch({ type: ADMINREMINDREDU, state });
                        } else {
                            let newdata = getState()[ADMINREMINDREDU].getIn(['unreadAdminList', "list"]).concat(json.data.list);
                            let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', "list"], newdata).setIn(['unreadAdminList', 'scrollF'], false);
                            dispatch({ type: ADMINREMINDREDU, state });
                        }
                    } else {
                        if (pm.page == 1) {
                            let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', "list"]).setIn(['unreadAdminList', "list"], json.data.list);
                            dispatch({ type: ADMINREMINDREDU, state });
                        } else {
                            let newdata = getState()[ADMINREMINDREDU].getIn(['unreadAdminList', "list"]).concat(json.data.list);
                            let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', "list"], newdata).setIn(['unreadAdminList', 'scrollF'], true);
                            dispatch({ type: ADMINREMINDREDU, state });
                        }
                    }
                }
            }
            dispatch(actions.Loading(false));
            return json;
        })
    },
    getreadAdminList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true));
        return ReqApi.get({
            url: Urls.GET_ALL_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                if (json.data.list.length > 0 && json.data.list.length < 15) {
                    if (pm.page == 1) {
                        let state = getState()[ADMINREMINDREDU].setIn(['readAdminList', "list"]).setIn(['readAdminList', "list"], json.data.list).setIn(['readAdminList', 'scrollF'], false);
                        dispatch({ type: ADMINREMINDREDU, state });
                    } else {
                        let newdata = getState()[ADMINREMINDREDU].getIn(['readAdminList', "list"]).concat(json.data.list);
                        let state = getState()[ADMINREMINDREDU].setIn(['readAdminList', "list"], newdata).setIn(['readAdminList', 'scrollF'], false);
                        dispatch({ type: ADMINREMINDREDU, state });
                    }
                } else if (json.data.list.length == 15) {
                    if ((json.data.total / 15) == pm.page) {
                        // let state = getState()[ADMINREMINDREDU].setIn(['readAdminList', 'scrollF'], false);
                        if (pm.page == 1) {
                            let state = getState()[ADMINREMINDREDU].setIn(['readAdminList', "list"]).setIn(['readAdminList', "list"], json.data.list).setIn(['readAdminList', 'scrollF'], false);
                            dispatch({ type: ADMINREMINDREDU, state });
                        } else {
                            let newdata = getState()[ADMINREMINDREDU].getIn(['readAdminList', "list"]).concat(json.data.list);
                            let state = getState()[ADMINREMINDREDU].setIn(['readAdminList', "list"], newdata).setIn(['readAdminList', 'scrollF'], false);
                            dispatch({ type: ADMINREMINDREDU, state });
                        }
                    } else {
                        if (pm.page == 1) {
                            let state = getState()[ADMINREMINDREDU].setIn(['readAdminList', "list"]).setIn(['readAdminList', "list"], json.data.list);
                            dispatch({ type: ADMINREMINDREDU, state });
                        } else {
                            let newdata = getState()[ADMINREMINDREDU].getIn(['readAdminList', "list"]).concat(json.data.list);
                            let state = getState()[ADMINREMINDREDU].setIn(['readAdminList', "list"], newdata).setIn(['readAdminList', 'scrollF'], true);
                            dispatch({ type: ADMINREMINDREDU, state });
                        }
                    }
                }
            }
            dispatch(actions.Loading(false));
            return json;
        })
    },
    getNewsStatus: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true));
        return ReqApi.get({
            url: Urls.GET_NEWS_STATUS,
            pm
        }).then(json => {
            if (json.status === 2000) {

               /* let unreadnewdata = getState()[ADMINREMINDREDU].getIn(['unreadAdminList', "list"]);
                let x = unreadnewdata;
                let temp;
                for (var i = x.length - 1; i >= 0; i--) {
                    if (pm.id == x[i].id) {
                        temp = x.splice(i, 1);
                        break;
                    }
                }
                let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', "list"], [].concat(x));
                dispatch({ type: ADMINREMINDREDU, state });*/
                dispatch(actions.getunreadAdminList({msgStatus:0,page:1,pageSize:15}));
            }
            dispatch(actions.Loading(false));
            return json;
        })
    },
    callback: (key) => (dispatch, getState) => {
        if (key == 1) {
            let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', 'scrollF'], true).setIn(['unreadAdminList', 'page'], 1);
            dispatch({ type: ADMINREMINDREDU, state });
            dispatch(actions.getunreadAdminList({ msgStatus: '0', page: 1, pageSize: 15 }))
        } else if (key == 2) {
            let state = getState()[ADMINREMINDREDU].setIn(['readAdminList', 'scrollF'], true).setIn(['readAdminList', 'page'], 1);
            dispatch({ type: ADMINREMINDREDU, state })
            dispatch(actions.getreadAdminList({ msgStatus: '1', page: 1, pageSize: 15 }))
        }
    },
    adminUnreadCheckPage: () => (dispatch, getState) => {
        let page = getState()[ADMINREMINDREDU].getIn(['unreadAdminList', 'page']);
        let newpage = page + 1;
        let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', 'page'], newpage);
        dispatch({ type: ADMINREMINDREDU, state })
        dispatch(actions.getunreadAdminList({ msgStatus: '0', page: newpage, pageSize: 15 }))
    },
    adminReadCheckPage: () => (dispatch, getState) => {
        let page = getState()[ADMINREMINDREDU].getIn(['readAdminList', 'page']);
        let newpage = page + 1;
        let state = getState()[ADMINREMINDREDU].setIn(['readAdminList', 'page'], newpage);
        dispatch({ type: ADMINREMINDREDU, state })
        dispatch(actions.getreadAdminList({ msgStatus: '0', page: newpage, pageSize: 15 }))
    },
    setScrollUnreadAdmin: (scrollF) => (dispatch, getState) => {
        let state = getState()[ADMINREMINDREDU].setIn(['unreadAdminList', 'scrollF'], false);
        dispatch({ type: ADMINREMINDREDU, state })
    },
    setScrollReadAdmin: (scrollF) => (dispatch, getState) => {
        let state = getState()[ADMINREMINDREDU].setIn(['readAdminList', 'scrollF'], false);
        dispatch({ type: ADMINREMINDREDU, state })
    }
}

export default actions