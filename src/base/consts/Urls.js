import { prefixPub } from './UrlsConfig';
import BasicUrls from './BasicUrls';
import LoginUrls from './LoginUrls';
import MemberManage from './MemberUrls';
import ManageUrls from './ManageUrls';

import BaseDataUrls from './BaseDataUrls';
import DeptUrls from './DeptUrls';
import AddressUrls from './AddressUrls';
import CodeRuleUrls from './CodeRuleUrls';
const employees = 'employees';
const company = 'company';
const login = 'login';

const Urls = {
    ...AddressUrls,
    ...BaseDataUrls,
    ...DeptUrls,
    ...CodeRuleUrls,

    EMPLOYEE_ADD: `${prefixPub}/${employees}/modify`,
    EMPLOYEE_UPDATE: `${prefixPub}/${employees}/modify`,
    GET_DETAILS_INFO: `${prefixPub}/${employees}/getEmp`,
    IMPORT_EXCEL: `${prefixPub}/${employees}/importExcel`,
    IMPORT_VIEW: `${prefixPub}/${employees}/importView`,
    GET_PERSONAL_INFO: `${prefixPub}/${employees}/getWithToken`,
    BATCH_EDITSITE: `${prefixPub}/${employees}/batchEditSite`,
    EDIT_PROFILE_PHOTO: `${prefixPub}/${employees}/editProfilePhoto`,
    LOGIN_GETMENUES: `${prefixPub}/resource/getMenus`,
    LOGIN_GET_SIDE_MENUES: `${prefixPub}/resource/sideMenus`,

/*    LOGIN_GETMENUES: `${prefixPub}/${login}/getmenues`,*/
    SET_ENTERPRISE_INFO: `${prefixPub}/${company}/getCompanyByUser`,
    //
    UPLOAD_IMAGE: `${prefixPub}/${company}/uploadLogo`,
    COUNTRY_GETSELECTED: `${prefixPub}/basic/country/getSelected`,
    GET_ALL_LIST:`${prefixPub}/msg/list`,//消息列表
    GET_NEWS_STATUS:`${prefixPub}/msg/status`,//消息状态
    GET_NOTICE_LIST:`${prefixPub}/announcement/getList`,//公告列表
    //导入文件-上传文件
    COMMON_UPLOAD_FILE_EXCEL:`${prefixPub}/common/uploadFileForExcel`,

    //上传附件
    COMMON_UPLOAD_FILE:`${prefixPub}/common/uploadFile`,

    //上传图片
    COMMON_UPLOAD_FILE_IMG:`${prefixPub}/common/uploadFileByCondition`,

    PUB_CODE_RULE_IS_AUTO:`${prefixPub}/codeRule/isAuto`,

    // 验证公司信息是否完善
    JUDGE_INIT_COMPY: `${prefixPub}/unityAccount/judgeInitCompy`,
};

export { Urls, BasicUrls, LoginUrls, MemberManage, ManageUrls };
