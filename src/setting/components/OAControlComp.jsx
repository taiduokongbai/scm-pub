import React, { Component, PropTypes } from "react";
import {Table ,Icon , InputNumber, Input, DatePicker,TimePicker, Button, Select,Checkbox,Radio,Row,Col} from 'antd';
import { shouldComponentUpdate, debounce } from '../../base/consts/Utils';
import moment from 'moment';
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;
class OARow extends Component {
    constructor(props,context) {
        super(props,context);
    }    
    render() {
        return (
            <Row>
                {this.props.children}
            </Row>
        )
    }
}
class OAColumn extends Component {
    constructor(props,context) {
        super(props,context);
    }    
    render() {
        return (
            <Col {...this.props}>
                {this.props.children}
            </Col>
        )
    }
}
class OAComponent extends Component {
    constructor(props,context) {
        super(props,context);
    }    
    render() {
        return (<div></div>)
    }
}
class OAInput extends OAComponent{
        constructor(props) {
        super(props);
    }
    handleChange = (e) => {
        const { value } = e.target;
        this.triggerChange(value);
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    render() {
        const {value} = this.props;
        return (
            <Input 
                {...this.props}
                value={value}
                onChange={this.handleChange}
            />
        )
    }
}
OAInput.defaultProps = {
    size: "large",
}
class OATextArea extends OAComponent{
    constructor(props,context) {
        super(props,context);
    }
    render() {
        return (<OAInput {...this.props} />)
    }
}
OATextArea.defaultProps = {
    type:"textarea",
    autosize:{ minRows: 3, maxRows: 5 }
}
class OAInputNum extends OAComponent{
    constructor(props,context) {
        super(props,context);
    }
    render() {
        return (<InputNumber {...this.props} />)
    }
}
OAInputNum.defaultProps = {
    style: { width: '100%' },
    size: "large"
}
class OASelect extends OAComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    componentWillReceiveProps(nextProps) {
        let { value } = this.state;
        if ('value' in nextProps && nextProps.value != this.props.value) {
            value = nextProps.value;
        }
        this.setState({ value });
    }
    handleChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        this.triggerChange(value);
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    render() {
        const { options } = this.props;
        const {value} = this.state;
        return (
            <Select
            value={String(value)}
            onChange={this.handleChange}
            {...this.props}
            >
                {
                    options.map((option, index) => {
                        return (<Option key={index} value={option.value}>{option.label}</Option>)
                    })
                }
            </Select>
        );
    }
}
OASelect.defaultProps = {
    size: "large",
    style: { width: '100%' }
}
class OADate extends OAComponent{
    constructor(props,context) {
        super(props,context);
        this.state = {
            value: props.value,
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    componentWillReceiveProps(nextProps) {
        let { value } = this.state;
        if ('value' in nextProps && nextProps.value != this.props.value) {
            value = nextProps.value;
        }
        this.setState({ value });
    }
    handleChange = (value) => {
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        this.triggerChange(value);
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue.format("YYYY-MM-DD"));
        }
    } 
    render() {
        // comp.initialValue = comp.type == 'date' ? moment(comp.initialValue, 'YYYY-MM-DD') : comp.initialValue;
        let {value} = this.props;
        return (
            <DatePicker 
                {...this.props}
                onChange={this.handleChange}
                value={value?moment(value):null}
            />
        )
    }
}
OADate.defaultProps = {
    size: "large",
    format:"YYYY-MM-DD HH:mm:ss",
}
class OATimePicker extends OAComponent{
    constructor(props,context) {
        super(props,context);
    }
    render() {
        // comp.initialValue = comp.type == 'date' ? moment(comp.initialValue, 'YYYY-MM-DD') : comp.initialValue;
        let {value} = this.props;
        return (
            <TimePicker  
                {...this.props}
            />
        )
    }
}
OATimePicker.defaultProps = {
    size: "large",
    format:"HH:mm",
}
class OADateRange extends OAComponent{
    constructor(props,context) {
        super(props,context);
    }    
    render() {
        return (<RangePicker {...this.props} />)
    }
}
OADateRange.defaultProps = {
    size: "large",
    style: { width: '100%' }
}
class OACheckbox extends OAComponent{
    constructor(props,context) {
        super(props,context);
    }    
    render() {
        return (
            <CheckboxGroup 
                {...this.props} 
            />
        )
    }
}
OACheckbox.defaultProps = {
    size: "large",
    style: { width: '100%' }
}
class OARadio extends OAComponent{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <RadioGroup 
                {...this.props} 
            />
        )
    }
}
class OATable extends OAComponent{
    constructor(props,context) {
        super(props,context);
        this.isoperate = this.props.isoperate;
        this.columns = this.reloadColumns(this.props.columns) || [];
        this.state = {
            data:this.props.value
        }
    }
    getNewData = (data) =>{
        let json = {};
        if(data.length>0){
            let _keys = Object.keys(data[data.length-1]),count = data[data.length-1].key;
            for (let d of _keys) {
                if(d == "key")
                    json[d] = ++count;
                else
                    json[d] = "";
            }
        }
        return json;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.props.value) {
            this.setState({ data:nextProps.value })
        }
        if (nextProps.isoperate != this.props.isoperate) {
            this.isoperate = nextProps.isoperate;
        }
        if (nextProps.columns != this.props.columns) {
            this.columns = this.reloadColumns(nextProps.columns);
        }
    }
    handleChange = (key,index,value) => {
        this.triggerChange(key,index,value);
    }
    triggerChange = (key,index,value) => {
        const onChange = this.props.onChange;
        let _data = this.state.data;
        _data[index][key] = value;
        this.setState({
            data:_data
        })
        if (onChange) {
            onChange(_data);
        }
    }
    reloadColumns=(columns)=>{
        let col = columns.map((item,index)=>{
            return {
                render: (text, record, index) => {
                    return <OAControlComp 
                        type={item.type} 
                        value={text}
                        {...item.controlArr}
                        onChange={ value => this.handleChange(item.dataIndex,index,value)}
                    />
                },
                ...item
            }
        });
        if(this.isoperate){
            col.push({
                title: '操作',
                key: 'manage',
                width:100,
                render: (text, record, index) => {
                    return (
                        <span>
                            <a onClick={this.handleClickAdd} href="#">新增</a> <a href="#" onClick={()=>this.handleClickDel(index)}>删除</a>
                        </span>
                    )
                }
            })
        }
        return col;
    }
    handleClickAdd = () =>{
        let _data = this.state.data;
        _data.push(this.getNewData(this.props.value));
        this.setState({
            data:_data
        })
    }
    handleClickDel = (index) =>{
        let _data = this.props.value;
        _data.splice(index,1);
        this.setState({ data:_data })
    }
    render() {
        let {value,onChange} = this.props;
        return (<Table 
                    {...this.props}
                    bordered
                    pagination={false}
                    columns={this.columns} 
                    dataSource={this.state.data}
                />
        )
    }
}
class OAReadTable extends OAComponent{
    constructor(props,context) {
        super(props,context);
        this.isoperate = this.props.isoperate;
        this.columns = this.reloadColumns(this.props.columns) || [];
        this.state = {
            data:this.props.value
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.props.value) {
            this.setState({ data:nextProps.value })
        }
        if (nextProps.columns != this.props.columns) {
            this.columns = this.reloadColumns(nextProps.columns);
        }
    }
    reloadColumns=(columns)=>{
        let col = columns.map((item,index)=>{
            return {
                render: (text, record, index) => {
                    return <OAReadControlComp
                        {...item.controlArr}
                        type={item.type}
                        value={text}
                       
                    />
                },
                ...item
            }
        });
        return col;
    }
    render() {
        let {value,onChange} = this.props;
        return (<Table 
                    {...this.props}
                    bordered
                    pagination={false}
                    columns={this.columns} 
                    dataSource={this.state.data}
                />
        )
    }
}
class OALabel extends OAComponent{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="ant-form-text">{this.props.value}<span>{this.props.endlabel || ""}</span></div>
        )
    }
}
class OAReadFile extends OAComponent{
    constructor(props) {
        super(props);
    }
    render() {
        const { value } = this.props;
        return (
            <div className="ant-form-text">
                <ul>
                {
                    value?value.map((option, index) => {
                        return (<li><a href={option.fileURL}>{`${option.fileName}${option.fileType}`}({option.fileSize})</a></li>)
                    }):null
                }
                </ul>
            </div>
        )
    }
}
class OAControlComp extends Component {
    constructor(props,context) {
        super(props,context);
    }
    /**
   * 根据后台返回的 data 中 type 类型生成不同的组件
   * @param item  json
   * @param Component
   */
    switchItem = () => {
        let {type,value,onChange,options,columns,data,isoperate,placeholder,endlabel} = this.props;
        switch (type) {
            case 'inputnumber':
                return <OAInputNum value={value} onChange={onChange} placeholder={placeholder} />
            case 'input':
                return <OAInput value={value} onChange={onChange} placeholder={placeholder} addonAfter={endlabel} />
            case 'textarea':
                return <OATextArea value={value} onChange={onChange} placeholder={placeholder} />
            case 'date':
                return <OADate value={value} onChange={onChange} placeholder={placeholder} />
            case 'datetime':
                return <OATimePicker value={value} onChange={onChange} placeholder={placeholder} />
            case 'daterange':
                return <OADateRange value={value} onChange={onChange} />
            case 'checkbox':
                return <OACheckbox value={value} options={options} onChange={onChange} />
            case 'radio':
                return <OARadio  value={value} options={options} onChange={onChange} />
            case 'select':
                return <OASelect value={value} options={options} onChange={onChange} placeholder={placeholder} />
            case 'table':
                return <OATable value={value} onChange={onChange} columns={columns} isoperate={isoperate} />
            case 'label':
                return <OALabel value={value} placeholder={placeholder} endlabel={endlabel} />
            case 'file':
                return <OAReadFile value={value} />
            default:
                return <OAInput value={value} onChange={onChange} placeholder={placeholder} />;
        }
    }
    render() {
        return (this.switchItem())
    }
}
class OAReadControlComp extends Component {
    constructor(props,context) {
        super(props,context);
    }
    /**
   * 根据后台返回的 data 中 type 类型生成不同的组件
   * @param item  json
   * @param Component
   */
    switchItem = () => {
        let {type,value,onChange,options,columns,data,isoperate,placeholder,endlabel} = this.props;
        switch (type) {
            case 'inputnumber':
            case 'input':
            case 'textarea':
            case 'date':
            case 'datetime':
            case 'daterange':
            case 'checkbox':
            case 'radio':
            case 'select':
            case 'label':
                return <OALabel {...this.props} />
            case 'file':
                return <OAReadFile value={value} />
            case 'table':
                return <OAReadTable value={value} columns={columns}  />
        }
    }
    render() {
        return (this.switchItem())
    }
}
export {OARow,OAColumn,OAControlComp,OAReadControlComp}

