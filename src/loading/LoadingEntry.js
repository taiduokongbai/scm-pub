import { render } from "react-dom";
import React, { Component } from "react";
import { applyMiddleware, createStore } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import { Provider } from "react-redux";
import LoadingComp from "./components/LoadingComp";
import { prefix_route } from '../base/consts/UrlsConfig'
import { store } from './store/StoreConfig';
import 'babel-polyfill';
import "antd/dist/antd.css";
import './../base/styles/base.scss'
import "./styles/main.scss";

render(
    <Provider store={store}>
        <Router history={browserHistory} ignoreScrollBehavior>
            <Route path={`${prefix_route}/loading.html`}  component={LoadingComp} ></Route>
        </Router>
    </Provider>,
    document.getElementById('bodycontext')
)