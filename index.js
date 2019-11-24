const app = require('./app');
const port = process.env.PORT;

app.listen(port || 8000, function(){
    console.log('Server is listening:' + port);
});