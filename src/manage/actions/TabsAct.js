import { TABSREDU } from '../consts/ActTypes';

let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}
const actions = {
    TabInsert: (tabKey) => (dispatch, getState) =>{
        let state = getStateFun(getState);
        let stateJson = state.toJS();
        let tabTitle = stateJson.tabsData[tabKey].title;
        let pkey = stateJson.tabsData[tabKey].pkey;
        if(tabTitle !=undefined){
            state = state.set("activeKey",tabKey).set("openKeys",pkey)
            .updateIn(['tabs'],(tabs)=>{
                let index = tabs.map(t=>t.key).indexOf(tabKey);
                if(index<0)
                    tabs = tabs.splice(tabs.size,0,{key:tabKey,title:tabTitle})
                return tabs;
            })
            dispatch({ type: TABSREDU, state });
        }
    },
    TabAdd: (tab) => (dispatch, getState) => {
        let state = getStateFun(getState)
            .set("activeKey",tab.key)
            .updateIn(['tabs'],(tabs)=>{
                let index = tabs.map(t=>t.key).indexOf(tab.key),temp;
                if(index<0)
                    tabs = tabs.splice(tabs.size,0,tab)
                else{
                    temp = tabs.get(index);
                    temp.tag = tab.tag||{};
                    tabs.set(index,temp);
                }
                return tabs;
            })
        dispatch({ type: TABSREDU, state });
    },
    TabRemove: (key,activeKey) => (dispatch, getState) => {
        let state,
            count = 0,
            stateMap = getStateFun(getState),
            akey = activeKey;
        state = stateMap.updateIn(['tabs'],(tabs)=>{
            let index = tabs.map(t=>t.key).indexOf(key);
            if(index>-1)
                tabs = tabs.splice(index,1)
            count = tabs.size;
            return tabs;
        }).updateIn(["activeKey"],(k)=>{
            if(stateMap.get("tabs").size-1 == 0)
                return "";
            else
                return activeKey;
        })
        dispatch({ type: TABSREDU, state });
    },
    TabRemoveAdd: (key,activeKey,tag) => (dispatch, getState) => {
        let state,
            count = 0,
            stateMap = getStateFun(getState);
        state = stateMap.updateIn(['tabs'],(tabs)=>{
            // let index = tabs.map(t=>t.key).indexOf(key);
            // if(index>-1)
            //     tabs = tabs.splice(index,1)
            // count = tabs.size;
            // return tabs;

            // 关闭当前页面
            let index = tabs.map(t=>t.key).indexOf(key);
            if(index>-1)
                tabs = tabs.splice(index,1)
            count = tabs.size;
            
            let idx = tabs.map(t=>t.key).indexOf(activeKey),temp;
            // 如果activeKey页面没有打开，则打开页面
            if(idx<0){
                tabs = tabs.splice(tabs.size,0,{title: tabsData[activeKey].title, key: activeKey, tag})
            }else{
                temp = tabs.get(idx);
                temp.tag = tag||{};
                tabs.set(idx,temp);
            }
            return tabs;
        }).set("activeKey", activeKey)  // 直接设置新页面为激活页

        // }).updateIn(["activeKey"],(k)=>{
        //     if(stateMap.get("tabs").size-1 == 0)
        //         return "";
        //     else
        //         return activeKey;
        // })
        dispatch({ type: TABSREDU, state });
    },
    TabChange: (activeKey) => (dispatch, getState) => {
        let state = getStateFun(getState).set("activeKey", activeKey);
        dispatch({ type: TABSREDU, state});
    }
}

export default actions;