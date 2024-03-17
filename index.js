import express from 'express';
import dotenv from 'dotenv';
import Replicate from 'replicate';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
  userAgent: process.env.REPLICATE_USER_AGENT,
});

app.use(express.json());

app.post('/api/runReplicate', async (req, res) => {
  try {
    const { model, input } = req.body;
    console.log('Running...');
    const output = await replicate.run(model, { input });
    res.json({ success: true, output });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
