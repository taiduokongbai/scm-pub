import React, { Component } from 'react';
import { Table, Button, Input, Popconfirm, message, Row, Col, Upload } from '../../../base/components/AntdComp';
import { announcementListStore, edit_announce } from '../store/AnnouncementListStore';
import OperationsComp from '../../../base/mobxComps/OperationsComp';
let { observable, action, computed, runInAction, toJS } = mobx;
let { observer } = mobxReact;
import { prefix, prefix_route, prefixCh, prefixPub } from '../../../base/consts/UrlsConfig'
import AnnounceComp from "./AnnounceComp"
import EditAnnounceComp from "./EditAnnounceComp"
import { HashRouter, Route,Link } from 'react-router-dom';

@observer
export default class AnnouncementListComp extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '公告标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '发布时间',
            dataIndex: 'createDate',
            key: 'createDate',
        }, {
            title: '发布者',
            dataIndex: 'createByName',
            key: 'createByName',
        }, {
            title: '操作',
            dataIndex: 'opration',
            key: 'opration',
            width:117,
           className:'announcementList-oeration',
            render: (txt, record, index) => {
                function onEdit() {
                    runInAction(() => {
                        announcementListStore.changeComp = true;
                    })
                    edit_announce.getAnnounceDetail({id: record.id});
                }
                let opts = [
                    {
                        title: '编辑',
                        fun: onEdit,
                        show: true,
                    },
                    {
                        title: "删除",
                        titleText: ['确定要删除该数据吗？'],
                        fun: () => this.onDelete(record.id),
                        show: true,
                    }
                ];
                return <OperationsComp operations={opts} />;
            }
        }]
        this.columns[0].render = (txt, record, index) => <a href={prefix + prefixCh + "announce.html#/"+record.id} target="_blank" style={{textDecoration:'none'}}>{record.title}</a>
    }
     onDelete = (pm) => {
        announcementListStore.fetchTableDelete({ id: pm}).then(json => {
            if (json.status === 2000) {
                message.success('删除成功!');
                announcementListStore.fetchTableList();
            }
        });
    }
    componentWillMount(){
       announcementListStore.fetchTableList({page: 1,pageSize: 15})  
    }
    render() {

        return (<div>
            {
                announcementListStore.changeComp ? <EditAnnounceComp /> :
                    <div className="announce-ment-list">
                        <div className="announce-send">
                            <Button type="primary"><Link to="/4"><span className="newset-icon c2mfont c2m-jia"></span>发布公告</Link></Button>
                        </div>
                        <Table
                            {...announcementListStore.Props}
                            rowKey='id'
                            columns={this.columns}
                        />
                    </div>

            }
        </div>
        )
    }
}