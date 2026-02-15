const dotenv = require('dotenv');
const mongoos = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;
mongoos
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 8000;
app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Up and running: http://127.0.0.1:${PORT}`);
});
