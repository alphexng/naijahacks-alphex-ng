import express from 'express';
import bodyParser from 'body-parser';
import Route from './routes/route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Route(app);

const port = process.env.PORT || 2030;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;
