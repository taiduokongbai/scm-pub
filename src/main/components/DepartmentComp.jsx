import React from 'react'
import {Table, Button, Input, Breadcrumb, Spin} from '../../base/components/AntdComp'
import MTable from '../../base/components/TableComp';
const columns = [{
                title: '组织名称',
                dataIndex: 'deptName',
                key: 'deptName',
                }, {
                title: '组织编号',
                dataIndex: 'deptNo',
                key: 'deptNo',
                }, {
                title: '层级',
                dataIndex: 'deptLevel',
                key: 'deptLevel',
                width: '10%',
                render: (txt)=>txt==3?"公司":window.ENUM.getEnum("level", txt+'')
                }, {
                title: '人数',
                dataIndex: 'deptNum',
                key: 'deptNum',
                }, {
                title: '负责人',
                dataIndex: 'deptMgrName',
                key: 'deptMgrName',
                }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (txt)=>txt==-1?"-":window.ENUM.getEnum("status", txt+'')
                }];
class Department extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={"conditions":[{"field":"dept_no","value":"","operation":1},{"field":"dept_name","value":"","operation":1}],"relations":"dept_no or dept_name"}
        columns[0].render= (text,record) =>{
            if(record.status!=-1){
                return <a href="#" onClick={() => this.onOpenSidebar(record.id)} >{text}</a>
            }else{
                return <span>{text}</span>
            }
        } 
        // this.defaultRowKey=new Set(props.defaultRowKey);
        // this.state={
        //     dataSource :props.dataSource,
        //     defaultRowKey:props.defaultRowKey
        // };
        // this.flaglist=[];
    }
    
    componentDidMount(){
        this.props.initlist();
    }

    loop=(dataSource)=>dataSource.map((item,index)=>{
        if(item.children&&item.children.length<1){
            delete item.children;
        }
        if (item.children) this.loop(item.children);
    })

    // componentWillReceiveProps(nextProps) {
    //     let defaultRowKey=new Set(nextProps.defaultRowKey);
    //     let flaglist=[];
    //     let loop = data => data.map((item) => {
    //         console.log('flaglist1',flaglist);
    //         if(item.flag==1){
    //             item.deptPids.split(',').forEach(id=>{
    //                 defaultRowKey.add(id);
    //             })
    //             flaglist.push(item.id);
    //         }
    //         if (item.children) loop(item.children);
    //         return item;
    //     });
    //     let loop2 = data => data.map((item,index) => {
    //         console.log('loop2',data);
    //         if(defaultRowKey.has(item.id) || item.flag==1){
    //             if (item.children) loop2(item.children);
    //         }
    //         else{
    //             console.log('flaglist2',flaglist);
    //             let arr =item.deptPids?item.deptPids.split(','):[];
    //             arr = arr.filter((id) => flaglist.includes(id) );
    //             if(arr.length<1){
    //                 console.log('delete',defaultRowKey);
    //                 data.splice(index,1)
    //             }
    //         }
    //         return item;
    //     });
    //     if(nextProps.SearchVal){
    //         this.setState({
    //             dataSource:loop2(loop(nextProps.dataSource)),
    //             defaultRowKey:[...defaultRowKey]
    //         });
    //         // Promise.all([loop(dataSource)]).then(()=>{loop2(dataSource)});
    //     }
        
    // }

    // loop = data => data.map((item) => {
    //     console.log('flaglist1',this.flaglist);
    //     if(item.flag==1){
    //         item.deptPids.split(',').forEach(id=>{
    //             this.defaultRowKey.add(id);
    //         })
    //         this.flaglist.push(item.id);
    //     }
    //     if (item.children) this.loop(item.children);
    //     return item;
    // });
    
    // //del
    // loop2 = data => data.map((item,index) => {
    //     console.log('loop2',data);
    //     if(this.defaultRowKey.has(item.id) || item.flag==1){
    //         if (item.children) this.loop2(item.children);
    //     }
    //     else{
    //         console.log('flaglist2',this.flaglist);
    //         let arr =item.deptPids?item.deptPids.split(','):[];
    //         arr = arr.filter((id) => this.flaglist.includes(id) );
    //         if(arr.length<1){
    //             console.log('delete',this.defaultRowKey);
    //             data.splice(index,1)
    //         }
    //     }
    //     return item;
    // });
    onOpenSidebar=(id)=>{
        this.props.onOpenSidebar({"id":id});
    }
    onAddDepartment = () => {
        let {GetCodeRule, OpenModal} = this.props;
        GetCodeRule().then(json => {
            if (json.status === 2000) {
                OpenModal()
            }
        })
    }
    onChange = (e) => {
       // this.state={"conditions":[{"field":"dept_no","value":"","operation":1},{"field":"dept_name","value":"","operation":1}],"relations":"dept_no or dept_name"}

       if(e.target.value){
           this.setState({"conditions":[{"field":"dept_no","value":e.target.value,"operation":1},{"field":"dept_name","value":e.target.value,"operation":1}]});
       }else{
           this.setState({"conditions":[]});
       }
        
    }
    onSearch=()=>{
        this.props.initlist(this.state);
    }
    onPressEnter=(e)=>{
        this.props.initlist(this.state);
    }
    render(){
        let {side_visible,visible,onSearch,SearchVal,tabLoading,OpenModal,dataSource,defaultRowKey, tag, ...props}=this.props;
        this.loop(dataSource);
        // let defaultRowKey= dataSource[0]?dataSource[0].id:null;
        return(
            <div>
                <div className="department-head">
                    <Input
                        style={{ width: 200,height:32}}
                        placeholder="请输入组织名称／编号搜索"
                        onChange={this.onChange}
                        onPressEnter={this.onPressEnter}
                    />
                    <Button
                        style={localStyle.button}
                        onClick={this.onSearch}
                    >
                        <i className="c2mfont c2m-search1" style={localStyle.icon} />
                        <span>查询</span>
                    </Button> 
                    <Button type="primary" className="department-addBtn" onClick={this.onAddDepartment}><i className="c2mfont c2m-jia" style={{fontSize:12,margin:'0 4px 0 -4px'}}></i>新建</Button>
                </div>
                <div className="department-body" style={{textAlign:"center"}}>
                    <Spin spinning={tabLoading}>
                        {dataSource && dataSource.length 
                            ? <MTable
                                {...props}
                                dataSource={dataSource}
                                loading={tabLoading}
                                pagination={false}
                                cols={columns}
                                rowKey={"id"}
                                defaultExpandedRowKeys={defaultRowKey}
                            /> 
                            : null }
                    </Spin>
                </div>
            </div>
        )
    }
}

export default Department;
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