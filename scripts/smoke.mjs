// Smoke test local: verifica que el frontend y TODOS los endpoints del backend
// responden a traves del mismo origen (tal como pasara en Netlify).
//
//   1. npm run dev            (deja netlify dev corriendo en otra terminal)
//   2. npm run smoke
//
// Se puede apuntar a otro host:  BASE_URL=https://tu-sitio.netlify.app npm run smoke

const BASE_URL = (process.env.BASE_URL || 'http://localhost:8888').replace(/\/+$/, '');

const CHECKS = [
	{ name: 'frontend (SPA)', path: '/', expect: 'html' },
	{ name: 'frontend (ruta SPA profunda)', path: '/website', expect: 'html' },
	{ name: 'api root', path: '/api/', expect: 'text' },
	{ name: 'api health', path: '/api/health', expect: 'json' },
	{ name: 'api members', path: '/api/members?admin=true', expect: 'json' },
	{ name: 'api services', path: '/api/services', expect: 'json' },
	{ name: 'api catalogs', path: '/api/catalogs?name=tech', expect: 'json' },
	{ name: 'api allImages (S3)', path: '/api/data/allImages?prefix=members-images/founders/', expect: 'json' }
];

const preview = (value) => {
	const text = typeof value === 'string' ? value : JSON.stringify(value);
	return text.length > 90 ? `${text.slice(0, 90)}...` : text;
};

let failures = 0;

for (const check of CHECKS) {
	const url = `${BASE_URL}${check.path}`;
	try {
		const response = await fetch(url);
		const contentType = response.headers.get('content-type') || '';
		const body = contentType.includes('application/json') ? await response.json() : await response.text();

		const typeOk =
			check.expect === 'json' ? contentType.includes('application/json')
			: check.expect === 'html' ? contentType.includes('text/html')
			: true;

		if (!response.ok || !typeOk) {
			failures += 1;
			console.log(`FAIL  ${check.name.padEnd(30)} ${response.status} ${contentType} ${preview(body)}`);
		} else {
			console.log(`OK    ${check.name.padEnd(30)} ${response.status} ${preview(body)}`);
		}
	} catch (error) {
		failures += 1;
		console.log(`FAIL  ${check.name.padEnd(30)} ${error.message}`);
	}
}

console.log(`\n${CHECKS.length - failures}/${CHECKS.length} checks OK en ${BASE_URL}`);
process.exit(failures === 0 ? 0 : 1);
