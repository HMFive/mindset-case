import express, { Express } from 'express';

import bodyParser from 'body-parser';
import userRoute from './routes/user.route';

const app: Express = express();
app.use(bodyParser.json());

app.use(userRoute);

app.listen(3000);
