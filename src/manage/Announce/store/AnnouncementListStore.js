import TableStore from '../../../base/stores/TableStore';
import { AnnounceFetch } from '../../../base/consts/AnnounceUrls';
import { message } from '../../../base/components/AntdComp';
import { AnnounceStore } from "./AnnounceStore";   // 发布公告store
import { converByte } from "../../../base/consts/Utils";
let { observable, action, computed, runInAction, toJS, useStrict } = mobx;

export class AnnouncementListStore extends TableStore {
      pages = {
        page: 1,
        pageSize: 15
    };

    paging = {
        total: 0,
        current: 1,
        pageSize: 15,
    };
    pageSizeOptions = ['10','15','20', '30', '50'];
    @observable changeComp = false;
    @action
    fetchTableList(params) {
        this.loading = true;
        let pm = { ...this.pages, ...params };
        return AnnounceFetch.AnnounceMentList(pm)
            .then(this.updateTableList)
            .then(json => {
                return json
            });
    }
    @action
    fetchTableDelete(pm) {
        this.loading = true;
        return AnnounceFetch.AnnounceMentDelete(pm).then(json => {
            runInAction(() => {
                this.loading = false;
            })
            return json;
        });
    }

};

export class EditAnnounceStore extends AnnounceStore { // 编辑公告store
    id = "";
    curComp = 'editAnnounce';
    @action
    getAnnounceDetail = (val = {}) => {
        runInAction(() => {
            this.loading = true;
        })
        return AnnounceFetch.AnnounceDetails(val).then(json => {
            if (json.status === 2000 && json.data) {
                var pattern = /<img[^>]*>/gi ;   // match the <img/> number
                var img_len = json.data.content.match(pattern) ? json.data.content.match(pattern).length : 0;
                runInAction(()=>{
                    this.id = json.data.id;
                    this.content = json.data.content;   // 编辑公告内容
                    this.selectImgNum = img_len;
                })
                this.setDetail(json.data);
                let a = json.data.fileList ? json.data.fileList : [];
                if(a.length>0){
                    a.map((item, index)=>{   // 计算大小，添加key
                        var mb = new RegExp('MB\\)$');
                        var kb = new RegExp('KB\\)$');
                        if (!mb.test(item.name) || !kb.test(item.name)) {
                            item.name += '(' + converByte(Number(item.size)) + ')';
                        }
                        item.uid = index;
                        return item;
                    })
                }
                this.setFileList(a);
            }
            runInAction(() => {
                announcementListStore.changeComp = true;
                this.loading = false;
            })
        })
    }
    // 编辑公告-数据回填
    @action
    edit = (data={}) => {
        runInAction(()=>{
            this.loading = true
        });
        data.id = this.id;
        return AnnounceFetch.AnnounceUpdate(data).then(json=>{
            if(json.status === 2000){
                message.success('编辑成功')
            }
            runInAction(()=>{
                this.loading = false;
            })
            return json;
        })
    }

};

let announcementListStore = new AnnouncementListStore();
let edit_announce = new EditAnnounceStore();

export { announcementListStore, edit_announce }