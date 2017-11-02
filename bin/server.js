const http = require('http');
const app = require('../server/app.js'); // The express app we just created

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
console.log('sever up and running' + port);
