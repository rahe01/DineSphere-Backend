import express, { Application, Request, Response } from 'express';
import { auth } from './lib/auth';
import { toNodeHandler } from 'better-auth/node';
const app: Application = express();


app.all("/api/auth", toNodeHandler(auth));


app.get('/', async (req: Request, res: Response) => {
    res.send('Hello World');
})




export default app;