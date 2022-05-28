const server = require('./source/app');
const { conn } = require('./source/db');

// Syncing all the models at once.
conn.sync({ force: false }).then( async () => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});