import { message } from '../../../base/components/AntdComp';
import { AnnounceFetch } from '../../../base/consts/AnnounceUrls';
let { observable, action, computed, runInAction, toJS } = mobx;

export class AnnounceStore { // 公告发布--公告store
    @observable loading = false;

    initialData = {
        title: '', // 公告标题
        content: '', // 公告内容
        fileIds: '',  // 附件
    }
    // 上传图片的url list
    @observable urlList = [];  
    @action
    setUrlList = (val = []) => {
        this.urlList = val
    }
    @action
    resetUrlList() {
        this.urlList = [];
    }
    // 公告详情
    @observable details = { ...this.initialData }
    @action
    resetDetails = () => {
        this.details = { ...this.initialData }
    }
    @computed get getDetail() {
        return this.details;
    }
    @action
    setDetail = (val) => {
        this.details = Object.assign({}, this.details, val);
    }
    //   附件list
    @observable fileList = [];   
    @action
    setFileList = (val) => {
        this.fileList = val;
    }
    @action
    resetFileList = () => {
        this.fileList = [];
    }
    // f富文本内容
    content = "";     
    // 选择上传的图片数量
    selectImgNum = 0;   
    // 图片上传数量限制提示语
    @observable pic_num_corning = false;   // 图片上传最多为10张

}

export class NewAnnounceStore extends AnnounceStore { // 新建公告发布
    curComp = 'addAnnounce';
    @action
    add = (val={}) => {
        runInAction(()=>{
            this.loading = true
        });
        return AnnounceFetch.AnnounceAdd(val).then(this.clearForm)
    }

    @action.bound clearForm(json){
        if(json.status === 2000){
            this.resetDetails();
        };
        message.success('公告发布成功！')
        runInAction(()=>{
            this.loading = false;
        })
        return json
    }
}

let new_announce = new NewAnnounceStore();
export { new_announce }