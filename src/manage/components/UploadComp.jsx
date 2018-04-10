import React, { Component } from "react";
import { Button, message, Icon, Upload } from '../../base/components/AntdComp';
import { shouldComponentUpdate } from '../../base/consts/Utils';
import { Urls } from '../../base/consts/Urls';
import { jsonHead } from '../../base/services/ReqApi';


class UploadComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // url: '',
            value: props.value || '',
            fileUid: null,
        };
        this.myprops = {
            name: 'fileName',
            action: Urls.UPLOAD_IMAGE,
            showUploadList:false,
            headers: {
                authorization: 'authorization-text',
                tokenId: jsonHead.tokenId,
            },
            beforeUpload: this.beforeUpload,
            onChange: (info) => {
                if (info.file.status !== 'uploading') {
                    // console.log('uploading', info.file, info.fileList);
                }
                if (info.file.status === 'removed') {
                    if (info.file.uid === this.state.fileUid) {
                        this.handleChange("");
                    };
                }
                if (info.file.status === 'done') {
                    if (info.file.response.status === 2000) {
                        let { prefix, fileURL } = info.file.response.data;
                        this.setState({
                            fileUid: info.file.uid
                        });
                        this.handleChange(prefix + fileURL);
                        message.success('文件上传成功！')
                    }
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 文件上传失败！`);
                }
            },
        };
    }
    beforeUpload = (file) => {
        const isJPG = /^image\/(jpeg|jpg|png|bmp)$/.test(file.type);
        if (!isJPG) {
            message.error('只允许上传 jpeg/jpg/png/bmp 类型文件！');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片文件大小不能超过 2MB ！');
        }
        return isJPG && isLt2M;
    }
    handleChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        this.triggerChange(value);
    }
    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    componentWillReceiveProps(nextProps) {
        let { value } = this.state;
        if ('value' in nextProps && nextProps.value != this.props.value) {
            value = nextProps.value;
        }
        this.setState({ value });
    }
    render() {
        let { value } = this.state;
        let src = value || this.props.src || "";
        return (
            <div style={{marginTop: -8 }}>
                <div style={{ padding: '10px 10px 10px 0',color:'#9b9b9b' }}>
                    <div style={{float:'left'}}>
                        <Upload {...this.myprops} >
                            <Button type="default" style={{border:'1px solid #4c80cf',width:70,height:28,color:'#4c80cf'}}><i className="c2mfont c2m-shangchuan1" style={{fontSize:14,marginRight:6,color:"#4c80cf"}}></i>上传</Button>
                        </Upload>
                    </div>
                    <img style={{ display: 'flex', width:140,height:80,float:'left',margin:'0 10px' }} src={src} />
                    <div style={{float:'left',width:255,lineHeight:'17px'}}>建议尺寸180*48像素，请上传小于2MB的图片（jpg，jpeg，png，bmp格式）</div>
                </div>
                
            </div>
        );
    }

}

export default UploadComp;
