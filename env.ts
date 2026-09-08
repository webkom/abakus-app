import { z } from 'zod';
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_TURNSTILE_BASE_URL: z.string().url(),
  EXPO_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
  EXPO_PUBLIC_TURNSTILE_SIZE: z.enum(['normal', 'compact']),
});

// Validate the environment variables
let parsedEnv;
try {
  parsedEnv = envSchema.parse(process.env);
} catch (e) {
  throw new Error(`Invalid environment variables: ${e}`);
}

export default parsedEnv as z.infer<typeof envSchema>;
