import express from 'express';
import dotenv from 'dotenv';
import Replicate from 'replicate';
import logger from './logger.js';
import loadEnv from './loadEnv.js';

dotenv.config();
loadEnv();

const app = express();
const port = process.env.PORT || 3000;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: process.env.REPLICATE_USER_AGENT,
});

app.use(express.json());

app.post('/api/run-ai', async (req, res) => {
  try {
    const { input } = req.body;
    logger.info('Running AI model...');

    const output = await replicate.run(process.env.REPLICATE_MODEL_ID, { input });

    logger.info('AI model run successful');
    res.json({ success: true, output });
  } catch (error) {
    logger.error('Error running AI model:', error);
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: 'An unknown error occurred' });
    }
  }
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
