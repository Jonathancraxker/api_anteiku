import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import adminRoutes from '../routes/admin.routes.js';
import Users from '../routes/users.routes.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Anteiku');
});

// Configuración CORS para múltiples orígenes
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('No autorizado por CORS'));
      }
    },
    credentials: true,
    exposeHeaders: ['Content-Disposition'] 
  })
);

app.use(cookieParser());

// app.use('/anteiku', adminRoutes);
app.use('/anteiku', Users);

export default app;