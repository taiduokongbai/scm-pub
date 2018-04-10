import React, { Component } from "react";
import { Button, Popconfirm, message, Input } from '../../base/components/AntdComp';
import MTable from '../../base/components/TableComp';
import TXT from '../languages';
import { shouldComponentUpdate } from '../../base/consts/Utils';
const T = TXT.POSITION;

const columns = [{
    title: '',
    dataIndex: '',
    key: '',
    className:"empty-column",
    width: 1,
    hidden: true,
}, {
    title: T.NAME,
    dataIndex: 'positionName',
    key: 'positionName',
    width:"15%",
}, {
    title: T.CODE,
    dataIndex: 'positionNo',
    key: 'positionNo',
     width:"15%",
}, {
    title: T.DESC,
    dataIndex: 'positionDesc',
    key: 'positionDesc',
}, {    
    dataIndex: 'handle',
    title: TXT.HANDLE,
    width:170,
}];

class PositionComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            SearchVal: props.SearchVal,
        };
        columns[columns.length - 1].render = (txt, record, index) =>
            <div>
                <span title="编辑" className="operator-color operator" href="javascript:;" onClick={() => this.onEditPosition(record.positionCode)}>
                    <i className="c2mfont c2m-bianji"></i>&nbsp;&nbsp;
                </span>
       
                <Popconfirm title={
                    <div>
                        <h5>{T.DEL1}</h5>
                        <p>{T.DEL2}</p>
                    </div>
                } onConfirm={() => this.onDelete(record.positionCode)}>
                     <span title="删除" className="operator-color operator" href="javascript:;">
                        <i className="c2mfont c2m-shanchu"></i>
                    </span>
                </Popconfirm>
            </div>
    }

    componentDidMount() {
        this.props.tablePaging(1);
    }
    onEditPosition = (id) => {
        const { positionId, EditPositionVisiable } = this.props;
        EditPositionVisiable(id);
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    };
    
    onDelete = (id) => {
        const { onClear, PositionDel } = this.props;
        PositionDel(id).then(json => {
            if (json.status === 2000) {
                message.success('删除成功!');
                onClear();
            }
        });
    }
    addPosition = () => {
        let {PositionCodeRule, AddPositionVisiable} = this.props;
        PositionCodeRule().then(json => {
            if (json.status === 2000) {
                AddPositionVisiable()
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.SearchVal !== this.props.SearchVal) {
            this.setState({ SearchVal: nextProps.SearchVal });
        };
    }
    onChange = (e) => {
        this.setState({ SearchVal: e.target.value });
    }
    onSearch = (e) => {
        this.props.onSearch(this.state.SearchVal);
    }
    render() {
        const { AddPositionVisiable, onSearch, SearchVal, tabLoading, tablePaging, ...props } = this.props;
        return (
            <div>
                <div className="position-head">
                    <Input
                        style={{ width: 200 ,height:32}}
                        placeholder={T.SEARCH}
                        value={this.state.SearchVal}
                        onChange={this.onChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button
                        style={localStyle.button}
                        onClick={this.onSearch}
                        loading={tabLoading}
                    >
                        <i className="c2mfont c2m-search1" style={localStyle.icon} />
                        <span>查询</span>
                    </Button> 
                    <Button className="btn-add" type="primary" onClick={this.addPosition}><i className="c2mfont c2m-jia" style={{fontSize:12,margin:'0 4px 0 -4px'}}></i>{T.ADD}</Button>
                </div>
                <div className="position-body">
                    <MTable
                        {...props}
                        loading={tabLoading}
                        cols={columns}
                        rowKey={"positionCode"}
                        pageOnChange={tablePaging}
                    />
                </div>
            </div>
        );
    }
}
export default PositionComp;





let localStyle = {
    button: {
        marginLeft: 10,
        color: "#fff",
        backgroundColor: "#4c80cf",
        borderColor: "#4c80cf",
        height: 30,
    },
    icon: {
        paddingRight: '7px',
        fontSize: '10px'
    }
};