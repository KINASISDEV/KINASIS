// ---------------------------------------------------------------------------
// Netlify Function que ejecuta el backend Express (kinasis-backend) completo.
//
// Netlify reescribe /api/<algo>  ->  /.netlify/functions/api/<algo>
// Express espera rutas sin prefijo (/members, /data, /catalogs, /services),
// asi que aqui se normaliza el path antes de entregarlo al app.
// ---------------------------------------------------------------------------
import serverless from 'serverless-http';
import app from '../../kinasis-backend/src/app.js';

const PREFIXES = [/^\/\.netlify\/functions\/api/, /^\/api(?=\/|$)/];

const stripPrefix = (rawPath = '/') => {
	let path = rawPath;
	for (const prefix of PREFIXES) {
		path = path.replace(prefix, '');
	}
	return path.startsWith('/') ? path : `/${path}`;
};

const serverlessHandler = serverless(app, {
	// Sin esto las imagenes que el backend saca de S3 llegarian corruptas.
	binary: [
		'image/*',
		'font/*',
		'application/octet-stream',
		'application/pdf',
		'application/zip'
	]
});

export const handler = async (event, context) => {
	const normalizedPath = stripPrefix(event.path || '/');

	const normalizedEvent = {
		...event,
		path: normalizedPath
	};

	// Compatibilidad con el payload v2 de Lambda (por si Netlify lo envia asi).
	if (event.requestContext?.http?.path) {
		normalizedEvent.rawPath = normalizedPath;
		normalizedEvent.requestContext = {
			...event.requestContext,
			http: { ...event.requestContext.http, path: normalizedPath }
		};
	}

	return serverlessHandler(normalizedEvent, context);
};
