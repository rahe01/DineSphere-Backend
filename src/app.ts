import express, { Application, Request, Response } from 'express';
import { auth } from './app/lib/auth';
import { toNodeHandler } from 'better-auth/node';
import { IndexRoutes } from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.all("/api/auth", toNodeHandler(auth));


app.get('/', async (req: Request, res: Response) => {
    res.send('Hello World');
})


app.use("/api/v1/", IndexRoutes);



export default app;