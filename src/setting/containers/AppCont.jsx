import React,{Component} from "react";
import { Layout, Breadcrumb, Icon } from '../../base/components/AntdComp';;
const { Header, Content } = Layout;
import LayoutTop from '../../main/components/LayoutTopComp';

export default class AppCont extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            pageLoading:true,
            collapsed: false,
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                pageLoading:false
            })
        },10);
    }
    render(){
        return (
            <div className="ew-layout-setting">
                {
                    this.state.pageLoading?(<div className="page-loading">
                            <div className="animationload">
                                <div className="osahanloading"></div>
                            </div>
                        </div>):null
                }
                <Layout className="ew-layout-full-page">
                    <div className="ew-layout-header">
                        <LayoutTop />
                    </div>
                    <Layout className="full-page">
                        <Content>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

