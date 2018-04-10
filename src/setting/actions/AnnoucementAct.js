import { ReqApi } from '../../base/services/ReqApi';
import { ANNOUNCEMENTREDU } from '../consts/ActTypes';
import { Urls } from '../../base/consts/Urls'
const actions = {

    Loading: (value) => (dispatch, getState) => {
        let state = getState()[ANNOUNCEMENTREDU].set('loading', value);
        dispatch({ type: ANNOUNCEMENTREDU, state })
    },

    getAnnouncementList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Loading(true));
        return ReqApi.get({
            url: Urls.GET_NOTICE_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                if (json.data.list.length > 0 && json.data.list.length < 15) {
                    if (pm.page == 1) {
                        let state = getState()[ANNOUNCEMENTREDU].setIn(['announcementList', "list"]).setIn(['announcementList', "list"], json.data.list).setIn(['announcementList', 'scrollF'], false);
                        dispatch({ type: ANNOUNCEMENTREDU, state });
                    } else {
                        let newdata = getState()[ANNOUNCEMENTREDU].getIn(['announcementList', "list"]).concat(json.data.list);
                        let state = getState()[ANNOUNCEMENTREDU].setIn(['announcementList', "list"], newdata).setIn(['announcementList', 'scrollF'], false);
                        dispatch({ type: ANNOUNCEMENTREDU, state });
                    }
                } else if (json.data.list.length == 15) {
                    if ((json.data.total / 15) == pm.page) {
                        if (pm.page == 1) {
                            let state = getState()[ANNOUNCEMENTREDU].setIn(['announcementList', "list"]).setIn(['announcementList', "list"], json.data.list).setIn(['announcementList', 'scrollF'], false);
                            dispatch({ type: ANNOUNCEMENTREDU, state });
                        } else {
                            let newdata = getState()[ANNOUNCEMENTREDU].getIn(['announcementList', "list"]).concat(json.data.list);
                            let state = getState()[ANNOUNCEMENTREDU].setIn(['announcementList', "list"], newdata).setIn(['announcementList', 'scrollF'], false);
                            dispatch({ type: ANNOUNCEMENTREDU, state });
                        }
                    } else {
                        if (pm.page == 1) {
                            let state = getState()[ANNOUNCEMENTREDU].setIn(['announcementList', "list"]).setIn(['announcementList', "list"], json.data.list);
                            dispatch({ type: ANNOUNCEMENTREDU, state });
                        } else {
                            let newdata = getState()[ANNOUNCEMENTREDU].getIn(['announcementList', "list"]).concat(json.data.list);
                            let state = getState()[ANNOUNCEMENTREDU].setIn(['announcementList', "list"], newdata).setIn(['announcementList', 'scrollF'], true);
                            dispatch({ type: ANNOUNCEMENTREDU, state });
                        }
                    }
                }
            }
            dispatch(actions.Loading(false));
            return json;
        })
    },
    announcementCheckPage: () => (dispatch, getState) => {
        let page = getState()[ANNOUNCEMENTREDU].getIn(['announcementList', 'page']);
        let newpage = page + 1;
        let state = getState()[ANNOUNCEMENTREDU].setIn(['announcementList', 'page'], newpage);
        dispatch({ type: ANNOUNCEMENTREDU, state })
        dispatch(actions.getAnnouncementList({ page: newpage, pageSize: 15 }))
    },

    setScrollAnnouncement: (scrollF) => (dispatch, getState) => {
        let state = getState()[ANNOUNCEMENTREDU].setIn(['announcementList', 'scrollF'], false);
        dispatch({ type: ANNOUNCEMENTREDU, state })
    }
    
}
export default actions