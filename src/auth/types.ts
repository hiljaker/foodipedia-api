import { User } from '@prisma/client';

export type AuthUser = {
  user: Omit<User, 'password'>;
  accessToken?: string;
};
