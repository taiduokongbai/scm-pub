import { prefix,prefixPub } from '../../base/consts/UrlsConfig';
const prefixWf = prefix + '/wf'; //服务器
const prefixEc = prefix + '/ec'; //服务器
const Urls = {
    WF_EMPLOYEE_LIST: `${prefixWf}/business/employee/list`,
    WF_FORM_LIST: `${prefixWf}/business/form/list`,
    WF_FORM_FLOW_LIST: `${prefixWf}/business/flow/list`,
    WF_VOID_LIST: `${prefixWf}/business/void/list`,
    WF_FINISH_LIST: `${prefixWf}/business/finish/list`,
    WF_FINISH_INFO: `${prefixWf}/business/finish/info`,
    WF_FINISH_INVALID: `${prefixWf}/business/finish/invalid`,
    WF_FLOW_STATE:`${prefixWf}/business/flow/onOff`,
    WF_FLOW_ADD:`${prefixWf}/business/flow/add`,
    WF_FLOW_EDIT:`${prefixWf}/business/flow/edit`,
    WF_FLOW_COPY:`${prefixWf}/business/flow/copy`,
    WF_FLOW_DELETE:`${prefixWf}/business/flow/delete`,
    WF_FORM_CONTROL_LIST:`${prefixWf}/business/form/controlList`,
    WF_FORM_ADDRESS_LIST:`${prefix}/pub/basic/address/getAll`,
    WF_APPROVAL_LIST: `${prefixWf}/business/approval/list`,
    WF_APPROVAL_AGREE:`${prefixWf}/business/approval/agree`,
    WF_APPROVAL_REJECT:`${prefixWf}/business/approval/reject`,
    WF_APPROVAL_SIGN:`${prefixWf}/business/approval/sign`,
    WF_EMPLOYEES_LIST: `${prefixWf}/business/employee/array`,
    GET_ORDERSTATISTICS:`${prefixEc}/getBusinessAmounts`,
};

export default Urls;