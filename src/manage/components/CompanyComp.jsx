import React, { Component,PropTypes } from 'react';
import { Input,Button,Table,Select} from '../../base/components/AntdComp';
import MTable from '../../base/components/TableComp';
import {shouldComponentUpdate} from '../../base/consts/Utils';
import SearchComp from '../../base/components/SearchComp';
import { is } from 'immutable';
let Search = Input.Search;
let columns = [
//     {
//     title: '公司编码',
//     dataIndex: 'companyCode',
//     hidden:true

// },
{
    title: '公司名称',
    dataIndex: 'companyName',

},
// {
//     title: '公司简称',
//     dataIndex: 'companyAbbr',
//     hidden:true

// },
// {
//     title: '公司简介',
//     dataIndex: 'companyDesc',
//     hidden:true

// },
 {
    title: '统一社会信用代码',
    dataIndex: 'companyUscc',
}, {
    title: '法人代表',
    dataIndex: 'corporation',
    hidden:true
}, {
    title: '公司电话',
    dataIndex: 'telephoneNumber',
    hidden:true
},{
    title: '邮编',
    dataIndex: 'zipCode',
    hidden:true
},{
    title: '公司性质',
    dataIndex: 'companyType',
    hidden:true
},{
    title: '公司规模',
    dataIndex: 'companyScale',
    hidden:true
},/*{
    title: '所属行业',
    dataIndex: 'companyIndustry',
}, */{
    title: '注册地址',
    dataIndex: 'companyAddr',
    render: (txt) => txt.countryName+""+txt.cityName+""+txt.countyName+""+txt.addressDetl,
}, {
    title: '业务联系人',
    dataIndex: 'contacts',
}, {
    title: '业务联系人电话',
    dataIndex: 'contactsPhone',
}, {
    title: '公司账号',
    dataIndex: 'accountNumber',
    hidden:true
}, {
    title: '状态',
    dataIndex: 'status',

}];

class CompanyComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={status:'0',companyName: '',page: 1,pageSize: 15}
        columns[0].render = (text,record)=> <a onClick={()=>this.onSideShow(record.companyCode)}>{text}</a>;
        

    }
    componentDidMount() {
        this.props.tablePaging(1);
    }


    onSideShow = (companyCode) => {
        const { Record, SidebarVisiable,SidebarLoding} = this.props;
        Record(companyCode);
        SidebarVisiable(true);
        SidebarLoding();
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.statusVal !== this.props.statusVal) {
    //         this.setState({ statusVal: nextProps.statusVal });
    //     };
    // }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    addCompany = () => {
        let {AddCompanyVisiable, CompanyCodeRule} = this.props;
        CompanyCodeRule().then(json => {
            if (json.status === 2000) {
                AddCompanyVisiable()
            }
        })
    }
    SearchVal=(e)=>{
        this.setState({companyName: e.target.value})
       
    }
    OnSearch=()=>{
        this.props.tablePaging(this.state);
    }
    OnChange=(value)=>{
        this.setState({status:value})
    }
    onPressEnter=(e)=>{
        this.props.tablePaging(this.state);
    }
    render() {
        const { AddCompanyVisiable, tabLoading, tablePaging,...props } = this.props;
        return (
            <div>
                <div className="managetitle">
                    <div className="manage-box">
                    <div className="managehead">
                        <Select   style={{ width: 200,height:32,verticalAlign:'top'}} defaultValue="0" onChange={this.OnChange}>
                            {
                                window.ENUM.getEnum("company").map(company => {
                                    return <Select.Option value={company.catCode} key={company.catCode}>{company.catName}</Select.Option>
                                })
                            }
                        </Select>
                        <Input style={{width:200,height:30,margin:'0 10px 0 20px'}} placeholder = "输入企业名称搜索" onChange={this.SearchVal} onPressEnter={this.onPressEnter}/>
                       
                        <Button type="primary" onClick={this.OnSearch} style={{background:'#4c80cf',width:73,height:30}}><i className="c2mfont c2m-search1" style={{fontSize:12,margin:'0 4px 0 -4px'}}></i>查询</Button>
                        <Button type="primary" className="manage-addBtn" onClick={this.addCompany} style={{background:'#4c80cf',width:73,height:30}}><i className="c2mfont c2m-jia" style={{fontSize:12,margin:'0 4px 0 -4px'}}></i>新建</Button>
                    </div>
                    <div className="manage-body">
                        <MTable
                            {...props}
                            loading={tabLoading}
                            cols={columns}
                            rowKey={"companyCode"}
                            pageOnChange={tablePaging}
                            pageSizeOptions={['10','15','20','30','50']}
                        />
                    </div>
                </div>
                </div>


            </div>
        );
    }
}
CompanyComp.defaultProps = {
    SearchVal: '',
    placeholder: '',
    width: 200,
    onSearch: ()=>{},
}
CompanyComp.propTypes = {
    SearchVal: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.number,
    onSearch: PropTypes.func,
}
export default CompanyComp;