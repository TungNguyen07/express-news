const app = require('./app');
const port = 8000;

app.listen(port, function(){
    console.log('Server is listening:' + port);
});