import express from 'express';
import cors from 'cors';
import membersRouter from './enpoints/members.js';
import dataRouter from './enpoints/data.js';
import catalogRouter from './enpoints/catalogs.js';
import servicesRouter from './enpoints/services.js';

const DEFAULT_ORIGINS = [
	'http://localhost:5173',
	'http://localhost:8888',
	'https://dev.kinasisdev.shop',
	'https://kinasisdev.shop',
	'https://www.kinasisdev.shop'
];

const extraOrigins = (process.env.CORS_ORIGINS || '')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

const allowedOrigins = [...new Set([...DEFAULT_ORIGINS, ...extraOrigins])];

const corsOptions = {
	origin(origin, callback) {
		if (!origin) {return callback(null, true);}
		if (allowedOrigins.includes(origin)) {return callback(null, true);}
		if (/^https:\/\/[a-z0-9-]+\.netlify\.app$/i.test(origin)) {return callback(null, true);}
		return callback(new Error(`Origin not allowed by CORS: ${origin}`));
	}
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {res.send('Welcome to Kinasis API!');});
app.get('/health', (req, res) => {res.json({ status: 'ok', env: process.env.S3_ENVIRONMENT || 'unknown' });});

app.use('/members', membersRouter);
app.use('/data', dataRouter);
app.use('/catalogs', catalogRouter);
app.use('/services', servicesRouter);

export default app;
