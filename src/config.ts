import * as Joi from 'joi';

export type AppConfig = {
  port: number;
  key: string;
  algorithm: string;
  iv: string;
  saltRounds: number;
};

export type ClientConfig = {
  whitelist: string;
};

export type DbConfig = {
  provider: string;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
};

export type JwtConfig = {
  secret: string;
  expiresIn: string;
};

export type Env = {
  env: string;
  app: AppConfig;
  client: ClientConfig;
  db: DbConfig;
  jwt: JwtConfig;
};

export const configValidator = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  APP_PORT: Joi.number().required(),
  APP_KEY: Joi.string().required(),
  APP_ALGORITHM: Joi.string().required(),
  APP_IV: Joi.string().required(),
  APP_SALT_ROUNDS: Joi.number().required(),
  CLIENT_WHITELIST: Joi.string().required(),
  DB_PROVIDER: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().required(),
});

export const configLoader = () => ({
  env: process.env.NODE_ENV,
  app: {
    port: Number(process.env.APP_PORT),
    key: process.env.APP_KEY,
    algorithm: process.env.APP_ALGORITHM,
    iv: process.env.APP_IV,
    saltRounds: Number(process.env.APP_SALT_ROUNDS),
  },
  client: {
    whitelist: process.env.CLIENT_WHITELIST,
  },
  db: {
    provider: process.env.DB_PROVIDER,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  },
});
