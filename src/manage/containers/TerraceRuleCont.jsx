import React, { Component } from "react";
import { connect } from 'react-redux';
import TerraceRuleAct from '../actions/TerraceRuleAct';
import TerraceRuleComp from '../components/TerraceRuleComp';
import AddTerraceRuleCont from '../dialogconts/AddTerraceRuleCont';
import EditTerraceRuleCont from '../dialogconts/EditTerraceRuleCont';
class TerraceRuleCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
             searchPm: {
                page: 1,
                pageSize: 10,
                businessType:4,
                searchValue: '',
                searchKey: '',
            },
        };
    }

     tablePaging = (pageNum) => {
        let { list_loading,TerraceRuleList } = this.props;
        if (!list_loading) {
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
            let { page, pageSize,businessType, searchKey, searchValue } = this.state.searchPm;
            let pm = { page, pageSize,businessType, [searchKey]: searchValue };
            TerraceRuleList(pm);
        }
    }

    onSearch = (searchData) => {
        if (Array.isArray(searchData.val)) {
            searchData.val = `${searchData.val[0]},${searchData.val[1]}`;
        }
        if (searchData.val == 'null') {
            searchData.key = '';
            searchData.val = '';
        }
        
        if (!this.props.list_loading) {
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
        return (
            <div className="terraceRule-content">
                <TerraceRuleComp {...this.props}
                    tablePaging={this.tablePaging}
                    onSearch={this.onSearch}
                />
                <AddTerraceRuleCont {...this.props}/>
                <EditTerraceRuleCont {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => state.TerraceRuleRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    TerraceRuleList: (pm) => dispatch(TerraceRuleAct.TerraceRuleList(pm)),
    TerraceRuleDelete: (pm) => dispatch(TerraceRuleAct.TerraceRuleDelete(pm)),
    TerraceRuleStatus: (pm) => dispatch(TerraceRuleAct.TerraceRuleStatus(pm)),
    OpenAddTerraceRule: () => dispatch(TerraceRuleAct.OpenAddTerraceRule(true)),
    OpenEditTerraceRule: () => dispatch(TerraceRuleAct.OpenEditTerraceRule(true)),
    TerraceRuleDetail: (pm) => dispatch(TerraceRuleAct.TerraceRuleDetail(pm)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TerraceRuleCont);
