import express from 'express';
import bodyParser from 'body-parser';
import Route from './routes/route';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

Route(app);

const port = process.env.PORT || 2030;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;
