import { z } from 'zod';
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  EXPO_PUBLIC_API_URL: z.string().url(),
});

// Validate the environment variables
let parsedEnv;
try {
  parsedEnv = envSchema.parse(process.env);
} catch (e) {
  throw new Error(`Invalid environment variables: ${e}`);
}

export default parsedEnv as z.infer<typeof envSchema>;
