import {render} from "react-dom";
import { HashRouter, Route } from 'react-router-dom';
import React,{Component} from "react";
import {Provider} from "react-redux";

import AppCont from './containers/AppCont';


import "antd/dist/antd.css";
import './../base/styles/base.scss';
import "./styles/main.scss";
import "./styles/AnnouncementDetail.scss";
import { store } from './data/StoreConfig';

import {prefix_route} from '../base/consts/UrlsConfig'
import  'babel-polyfill';
 render(
    <Provider store={store}>
        <HashRouter>
            <Route path="/:id" component={AppCont}/>
        </HashRouter>
    </Provider>,
    document.getElementById('bodycontext')
)