
const http = require('http');
const app = require('../app'); // The express app we just created

//db.sequelize.sync().then(()=>{
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
console.log('sever up and running' + port);
//})