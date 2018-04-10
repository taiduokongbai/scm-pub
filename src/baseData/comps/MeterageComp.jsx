import React, {Component, PropTypes} from 'react'
import {Table, Popconfirm, Button} from '../../base/components/AntdComp';
import {meterageStore} from '../stores/MeterageStore';
import AddMeterageComp from '../dialogComp/AddMeterageComp';
import EditMeterageComp from '../dialogComp/EditMeterageComp';

let {observer} = mobxReact;

@observer
class MeterageComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.columns = [
            {
                title: "id",
                dataIndex: "id",
                key: "id",
                className: 'column-hidden',
            },
            {
                title: "名称",
                dataIndex: "meaName",
                key: "meaName",
                className: 'meaName',
            }, {
                title: "单位符号",
                dataIndex: "symbol",
                key: "symbol",
                width: 250,
            }, {
                title: "状态",
                dataIndex: "status",
                key: "status",
                width: 94,
                render: (txt) => window.ENUM.getEnum("status", txt + '')
            }, {
                title: "操作",
                width: 94,
                fixed: 'right',
                className: 'operate',
                render: (text, record, index) => {
                    if (record.type == 2) {
                        return this.renderTableButton(text, record, index)
                    }
                    else {
                        return this.renderNotOperate()
                    }
                }
            }
        ];
        this.columns1 = [
            {
                title: "id",
                dataIndex: "id",
                key: "id",
                className: 'column-hidden',
            },
            {
                title: "名称",
                dataIndex: "meaName",
                key: "meaName",
                className: 'meaName',
            }, {
                title: "单位符号",
                dataIndex: "symbol",
                key: "symbol",
            },
            {
                title: "计量体系",
                dataIndex: "meaSystem",
                key: "meaSystem",
                render: (txt) => this.getE("meaSystem", txt + '')
            }, {
                title: "状态",
                dataIndex: "status",
                key: "status",
                render: (txt) => window.ENUM.getEnum("status", txt + '')
            }
        ];
    }

    getE = (key, val) => {
        if (val !== "undefined" && val !== undefined && val !== null && val !== "null" && val !== "") {
            return window.ENUM.getEnum(key, val)
        }
    };
    renderNotOperate = () => {
        return (
            <span>
                <span className="three-line"><span className="one-line">--</span><span
                    className="one-line">--</span><span className="one-line">--</span></span>
            </span>
        )
    }
    renderTableButton = (text, record, index) => {
        return (
            <span>
                <a onClick={(e) => this.handleEdit(e, record, index)} title="编辑">
                    <i className="c2mfont c2m-bianji columns-distribute"></i>
                </a>
                 <span className="ant-divider" style={{width: 0}}/>
                {
                    this.renderStatusByDisable(record)
                }
                <span className="ant-divider" style={{width: 0}}/>
                {record.status == 0 ?
                    <Popconfirm title="确定删除吗?" onConfirm={(e) => this.handleDelete(e, record, index)} okText="确定"
                                cancelText="取消">
                        <a href="#" title="删除"><i className="c2mfont c2m-shanchu columns-distribute"></i></a>
                    </Popconfirm> : <span className="double-line">--</span>}
            </span>)
    }
    renderStatusByDisable = (record) => {
        switch (record.status) {
            case 0:
                return (
                    <Popconfirm title="确定启用吗?" onConfirm={() => this.handlerIsDisable(record.id, 1)} okText="确定"
                                cancelText="取消">
                        <a href="#" title="启用">
                            <i className="c2mfont c2m-qiyong columns-distribute"></i>
                        </a>
                    </Popconfirm>
                );
            case 1:
                return (
                    <Popconfirm title="确定禁用吗?" onConfirm={() => this.handlerIsDisable(record.id, 2)} okText="确定"
                                cancelText="取消">
                        <a href="#" title="禁用">
                            <i className="c2mfont c2m-jinyong columns-distribute"></i>
                        </a>
                    </Popconfirm>
                );
            case 2:
                return (
                    <Popconfirm title="确定启用吗?" onConfirm={() => this.handlerIsDisable(record.id, 1)} okText="确定"
                                cancelText="取消">
                        <a href="#" title="启用">
                            <i className="c2mfont c2m-qiyong columns-distribute"></i>
                        </a>
                    </Popconfirm>
                );
        }
    }

    componentDidMount() {
        meterageStore.fetchTableList();
    }

    componentWillUnmount() {
        meterageStore.resetMobx();
    }

    handleDelete = (e, record, index) => {
        meterageStore.deleteMeasureItem({id: record.id})
    }
    handleEdit = (e, record, index) => {
        meterageStore.getDetail({id: record.id})
    }
    handlerIsDisable = (id, status) => {
        meterageStore.isDisableMeasureItem({id: id, status: status})
    }
    clickBtn = (value) => {
        meterageStore.setDimensionality(value)
    }
    add = () => {
        meterageStore.showModal()
    }

    render() {
        return (
            <div className="baseData-content">
                <div className="meterage-bar">
                    <div className={meterageStore.dimensionality == 1 ? 'type-btn active' : 'type-btn'}
                         onClick={() => this.clickBtn(1)}><i className="icon c2mfont c2m-shuliang"></i> 数量
                    </div>
                    <div className={meterageStore.dimensionality == 2 ? 'type-btn active' : 'type-btn'}
                         onClick={() => this.clickBtn(2)}><i className="icon c2mfont c2m-changdu"></i> 长度
                    </div>
                    <div className={meterageStore.dimensionality == 3 ? 'type-btn active' : 'type-btn'}
                         onClick={() => this.clickBtn(3)}><i className="icon c2mfont c2m-zhiliang"></i> 质量
                    </div>
                    <div className={meterageStore.dimensionality == 4 ? 'type-btn active' : 'type-btn'}
                         onClick={() => this.clickBtn(4)}><i className="icon c2mfont c2m-tiji"></i> 体积
                    </div>
                    <div className={meterageStore.dimensionality == 5 ? 'type-btn active' : 'type-btn'}
                         onClick={() => this.clickBtn(5)}><i className="icon c2mfont c2m-mianji"></i> 面积
                    </div>
                    <div className={meterageStore.dimensionality == 0 ? 'type-btn active' : 'type-btn'}
                         onClick={() => this.clickBtn(0)}><i className="icon c2mfont c2m-qita"></i> 其他
                    </div>
                   {/* {(meterageStore.dimensionality == 1 || meterageStore.dimensionality == 0) ?
                        <Button className="default-btn add-btn" onClick={this.add}><i
                            className="c2mfont c2m-jia"
                            style={{paddingRight: 7, fontSize: 10}}></i><span>新建</span></Button> : null}*/}
                </div>
                <Table
                    {...meterageStore.Props}
                    rowKey='id'
                    columns={(meterageStore.dimensionality == 1 || meterageStore.dimensionality == 0) ? this.columns : this.columns1}
                />
                {meterageStore.visible ? <AddMeterageComp/> : null}
                {meterageStore.editVisible ? <EditMeterageComp/> : null}
            </div>
        )
    }
}

export default MeterageComp;