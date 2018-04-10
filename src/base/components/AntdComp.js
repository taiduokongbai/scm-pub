import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Spin from "antd/lib/spin";
import Table from "antd/lib/table";
import Pagination from "antd/lib/pagination";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import Checkbox from "antd/lib/checkbox";
import message from "antd/lib/message";
import Modal from "antd/lib/modal";
import Radio from "antd/lib/radio";
import Popover from "antd/lib/popover";
import Icon from "antd/lib/icon";
import Tabs from "antd/lib/tabs";
import Tree from "antd/lib/tree";
import Badge from "antd/lib/badge";
import Popconfirm from "antd/lib/popconfirm";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Tag from "antd/lib/tag";
import Select from "antd/lib/select";
import DatePicker from "antd/lib/date-picker";
import TreeSelect from "antd/lib/tree-select";
import Upload from "antd/lib/upload";
import AutoComplete from "antd/lib/auto-complete";
import Tooltip from "antd/lib/tooltip";
import Layout from "antd/lib/layout";
import Breadcrumb from "antd/lib/breadcrumb";
import InputNumber from "antd/lib/input-number";
import Collapse from "antd/lib/collapse";
import Progress from "antd/lib/progress";
import Notification from 'antd/lib/notification';
import Switch from "antd/lib/switch";
import Timeline from "antd/lib/timeline";
import Cascader from "antd/lib/cascader"; 

let getPopupContainer=(triggerNode) => {
    let temp,
        content = document.getElementById("ew-content"),
        dialog = document.getElementsByClassName("ant-modal-wrap"),
        sidebar = document.getElementsByClassName("ew-sidebar");

    if(dialog.length>0){
        temp = dialog[dialog.length-1];
    }else if(sidebar.length>0){
        temp = sidebar[sidebar.length-1];
    }else temp = content;
    return temp;
}
/**
 * 统一处理输入框不记录之前的输入内容
 * 如果使用者需要记录输入过的内容请 <Input autoComplete="on"
 */
Input.defaultProps.autoComplete = "off"; 
Popconfirm.defaultProps.getPopupContainer=getPopupContainer;
Select.defaultProps.getPopupContainer=getPopupContainer;
AutoComplete.defaultProps.getPopupContainer=getPopupContainer;
TreeSelect.defaultProps.getPopupContainer = getPopupContainer;
DatePicker.defaultProps.getCalendarContainer = getPopupContainer;
Tooltip.defaultProps.getPopupContainer = getPopupContainer;
exports.getPopupContainer = getPopupContainer;

exports.Button = Button;
exports.Input = Input;
exports.Form = Form;
exports.Spin = Spin;
exports.Table = Table;
exports.Pagination = Pagination;
exports.Dropdown = Dropdown;
exports.Menu = Menu;
exports.Checkbox = Checkbox;
exports.Modal = Modal;
exports.Radio = Radio;
exports.message = message;
exports.Popover = Popover;
exports.Icon = Icon;
exports.Tabs = Tabs;
exports.Tree = Tree;
exports.Badge = Badge;
exports.Row = Row;
exports.Col = Col;
exports.Tag = Tag;
exports.Select = Select;
exports.TreeSelect = TreeSelect;
exports.DatePicker = DatePicker;
exports.Popconfirm = Popconfirm;
exports.Upload = Upload;
exports.AutoComplete = AutoComplete;
exports.Tooltip = Tooltip;
exports.Layout = Layout;
exports.Breadcrumb = Breadcrumb;
exports.InputNumber = InputNumber;
exports.Collapse = Collapse;
exports.Progress = Progress;
exports.Notification = Notification;
exports.Switch = Switch;
exports.Timeline = Timeline;
exports.Cascader = Cascader;