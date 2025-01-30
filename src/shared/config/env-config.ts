import dotenv from "dotenv";
import path from 'path';
import { envSchema } from '../validation/env-validation';

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

const envFilePath = path.resolve(
  process.cwd(),
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
);

// Load environment variables from the appropriate file
dotenv.config({ path: envFilePath });

// Validate and parse environment variables
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

// Exporting the parsed and validated environment configuration
export const envConfig = {
  env: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  databaseUrl: parsedEnv.data.MONGO_URI,
  domain: parsedEnv.data.DOMAIN,
  jwt: {
    secret: parsedEnv.data.JWT_SECRET,
    refreshSecret: parsedEnv.data.JWT_REFRESH_SECRET,
    expiresIn: parsedEnv.data.JWT_EXPIRATION_TIME,
    refreshExpiresIn: parsedEnv.data.JWT_REFRESH_EXPIRATION_TIME,
  },
  aws: {
    accessKeyId: parsedEnv.data.AWS_ACCESS_KEY_ID,
    secretAccessKey: parsedEnv.data.AWS_SECRET_ACCESS_KEY,
    region: parsedEnv.data.AWS_REGION,
    bucketName: parsedEnv.data.AWS_BUCKET_NAME,
  },
  allowDomains: parsedEnv.data.ALLOW_DOMAINS?.split(',') || [],
};
