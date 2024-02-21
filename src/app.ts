import express, { Application } from 'express';
import compression from 'compression';

const app: Application = express();

app.use(compression());
app.use(express.json());

export default app;