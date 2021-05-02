var express = require("express"),
app = express();

// 倒入html
app.get("/", function(req, res) {
    res.sendfile(__dirname + '/index.html', function(err) {
        if (err) res.send(404);
    });
});

// 導入附加擋案
app.get(/(.*)\.(jpg|gif|png|ico|css|js|txt)/i, function(req, res) {
    res.sendfile(__dirname + "/" + req.params[0] + "." + req.params[1], function(err) {
        if (err) res.send(404);
    });
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

port = process.env.PORT || 5060;
app.listen(port, function() {
    console.log("Listening on " + port);
});

// const Server = require('socket.io');
// const io = new Server();
