import React, { Component } from 'react'
import { Button, Spin, Pagination, Input, Layout, Table, Form } from '../../base/components/AntdComp'
const FormItem = Form.Item;
class HeaderToOutInfoComp extends Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        let searchval = {
            employeeName: '',
            phone: '',
            page: 1,
            pageSize: 15,
        }
        this.props.refreshList(searchval)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { onSearch } = this.props;
        this.props.form.validateFields((err, data) => {
            if (onSearch) {
                onSearch(data.searchVal)
            }
        })
    }
    render() {
        let { state, checkedList, state2, onSearch, SearchVal, ...props } = this.props;
        let { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className='tableHeader'>
                    <div className='head-line-three'>
                        <div style={{ float: 'left' }}>
                            {/*<SearchComp 
                                placeholder = '输入姓名/手机搜索'
                                onSearch = { onSearch }
                                SearchVal = { SearchVal }
                                width = {200}
                                className='search-box'
                            />*/}
                            <Form>
                                <FormItem>
                                    {getFieldDecorator('searchVal', {
                                        initialValue: '',
                                    })(
                                        <Input style={{ width: 200 }} onPressEnter={(e) => this.handleSubmit(e)} placeholder='输入姓名/手机搜索' />
                                        )}
                                </FormItem>
                                <Button type="default" onClick={(e) => this.handleSubmit(e)} className='search-btn'><i className='c2mfont c2m-search1'></i>查询</Button>
                            </Form>
                            {/*<Button type="default" onClick={onSearch} className='search-btn'><i className='c2mfont c2m-search1'></i>查询</Button>*/}
                        </div>
                        <p style={{ float: 'left' }}>已停用员工( {this.props.paging.total} )</p>
                    </div>
                </div>
            </div>
        );

    }
}

export default Form.create()(HeaderToOutInfoComp);