import express from 'express';

const app = express();

const port = process.env.PORT || 2020;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;