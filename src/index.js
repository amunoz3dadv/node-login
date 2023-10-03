import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbConnection } from './database/config.js'; 
import usersRouter from './routes/users.js';
import loginRouter from './routes/auth.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000

app.use(express.json());
app.use(cors());

app.use('/',express.static(path.join(__dirname, 'public')));

app.use('/api/user', usersRouter);
app.use('/api/auth', loginRouter);

await dbConnection();

app.listen(port, () => console.log(`Example app listening on port ${port}!`))