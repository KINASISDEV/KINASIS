# Deploy en Netlify — monorepo KINASIS

Un solo sitio de Netlify sirve **frontend y backend**:

| Pieza    | Carpeta               | Cómo corre en Netlify                       | URL pública      |
| -------- | --------------------- | ------------------------------------------- | ---------------- |
| Frontend | `kinasis-frontend-web`| build estático de Vite (`dist/`)            | `/`              |
| Backend  | `kinasis-backend`     | el mismo Express dentro de una Function     | `/api/*`         |

El pegamento es `netlify.toml` + `netlify/functions/api.mjs`. No hay servidor
que levantar ni dominio de API que mantener: el frontend pide `/api/...` al
**mismo dominio**, así que no hay CORS ni URLs hardcodeadas y funciona igual en
producción, en deploy previews y en local.

```
navegador → https://<sitio>/api/members
          → redirect (netlify.toml) → /.netlify/functions/api/members
          → netlify/functions/api.mjs quita el prefijo
          → Express: GET /members  → MongoDB Atlas / S3
```

---

## 1. Conectar el repo (una sola vez)

1. Sube este monorepo a un repositorio nuevo de GitHub.
2. Netlify → **Add new site → Import an existing project → GitHub** → elige el repo.
3. **No cambies nada** en la pantalla de build: Netlify lee `netlify.toml`
   (base `.`, command `npm run build`, publish `kinasis-frontend-web/dist`,
   functions `netlify/functions`).
4. Carga las variables de entorno (paso 2) y lanza el deploy.

Cada `git push` a la rama de producción despliega frontend + backend juntos.

## 2. Variables de entorno

Las públicas (`VITE_API_URL`) ya están en `netlify.toml`. Las **secretas** van
en el sitio, nunca en el repo. La forma rápida, con el `.env` local ya lleno:

```bash
npx netlify login
npx netlify link          # vincula la carpeta con el sitio de Netlify
npm run env:push          # netlify env:import .env
```

O a mano en **Site configuration → Environment variables**:

| Variable                        | Ámbito   | Notas                                        |
| ------------------------------- | -------- | -------------------------------------------- |
| `MONGO_USER_NAME`               | backend  |                                              |
| `MONGO_PASSWORD`                | backend  |                                              |
| `MONGO_HOST`                    | backend  | ej. `kinasisdb.xxxxx.mongodb.net`            |
| `MONGO_PORT`                    | backend  | se ignora en `mongodb+srv`                   |
| `MONGO_DB_NAME`                 | backend  | `kinasis_db`                                 |
| `S3_REGION`                     | backend  | `us-east-2`                                  |
| `BUCKET_S3`                     | backend  | `bucket-kinasis`                             |
| `S3_ENVIRONMENT`                | backend  | `dev` o `prod`                               |
| `S3_ACCESS_KEY_ID`              | backend  | **no** usar `AWS_ACCESS_KEY_ID` (ver abajo)  |
| `S3_SECRET_ACCESS_KEY`          | backend  | **no** usar `AWS_SECRET_KEY`                 |
| `VITE_PUBLIC_EMAILJS_PUBLIC_KEY`| build    | acaba en el bundle del navegador             |
| `VITE_PUBLIC_EMAILJS_SERVICE_ID`| build    | idem                                         |
| `VITE_PUBLIC_EMAILJS_TEMPLATE_ID`| build   | idem                                         |

> **Por qué `S3_*` y no `AWS_*`**: las Functions corren sobre AWS Lambda, que ya
> inyecta sus propias `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` en el
> entorno. Usar nombres propios evita que se pisen. `src/services/aws.js`
> mantiene el fallback a los nombres viejos, así que el Docker/EC2 sigue igual.

Además, en **MongoDB Atlas → Network Access** hay que permitir `0.0.0.0/0`
(las Functions no tienen IP fija).

## 3. Probar en local (idéntico a producción)

```bash
cp .env.example .env      # y rellenar valores
npm install               # instala los 2 workspaces
npm run dev               # netlify dev → http://localhost:8888
npm run smoke             # en otra terminal: verifica front + todos los endpoints
```

`npm run dev` levanta Vite y la Function y aplica los mismos redirects que
Netlify, así que `http://localhost:8888/api/members` recorre exactamente el
camino de producción.

Alternativa sin Netlify CLI (dos procesos, Express real en el puerto 3000):

```bash
npm run dev:api           # Express en :3000
npm run dev:web           # Vite en :5173, con proxy /api → :3000
```

## 4. Comandos

| Comando            | Qué hace                                                   |
| ------------------ | ---------------------------------------------------------- |
| `npm run dev`      | frontend + backend + redirects en `:8888` (`netlify dev`)   |
| `npm run dev:web`  | solo Vite en `:5173` (proxy `/api` → `:3000`)               |
| `npm run dev:api`  | solo Express en `:3000`, leyendo el `.env` de la raíz       |
| `npm run build`    | lo mismo que corre Netlify: build del frontend              |
| `npm run smoke`    | smoke test de frontend + endpoints (`BASE_URL` opcional)    |
| `npm run env:push` | sube el `.env` local a las variables del sitio              |

## 5. Notas y límites

- **Timeout** de una Function: 10 s (26 s en background). Suficiente para los
  endpoints actuales.
- **Respuesta máxima** ~6 MB: aplica a `/api/data/getImageFromS3` y
  `/api/members/getImageMemberS3`, que hacen streaming de imágenes. Si alguna
  imagen es más grande, servirla con URL firmada (como ya hace
  `/api/data/allImages`) en lugar de proxearla.
- **Cold start**: la primera petición tras un rato abre la conexión a Atlas;
  `src/services/mongo.js` la cachea para las siguientes.
- El `Dockerfile` y `config/deploy.sh` del backend se dejaron intactos: el
  deploy por contenedor sigue siendo válido y no interfiere con Netlify.
- Si algún día quieres volver a una API externa (`https://devapi...`), basta
  cambiar `VITE_API_URL` en `netlify.toml`; el resto del código no cambia.
