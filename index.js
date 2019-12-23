const app = require('./app');
var port;
port = process.env.PORT || 8000;

app.listen(port, function(){
    console.log('Server is listening:' + port);
});