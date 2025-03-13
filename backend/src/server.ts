// src/server.ts
import express from 'express';
import 'dotenv/config';              // Carga las variables de entorno
import '@/setup/consoleLogger';      // Aplica el middleware global para formatear console.log/info/warn/error
import router from '@/routes/v1/router';
import { connectDB } from '@/config/db';
import cors from 'cors';
import { corsConfig } from '@/config/cors';

const app = express();

// Conexión a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para CORS
app.use(cors(corsConfig));

// Rutas de la API
app.use('/api/v1', router);

// Middleware para rutas no definidas (404)
app.use((req, res, next) => {
  next({ status: 404, message: 'Not Found' });
});

export default app;

