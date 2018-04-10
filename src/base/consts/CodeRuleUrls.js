import { prefixPub } from './UrlsConfig';

const CodeRule = 'codeRule';
const CodeRuleUrls = {
    CODERULE_GETLIST: `${prefixPub}/${CodeRule}/getList`,
    CODERULE_GETDETAIL: `${prefixPub}/${CodeRule}/getDetail`,
    CODERULE_DELETE: `${prefixPub}/${CodeRule}/delete`,
    CODERULE_ISDISABLE: `${prefixPub}/${CodeRule}/isDisable`,
    CODERULE_ADD: `${prefixPub}/${CodeRule}/add`,
    CODERULE_UPDATE: `${prefixPub}/${CodeRule}/update`,
    GET_CODERULE: `${prefixPub}/${CodeRule}/isAuto`,
};
export default CodeRuleUrls ;