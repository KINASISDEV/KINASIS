import mongoose from 'mongoose';

const buildMongoUri = () => {
  if (process.env.MONGODB_URI) { return process.env.MONGODB_URI;}

  const {MONGO_USER_NAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB_NAME } = process.env;

  if (!MONGO_HOST) {
    throw new Error('Missing Mongo configuration: define MONGODB_URI or MONGO_HOST.');
  }

  const hasCredentials = Boolean(MONGO_USER_NAME);
  const authSegment = hasCredentials ? `${encodeURIComponent(MONGO_USER_NAME)}:${encodeURIComponent(MONGO_PASSWORD ?? '')}@` : '';

  if (MONGO_HOST.endsWith('.mongodb.net')) {
    return `mongodb+srv://${authSegment}${MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
  }

  const hostSegment = MONGO_PORT ? `${MONGO_HOST}:${MONGO_PORT}` : MONGO_HOST;
  return `mongodb://${authSegment}${hostSegment}/${MONGO_DB_NAME}`;
};

// En serverless (Netlify Functions) el proceso se reutiliza entre peticiones:
// se cachea la conexion para no abrir una nueva en cada invocacion.
let connectionPromise = null;

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) { return mongoose.connection;}

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(buildMongoUri(), {
        serverSelectionTimeoutMS: 8000,
        maxPoolSize: 5
      })
      .then((instance) => instance.connection)
      .catch((error) => {
        connectionPromise = null; 
        throw error;
      });
  }

  return connectionPromise;
};

export const getModel = (connection, name, schema) =>
  connection.models[name] || connection.model(name, schema);

export const startServer = async (app) => {
  const port = Number(process.env.PORT) || 3000;

  app.listen(port, async () => {
    console.log(`API listening on port ${port}.`);
    try {
      await connectToDatabase();
      console.log('Connected to MongoDB.');
    } catch (error) {
      // El servidor sigue corriendo; las rutas que usen la DB devolveran 500
      // hasta que Atlas este disponible.
      console.error('MongoDB connection failed (routes will return 500 until reconnected):', error.message);
    }
  });
};
