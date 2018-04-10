import React, { Component } from 'react';
import { Table, Button, Input, Popconfirm, message, Form, Select, Row, Col, Upload } from '../../../base/components/AntdComp';
import FormComp from "../../../base/mobxComps/FormComp";
import PageComp from "./PageComp";
import { edit_announce, announcementListStore } from "../store/AnnouncementListStore";
import { AnnounceComp } from "./AnnounceComp";
import { jsonHead } from '../../../base/services/ReqApi';
import { Urls } from '../../../base/consts/Urls';
let { observable, action, computed, runInAction, toJS } = mobx;
let { observer } = mobxReact;
const FormItem = Form.Item;

@observer
class EditAnnounceComp extends AnnounceComp {
    constructor() {
        super();
        this.store = edit_announce;
        this.state = {
            importFile: {
                fileUrl: "",
            },
            fileList: [],
            beginUpDisabled: true,
            text_len: 0,
            corning: 0
        }
    }

    saveHandler = (e) => {
        e.preventDefault();
        if (!this.store.loading) {
            this.validateFds((err, data) => {
                let content_len = this.store.content.replace(/<[^>]+>/g, "");;
                if (!err) {
                    if (content_len.length) {
                        let ids = [];
                        if (this.store.fileList && this.store.fileList.length) {
                            this.store.fileList.map((item, index) => {
                                item.response ? ids.push(item.response.data.id) : ids.push(item.id)
                            })
                        }
                        data.fileIds = ids.join(',');
                        data.content = this.store.content;
                        this.store.edit(data).then(json => { // 编辑成功后
                            if (json.status === 2000) {
                                this.setState({
                                    corning: 0
                                })
                                runInAction(()=>{
                                    this.store.selectImgNum = 0;
                                })
                                announcementListStore.changeComp = false;
                                announcementListStore.fetchTableList();
                            }
                        });
                    } else {
                        message.error('公告内容不能为空!')
                    }
                }
            });
        }
    }

}


const options = {
    onValuesChange(props, values) { }
}

export default Form.create(options)(EditAnnounceComp)
