import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../base/components/AntdComp.js';
import CodeRuleComp from '../components/CodeRuleComp';
import CodeRuleAct from '../actions/CodeRuleAct'
import AddCodeRuleCont from '../dialogconts/AddCodeRuleCont'
import EditCodeRuleCont from '../dialogconts/EditCodeRuleCont'


class CodeRuleCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchPm: {
                page: 1,
                pageSize: 15,
                businessType:1,
                searchValue: '',
                searchKey: '',
            },
        };
    }

    tablePaging = (pageNum) => {
        let { tabLoading, CodeRuleList } = this.props;
        if (!tabLoading) {
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
            let { page, pageSize, searchKey, searchValue, businessType } = this.state.searchPm;
            let pm = { page, pageSize, [searchKey]: searchValue, businessType: this.props.businessType };
            CodeRuleList(pm).then(json => {
                if (json.status === 2000) {
                    // this.setState({
                    //     searchPm: {
                    //         ...this.state.searchPm,
                    //         searchKey: "",
                    //         searchValue: "",
                    //     }
                    // })
                } else if (json.status === 4351) {

                };
            });
        }
    }

    onSearch = (searchData) => {
        if (Array.isArray(searchData.val)) {
            searchData.val = `"${searchData.val[0]},${searchData.val[1]}"`;
        }
        if (searchData.val == 'null') {
            searchData.key = '';
            searchData.val = '';
        }
        if (!this.props.tabLoading) {
            this.setState({
                searchPm: {
                    ...this.state.searchPm,
                    searchKey: searchData.key,
                    searchValue: searchData.val,
                }
            }, () => this.tablePaging());
        }
    }

    render() {
        let { } = this.props;
        return (
            <div className="codeRule-content">
                <CodeRuleComp
                    {...this.props}
                    onSearch={this.onSearch}
                    tablePaging={this.tablePaging}
                />
                <AddCodeRuleCont {...this.props} tablePaging={this.tablePaging} />
                <EditCodeRuleCont {...this.props} tablePaging={this.tablePaging} />
            </div>
        );
    }
}

const mapStateToProps = (state) => state.CodeRuleRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    CodeRuleList: (pm) => dispatch(CodeRuleAct.CodeRuleList(pm)),
    OpenModule: (type, codeIndex) => dispatch(CodeRuleAct.changeModule(type, true, codeIndex)),
    editCodeRule: (id) => dispatch(CodeRuleAct.editCodeRule({ id })),
    delCodeRule: (id) => { return dispatch(CodeRuleAct.delCodeRule({ id })) },
    isDisable: (id, businessStatus, businessIndex) => { return dispatch(CodeRuleAct.isDisable({ id, businessStatus, businessIndex })) },
    setActiveKey: (activeKey) => dispatch(CodeRuleAct.setActiveKey(activeKey)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CodeRuleCont);
