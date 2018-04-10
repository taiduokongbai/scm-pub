var express = require('express'),
    path = require('path'),
    port = process.env.PORT || 9099,
    app = express(),
    request = require('request'),
    baseConfig = require("./base.webpack").cfg,
    reqOpt = {},
    headerOpt;
var proxy = require('http-proxy-middleware');

app.use(express.static(__dirname + '/export/ch'));


let option = {
    // target: 'http://10.99.2.70:9098/', //dev
    // target: 'http://10.99.2.47/', // 测试
    // target: 'http://172.16.8.155:8090/', // 联调
    target: 'http://10.99.2.117/', // 117
    changeOrigin: true,
    ws: true,
  onProxyReq:function (proxyReq, req, res) {
        proxyReq.setHeader('tokenid', 'acd19c70f1d879f2ac93561088221a25');
        proxyReq.setHeader('cookie', 'JSESSIONID=04a3f90f-8444-44cd-9855-46f52fbd90ea');
    }
}

let x = (req,resp,next)=>{
    let u = req.url.match(/\/R\/[^\/]+/)[0].replace(/\/R\//,''); 
    resp.sendFile(path.resolve(__dirname, 'export/ch/', u+".html"));
};

app.route(/^\/R\//).get(x).post(x);
app.use('/pub', proxy(option));
app.use('/ec', proxy(option));
app.use('/scm', proxy(option));
app.listen(port);

