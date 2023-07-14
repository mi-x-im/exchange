import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from 'dotenv';
dotenv.config();

import loginRoute from './routes/auth/login.js'
import meRoute from './routes/auth/me.js'
import registerRoute from './routes/auth/register.js'
import logoutRoute from './routes/auth/logout.js'
import verifyRoute from './routes/auth/verify.js'
import cryptoRoute from "./routes/auth/crypto.js"
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(verifyRoute);
app.use(registerRoute);
app.use(meRoute);
app.use(cryptoRoute);
app.use(loginRoute);
app.use(logoutRoute);

app.use(express.static('client/build'))
app.get('*', (req, res) => {
	return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

