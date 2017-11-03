// npm packages
import express from 'express';

// init app
const app = express();

// test method
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// catch all unhandler errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(next);
  res.status(500).send(err);
});

// export app
export default app;
