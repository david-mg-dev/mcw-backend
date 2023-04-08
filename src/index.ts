import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import UserRouter from './routes/user.routes'

dotenv.config();

const app: Express = express();
app.use(express.json())

const port = process.env.PORT;

app.use('/api/users', UserRouter)

app.get('/ping', (_req: Request, res: Response) => {
  res.send('Pong!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});