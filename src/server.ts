

import express, { Application, Request, Response } from 'express';
import { prisma } from './lib/prisma';

const app: Application = express();


const port = 5000;

app.get('/', async (req: Request, res: Response) => {

    await prisma.user.create({
        data: {
            email: "test@example.com",
            name: "Test User"
        }
    })







    res.send('Hello World');
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})