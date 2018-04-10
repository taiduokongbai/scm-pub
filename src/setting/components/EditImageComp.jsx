import React, { Component, PropTypes } from "react";
import { Upload, message, Button, Icon, Input, } from '../../base/components/AntdComp';;
import ModalComp from '../../base/components/ModalComp';
import { Urls } from '../../base/consts/Urls';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { ReqApiPhoto } from '../../base/services/ReqApi';

class AddPlaceComp extends ModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            src: null,
            cropResult: null,
            fileName: null,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.cropImage()
        }
    }

    cropImage = () => {
        if (!this.cropper.getCroppedCanvas() || typeof this.cropper.getCroppedCanvas() === 'undefined') {
            message.info('请先上传文件');
            return;
        }
        this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL(),
        }, () => {
            // this.props.onOk(this.state.cropResult);
            this.cropper.getCroppedCanvas().toBlob((blob => {
                var formData = new FormData();
                formData.append('profilePhoto', blob, this.state.fileName);
                // let url = 'http://172.16.8.105:80/pub/employees/editProfilePhoto';
                ReqApiPhoto.post({
                    url: Urls.EDIT_PROFILE_PHOTO,
                    pm: formData
                }).then(json => {
                    if (json.status === 2000) {
                        message.success('头像修改成功！');
                        this.props.handleCancel();
                        this.props.getPersonalInfo();
                    } else {
                        message.error('头像修改失败！');
                    }
                })
            }))
        });
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

    onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if (!this.beforeUpload(files[0])) {
            return
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({ src: reader.result, fileName: files[0].name });
        };
        reader.readAsDataURL(files[0]);
    }
    getComp = () => {
        let { src, cropResult, fileName } = this.state;
        return (
            <div>
                <div style={style.box}>
                    <label style={style.label} className={"ant-btn ant-btn-default ant-btn-lg"} htmlFor="xFile"><Icon type="upload" style={style.icon} />
                        {src ? "重新上传" : "上传文件"}
                    </label>
                    <span style={style.text}>{fileName || '未选择任何文件'}</span>
                    <input type="file" id="xFile" style={style.file} onChange={this.onChange} />
                </div>
                <div style={style.cropperbox} >
                    {
                        src?
                        <Cropper
                            style={style.cropper}
                            aspectRatio={1 / 1}
                            preview=".img-preview"
                            src={src}
                            ref={cropper => { this.cropper = cropper; }}
                            guides={false}
                            viewMod={3}
                            dragMode={"move"}
                            center={false}
                            background={false}
                            autoCropArea={0.6}
                            toggleDragModeOnDblclick={false}
                            checkCrossOrigin={false}
                        />
                        :
                        <div style={style.nofile}></div>
                    }
                    <div style={style.viewbox}>
                        <div>预览</div>
                        {
                            src ?
                                <div className="img-preview" style={ style.preview } />
                                :
                                <img style={style.view} src={cropResult || this.props.src} alt="系统头像" />
                        
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const style = {
    box: {
        padding: '10px',
    },
    file: {
        position: 'absolute',
        clip: 'rect(0 0 0 0)',
    },
    nofile: {
        height: 400,
        width: 384,
        // backgroundColor: '#e2e2e2',
    },
    label: {
        lineHeight: '32px',
    },
    icon: {
        lineHeight: '32px',
        marginRight: '0.5em',
    },
    text: {
        paddingLeft: '10px',
        lineHeight: '32px',
        fontSize: '14px',
    },
    cropperbox: {
        display: 'flex',
        width: '100%'
    },
    cropper: {
        height: 400,
        width: '80%',
        paddingRight: '20px'
    },
    viewbox: {
        width: '20%',
        paddingLeft: '20px'
    },
    view: {
        width: '100%',
        marginTop: '30px'
    },
    preview: {
        width: '100%',
        height: 300,
        overflow: 'hidden',
        marginTop: '30px'
    }
}
export default AddPlaceComp;
