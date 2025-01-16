import express, { Express } from 'express';

import bodyParser from 'body-parser';
import customerRoute from './routes/customer.route';
import noteRoute from './routes/note.route';
const app: Express = express();
app.use(bodyParser.json());

app.use(noteRoute);
app.use(customerRoute);

app.listen(3000);
