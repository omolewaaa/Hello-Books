const http = require('http');
const app = require('../server/app'); // The express app we just created

const db = require('../server/models/index');

db.sequelize.sync().then(() => {
  const port = parseInt(process.env.PORT, 10) || 3000;
  app.set('port', port);

  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
