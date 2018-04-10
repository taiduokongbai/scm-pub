import React, { Component } from "react";
import { inject } from "mobx-react";

import  'babel-polyfill';
import hmacsha1 from "hmacsha1";
import { Base64 } from "js-base64";
import md5 from "md5";
import findIndex from "lodash/findIndex";
import uniqBy from "lodash/uniqBy";
import LzEditor from './editor/index.jsx'

import message from "antd/lib/message";
import { Urls } from '../../../base/consts/Urls';
import { jsonHead } from '../../../base/services/ReqApi';
let { observable, action, computed, runInAction, toJS } = mobx;
let { observer } = mobxReact;
let urlList = [];

@observer
export default class PageComp extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;
        this.urlList = [];
        this.state = {
            //htmlContent: this.props.store.details.content || ``,
            responseList: [],
        }
        this.receiveHtml = this.receiveHtml.bind(this);
        this.receiveMarkdown = this.receiveMarkdown.bind(this);
        this.receiveRaw = this.receiveRaw.bind(this);
        this.onChange = this.onChange.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.getSignature = this.getSignature.bind(this);
        this.getPolicy = this.getPolicy.bind(this);
    }

    receiveHtml(content) {   // 要更新的是details.content
        // console.log(content);
        let content_len = content.replace(/<[^>]+>/g, "");
        // var pattern = /<img[^>]*>/gi ;   // match the <img/> number
        // var img_len = content.match(pattern) ? content.match(pattern).length : 0;
        // runInAction(()=>{
        //     this.store.selectImgNum = img_len;
        // })
        if (content_len.length > 10000) {// 如果字符为10000字以上
            message.error('公共内容最大为10000字符');
        } else {
            runInAction(() => {
                this.store.content = content;
            })
        }
        this.setState({ responseList: [] });
    }

    receiveMarkdown(content) {
        // console.log("recieved markdown content", content);
    }
    receiveRaw(content) {
        // console.log("recieved Raw content", content);
    }
    onChange(info) {
        let url = '';
        let a = this.store.urlList.toJS();
        if (a.length == 0) {
            urlList = [];
        }
        if (info.file.status === 'done') {
            urlList.push(info.file.response.data.fileURL);
            runInAction(() => {
                this.store.setUrlList(urlList);
            })
        }
        if (info.file.status === 'error') {
            message.error(`图片 上传失败.`);
        }

        if (info.fileList.length == 0) {
            urlList = [];
        }
        this.setState({
            responseList: info.fileList
        })
        let currFileList = info.fileList;
        currFileList = currFileList.filter((f) => (!f.length));
        currFileList = currFileList.map((file, index) => {
            if (file.status) {
                file.url = urlList[index];
            }
            if (!file.length) {
                return file;
            }
        });
        let _this = this;
        currFileList = currFileList.filter((file) => {
            let hasNoExistCurrFileInUploadedList = !~findIndex(_this.state.responseList, item => item.name === file.name)
            if (hasNoExistCurrFileInUploadedList) {
                if (!!_this.props.isMultiple == true) {
                    _this.state.responseList.push(file);
                } else {
                    _this.state.responseList = [file];
                }
            }
            return !!file.response || (!!file.url && file.status == "done") || file.status == "uploading";
        });
        currFileList = uniqBy(currFileList, "name");
        if (!!currFileList && currFileList.length != 0) {
            this.setState({ responseList: currFileList });
        }
        _this.forceUpdate();
    }
    beforeUpload(file, fileList) {   // 图片上传  --- 限制图片大小 2M , 限制图片格式
        const isJPG = file.type === 'image/png' || file.type === 'image/jpg' || file.type === "image/jpeg";
        if (!isJPG) {
            message.error('选择的图片格式不正确!');
            return false;
        }
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
            message.error('单个图片大小不能超过2M!');
            return false;
        }
    }
    getSignature(fileName) {
        let now = new Date();
        let h = hmacsha1('19931944122b23f77681b6ab765648f8', 'POST&/upyun-temp/' + fileName + '&' + now);
        let Signature = Base64.encode(h);
        return Signature;
    }
    getPolicy(fileName) {
        let now = new Date();
        let afterHour = new Date(now.getTime() + 1 * 60 * 60 * 1000); //expiration date time
        let policy = Base64.encode(JSON.stringify({
            "bucket": "devopee",
            "save-key": "/" + fileName,
            "expiration": Math.round(afterHour.getTime() / 1000),
            "date": now
        }));
        return policy;
    }

    render() {
        let policy = "";
        const uploadProps = {
            headers: {
                authorization: 'authorization-text',
                tokenId: jsonHead.tokenId,
            },
            action: Urls.COMMON_UPLOAD_FILE_IMG,//Urls.COMMON_UPLOAD_FILE_IMG, //"http://localhost:9099/ec/basic/uploadFile",
            onChange: this.onChange,
            onRemove: (file) => {
                const index = urlList.indexOf(file.response.data.fileURL);
                const newFileList = urlList;
                newFileList.splice(index, 1);
                this.store.setUrlList(newFileList);
            },
            listType: 'picture',
            name: 'file',
            fileList: this.state.responseList,
            multiple: true,
            beforeUpload: this.beforeUpload,
            showUploadList: true,
            data: {
                module: "announcement"
            }
        }
        return (
            <div>
                <LzEditor
                    active={true}
                    importContent={this.props.store.details.content}
                    cbReceiver={this.receiveHtml}
                    uploadProps={uploadProps}
                    audio={false}
                    video={false}
                    store={this.store}
                />
                <br />
            </div>
        );
    }
}



