import { z } from 'zod';

const API_BASE_URL = process.env.API_BASE_URL;
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  API_BASE_URL: z
    .string()
    .url()
    .default(API_BASE_URL || 'http://10.10.62.97:8000/'),
});

const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('Environment variable validation failed:', error);
    return envSchema.parse({});
  }
};
export const env = parseEnv();
