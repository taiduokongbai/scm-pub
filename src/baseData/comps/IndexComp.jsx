import React, {Component, PropTypes} from 'react';
import TabsAct from '../actions/TabsAct';
import { store } from '../../main/data/StoreConfig';
import { baseDataStore } from '../stores/BaseDataStore';
 class IndexComp extends Component {
     openTab = (title,key) => {
         store.dispatch(TabsAct.TabAdd({title:title,key:key}));
     }
    render() {
        return (
            <div className="main-entry">
            <div className="icon-wrap "><i className="icon c2mfont c2m-minzu" onClick={()=>this.openTab('民族','minzu')}></i><br/><span>民族</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-xingbie" onClick={()=>this.openTab('性别','xingbie')}></i><br/><span>性别</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-yuyan" onClick={()=>this.openTab('语言','yuyan')}></i><br/><span>语言</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-hunyinzhuangkuang" onClick={()=>this.openTab('婚姻状况','hunyin')}></i><br/><span>婚姻状况</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-zhengjianleixing" onClick={()=>this.openTab('证件类型','zhengjian')}></i><br/><span>证件类型</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-renzhileixing" onClick={()=>this.openTab('任职类型','renzhi')}></i><br/><span>任职类型</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-xiexing" onClick={()=>this.openTab('血型','xuexing')}></i><br/><span>血型</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-zaizhizhuangtai" onClick={()=>this.openTab('在职状态','zaizhi')}></i><br/><span>在职状态</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-xueli" onClick={()=>this.openTab('学历','xueli')}></i><br/><span>学历</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-hangye" onClick={()=>this.openTab('行业','hangye')}></i><br/><span>行业</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-gongsiguimo" onClick={()=>this.openTab('公司规模','companysize')}></i><br/><span>公司规模</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-gongsileibie" onClick={()=>this.openTab('公司类别','companynature')}></i><br/><span>公司类别</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-gongsixingzhi" onClick={()=>this.openTab('公司性质','companycategory')}></i><br/><span>公司性质</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-jingyingleixing" onClick={()=>this.openTab('经营类型','managementtype')}></i><br/><span>经营类型</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-guojiapitchon" onClick={()=>this.openTab('国家','country')}></i><br/><span>国家</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-shengfen" onClick={()=>this.openTab('省份','province')}></i><br/><span>省份</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-chengshi" onClick={()=>this.openTab('城市','city')}></i><br/><span>城市</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-quxian" onClick={()=>this.openTab('区县','county')}></i><br/><span>区县</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-kucunzhuangtai" onClick={()=>this.openTab('库存状态','inventorystatus')}></i><br/><span>库存状态</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-fapiaoleixing" onClick={()=>this.openTab('发票类型','invoicetype')}></i><br/><span>发票类型</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-zhifutiaokuan" onClick={()=>this.openTab('支付条款','zhifu')}></i><br/><span>支付条款</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-shoufukuantiaojian" onClick={()=>this.openTab('收付款条件','shoufu')}></i><br/><span>收付款条件</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-jiesuanfangshi" onClick={()=>this.openTab('结算方式','accountmethod')}></i><br/><span>结算方式</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-peisongfangshi" onClick={()=>this.openTab('配送方式','deliverymethod')}></i><br/><span>配送方式</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-jijiayuansu" onClick={()=>this.openTab('计价元素','valuation')}></i><br/><span>计价元素</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-bizhong" onClick={()=>this.openTab('币种','currency')}></i><br/><span>币种</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-yewuleixing" onClick={()=>this.openTab('交易单据类型','businesstype')}></i><br/><span>交易单据类型</span></div>
            <div className="icon-wrap "><i className="icon c2mfont c2m-jiliangdanwei" onClick={()=>this.openTab('计量单位','meterage')}></i><br/><span>计量单位</span></div>
            </div>
        );
    }
}
export default IndexComp;