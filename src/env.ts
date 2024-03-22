import { ConfigModuleOptions } from '@nestjs/config';
import { configLoader, configValidator } from './config';

export const env = {
  get config(): ConfigModuleOptions {
    return {
      cache: true,
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configLoader],
      validationSchema: configValidator,
      expandVariables: true,
    };
  },
};
