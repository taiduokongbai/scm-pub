import React,{Component} from "react";
import {Form,Button,Input, Select,Tooltip ,Tabs, DatePicker,Timeline,Row,Col,Popconfirm,Spin,Icon,message} from "../../base/components/AntdComp";
import MTable from "../../base/components/TableComp";
import ModalComp from "../../base/components/ModalComp"
import FormComp from "../../base/components/FormComp";
import {OAReadItemComp} from "../components/OAFormItemComp"
const Option = Select.Option;
const FormItem = Form.Item;
const bytesToSize=(bytes)=> {
    if (bytes === 0) return '0 B';
    let k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
 
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
const Enum = {
    0:"事假",
    1:"病假",
    2:"年假",
    3:"调休",
    4:"婚假",
    5:"产假",
    6:"丧假",
    7:"哺乳假",
    8:"陪产假",
    9:"其他"
}
class Avatar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {src,children,size} = this.props;
        let isSrc = src && src.length>0;
        let imgCls = isSrc?"ant-avatar-icon ant-avatar-image":"";
        let avatarSize = size == "large"?"ant-avatar-lg":""
        return (
            <span className={`ant-avatar ant-avatar-circle ${avatarSize} ${imgCls} `}>
                {
                    isSrc?
                    <img src={src} />
                    :
                    <span className="ant-avatar-string">
                        {children}
                    </span>
                }
            </span>
        )
    }
}
class _ApproveDetailOpinion extends Component{
    constructor(props){
        super(props);
    }
    handleSubmit = (e) => {
        let newData = {};
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                newData.applyId = this.props.applyId;
                newData.type = this.props.type;
                if(newData.type == 1)
                    newData.opinion = data.agreeOpinion;
                else if(newData.type == 2)
                    newData.opinion = data.rejectOpinion;
                else if(newData.type == 3)
                    newData.employeeCode = data.employeeCode;
                this.props.submitOpinion(newData);
            }
        });
    }
    getOpinionComp=()=>{
        const {type ,form} = this.props;
        const { getFieldDecorator } = form;
        let Element;
        switch (type) {
            case 1:
                Element = (
                    <FormItem>
                        {getFieldDecorator('agreeOpinion', {
                            initialValue:"同意审批",
                            rules: [{
                                required: true, 
                                message: '请输入同意意见' 
                            },{
                                max: 200, 
                                message: '同意意见只能在200字符以内！' 
                            }],
                        })(
                            <Input type="textarea" placeholder="请输入同意意见" autosize={{ minRows: 3, maxRows: 6 }} />
                        )}
                    </FormItem>
                )
                break;
            case 2:
                Element = (
                    <FormItem>
                        {getFieldDecorator('rejectOpinion', {
                            rules: [{
                                required: true, 
                                message: '请输入驳回理由' 
                            },{
                                max: 200, 
                                message: '驳回理由只能在200字符以内！' 
                            }],
                        })(
                            <Input type="textarea" placeholder="请填写驳回理由！" autosize={{ minRows: 3, maxRows: 6 }} />
                        )}
                    </FormItem>
                )
                break;
            case 3:
                Element = (
                    <FormItem>
                        {getFieldDecorator('employeeCode', {
                             rules: [{
                                required: true, 
                                message: '请选择加签人' 
                            }]
                        })(
                        <Select 
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            placeholder="请选择加签人" 
                            style={{ width: '100%' }}
                        >
                            {
                                this.props.employeesList.map((item)=>{
                                    return (
                                        <Option value={item.empCode}>{item.empName}</Option>
                                    )
                                })
                            }
                        </Select>
                        )}
                    </FormItem>
                )
                break;
        }
        return Element;
    }
    render(){
        const {type} = this.props;
        return (
            <Form onSubmit={this.handleSubmit} className="opinion-form">
                {this.getOpinionComp()}
                <FormItem className="approve-detail-opinion-btns">
                    <Button size="default" onClick={this.props.handleReset}>取消</Button>
                    <Button size="default" style={{ marginLeft: 8 }} type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        )
    }
}
const ApproveDetailOpinion = Form.create()(_ApproveDetailOpinion);

class ExpenseDetailComp extends ModalComp {
    constructor(props, context) {
        super(props, context);
            this.columns = [{
                title:"行号",
                key:"lineNum",
                dataIndex:"lineNum"
            },{
                title:"费用项目",
                key:"expenseName",
                dataIndex:"expenseName"
            },{
                title:"费用描述",
                key:"expenseDetl",
                dataIndex:"expenseDetl"
            },{
                title:"费用金额",
                key:"amount",
                dataIndex:"amount"
            }];
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
    }
    getComp = () => {
        return (
            <div>
                <MTable
                    cols={this.columns}
                    loading={false}
                    pagination={false}
                    dataSource={this.props.dataSource}
                    rowKey={"lineNum"}
                />
            </div>
        )
    }
}
ExpenseDetailComp.defaultProps={
    title: '费用明细',
    width: 600,
    className: "expenseDetail-modal",
    maskClosable: true,
    footer:null
}
class OrderDetailComp extends ModalComp {
    constructor(props, context) {
        super(props, context);
        this.state ={
            expenseDetailVisible:false,
            expenseDetail:[]
        }
        if(this.props.type== 6){
            this.columns = [{
                title:"行号",
                key:"id",
                dataIndex:"id"
            },{
                title:"物料编码",
                key:"materialCode",
                dataIndex:"materialCode"
            },{
                title:"物料名称",
                key:"materialName",
                dataIndex:"materialName"
            },{
                title:"规格",
                key:"specification",
                dataIndex:"specification"
            },{
                title:"型号",
                key:"model",
                dataIndex:"model"
            },{
                title:"材料",
                key:"materialTexture",
                dataIndex:"materialTexture"
            },{
                title:"代号",
                key:"materialCodeName",
                dataIndex:"materialCodeName"
            },{
                title:"销售数量",
                key:"materialNum",
                dataIndex:"materialNum"
            },{
                title:"单位",
                key:"unitOfMeasurementName",
                dataIndex:"unitOfMeasurementName"
            },{
                title:"计价数量",
                key:"valuationQty",
                dataIndex:"valuationQty"
            },{
                title:"计价单位",
                key:"chargeUnitName",
                dataIndex:"chargeUnitName"
            },{
                title:"单价",
                key:"unitPrice",
                dataIndex:"unitPrice"
            },{
                title:"税率",
                key:"taxRate",
                dataIndex:"taxRate",
                render: (text, record, index) => (
                    <span>{text!==""?`${text}%`:""}</span>
                )
            },{
                title:"金额",
                key:"amount",
                dataIndex:"amount"
            },{
                title:"税额",
                key:"tax",
                dataIndex:"tax"
            },{
                title:"价税合计",
                key:"totalAmount",
                dataIndex:"totalAmount"
            },{
                title:"赠品",
                key:"isDonation",
                dataIndex:"isDonation"
            },{
                title:"备注",
                key:"remark",
                dataIndex:"remark"
            }];
        }else if(this.props.type== 7){
            this.columns = [{
                title:"行号",
                key:"line",
                dataIndex:"line"
            },{
                title:"物料编号",
                key:"materialCode",
                dataIndex:"materialCode"
            },{
                title:"物料名称",
                key:"materialName",
                dataIndex:"materialName"
            },{
                title:"规格",
                key:"materialSpec",
                dataIndex:"materialSpec"
            },{
                title:"型号",
                key:"materialModel",
                dataIndex:"materialModel"
            },{
                title:"材料",
                key:"materialQuality",
                dataIndex:"materialQuality"
            },{
                title:"代号",
                key:"standardCode",
                dataIndex:"standardCode"
            },{
                title:"订单数量",
                key:"orderQty",
                dataIndex:"orderQty"
            },{
                title:"单位",
                key:"purchaseUnitName",
                dataIndex:"purchaseUnitName"
            },{
                title:"计价数量",
                key:"priceQty",
                dataIndex:"priceQty"
            },{
                title:"计价单位",
                key:"priceUnitDetl",
                dataIndex:"priceUnitDetl"
            },{
                title:"单价(含税)",
                key:"price",
                dataIndex:"price"
            },{
                title:"税率",
                key:"taxRate",
                dataIndex:"taxRate",
                render: (text, record, index) => (
                    <span>{text!==""?`${text}%`:""}</span>
                )
            },{
                title:"金额",
                key:"netAmount",
                dataIndex:"netAmount"
            },{
                title:"税额",
                key:"taxAmount",
                dataIndex:"taxAmount"
            },{
                title:"价税合计",
                key:"totalAmount",
                dataIndex:"totalAmount"
            },{
                title:"附加费",
                key:"expenseAmount",
                dataIndex:"expenseAmount",
                render: (text, record, index) => (
                    <span>
                      <a href="#" onClick={()=>this.openExpenseDetail(record.expenseDetailList)}>{text}</a>
                    </span>
                )
            },{
                title:"备注",
                key:"remark",
                dataIndex:"remark"
            }];
        }else if(this.props.type== 8){
            this.columns = [{
                title:"行号",
                key:"lineNumber",
                dataIndex:"lineNumber"
            },{
                title:"物料编号",
                key:"materialCode",
                dataIndex:"materialCode"
            },{
                title:"物料名称",
                key:"materialName",
                dataIndex:"materialName"
            },{
                title:"规格",
                key:"materialSpec",
                dataIndex:"materialSpec"
            },{
                title:"型号",
                key:"materialModel",
                dataIndex:"materialModel"
            },{
                title:"批量价格",
                key:"batchPrice",
                dataIndex:"batchPrice"
            },{
                title:"税率",
                key:"taxRate",
                dataIndex:"taxRate",
                render: (text, record, index) => (
                    <span>{text!==""?`${text}%`:""}</span>
                )
            },{
                title:"批量价格(含税)",
                key:"totalAmount",
                dataIndex:"totalAmount"
            },{
                title:"数量",
                key:"materialQty",
                dataIndex:"materialQty"
            },{
                title:"单位",
                key:"materialUnitName",
                dataIndex:"materialUnitName"
            }];
        }
    }
    openExpenseDetail = (expenseDetailList = []) => {
        this.setState({
            expenseDetailVisible:true,
            expenseDetail:expenseDetailList.concat([])
        })
    }
    showExpenseDetail = (isShow=true) =>{
        this.setState({
            expenseDetailVisible:isShow
        })
    }
    getExpenseDetail = (orderDetail=null,formType) =>{
        const {expenseDetailVisible,expenseDetail} = this.state;
        return (
            expenseDetailVisible?
            <ExpenseDetailComp
                loading={false}
                visible={expenseDetailVisible}
                dataSource={expenseDetail}
                handleCancel={()=>this.showExpenseDetail(false)}
            />:null
        )
    }
    getComp = () => {
        return (
            <div>
                <MTable
                    cols={this.columns}
                    loading={false}
                    pagination={false}
                    dataSource={this.props.dataSource}
                    rowKey={ this.columns ? this.columns[0].key:"key"}
                />
                {
                    this.getExpenseDetail()
                }
            </div>
        )
    }
}
OrderDetailComp.defaultProps={
    title: '明细信息',
    width: 1100,
    className: "orderdetail-modal",
    maskClosable: true,
    footer:null
}
class ApproveDetailComp extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:null,
            btnLoading:false,
            opinionType:0,
            orderDetailVisible:false
        }
    }
    componentDidMount() {
        const {wfsId} = this.props;
        this.props.loadApproveDetail({wfsId}).then((data)=>{
            this.setState({data},()=>{
                this.setFormValue();
            });
        });
    }
    setFormValue = (e) =>{
        const {form} = this.props;
        const {data} = this.state;
        let detailVal = JSON.parse(data.detail);
        const getCopyListComp = (copyList) =>{
            return (<div>
                    <Row type="flex" justify="space-around" align="top">
                    {
                        copyList?copyList.map((d,i)=>{
                            const _profile = d.profile == null?"":d.profile;
                            const _employeeName = d.name == null?"":d.name;
                            const _profileName = _employeeName.length>2?_employeeName.substring(1,_employeeName.length):_employeeName;
                            return (
                                <Col key={i} span={24/copyList.length}>
                                    <div className="person-avatar">
                                        {
                                            _profile!=""?
                                            <Avatar src={_profile} />
                                            :
                                            <Avatar>{_profileName}</Avatar>
                                        }
                                    </div>
                                    <div className="person-info"> 
                                        <span className="person-name">{_employeeName}</span>
                                    </div>
                                </Col>
                            )
                        }):null
                    }
                    </Row>
            </div>)
        }
        const getPhoneListComp = (phoneList) =>{
            return (<div>
                    {
                        phoneList?phoneList.map((d,i)=>{
                            return (
                                <div className="preview-tag ant-tag" onClick={()=>{window.open(d.path); }}>
                                    <span className="ant-tag-text">{d.name}({bytesToSize(d.size)})</span>
                                </div>
                            )
                        }):null
                    }
            </div>)
        }
        if(detailVal){
            // if(data.form.formType == 1){
            //     form.setFieldsValue({
            //         table:detailVal.items.map((ite,index)=>{
            //             return {
            //                 ...ite,
            //                 key:index,
            //             }
            //         }).concat([{
            //             key:"totalInterval",
            //             beginTime:"",
            //             endTime:"",
            //             interval:`合计：${detailVal.totalInterval}`,
            //             reason:""
            //         }])
            //     });
            // } else if(data.form.formType == 2){
            //     form.setFieldsValue({
            //         reason:detailVal.reason,
            //         table:detailVal.items.map((ite,index)=>{
            //             return {
            //                 ...ite,
            //                 key:index,
            //                 leaveType:Enum[ite.leaveType],
            //             }
            //         }).concat([{
            //             key:"totalInterval",
            //             beginTime:"",
            //             endTime:"",
            //             interval:`合计：${detailVal.totalInterval}`,
            //             leaveType:""
            //         }])
            //     });
            // } else if(data.form.formType == 3){
            //     form.setFieldsValue({
            //         destination:detailVal.destination,
            //         beginTime:detailVal.beginTime,
            //         endTime:detailVal.endTime,
            //         expense:detailVal.expense,
            //         interval:detailVal.interval,
            //         reason:detailVal.reason
            //     });
            // } else if(data.form.formType == 4){
            //     form.setFieldsValue({
            //         time:detailVal.time,
            //         reason:detailVal.reason
            //     });
            // } else if(data.form.formType == 5){  //生产
            //     form.setFieldsValue({
            //         orderType:detailVal.orderType,
            //         sourceCode:detailVal.sourceCode,
            //         bom:detailVal.bom,
            //         outNumber:detailVal.outNumber,
            //         plannedStartDate:detailVal.plannedStartDate,
            //         orderSource:detailVal.orderSource,
            //         productNo:detailVal.productNo,
            //         processFlowCode:detailVal.processFlowCode,
            //         productionOrgName:detailVal.productionOrgName,
            //         plannedEndDate:detailVal.plannedEndDate,
            //         orderStatus:detailVal.orderStatus,
            //         priority:detailVal.priority,
            //         productionStatus:detailVal.productionStatus,
            //         presetDepotName:detailVal.presetDepotName,
            //         presetStorageDate:detailVal.presetStorageDate,
            //         actualDepotName:detailVal.actualDepotName,
            //         actualStorageDate:detailVal.actualStorageDate,
            //         presetPositionName:detailVal.presetPositionName,
            //         actualPositionName:detailVal.actualPositionName,
            //         planOutNumber:detailVal.planOutNumber,
            //         outstandingNumber:detailVal.outstandingNumber,
            //         startNumber:detailVal.startNumber,
            //         endNumber:detailVal.endNumber,
            //         remarks:detailVal.remarks
            //     });
            // } else 
            if(data.form.formType == 6){  //销售
                form.setFieldsValue({
                    customerName:detailVal.customerName,
                    saleOrgName:detailVal.saleOrgName,
                    contractCode:detailVal.contractCode,
                    salesmanName:detailVal.salesmanName,
                    receiveAddressName:detailVal.receiveAddressName,
                    receiveAddressDetails:detailVal.receiveAddressDetails,
                    contactsPerson:detailVal.contactsPerson,
                    collectionTermsName:detailVal.collectionTermsName,
                    amount:detailVal.amount,
                    planDelivery:detailVal.planDelivery,
                    invoiceTypeName:detailVal.invoiceTypeName,
                    tax:detailVal.tax,
                    currencyName:detailVal.currencyName,
                    totalAmount:detailVal.totalAmount,
                    remark:detailVal.remark
                });
            } else if(data.form.formType == 7){  //采购
                form.setFieldsValue({
                    supplierName:detailVal.supplierName,
                    deptName:detailVal.deptName,
                    deliveryAddressDetl:detailVal.deliveryAddressDetl,
                    empName:detailVal.empName,
                    siteName:detailVal.siteName,
                    planReceiveDate:detailVal.planReceiveDate,
                    receiveAddressDetl:detailVal.receiveAddressDetl,
                    receiverName:detailVal.receiverName,
                    paymentTermName:detailVal.paymentTermName,
                    netAmount:detailVal.netAmount,
                    invoiceTypeName:detailVal.invoiceTypeName,
                    taxAmount:detailVal.taxAmount,
                    paymentMethodName:detailVal.paymentMethodName,
                    totalAmount:detailVal.totalAmount,
                    remark:detailVal.remark
                });
            } else if(data.form.formType == 8){  //采购价格清单
                form.setFieldsValue({
                    orderCode:detailVal.orderCode,
                    priceName:detailVal.priceName,
                    startTime:detailVal.startTime,
                    endTime:detailVal.endTime,
                    currencyName:detailVal.currencyName,
                    includeTaxFlag:(detailVal.includeTaxFlag==1?"是":"否")+" （默认17%）",
                    supplierCode:detailVal.supplierCode,
                    supplierName:detailVal.supplierName,
                    remark:detailVal.remark,
                    contractList:detailVal.contractList
                });
            }
            // if(data.form.formType <5){
            //     form.setFieldsValue({
            //         copyList:getCopyListComp(detailVal.copyList),
            //         photoList:getPhoneListComp(detailVal.photoList),
            //         attachList:getAttachListComp(detailVal.attachList)
            //     })
            // }
        }
    }
    setOpinionType = (opinionType) =>{
        this.setState({opinionType});
    }
    approveInvalid = (wfsId) =>{
        this.setState({
            btnLoading:true
        });
        return this.props.approveInvalid(wfsId).then((isok)=>{
            this.setState({
                btnLoading:false
            });
            return isok;
        })
    }
    showOrderDetail = (isShow=true) =>{
        this.setState({
            orderDetailVisible:isShow
        })
    }
    getOrderDetail = (orderDetail=null,formType) =>{
        const {orderDetailVisible} = this.state;
        return (
            orderDetailVisible?
            <OrderDetailComp
                loading={false}
                visible={orderDetailVisible}
                dataSource={orderDetail}
                handleCancel={()=>this.showOrderDetail(false)}
                type={formType}
            />:null
        )
    }
    render(){
        const { form,sidebarLoading,isBtn,approveType } = this.props;
        let data = {},formContent,timelines,formHeadData,formDetail,antColNum;
        if(this.state.data!=null){
            data = this.state.data;
            formContent = data.form? JSON.parse(data.form.webFormContent):null;
            formDetail = data.detail? JSON.parse(data.detail):null;
            timelines = data.approvalProcess.map((item,index)=>{
                return (
                    <Timeline.Item key={index}>
                        <Row type="flex" justify="center" align="top">
                            <Col span={4}><h4 className="lg-font">{item.title}：</h4></Col>
                            <Col span={20} style={{marginTop: '-8px'}}>
                                {
                                    item.approvalPerson.map((d,i)=>{
                                        let _profile = d.profile == null?"":d.profile;
                                        let _employeeName = d.employeeName == null?"":d.employeeName;
                                        let _profileName = _employeeName.length>2?_employeeName.substring(1,_employeeName.length):_employeeName;
                                        let _positionName = d.positionName || "-";
                                        return (
                                            <Row key={i} className="person-row" type="flex" justify="space-around" align="top">
                                                <Col span={14}>
                                                    <div className="person-avatar">
                                                        {
                                                            _profile!=""?
                                                            <Avatar src={_profile} />
                                                            :
                                                            <Avatar>{_profileName}</Avatar>
                                                        }
                                                    </div>
                                                    <div className="person-info"> 
                                                        <p><span className="person-name">{_employeeName}-{_positionName}</span></p>
                                                        <p>{item.status == 0?"审批中":""}</p>
                                                        <p>{d.remark}</p>
                                                    </div>
                                                </Col>
                                                <Col span={8} offset={2} style={{textAlign:'right'}}>{d.time}</Col>
                                            </Row>
                                        )
                                    })
                                }
                                
                            </Col>
                        </Row>
                    </Timeline.Item>
                )
            });
            const detailClass = !isBtn?'approve-detail-head-nobtn':'';
            const _profile = data.head.profile == null?"":data.head.profile;
            const _employeeName = data.head.employeeName == null?"":data.head.employeeName;
            const _profileName = _employeeName.length>2?_employeeName.substring(1,_employeeName.length):_employeeName;
            const _deptName = data.head.deptName || "-";
            const _positionName = data.head.positionName || "-";
            if(formContent.head){
                let updateDetail = (headData) =>{
                    for (var item of headData) {
                        item.value = formDetail[item.key];
                    }
                    return headData;
                }
                formHeadData = updateDetail(formContent.head);
                antColNum = formHeadData.length == 3?8:6
            }
            return (
                <Spin spinning={sidebarLoading} tip="Loading...">
                <div className="approve-detail">
                    <div className={`approve-detail-head ${detailClass}`}>
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={approveType == 0?12:24}><h3 className="lg-font">{data.form.formName}（{data.head.orderNo}）</h3></Col>
                            {
                                approveType == 0?
                                <Col span={12} style={{textAlign:'right'}}>
                                    <Button className="btn-back" loading={this.state.btnLoading} type="primary" onClick={()=>this.setOpinionType(1)}>同意</Button>
                                    <Button className="btn-back"style={{ marginLeft: 8 }} type="primary" onClick={()=>this.setOpinionType(2)}>驳回</Button>
                                    <Button className="btn-back" style={{ marginLeft: 8 }} type="primary" onClick={()=>this.setOpinionType(3)}>加签</Button>
                                </Col>:null
                            }
                        </Row>
                        <a className="approve-detail-close" onClick={this.props.closeSidebar}><Icon type="close" /></a>
                    </div>
                    <div className="approve-detail-opinion">
                        {
                            this.state.opinionType > 0?
                            <ApproveDetailOpinion 
                                type={this.state.opinionType}
                                handleReset={()=>this.setOpinionType(0)}
                                {...this.props}
                            />
                            :null
                        }
                    </div>
                    <hr className="approve-detail-line" />
                    {
                        formHeadData.length>0?
                        <div className="approve-detail-top">
                            <div className="ant-row">
                                {
                                    formHeadData.map((item,index)=>{
                                        if(index == 0)
                                            antColNum += 1;
                                        else if(index == formHeadData.length-1)
                                            antColNum -= 1;
                                        else 
                                            antColNum = formHeadData.length == 3?8:6;
                                        antColNum = formHeadData.length == 2?12:antColNum;
                                        return (<div className={`ant-col-${antColNum}`} key={index}><label>{item.label}：</label><span>{item.value}</span></div>)
                                    })
                                }
                            </div>
                        </div>
                        :null
                    }
                    <div className="approve-detail-proposer">
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={14}>
                                {
                                    _profile!=""?
                                    <Avatar size="large" src={_profile} />
                                    :
                                    <Avatar size="large">{_profileName}</Avatar>
                                }
                                <span className="proposer-name"><span>{_employeeName}</span> <span>({_deptName}/{_positionName})</span></span></Col>
                            <Col span={8} offset={2} style={{textAlign:'right'}}>申请时间：{data.head.applyDate}</Col>
                        </Row>
                    </div>
                    
                    <div className="approve-detail-form">
                        <Form className="oa-preview-form">
                            {formContent!=null?<OAReadItemComp data={formContent.items} form={form} />:null}
                            {
                                formDetail.purchaseDetailList?
                                <div className="orderdetail-row">
                                    <a href="#" onClick={()=>this.showOrderDetail()}>查看明细信息</a>
                                    {this.getOrderDetail(formDetail.purchaseDetailList,data.form.formType)}
                                </div>:null
                            }
                            {
                                formDetail.priceDetailList?
                                <div className="orderdetail-row">
                                    <a href="#" onClick={()=>this.showOrderDetail()}>查看价格明细</a>
                                    {this.getOrderDetail(formDetail.priceDetailList,data.form.formType)}
                                </div>:null
                            }
                            {
                                formDetail.detailList?
                                <div className="orderdetail-row">
                                    <a href="#" onClick={()=>this.showOrderDetail()}>查看明细信息</a>
                                    {this.getOrderDetail(formDetail.detailList,data.form.formType)}
                                </div>:null
                            }
                            <div className="oa-preview">
                                <div className="oa-row-title"><span>审批信息</span></div>
                                <div className="approve-detail-timeline">
                                    <Timeline>
                                        {timelines}
                                    </Timeline>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                
                </Spin>
            )
        }else{
            return null
        }
    }
}
export default Form.create()(ApproveDetailComp);