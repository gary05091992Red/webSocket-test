

var express = require("express");
// var WebSocket = require("ws");
// var app = express();
// const SocketServer = require('ws').Server
// const Server = require('socket.io');
// const io = new Server();
// https://api.binance.com
const axios = require('axios')
//  缺少axios的整理架構
const getPing = async () => {
    try {
        const ping = await axios.get('https://api.binance.com/api/v3/ping');
        //   console.log(ping)
        return ping
    } catch (error) {
        console.error(error)
    }
}

getPing();
(async () => {
    let streams = [];
    let markets = [];
    let prevDay = await axios.get('https://api.binance.com/api/v1/ticker/24hr');
    for (let obj of prevDay.data) {
        markets.push(obj.symbol);
        streams.push(obj.symbol.toLowerCase() + '@aggTrade');
    }
    console.log(markets);


    //   const ws = new SocketServer({ server })
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusd@aggTrade');
    ws.onopen = function(event) {
        console.log("WebSocket is open now.");
    };
    ws.onerror = function(event) {
        console.error("WebSocket error observed:", event);
    };

    ws.on('message', data => {
        //取得所有連接中的 client
        console.log(data)
    })
    //   ws.on('message', function(payload) {
    //     let json = JSON.parse(payload), stream = json.stream, data = json.data;
    //     if ( data.e == 'aggTrade' ) {
    //       console.log(data.s+' price: '+data.p);
    //     } else console.log(stream, data);
    //   });

    //   console.log(markets);

    // const io = new Server({
    //     path: 'wss://stream.binance.com:9443/stream?streams='+streams.join('/'),
    //     serveClient: false,
    //     pingInterval: 10000,
    //     pingTimeout: 5000,
    //     cookie: false
    //   });

    // io.on('connection',async (socket)=>{
    //     console.log('A user connected')
    //     console.log(socket)
    // })
    // const server = require('http').createServer();

    // const io = require('socket.io')(server, {
    //     path: 'wss://stream.binance.com:9443/stream?streams=' + streams.join('/'),
    //     serveClient: false,
    //     // below are engine.IO options
    //     pingInterval: 10000,
    //     pingTimeout: 5000,
    //     cookie: false
    // });
    // console.log(io);
    // server.listen(3000);
    // io.sockets.on('connection',async (socket)=>{
    //     console.log('A user connected')
    //     console.log(socket)
    // })
})()