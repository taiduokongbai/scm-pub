import { render } from "react-dom";
import React, { Component } from "react";
import { applyMiddleware, createStore } from 'redux';
// import {Router, Route,browserHistory,IndexRoute} from "react-router";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/index";
import AppCont from './containers/AppCont';
import CompanyComp from './components/CompanyComp';

import "antd/dist/antd.css";
import './../base/styles/base.scss';
import "./styles/main.scss";
//import "./styles/terraceRule.scss";
import "./styles/AnnouncementList.scss";
import { store } from './data/StoreConfig';
//const store = createStore(rootReducer,applyMiddleware(thunk));
import { prefix_route } from '../base/consts/UrlsConfig'

import fn from '../base/services/InitData'
import  'babel-polyfill';
import { HashRouter, Route,Switch ,Redirect} from 'react-router-dom';
fn().then(() => render(
    <Provider store={store}>
        <HashRouter>

            <Switch>
                <Route exact  path="/" component={AppCont} />
                <Route exact  path="/:key" component={AppCont} />
            </Switch>
    
        </HashRouter>

    </Provider>,
    document.getElementById('bodycontext')
))


