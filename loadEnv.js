import dotenv from 'dotenv';

const loadEnv = () => {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN environment variable is missing');
  }

  if (!process.env.REPLICATE_USER_AGENT) {
    throw new Error('REPLICATE_USER_AGENT environment variable is missing');
  }

  if (!process.env.REPLICATE_MODEL_ID) {
    throw new Error('REPLICATE_MODEL_ID environment variable is missing');
  }
};

export default loadEnv;
