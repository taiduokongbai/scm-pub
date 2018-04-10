import React from 'react';
import { Form, Icon, Button, Modal, Layout, Row, Col, Popconfirm, message } from '../../base/components/AntdComp'

class DepartmentDetailComp extends React.Component{
    constructor(props,context){
        super(props,context);
        this.pids=[];
        this.p=[];
        this.addDetail="";
    }

    // componentWillMount(){
    //     this.props.getdetail();
        
    // }

    onEditDepartment=()=>{
        this.props.onEditDepartment(this.props.detail.id);
    }

    onSetup=(deptCode,status)=>{
        this.props.onsetup(deptCode,status).then(json=>{
            if (json.status === 2000) {
                if (status == 1) {
                    message.success('启用成功');
                } else {
                    message.success('停用成功');
                }
                
                this.props.getdetail(this.props.detail.id);
                this.props.tablePaging();
                // console.log('修改职务成功!');
            } else {
                this.props.sideLoading(false);
                this.props.SidebarVisiable(false);
            };
        });
    }

    SidebarVisiable=(tag)=>{
        this.props.SidebarVisiable(tag)
    }

    pDisable=()=>{
        this.pids=[],this.p=[];
        let {detail,dataSource}=this.props;
        let loop=(data)=>data.map((item) => {
            if(detail.id==item.id){
                this.p=item.deptPids.split(",");
            }
            if (item.children) loop(item.children);
            return item;
        });
        let find=(data)=>data.map((item) => {
            if(this.p.indexOf(item.deptCode)>-1&&item.status=='2'){
                this.pids.push(item.deptCode);
            }
            if (item.children) find(item.children);
            return item;
        });
        loop(dataSource);
        if(this.p.length>0){
            find(dataSource);
        }
    }

    // getAddDetail=(addrCode)=>{
    //     this.props.getAddDetail({"addressCode":addrCode}).then(json=>{
    //         this.addDetail=json.data.list[0]?json.data.list[0].addressDetl:"";
    //     });
    // }

    render(){
        let {detail,dataSource,detailAddressName}=this.props;
        this.pDisable();
        //this.getAddDetail(detail.addrCode);
        // let loop = (data,status) => data.map((item) => {
        //     if(detail.id==item.id){
        //         let pids=Array.of(item.deptPids);
        //         if(pids){}
        //         item.pstatus= status;
        //     }
        //     if (item.children) loop(item.children,item.status);
        //     return item;
        // });
        // console.log('dataSource',loop(dataSource));
        //let newDetail=loop(detail);
        //console.log('pstatus',loop(detail));
        return(
            <div className="deptSidebar" >
                        <div className="sidebox" >
                            <div className="sidetitle" >
                                <Row className="sidebutton" >
                                    <Col span={24} >
                                        {detail.status=='2'?null:<Button type="primary" style={{background:'#4c80cf',width:70,height:28}} onClick={()=>{this.onEditDepartment()}} ><i className="c2mfont c2m-bianji1" style={{fontSize:14,margin:'0 4px 0 -4px'}}></i>编辑</Button>}
                                        <Popconfirm title={
                                                <div>
                                                    <h5>确认要{detail.status=='2'?'启用':'停用'}该组织吗?</h5>
                                                    {
                                                        this.pids.length>0?
                                                        <p>若上级组织目前处于停用状态，<br/>将一同被启用</p>
                                                        :null
                                                    }
                                                </div>
                                            } 
                                            onConfirm={()=>{this.onSetup(detail.deptCode, detail.status=='1'?2:1)}}
                                            okText="确定"
                                            cancelText="取消"
                                            >
                                            <Button type="primary" style={{background:'#4c80cf',width:70,height:28,margin:'0 12px 0 10px'}}><i className={detail.status=='2'?"c2mfont c2m-qiyongcopy":"c2mfont c2m-jinyong2"} style={{fontSize:14,marginRight:4}}></i>{detail.status=='2'?'启用':'停用'}</Button>
                                        </Popconfirm>
                                        <div className="xicon" onClick={()=>{this.SidebarVisiable(false)}} >X</div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="side-Center">
                            <Row>
                                <Col style={{color:'#4a4a4a',fontSize:'14px',fontWeight:'bold',fontFamily:'PingFangSC-Semibold'}}>{detail.deptName}({detail.deptNo})</Col>
                            </Row>
                            <Row style={{marginBottom:'22px'}}>
                                <Col>{detail.deptLevel===undefined?'':window.ENUM.getEnum("level", detail.deptLevel+'')} | {detail.deptNum} | {detail.deptMgrName}</Col>
                            </Row>
                            <div className="side-Center-box">
                                <ul>
                                    <li>
                                        <span>是否为库存组织：</span>
                                        {detail.isOpt===undefined?<b></b>:<b>　<i className={detail.isOpt==1?"c2mfont c2m-fou":"c2mfont c2m-shi"} style={{fontSize:14,margin:'0 4px 0 -4px',color:detail.isOpt==1?"#fc3159":"#7ed321"}}></i> {window.ENUM.getEnum("deptBool", detail.isOpt+'')}</b>}
                                    </li>
                                    <li>
                                        <span>是否为采购组织：</span>
                                        {detail.isPurchase===undefined?<b></b>:<b>　<i className={detail.isPurchase==1?"c2mfont c2m-fou":"c2mfont c2m-shi"} style={{fontSize:14,margin:'0 4px 0 -4px',color:detail.isPurchase==1?"#fc3159":"#7ed321"}}></i> {window.ENUM.getEnum("deptBool", detail.isPurchase+'')}</b>}
                                    </li>
                                    <li>
                                        <span>是否为销售组织：</span>
                                        {detail.isSell===undefined?<b></b>:<b>　<i className={detail.isSell==1?"c2mfont c2m-fou":"c2mfont c2m-shi"} style={{fontSize:14,margin:'0 4px 0 -4px',color:detail.isSell==1?"#fc3159":"#7ed321"}}></i> {window.ENUM.getEnum("deptBool", detail.isSell+'')}</b>}
                                    </li>
                                    <li>
                                        <span>是否为财务组织：</span>
                                        {detail.isFinance===undefined?<b></b>:<b>　<i className={detail.isFinance==1?"c2mfont c2m-fou":"c2mfont c2m-shi"} style={{fontSize:14,margin:'0 4px 0 -4px',color:detail.isFinance==1?"#fc3159":"#7ed321"}}></i> {window.ENUM.getEnum("deptBool", detail.isFinance+'')}</b>}
                                    </li>
                                     <li>
                                        <span>是否为生产组织：</span>
                                        {detail.isProduct===undefined?<b></b>:<b>　<i className={detail.isProduct==1?"c2mfont c2m-fou":"c2mfont c2m-shi"} style={{fontSize:14,margin:'0 4px 0 -4px',color:detail.isProduct==1?"#fc3159":"#7ed321"}}></i> {window.ENUM.getEnum("deptBool", detail.isProduct+'')}</b>}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="side-Line" >
                        </div>
                        <div className="side-Bottom" >
                            <ol>
                                <li>
                                    <span>上级组织：</span>
                                    <b> {detail.pDeptName}</b>
                                </li>
                                {/*<li>
                                    <span>组织简称：</span>
                                    <b> {detail.deptAlias}</b>
                                </li>
                                <li>
                                    <span>组织全称：</span>
                                    <b> {detail.deptAll}</b>
                                </li>
                                <li>
                                    <span>英文名称：</span>
                                    <b> {detail.deptEng}</b>
                                </li>*/}
                                 <li>
                                    <span>联系电话：</span>
                                    <b> {detail.deptPhone}</b>
                                </li>
                                 <li>
                                    <span>地址：</span>
                                    <b> {detailAddressName}</b>
                                </li>
                            </ol>
                        </div>
                    </div>
        )
    }

}

export default DepartmentDetailComp