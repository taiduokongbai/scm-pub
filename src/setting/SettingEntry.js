import {render} from "react-dom";
import React,{Component} from "react";
import {Router, Route,browserHistory,IndexRoute} from "react-router";
import {Provider} from "react-redux";
import { store } from "./data/StoreConfig";
import AppCont from './containers/AppCont';
import PersonalCenterCont from './containers/PersonalCenterCont';
import CompanySetCont from './containers/CompanySetCont';
import StaffRemindCont from './containers/StaffRemindCont';
import AdminRemindCont from './containers/AdminRemindCont';
import ApproveForMeCont from './containers/ApproveForMeCont';
import AnnouncementCont from './containers/AnnouncementCont';
import PersonComp from  './components/PersonComp'
import  'babel-polyfill';
import "antd/dist/antd.css";
import './../base/styles/base.scss'
import "./styles/main.scss";
import fn from '../base/services/InitData'

import {prefix_route} from '../base/consts/UrlsConfig';

fn().then(() => render(
    <Provider store={store}>
        <Router history={browserHistory} ignoreScrollBehavior>
            <Route path={`${prefix_route}/setting.html`} component={AppCont} >
                <IndexRoute component={PersonalCenterCont} />
                <Route path={`${prefix_route}/R/setting/company`} component={CompanySetCont} />
                <Route path={`${prefix_route}/R/setting/remind`} component={StaffRemindCont} />
                <Route path={`${prefix_route}/R/setting/adminremind`} component={AdminRemindCont} />
                <Route path={`${prefix_route}/R/setting/person`} component={PersonComp} />
                <Route path={`${prefix_route}/R/setting/approve`} component={ApproveForMeCont} />
                <Route path={`${prefix_route}/R/setting/announcement`} component={AnnouncementCont} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('bodycontext')
))
