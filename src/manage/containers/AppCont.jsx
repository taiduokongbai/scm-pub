import React,{Component} from "react";
import {Layout} from '../../base/components/AntdComp';
import LayoutTopComp from '../components/LayoutTopComp'
import CompanyModelCont from './CompanyModelCont';
//import TabsCont from './TabsCont';
import LayoutSiderComp from '../components/LayoutSiderComp';
import TerraceRuleCont from './TerraceRuleCont';
import TenantCont from '../tenant/TenantComp';
//发布公告
import AnnounceComp from "../Announce/components/AnnounceComp";
//公告管理
import AnnouncementListComp from "../Announce/components/AnnouncementListComp";
const {Header, Content, Footer, Sider} = Layout;
import {announcementListStore} from "../Announce/store/AnnouncementListStore";  // 公告管理列表store
import PlatCategoryComp from "../PlatCategory/PlatCategoryComp";
let { observable, action, computed, runInAction, toJS } = mobx;
export default class AppCont extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            pageLoading:true,
            collapsed: false,
            mode: 'inline',
            key:'1'
        }
    }
    componentDidMount(){
       
        setTimeout(()=>{
            this.setState({
                pageLoading:false
            })
        },10);//延时1秒
        
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
           // key:'1',
        });
    }
    tabs=(key)=>{
        
        this.setState({key:key});
    }
    ToCont=()=>{

        switch(this.props.match.params.key){
            /*case "1":
            return <CompanyModelCont />*/
            case "2":
            return <TerraceRuleCont />
            /*case "3":
            return <TenantCont />*/
            case "4":
            return <AnnounceComp />
            case "5":
                runInAction(()=>{
                    announcementListStore.changeComp = false;
                })
            return <AnnouncementListComp />
            case "6":
            return <PlatCategoryComp />
            default:
             return   <TerraceRuleCont />
            
        }
    }
    render(){
        return (
            <div className="ew-layout">
                {
                    this.state.pageLoading?(<div className="page-loading">
                            <div className="animationload">
                                <div className="osahanloading"></div>
                            </div>
                        </div>):null
                }
                <Layout style={{ height: '100vh',overflow: 'hidden' ,background:'#fff'}}>
                    <Header className="ew-layout-header" style={{padding:'0 24px 0 36px' }}>
                         <LayoutTopComp />
                    </Header>
                    <Layout>
                        <Sider
                            width={160}
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                        >
                            <LayoutSiderComp mode={this.state.mode} tabs={this.tabs} {...this.props}/>
                        </Sider>
                        <Layout>
                            <Content id="ew-content" className="ew-layout-content" style={{ overflow: 'initial',zIndex:100,background:'#fff',padding:'0px 28px 0 20px' }}>
                                
                                {this.ToCont()}
                              
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

