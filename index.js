const app = require('./app');
const port = process.env.PORT;

app.listen(port, function(){
    console.log('Server is listening:' + port);
});