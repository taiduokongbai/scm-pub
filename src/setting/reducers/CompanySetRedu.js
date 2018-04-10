import { fromJS, Record  } from 'immutable'
import { COMPANYSETREDU } from '../consts/ActTypes'

let initialData = fromJS({
    enterpriseInfo: {},
    edit_position_visiable: false,
    positionId: null,
    edit_company_visiable: false,
    positionLoading: false,
    loading: false,
    judgeInitCompy: 1,    // 是否初始化公司信息
});

//reducer
const CompanySetRedu = ( state = initialData, action) => {
    switch (action.type) {
        // 获取 部门成员 列表
        case COMPANYSETREDU: 
            return action.state;
        default:
            return state;
    }
}

export default CompanySetRedu