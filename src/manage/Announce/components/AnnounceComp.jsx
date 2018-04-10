import React, { Component } from 'react';
import { Table, Button, Input, Icon, message, Form, Select, Row, Col, Upload, Spin } from '../../../base/components/AntdComp';
import FormComp from "../../../base/mobxComps/FormComp";
import PageComp from "./PageComp";
import { new_announce } from "../store/AnnounceStore";
import { jsonHead } from '../../../base/services/ReqApi';
import { Urls } from '../../../base/consts/Urls';
import { converByte } from "../../../base/consts/Utils";
import { shouldComponentUpdate, debounce } from '../../../base/consts/Utils';
let { observable, action, computed, runInAction, toJS } = mobx;
let { observer } = mobxReact;
const FormItem = Form.Item;

@observer
class AnnounceComp extends FormComp {
    constructor(props) {
        super(props);
        this.store = new_announce;
        this.state = {
            importFile: {
                fileUrl: "",
            },
            fileList: [],
            beginUpDisabled: true,
            text_len: 0,
            corning: 0
        }
        this.files = {
            name: 'file',
            action: Urls.COMMON_UPLOAD_FILE,//http://10.99.2.70:9098/pub/common/uploadfile',//Urls.COMMON_UPLOAD_FILE,
            onChange: this.handleChange,
            onRemove: (file) => {
                let id = file.id ? file.id : file.response.data.id;
                const index = this.store.fileList.indexOf(file);
                const newFileList = this.store.fileList.slice();
                newFileList.splice(index, 1);
                this.store.setFileList(newFileList)
                if (this.store.fileList.length < 11) {
                    this.setState({
                        corning: 0
                    })
                }
            },
            showUploadList: { showPreviewIcon: false, showRemoveIcon: true },
            accept: ".xls,.xlsx,.doc,.pdf, .docx, .txt, .ppt ",
            multiple: true,
            beforeUpload: this.beforeUpload,
            headers: {
                authorization: 'authorization-text',
                tokenId: jsonHead.tokenId,
            },
            data: {
                module: "announcement"
            }
        }
    }

    handleChange = (info) => {
        if (info.file.status == "done") {    // 成功上传
            this.setState({
                importFile: {
                    ...this.state.importFile,
                    fileUrl: info.file.response.data.fileURL,
                },
                beginUpDisabled: false,
            })
        }

        if (info.fileList[info.fileList.length - 1].status == 'done') {
            info.fileList.length > 0 ? info.fileList.map((item, index) => {
                var mb = new RegExp('MB\\)$');
                var kb = new RegExp('KB\\)$');
                if (!mb.test(item.name) || !kb.test(item.name)) {
                    let a = item.size / 1024;
                    if (a >= 1024 && !mb.test(item.name)) { //  >=1024并没有添加mb单位
                        a /= 1024;
                        item.name += ' (' + a.toFixed(2) + 'MB)';
                    } else if (a < 1024 && !kb.test(item.name)) {   // <1024并且没有添加kb单位
                        item.name += ' (' + a.toFixed(2) + 'KB)';
                    }
                }
            }) : '';
        }

        let fileList = info.fileList;
        fileList = fileList.slice(-10);
        // this.setState({ fileList: fileList })
        this.store.setFileList(fileList)
    }

    componentDidMount() {
        if (this.store.curComp == 'addAnnounce') { // 如果是新添加
            runInAction(() => {
                this.content = ''
            })
            this.store.resetFileList();
            this.props.form.setFieldsValue({ title: '' })
        }
    }
    beforeUpload = (file, fileList) => {
        this.setState({
            text_len: fileList.length
        })
        const isFile = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (isFile == '.exe' || isFile == '.bat') {
            message.error('选择的文件格式不正确!');
            return false;
        }
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
            message.error('上传的单个文件请不要超过20M')
            return isLt20M;
        }

        if (this.store.fileList.length + fileList.length > 10) {
            this.setState({
                corning: 1
            })
            return false;
        } else {
            this.setState({
                corning: 0
            })
        }
    }

    saveHandler = (e) => {
        e.preventDefault();
        if (!this.store.loading) {
            this.validateFds((err, data) => {
                let c = this.store.content;
                let content_len = this.store.content.replace(/<[^>]+>/g, "");
                if (!err && content_len.length) {
                    if (content_len.length < 10000) {
                        let ids = [];
                        if (this.store.fileList && this.store.fileList.length) {
                            this.store.fileList.map((item, index) => {
                                item.response ? ids.push(item.response.data.id) : ids.push(item.id)
                            })
                        }
                        data.fileIds = ids.join(',');
                        data.content = this.store.content;
                        this.store.setDetail(data);
                        /*if (!data.content.match(/\<img style={{maxWidth/)) {
                            data.content = data.content.replace(/<img/gi, "<img style={{maxWidth: 950}}");
                        }*/
                        this.store.add(data).then(json => {
                            if (json.status === 2000) {
                                this.props.form.resetFields();
                                this.setState({
                                    corning: 0
                                })
                                let a = [];
                                this.store.setFileList(a);
                                runInAction(() => {
                                    this.store.selectImgNum = 0;
                                })
                            }
                        })
                    } else message.error('公共内容最大为10000字符!')
                } else {
                    if (!content_len.length) {
                        message.error('公告内容不能为空!')
                    }
                }
            });
        }
    }

    render() {
        let { details } = this.store;
        const formItemLayout = {
            labelCol: { span: 1 },
            wrapperCol: { span: 22 },
        };
        const upLoadLayout = {
            labelCol: { span: 1 },
            wrapperCol: { span: 5 },
        };
        return (
            <div className='announce'>
                <Spin spinning={this.store.loading}>
                    <Form className='announce-form'>
                        <FormItem label="公告标题" {...formItemLayout}>
                            {this.getFD('title', {
                                initialValue: details.title,
                                rules: [
                                    //{ required: true, message: '必填！' },
                                    {
                                        validator: (rule, val, callback) => {
                                            {/*let vali = /^[\u4e00-\u9fa5]{1,50}$/;*/ }
                                            if (val.length < 1) {
                                                callback('公告标题必填！')
                                            } else if (val.length > 50) {
                                                callback('最多允许50个字符')
                                            } else {
                                                callback();
                                            }
                                        }
                                    }
                                ],
                            })(
                                <Input placeholder='公告标题(50个字符以内)' style={{ width: '300px' }} />
                                )}
                        </FormItem>
                        <FormItem label='公告内容' {...formItemLayout}>
                            {this.getFD('content', {
                                initialValue: details.content,
                            })(
                                <PageComp store={this.store} />
                                )}
                        </FormItem>
                        <FormItem label='上传附件' {...upLoadLayout} className='announce-file-upload'>
                            {this.getFD('upload', {
                                initialValue: '',
                            })(
                                <Upload {...this.files} fileList={this.store.fileList}>
                                    <Button type="upload" className="upload-through"><Icon type="upload" />选择文件</Button>
                                    <span className='corning' >上传的单个文件请不要超过20M</span>
                                    <span style={{ display: this.state.corning ? 'block' : 'none', color: 'red' }}>单次最多上传10个文件</span>
                                </Upload>
                                )}
                        </FormItem>
                        <Button type="primary" onClick={(e) => this.saveHandler(e)} className='send-btn'><i className="c2mfont c2m-fabu" style={{ fontSize: 14, marginRight: 4 }}></i>发布</Button>
                    </Form>
                </Spin>
            </div>
        )
    }
}

const options = {
    onValuesChange(props, values) {
        new_announce.setDetail(values)
    }
}

export default Form.create(options)(AnnounceComp);
export { AnnounceComp }