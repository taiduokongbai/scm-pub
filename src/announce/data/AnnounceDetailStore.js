import TableStore from '../../base/stores/TableStore';
import { AnnounceFetch } from '../../base/consts/AnnounceUrls';
import { message } from '../../base/components/AntdComp';
let { observable, action, computed, runInAction, toJS, useStrict } = mobx;

export class AnnounceDetailStore extends TableStore {
    @observable loading=false;
    @observable detail={
        id:"",
        title:"",
        content:"",
        createDate:"",
        createByName:"",
        fileIds:"",
        fileList:[],
    }
    @action
    fetchTableDetails(pm) {
        this.loading=true;
        return AnnounceFetch.AnnounceDetails(pm).then(json => {
            if (json.status === 2000) {
                runInAction(()=>{
                     this.detail=json.data
                })
            }
            runInAction(()=>{
                this.loading=false;
            })
            return json;
        });
    }

};
let announceDetailStore = new AnnounceDetailStore();
export { announceDetailStore }