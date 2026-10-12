import express from 'express';
import { apiRouter } from '../server/routes';
import { storage } from '../server/storage';

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Seed documents on cold start if store is empty
try {
  await storage.seedInitialDocumentsIfEmpty();
} catch (e) {
  // Ignore in serverless cold start
}

app.use('/api', apiRouter);

export default app;
